import * as React from "react";
import {
  TimeValue,
  useDateSegment,
  useTimeField,
} from "@react-aria/datepicker";
import {
  DateFieldState,
  DateSegment,
  TimeFieldStateOptions,
  useTimeFieldState,
} from "react-stately";
import { useLocale } from "@react-aria/i18n";
import Box from "./Box";
import Flex from "./Flex";

export default function TimeField(
  props: Omit<TimeFieldStateOptions<TimeValue>, "locale">
) {
  const { locale } = useLocale();
  const state = useTimeFieldState({
    ...props,
    locale,
  });

  const ref = React.useRef(null);
  const { labelProps, fieldProps } = useTimeField(props, state, ref);

  return (
    <div className="wrapper">
      <span {...labelProps}>{props.label}</span>
      <Flex
        {...fieldProps}
        ref={ref}
        css={{
          $$borderColor: "rgba($colors$textRGB,0.2)",
          bg: "transparent",
          border: "1px solid $$borderColor",
          transiton: "all 500ms ease-in-out",
          br: "$3",
          pd: "$2",
          "&:is(:hover, :focus-within)": {
            $$borderColor: "rgba($colors$textRGB,0.4)",
          },
        }}
      >
        {state.segments.map((segment, i) => (
          <DateSeg key={i} segment={segment} state={state} />
        ))}
        {state.validationState === "invalid" && (
          <span aria-hidden="true">🚫</span>
        )}
      </Flex>
    </div>
  );
}

// Note: this component is the same as in the useDateField docs.
function DateSeg({
  segment,
  state,
}: {
  segment: DateSegment;
  state: DateFieldState;
}) {
  const ref = React.useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <Box
      {...segmentProps}
      ref={ref}
      css={{
        px: 4,
      }}
      className={`segment ${segment.isPlaceholder ? "placeholder" : ""}`}
    >
      {segment.text}
    </Box>
  );
}
