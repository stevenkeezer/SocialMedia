import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ActivityForm from "./form/ActivityForm";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { Activity } from "./activities/Activity";

export default observer(function Slider() {
  const { activityStore } = useStore();
  const {
    editMode,
    loadActivity,
    updateAttendance,
    cancelActivityToggle,
    loading,
  } = activityStore;

  const router = useRouter();
  const { query } = router;
  const { id } = query;

  const [activity, setActivity] = useState<Activity>(null);

  useEffect(() => {
    if (id as string) {
      loadActivity(id as string).then((activity) => {
        return setActivity(activity);
      });
    }
  }, [id, loadActivity]);

  return (
    <Transition.Root show={editMode} as={Fragment}>
      <Dialog as="div" onClose={() => {}}>
        <div className="z-40 fixed inset-y-0 right-0 mt-[4.6rem] max-w-[41.3rem] flex">
          <Transition.Child
            as={Fragment}
            appear
            enter="transform transition ease-in-out duration-400 sm:duration-[400ms]"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-400 sm:duration-[400ms]"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="w-screen border-l bg-white dark:bg-[#1e1f21] overflow-y-auto max-h-screen dark:border-[#424244] border-gray-200">
              {activity?.isCancelled && <div>This activity is cancelled</div>}

              {activity?.attendees?.map((attendee) => (
                <div key={attendee.username}>
                  {attendee.username === activity.host?.username && (
                    <div>
                      Host {activity.host?.username}
                      <img
                        className="h-10 w-10"
                        src={activity.host?.image}
                      ></img>
                    </div>
                  )}
                </div>
              ))}
              {activity?.isHost ? (
                <>
                  <button
                    onClick={cancelActivityToggle}
                    className="border text-xs bg-red-500 rounded-md px-2 py-1"
                  >
                    {loading && (
                      <div className="text-white" role="status">
                        loading
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                    {activity?.isCancelled
                      ? "Re-activate Event"
                      : "Cancel Event"}
                  </button>
                  <button className="border text-xs  rounded-md px-2 py-1">
                    Manage Event
                  </button>
                </>
              ) : activity?.isGoing ? (
                <button
                  onClick={updateAttendance}
                  className="border text-xs  rounded-md px-2 py-1"
                >
                  Cancel Attendance
                </button>
              ) : (
                <button
                  onClick={updateAttendance}
                  disabled={activity?.isCancelled}
                  className="border text-xs  rounded-md px-2 py-1"
                >
                  Join Event
                </button>
              )}
              {activity?.attendees?.map((attendee) => (
                <div key={attendee.username} className="flex">
                  <img
                    className="rounded-full h-12 w-12"
                    src={attendee.image}
                    alt={attendee.username}
                  />
                  <div className="ml-4">
                    <div className="text-sm">{attendee.username}</div>
                  </div>
                </div>
              ))}
              <ActivityForm />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
});
