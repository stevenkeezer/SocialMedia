import { observer } from "mobx-react-lite";
import React from "react";
import Calendar from "react-calendar";
import { useStore } from "../../../../stores/store";
import WeekCalendar from "./WeekCalendar";

export default observer(function ActivityFilters() {
  const { activityStore } = useStore();
  return (
    <div className="pt-32">
      <Calendar
        onChange={(date) => {
          activityStore.setPredicate("startDate", date as Date);
        }}
        value={activityStore.predicate.get("startDate") || new Date()}
      />
    </div>
  );
});
