import { CheckCircleIcon, PlusSmIcon } from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import router from "next/router";
import React, { useEffect } from "react";
import { useStore } from "../../../stores/store";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Stats from "./Stats";

ChartJS.register(ArcElement, Tooltip, Legend);

export default observer(function EventsList() {
  const { profileStore, activityStore } = useStore();
  const {
    loadingProfile,
    loadProfile,
    profile,
    setActiveTab,
    loadUserActivities,
    loadUserActivitiesCount,
    activitiesCount,
    userActivities,
  } = profileStore;
  const { setPredicate } = activityStore;

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
    loadUserActivitiesCount(profile?.username);
  }, [loadUserActivities, profile?.username, router]);

  const data = {
    labels: ["Past Events", "Upcoming Events"],
    datasets: [
      {
        data: [activitiesCount["past"], activitiesCount["upcoming"] || 1],

        backgroundColor: ["rgb(252 151 154)", "rgb(69, 115, 210)"],
        borderColor: ["rgb(252 151 154)", "rgb(69, 115, 210)"],
        borderWidth: 1,
        label: "# of Activities",
      },
    ],
  };

  return (
    <section
      aria-labelledby="who-to-follow-heading"
      className="px-4 pt-1 space-y-5"
    >
      <Stats />

      <div className="flex space-x-5">
        <div className="bg-white dark:bg-[#2a2b2d] w-full overflow-y-auto rounded-lg border-[#edeae9] border dark:border-[#424244]">
          <div className=" pt-3 pb-5">
            <div className="flex px-4 pb-3 justify-between border-[#edeae9] border-b dark:border-[#424244] items-center">
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
            <div className="mt-6 px-4 flow-root">
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

              <ul
                role="list"
                className="-my-4 divide-y  divide-[#edeae9] dark:divide-[#424244]"
              >
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
                      {/* <button
                      type="button"
                      className="inline-flex items-center px-3 py-0.5 rounded-full bg-rose-50 text-sm font-medium text-rose-700 hover:bg-rose-100"
                    >
                      <PlusSmIcon
                        className="-ml-1 mr-0.5 h-5 w-5 text-rose-400"
                        aria-hidden="true"
                      />
                      <span>Follow</span>
                    </button> */}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex  px-5 justify-center items-center mx-auto pb-12 pt-6 border bg-white dark:bg-[#2a2b2d] rounded-lg dark:border-[#424244]">
          <Doughnut
            width={250}
            height={250}
            options={{ maintainAspectRatio: false }}
            data={data}
          />
        </div>
      </div>
    </section>
  );
});
