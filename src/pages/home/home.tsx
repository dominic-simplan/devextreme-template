import { Scheduler } from "devextreme-react";
import React, { useCallback } from "react";
import "./home.scss";

export default function Home() {
  const schedulerRef = React.useRef<Scheduler>(null);

  const renderDateCell = useCallback((e: { date: Date }) => {
    return (
      <div>
        <div>{e.date.toLocaleDateString()}</div>
        <div style={{ fontSize: "smaller" }}>{"Something else"}</div>
      </div>
    );
  }, []);

  return (
    <React.Fragment>
      <Scheduler
        ref={schedulerRef}
        dataSource={[
          {
            allDay: true,
            startDate: new Date(),
            endDate: new Date(),
            text: "All day event",
          },
        ]}
        views={["day", "week", "month"]}
        defaultCurrentView="week"
        allDayPanelMode="allDay"
        cellDuration={60}
        dateCellRender={renderDateCell}
      ></Scheduler>
    </React.Fragment>
  );
}
