import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import Popover from "./Popover";
import Text from "./Text";
import Card from "./Card";
import Box from "./Box";
import Flex from "./Flex";
import useMeasure, { RectReadOnly } from "react-use-measure";
import { mergeRefs } from "react-merge-refs";

const PADDING = 10;
interface TourContext {
  start: boolean;
  currentStep: string;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
  register: (key: string) => () => void;
  beginTour: () => void;
  endTour: () => void;
  order: string[];
}

const TourContext = React.createContext<TourContext | null>(null);

export function Root({
  children,
  order,
}: {
  children: React.ReactNode;
  order: string[];
}) {
  const [index, setIndex] = React.useState(0);
  const [start, setStart] = React.useState(false);
  const [steps, setSteps] = React.useState(new Set<string>());
  const currentStep = order[index];

  React.useEffect(() => {
    if (start) {
      order.forEach((step) => {
        // Checks if all steps are registered
        if (!steps.has(step)) {
          throw new Error(`Error: Step "${step}" is not registered`);
        }
      });
    }
  }, [start]);

  const beginTour = () => {
    setStart(true);
  };
  const endTour = () => {
    setStart(false);
    setIndex(0);
  };

  const goToNextStep = () => setIndex((t) => t + 1);

  const goToPreviousStep = () => setIndex((t) => t - 1);

  const goToStep = (step: number) => setIndex(step);
  const register = (key: string) => {
    setSteps((steps) => {
      steps.add(key);
      return steps;
    });
    return () => {
      setSteps((steps) => {
        steps.delete(key);
        return steps;
      });
    };
  };

  return (
    <TourContext.Provider
      value={{
        start,
        currentStep,
        goToNextStep,
        goToPreviousStep,
        goToStep,
        register,
        beginTour,
        endTour,
        order,
      }}
    >
      {children}
    </TourContext.Provider>
  );
}
function useTour() {
  const context = React.useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a Root");
  }
  return context;
}

function boundsPadding(bounds: RectReadOnly, padding: number) {
  return {
    top: bounds.top - padding,
    left: bounds.left - padding,
    right: bounds.right + padding,
    bottom: bounds.bottom + padding,
    width: bounds.width + padding * 2,
    height: bounds.height + padding * 2,
  };
}

interface TourStepProps {
  children: React.ReactNode;
  name: string;
  title: string;
  description: string;
}
export function Step({ children, name, title, description }: TourStepProps) {
  const [measureRef, bounds] = useMeasure();
  const boundsWithPadding = boundsPadding(bounds, PADDING);

  const {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    register,
    start,
    endTour,
    order,
  } = useTour();
  const display = currentStep === name;
  const isEnd = order.slice(-1)[0] === name;
  const isBeginning = order[0] === name;
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const unregister = register(name);
    return () => {
      unregister();
    };
  }, []);
  React.useEffect(() => {
    if (display && start) {
      //scroll into view
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  });
  if (!display || !start) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <Popover open modal>
      <Box
        style={{
          cursor: "pointer",
          height: "100%",
          pointerEvents: "auto",
          inset: 0,
          overflow: "hidden",
          position: "absolute",
          zIndex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          mixBlendMode: "hard-light",
        }}
      >
        <div
          style={{
            borderRadius: 4,
            position: "absolute",
            backgroundColor: "gray",
            inset: 0,
            opacity: 1,
            pointerEvents: "auto",
            transition: "opacity 0.2s ease 0s",
            ...boundsWithPadding,
          }}
        />
      </Box>
      <Popover.Anchor
        ref={mergeRefs([ref, measureRef])}
        style={{ position: "relative", display: "inline-block", zIndex: 10 }}
      >
        {children}
      </Popover.Anchor>

      <Popover.Content style={{ position: "relative", zIndex: 10 }}>
        <Card css={{ maxWidth: 330, pd: "$3", spacey: "$2" }}>
          <Popover.Arrow />
          {title && (
            <Text as="h1" fw="bold" fs="lg">
              {title}
            </Text>
          )}
          {description && (
            <Text as="p" fs="sm">
              {description}
            </Text>
          )}
        </Card>
        <Flex jc="between" css={{ mt: "$2" }}>
          <Box as="button" disabled={isBeginning} onClick={goToPreviousStep}>
            Previous
          </Box>
          <Box as="button" onClick={isEnd ? endTour : goToNextStep}>
            {isEnd ? "End" : "Next"}
          </Box>
        </Flex>
      </Popover.Content>
    </Popover>
  );
}

type TriggerProps = React.ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
};
export const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  function bareTrigger(props, forwardedRef) {
    // eslint-disable-next-line react/prop-types
    const { asChild, onClick, ...buttonProps } = props;
    const { beginTour } = useTour();
    const Comp = (asChild ? Slot : "button") as "button";
    return (
      <Comp
        onClick={(e) => {
          onClick?.(e);
          beginTour();
          console.log("started");
        }}
        ref={forwardedRef}
        {...buttonProps}
      />
    );
  }
);

export function withTour<T extends object>(
  component: React.ComponentType<T>,
  tourProps: Omit<TourStepProps, "children">
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<T> & React.RefAttributes<any>
> {
  const Wrapped = React.forwardRef<React.ComponentType<T>, T>(function withTour(
    props,
    ref: React.ForwardedRef<React.ComponentType<T>>
  ) {
    return React.createElement(
      Step,
      tourProps as TourStepProps,
      React.createElement(component, { ...props, ref })
    );
  });
  // Format for display in DevTools
  const name = component.displayName || component.name || "Unknown";
  Wrapped.displayName = `withTour(${name})`;

  return Wrapped;
}
