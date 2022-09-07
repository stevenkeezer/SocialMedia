import { observer } from "mobx-react-lite";
import React from "react";
import Calendar from "react-calendar";
import { useStore } from "../../../../stores/store";

export default observer(function CalendarFilter() {
  const { activityStore } = useStore();
  return (
    <div className="flex flex-col">
      <Calendar
        onChange={(date) => {
          activityStore.setPredicate("startDate", date as Date);
        }}
        value={activityStore.predicate.get("startDate") || new Date()}
      />

      <button
        type="button"
        className="w-3/4 px-4 py-2 mx-auto mt-5 text-sm font-medium text-white bg-[#4573d2] border border-transparent rounded-md shadow"
        onClick={() => {
          activityStore.setPredicate("startDate", new Date());
        }}
      >
        Reset Calendar
      </button>
    </div>
  );
});
