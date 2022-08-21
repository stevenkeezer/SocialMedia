import {
  CursorClickIcon,
  MailOpenIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../stores/store";

export default observer(function Stats() {
  const { profileStore } = useStore();
  const {
    profile,
    loadUserActivities,
    userActivities,
    loadUserActivitiesCount,
    activitiesCount,
  } = profileStore;

  let stats = [
    {
      id: 1,
      name: "Total Events",
      count: activitiesCount["all"],
      icon: UsersIcon,
      change: "122",
      changeType: "increase",
    },
    {
      id: 2,
      name: "Upcoming Events",
      count: activitiesCount["upcoming"],
      icon: MailOpenIcon,
      change: "5.4%",
      changeType: "increase",
    },
    {
      id: 3,
      name: "Past Events",
      count: activitiesCount["past"],
      icon: CursorClickIcon,
      change: "3.2%",
      changeType: "decrease",
    },
  ];

  return (
    <div>
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative bg-white px-3.5 py-4 h-[6.5rem] rounded-lg  dark:bg-[#2a2b2d] overflow-hidden border-[#edeae9] border dark:border-[#424244]"
          >
            <dt className="flex items-center space-y-2 flex-col justify-center">
              {/* <div className="absolute bg-indigo-500 rounded-md p-1.5">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div> */}
              <p className="truncate">{item.name}</p>
              <div className="text-3xl">{item.count}</div>
            </dt>
          </div>
        ))}
      </dl>
    </div>
  );
});
