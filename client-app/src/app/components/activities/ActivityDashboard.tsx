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
import ActivityActions from "./ActivityActions";

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
        <div className="flex overflow-hidden w-full ">
          <div className="relative w-full mb-14">
            <ActivityActions />
            <div className="w-full bg-white dark:bg-[#1e1f21] border-[#edeae9] absolute border-b -mt-px h-[1.68rem] z-10 dark:border-[#424244] border-t"></div>
            <div className="h-1.5 top-[4.8rem] bg-white dark:border-[#424244] border-b dark:bg-[#1e1f21] w-28 z-30 absolute"></div>

            <div
              id="scrollable"
              className="hidden sm:block overflow-y-auto max-h-full pb-6"
            >
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
                    <div
                      key={group}
                      className="relative border-t pt-px first:border-t-0 dark:border-none divide-y dark:divide-y-[0.5] border-[#edeae9]/50 divide-[#edeae9]/60 dark:divide-[#424244]/5"
                    >
                      <div className="z-10 sticky text-[.65rem] top-px px-6 py-1 text-[#6d6e6f] tracking-tight">
                        <h3>{group}</h3>
                      </div>
                      <ul
                        role="list"
                        className="relative divide-y dark:divide-y-0 divide-[#edeae9]/50 dark:divide-[#424244]/5"
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
          </div>
          <div className="bg-transparent min-w-[41.3rem] border-l border-[#edeae9] overflow-y-auto dark:border-[#424244]  max-h-screen">
            <FilterDashboard />
          </div>
        </div>
      </>
    </>
  );
});
