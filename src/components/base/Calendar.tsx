import {
  CalendarDate,
  createCalendar,
  getWeeksInMonth,
} from "@internationalized/date";
import {
  useCalendar,
  useCalendarCell,
  useCalendarGrid,
} from "@react-aria/calendar";
import { useLocale, useDateFormatter } from "@react-aria/i18n";
import React from "react";
import {
  CalendarState,
  CalendarStateOptions,
  useCalendarState,
} from "react-stately";
import { styled } from "stitches.config";
import Text from "./Text";
import Flex from "./Flex";
import Box from "./Box";

const Button = styled("button", {
  include: "buttonReset",
  br: "$4",
  bg: "$text",
  color: "$bg",
  size: "$6",
  ai: "center",
  jc: "center",
  ta: "center",
});
function Calendar(
  props: Omit<CalendarStateOptions, "locale" | "createCalendar">
) {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });
  const yearFormatter = useDateFormatter({
    year: "numeric",
    timeZone: state.timeZone,
  });
  const monthFormatter = useDateFormatter({
    month: "long",
    timeZone: state.timeZone,
  });
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state);

  return (
    <Box {...calendarProps} css={{ minWidth: 200 }}>
      <Flex jc="between" className="header">
        <Button onClick={(e) => prevButtonProps.onPress?.(e as any)}>
          &lt;
        </Button>
        <Flex fd="column" ai="center">
          <Text fs="sm">
            {yearFormatter.format(state.focusedDate.toDate(state.timeZone))}
          </Text>
          <Text fs="lg">
            {monthFormatter.format(state.focusedDate.toDate(state.timeZone))}
          </Text>
        </Flex>
        <Button onClick={(e) => nextButtonProps.onPress?.(e as any)}>
          &gt;
        </Button>
      </Flex>
      <CalendarGrid state={state} />
    </Box>
  );
}

function CalendarGrid({ state, ...props }: { state: CalendarState }) {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CalendarCell({
  state,
  date,
}: {
  state: CalendarState;
  date: CalendarDate;
}) {
  const ref = React.useRef(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  return (
    <td {...cellProps}>
      <Box
        as="button"
        css={{
          include: "buttonReset",
          display: "flex",
          ai: "center",
          jc: "center",
          size: 30,
          opacity: isOutsideVisibleRange ? 0.6 : 1,
          bg: isSelected
            ? "$accent"
            : isOutsideVisibleRange
              ? "transparent"
              : "$text",
          color: isSelected ? "$text" : "$bg",
          br: "$1",
        }}
        {...buttonProps}
        ref={ref}
        className={`cell ${isSelected ? "selected" : ""} ${
          isDisabled ? "disabled" : ""
        } ${isUnavailable ? "unavailable" : ""}`}
      >
        {formattedDate}
      </Box>
    </td>
  );
}
Calendar.displayName = "Calendar";
export default Calendar;
