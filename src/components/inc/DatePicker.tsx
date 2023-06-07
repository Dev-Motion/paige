import * as React from "react";
import { Card, Box, Calendar, TimeField } from "@components/base";
import { getLocalTimeZone, CalendarDateTime } from "@internationalized/date";
function DatePicker({
  date,
  onChange,
}: {
  date?: Date;
  onChange: (newDate: Date) => void;
}) {
  const defaultDate = (date ??= new Date());
  const [value, setValue] = React.useState(
    new CalendarDateTime(
      defaultDate.getFullYear(),
      defaultDate.getMonth() + 1,
      defaultDate.getDate(),
      defaultDate.getHours(),
      defaultDate.getMinutes(),
      defaultDate.getSeconds()
    )
  );

  return (
    <Card css={{ pd: "$1", spacey: "$2" }}>
      <Calendar
        value={value}
        onChange={(t) => setValue((v) => v.set(t))}
        aria-label="pick a date"
      />
      <TimeField
        value={value}
        onChange={(t) => {
          if (!(t?.hour || t?.minute)) {
            return;
          }
          setValue((v) => v.set(t));
        }}
        label="time"
      />
      <Box
        as="button"
        css={{
          include: "buttonReset",
          br: "$4",
          bg: "$text",
          color: "$bg",
          pd: "$1 $2",
        }}
        onClick={() => {
          onChange(value.toDate(getLocalTimeZone()));
        }}
      >
        set
      </Box>
    </Card>
  );
}

export default DatePicker;
