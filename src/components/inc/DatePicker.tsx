import * as React from "react";
import { Card, Box, Calendar, TimeField } from "@components/base";
import { getLocalTimeZone, CalendarDateTime } from "@internationalized/date";
function DatePicker({ onChange }: { onChange: (newDate: Date) => void }) {
  const now = new Date();
  const [value, setValue] = React.useState(
    new CalendarDateTime(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
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
        onChange={(t) => setValue((v) => v.set(t))}
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
