import { DateBox } from "devextreme-react";
import { NativeEventInfo } from "devextreme/events";
import dxDateBox from "devextreme/ui/date_box";
import { SimpleItemTemplateData } from "devextreme/ui/form";
import React, { useCallback, useEffect, useState } from "react";
import { ViewEntry } from "./home";

export const ShiftCalendarRecurrenceEditorTemplateName =
  "ShiftCalendarRecurrenceEditorTemplate";

export const ShiftCalendarRecurrenceEditorTemplate: React.FC<{
  data: SimpleItemTemplateData;
}> = ({ data }) => {
  const [untilDate, setUntilDate] = useState<Date | undefined>();

  useEffect(() => {
    const form = data.component;

    const formData = form.option("formData") as ViewEntry;
    const currentValue = formData.shift?.customDate;
    console.log("currentValue", currentValue);

    setUntilDate(currentValue ? new Date(currentValue) : undefined);
  }, [data.component]);

  const onUntilDateChanged = useCallback(
    (e: NativeEventInfo<dxDateBox, Event> & { value?: Date }) => {
      data.component.updateData("shift.customDate", e.value?.toISOString());
      //data.component.updateData("customDate", e.value?.toISOString());
    },
    [data.component]
  );

  return (
    <DateBox
      text="xUntil"
      value={untilDate}
      onValueChanged={onUntilDateChanged}
    ></DateBox>
  );
};
