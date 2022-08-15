import { CheckCircleIcon, PlusSmIcon } from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import router from "next/router";
import React, { useEffect } from "react";
import { useStore } from "../../../stores/store";
import Stats from "./Stats";

export default observer(function EventsList() {
  const { profileStore } = useStore();
  const {
    loadingProfile,
    loadProfile,
    profile,
    setActiveTab,
    loadUserActivities,
    userActivities,
  } = profileStore;

  const { profile: username } = router.query;

  useEffect(() => {
    if (username) {
      loadProfile(username as string);
    }
    return () => {
      setActiveTab(0);
    };
  }, [loadProfile, username, setActiveTab]);

  useEffect(() => {
    loadUserActivities(profile?.username, "upcoming"); // also past default is upcoming events
  }, [loadUserActivities, profile?.username, router]);

  return (
    <section aria-labelledby="who-to-follow-heading" className="px-4 space-y-5">
      <Stats />

      <div className="bg-white dark:bg-[#2a2b2d] max-h-96 overflow-y-auto rounded-lg border-[#edeae9] border dark:border-[#424244]">
        <div className="px-4 pt-3 pb-5">
          <div className="flex justify-between items-center">
            <h2
              id="who-to-follow-heading"
              className="text-lg font-semibold text-gray-900 dark:text-white"
            >
              Events{" "}
            </h2>
            <div className="">
              <a
                href="#"
                className="w-full block text-center text-sm font-medium rounded-md text-[#6296f1] bg-transparent"
              >
                View all
              </a>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="flex space-x-6 pb-4">
              <div
                onClick={() =>
                  loadUserActivities(profile?.username, "upcoming")
                }
              >
                Upcoming
              </div>

              <div
                onClick={() => loadUserActivities(profile?.username, "past")}
              >
                Past Events
              </div>
            </div>

            <ul role="list" className="-my-4 divide-y divide-transparent">
              {userActivities.map((activity) => (
                <li
                  key={activity.id}
                  className="flex items-center py-2 space-x-3"
                >
                  <div className="flex-shrink-0">
                    {/* <img
                      className="h-8 w-8 rounded-full"
                      src={activity?.mainImage}
                      alt=""
                    /> */}
                    <CheckCircleIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      <a>{activity.title}</a>
                    </p>
                    <p className="text-sm text-gray-500">
                      {/* <a >{"@" + activity.handle}</a> */}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-0.5 rounded-full bg-rose-50 text-sm font-medium text-rose-700 hover:bg-rose-100"
                    >
                      <PlusSmIcon
                        className="-ml-1 mr-0.5 h-5 w-5 text-rose-400"
                        aria-hidden="true"
                      />
                      <span>Follow</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
});
