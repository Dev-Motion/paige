import {
  CalendarDate,
  createCalendar,
  getWeeksInMonth,
} from "@internationalized/date";
import {
  AriaCalendarGridProps,
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
import { ChevronLeftIcon, ChevronRightIcon } from "@components/icons";
import IconButton from "./IconButton";

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
        <IconButton
          bg="text"
          size="xs"
          onClick={(e) => prevButtonProps.onPress?.(e as any)}
        >
          <ChevronLeftIcon
            css={{
              width: "80%",
            }}
          />
        </IconButton>
        <Flex ai="center" gap="1">
          <Text fs="md">
            {monthFormatter.format(state.focusedDate.toDate(state.timeZone))}
          </Text>
          <Text fs="md">
            {yearFormatter.format(state.focusedDate.toDate(state.timeZone))}
          </Text>
        </Flex>
        <IconButton
          bg="text"
          size="xs"
          onClick={(e) => nextButtonProps.onPress?.(e as any)}
        >
          <ChevronRightIcon
            css={{
              width: "80%",
            }}
          />
        </IconButton>
      </Flex>
      <CalendarGrid state={state} />
    </Box>
  );
}

function CalendarGrid({
  state,
  ...props
}: { state: CalendarState } & AriaCalendarGridProps) {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <Table {...gridProps}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <Th key={index}>{day}</Th>
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
    </Table>
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
          fontSize: "$sm",
          opacity: isOutsideVisibleRange ? 0.6 : 1,
          bg: isSelected
            ? "$accent"
            : isOutsideVisibleRange
              ? "transparent"
              : "$text",
          color: isSelected || isOutsideVisibleRange ? "$text" : "$bg",
          br: "$1",
          "&:hover": {},
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

const Th = styled("th", {
  fontSize: "$sm",
});
const Table = styled("table", {
  borderCollapse: "separate",
  borderSpacing: "4px 4px",
});
export default Calendar;
