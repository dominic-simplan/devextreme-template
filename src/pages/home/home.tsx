import { Scheduler } from "devextreme-react";
import React, { useCallback, useEffect, useMemo } from "react";
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

  const ZOOM_CELL_DURATIONS = useMemo(() => [5, 10, 15, 30, 60, 120], []);

  const onMouseWheelEvent = useCallback(
    (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.stopPropagation();
        //console.log(event);
        const mouseWheelUp = event.deltaY >= 1;
        const mouseWheelDown = event.deltaY <= -1;
        console.log(event.deltaY);
        const zoomDirection = mouseWheelUp
          ? "zoomIn"
          : mouseWheelDown
          ? "zoomOut"
          : undefined;
        if (zoomDirection) {
          const scheduler = schedulerRef?.current?.instance!;
          const currentCellDuration = scheduler.option(
            "cellDuration"
          ) as number;
          console.log("currentCellDuration", currentCellDuration);
          const currentZoomIndex = ZOOM_CELL_DURATIONS.findIndex(
            (s) => s === currentCellDuration
          );
          console.log(currentZoomIndex);
          if (zoomDirection === "zoomIn" && currentZoomIndex > 0) {
            scheduler.option(
              "cellDuration",
              ZOOM_CELL_DURATIONS[currentZoomIndex - 1]
            );
          } else if (
            zoomDirection === "zoomOut" &&
            currentZoomIndex + 1 < ZOOM_CELL_DURATIONS.length
          ) {
            scheduler.option(
              "cellDuration",
              ZOOM_CELL_DURATIONS[currentZoomIndex + 1]
            );
          }
        }
      }
    },
    [ZOOM_CELL_DURATIONS]
  );

  useEffect(() => {
    if (schedulerRef?.current) {
      const el = schedulerRef?.current.instance.element();
      el.addEventListener("wheel", (e) => onMouseWheelEvent(e));
    }
  }, [onMouseWheelEvent, schedulerRef]);

  return (
    <React.Fragment>
      <Scheduler
        ref={schedulerRef}
        views={["day", "week", "month"]}
        currentView="week"
        dateCellRender={renderDateCell}
      ></Scheduler>
    </React.Fragment>
  );
}
