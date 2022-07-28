import { CheckIcon } from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../stores/store";
import Spinner from "../../common/Spinner";

export default observer(function AttendeesToolbar({ activity }: any) {
  const { activityStore } = useStore();
  const { updateAttendance, cancelActivityToggle, loading } = activityStore;

  return (
    <div>
      {activity?.isHost ? (
        <>
          <button
            onClick={cancelActivityToggle}
            className="border border-gray-600 text-xs bg-red-500/20 text-red-500 rounded-md px-2 py-1"
          >
            {loading && <Spinner small />}
            {activity?.isCancelled ? "Re-activate event" : "Cancel event"}
          </button>
        </>
      ) : activity?.isGoing ? (
        <button
          onClick={updateAttendance}
          className="border border-gray-600 text-xs  rounded-md px-2 py-1"
        >
          {loading && <Spinner small />}
          Cancel attendance
        </button>
      ) : (
        <button
          onClick={updateAttendance}
          disabled={activity?.isCancelled}
          className="border border-gray-600 text-xs flex items-center rounded-md px-2 py-1"
        >
          {loading ? <Spinner small /> : <CheckIcon className="h-4 w-4 mr-1" />}
          Join event
        </button>
      )}
    </div>
  );
});
