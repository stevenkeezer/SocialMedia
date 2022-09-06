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
        className="w-3/4 px-4 py-2 mx-auto mt-5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => {
          activityStore.setPredicate("startDate", new Date());
        }}
      >
        Reset
      </button>
    </div>
  );
});
