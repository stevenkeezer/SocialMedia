import { CheckIcon } from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import { useTheme } from "next-themes";
import React from "react";
import { useStore } from "../../../stores/store";
import Spinner from "../../common/Spinner";
import { Activity } from "../../models/Activity";
import { classNames } from "../../utils/classNames";
import styles from "../../components/Slider/styles.module.css";

interface Props {
  activity: Activity;
}

export default observer(function AttendeesToolbar({ activity }: Props) {
  const { activityStore, commonStore } = useStore();
  const {
    updateAttendance,
    cancelActivityToggle,
    loading,
    loadingActivity,
    settingActivity,
  } = activityStore;

  const { resolvedTheme } = useTheme();
  const skeleton =
    resolvedTheme === "light" ? styles.skeleton : styles.skeletonDark;

  if (loadingActivity || settingActivity || !activity)
    return <div className={classNames(skeleton, "h-7 w-32")} />;
  return (
    <div className="flex items-center">
      {activity?.isHost ? (
        <>
          <button
            onClick={cancelActivityToggle}
            className="border dark:border-[#424244] text-xs border-red-500 bg-red-500/10 text-red-500 rounded-md px-2 py-[.3rem]"
          >
            {loading && <Spinner small />}
            {activity?.isCancelled ? "Re-activate event" : "Cancel event"}
          </button>
        </>
      ) : activity?.isGoing ? (
        <button
          onClick={updateAttendance}
          className="border border-gray-300 dark:border-[#424244] text-xs  rounded-md px-2 py-[.3rem]"
        >
          {loading && <Spinner small />}
          Cancel attendance
        </button>
      ) : (
        <button
          onClick={updateAttendance}
          disabled={activity?.isCancelled}
          className="border border-[#edeae9] dark:border-[#565557] text-xs flex items-center rounded-md px-2 py-[.3rem]"
        >
          {loading ? (
            <Spinner small />
          ) : (
            <CheckIcon className="h-[.9rem] w-[.9rem] mr-1 text-[#6d6e6f]" />
          )}
          Join event
        </button>
      )}
    </div>
  );
});
