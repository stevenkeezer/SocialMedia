import { observer } from "mobx-react-lite";
import React from "react";
import Calendar from "react-calendar";
import { useStore } from "../../../../stores/store";

export default observer(function CalendarFilter() {
  const { activityStore } = useStore();
  return (
    <div className="">
      <Calendar
        onChange={(date) => {
          activityStore.setPredicate("startDate", date as Date);
        }}
        value={activityStore.predicate.get("startDate") || new Date()}
      />
    </div>
  );
});
