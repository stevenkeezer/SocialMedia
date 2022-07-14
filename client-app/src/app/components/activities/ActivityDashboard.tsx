import React from "react";
import { MenuAlt1Icon } from "@heroicons/react/outline";
import { ChevronRightIcon, SearchIcon, PlusIcon } from "@heroicons/react/solid";
import ActivityList from "./ActivityList";
import Skeleton from "../../layout/Skeleton";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default observer(function ActivityDashboard<Activitiy>({
  title,
  setSidebarOpen,
}: any) {
  const { activityStore } = useStore();
  const { activitiesByDate } = activityStore;

  return (
    <>
      <div className="mt-10 sm:hidden">
        <div className="px-4 sm:px-6">
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            Projects
          </h2>
        </div>

        {activityStore.loadingInitial ? (
          <Skeleton />
        ) : (
          <ul
            role="list"
            className="mt-3 border-t border-gray-200 divide-y divide-gray-100"
          >
            {activitiesByDate.map((activity) => (
              <li key={activity.id}>
                <div className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6">
                  <span className="flex items-center truncate space-x-3">
                    <span
                      className={classNames(
                        "bg-indigo-500",
                        "w-2.5 h-2.5 flex-shrink-0 rounded-full"
                      )}
                      aria-hidden="true"
                    />
                    <span
                      onClick={() => activityStore.openForm(activity.id)}
                      className="font-medium truncate text-sm leading-6"
                    >
                      {activity.title}
                      <span className="truncate font-normal text-gray-500">
                        in {activity.description}
                      </span>
                    </span>
                  </span>
                  <ChevronRightIcon
                    className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Projects table (small breakpoint and up) */}

      {activityStore.loadingInitial ? (
        <Skeleton />
      ) : (
        <div className="hidden mt-8 sm:block">
          <div className="align-middle inline-block w-full">
            <div className="bg-white overflow-hidden">
              <ul role="list" className="">
                {activitiesByDate.map((activity, index) => (
                  <ActivityList activity={activity} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
