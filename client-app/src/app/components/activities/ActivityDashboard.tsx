import React, { useEffect, useRef, useState } from "react";
import { MenuAlt1Icon } from "@heroicons/react/outline";
import { ChevronRightIcon, SearchIcon, PlusIcon } from "@heroicons/react/solid";
import ActivityList from "./ActivityList";
import Skeleton from "../../layout/Skeleton";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import useScrollRestoration from "../../hooks/useScrollPosition";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import FilterDashboard from "./ActivityFilters/FilterDashboard";
import { PagingParams } from "../../models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../../common/Spinner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default observer(function ActivityDashboard<Activitiy>({
  title,
  setSidebarOpen,
}: any) {
  const { activityStore } = useStore();
  const {
    activitiesByDate,
    groupedActivities,
    setPagingParams,
    loadActivities,
    pagination,
  } = activityStore;

  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    console.log("FIRED");
    setPagingParams(new PagingParams(pagination?.currentPage + 1));
    loadActivities().then(() => {
      setLoadingNext(false);
    });
  }

  return (
    <>
      <div className="mt-10 sm:hidden">
        <div className="px-4 sm:px-6">
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            Projects
          </h2>
        </div>

        <ul
          role="list"
          className="mt-3 border-t border-gray-200 divide-y divide-gray-100"
        >
          {activityStore.loadingInitial ? (
            <div className="text-4xl pt-48 text-white">Loading</div>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>

      {/* Projects table (small breakpoint and up) */}

      <>
        <div className="flex overflow-hidden w-full">
          <div className="hidden sm:block dark:border-[#424244] overflow-y-auto max-h-screen pb-3 w-3/5">
            {activityStore.loadingInitial ? (
              <Skeleton />
            ) : (
              <InfiniteScroll
                pageStart={0}
                loadMore={handleGetNext}
                useWindow={false}
                hasMore={
                  !loadingNext &&
                  !!pagination &&
                  pagination.currentPage < pagination.totalPages
                }
                initialLoad={false}
              >
                {groupedActivities.map(([group, activities]) => (
                  <div key={group} className="relative">
                    <div className="z-10 sticky text-[.65rem] top-0 border-t border-b border-[#edeae9] dark:bg-[#252628] bg-[#f9f8f8] dark:border-[#424244] px-6 py-1 text-gray-500">
                      <h3>{group}</h3>
                    </div>
                    <ul
                      role="list"
                      className="relative z-0 divide-y divide-[#edeae9] dark:divide-[#424244]/10"
                    >
                      {activities.map((activity, index) => (
                        <ActivityList
                          activity={activity}
                          index={index}
                          key={activity.id + activity.title}
                        />
                      ))}
                    </ul>
                  </div>
                ))}
              </InfiniteScroll>
            )}
            <div className="text-center pt-2">
              {loadingNext && <Spinner small />}
            </div>
          </div>
          <div className="bg-transparent w-full border-l border-[#edeae9] border-t overflow-y-auto dark:border-[#424244]  max-h-screen">
            <FilterDashboard />
          </div>
        </div>
      </>
    </>
  );
});
