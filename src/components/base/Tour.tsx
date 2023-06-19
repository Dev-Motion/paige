import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import Popover from "./Popover";
import Text from "./Text";
import Card from "./Card";
import Box from "./Box";
import Flex from "./Flex";

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
  steps: Set<string>;
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
        steps,
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

export function Step({
  children,
  name,
  title,
  description,
}: {
  children: React.ReactNode;
  name: string;
  title: string;
  description: string;
}) {
  const {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    register,
    start,
    steps,
    endTour,
    order,
  } = useTour();
  const display = currentStep === name;
  const isEnd = order.slice(-1)[0] === name;
  const isBeginning = order[0] === name;
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const unregister = register(name);
    console.log("registered");
    return () => {
      unregister();
      console.log("unregistered");
    };
  }, []);
  console.table({ currentStep, name, display, isBeginning, isEnd });
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
      <Popover.Anchor
        ref={ref}
        style={{ position: "relative", display: "inline-block", zIndex: 10 }}
      >
        {children}
      </Popover.Anchor>
      <Box
        css={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,.2)",
          zIndex: 1,
        }}
      ></Box>
      <Popover.Content style={{ position: "relative", zIndex: 10 }}>
        <Popover.Arrow />
        <Card css={{ maxWidth: 330, pd: "$3", spacey: "$2" }}>
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
