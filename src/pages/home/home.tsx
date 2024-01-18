import { Scheduler, Template } from "devextreme-react";
import { SimpleItem } from "devextreme/ui/form";
import {
  Appointment,
  AppointmentFormOpeningEvent,
} from "devextreme/ui/scheduler";
import React, { useState } from "react";
import {
  ShiftCalendarRecurrenceEditorTemplate,
  ShiftCalendarRecurrenceEditorTemplateName,
} from "./ShiftCalendarRecurrenceEditorTemplate";
import "./home.scss";

export type ViewEntry = Appointment & { shift?: { customDate: string } };

export default function Home() {
  const [viewEntries, setViewEntries] = useState<ViewEntry[]>([]);

  const customizeAppointmentForm = (data: AppointmentFormOpeningEvent) => {
    const checkbox: SimpleItem = {
      label: {
        text: "xRepeat?",
      },
      dataField: "customDate",
      template: ShiftCalendarRecurrenceEditorTemplateName,
    };
    data.form.option("items", [checkbox]);
  };

  return (
    <React.Fragment>
      <Scheduler
        dataSource={viewEntries}
        views={["day", "week", "month"]}
        currentView="week"
        onAppointmentFormOpening={customizeAppointmentForm}
      >
        <Template
          name={ShiftCalendarRecurrenceEditorTemplateName}
          component={ShiftCalendarRecurrenceEditorTemplate}
        />
      </Scheduler>
    </React.Fragment>
  );
}
