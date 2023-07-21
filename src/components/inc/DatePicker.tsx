import * as React from "react";
import { Card, Box, Calendar, TimeField } from "@components/base";
import { getLocalTimeZone, CalendarDateTime } from "@internationalized/date";
import { Button } from "@components/base/Button";
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
    <Card css={{ pd: "$2", spacey: "$2" }} nested>
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
        label="Time"
      />
      <Button
        size="xs"
        onClick={() => {
          onChange(value.toDate(getLocalTimeZone()));
        }}
        color="accent"
      >
        Set
      </Button>
    </Card>
  );
}

export default DatePicker;
