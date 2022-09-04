import { CheckCircleIcon, PlusSmIcon } from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import router from "next/router";
import React, { useEffect } from "react";
import { useStore } from "../../../stores/store";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Stats from "./ProfileStats";
import EventTabs from "./EventTabs";

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
    loadUserActivities(profile?.username, "upcoming");
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
        <div className="bg-white dark:bg-[#2a2b2d] w-full  rounded-lg border-[#edeae9] border dark:border-[#424244]">
          <div className=" pt-3">
            <div className="flex px-4 flex-col border-[#edeae9] border-b dark:border-[#424244]">
              <div className="flex pb-2 justify-between w-full items-center">
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
              <EventTabs />
            </div>
            <div className="px-4 pt-4 flow-root overflow-y-auto h-64 pb-3">
              <ul
                role="list"
                className="divide-y divide-[#edeae9] dark:divide-[#424244]"
              >
                {userActivities.map((activity) => (
                  <li
                    key={activity.id}
                    className="flex items-center py-2 space-x-3"
                  >
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <a>{activity.title}</a>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex  px-5 justify-center items-center mx-auto pb-8 pt-6 border bg-white dark:bg-[#2a2b2d] rounded-lg dark:border-[#424244]">
          <Doughnut
            width={250}
            height={250}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  align: "center",
                  position: "bottom",
                  labels: {
                    boxWidth: 10,
                    padding: 19,
                  },
                  title: {
                    padding: 60,
                  },
                },
              },
            }}
            data={data}
          />
        </div>
      </div>
    </section>
  );
});
