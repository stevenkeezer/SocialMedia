import React, { useEffect, useRef, useState } from "react";
import ActivityList from "./ActivityList";
import Skeleton from "../../layout/Skeleton";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import FilterDashboard from "./ActivityFilters/FilterDashboard";
import { PagingParams } from "../../models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../../common/Spinner";
import ActivityActions from "./ActivityActions";

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const {
    groupedActivities,
    setPagingParams,
    loadActivities,
    activitiesByDraft,
    pagination,
    loadingInitial,
    setPredicate,
  } = activityStore;

  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination?.currentPage + 1));
    loadActivities().then(() => {
      setLoadingNext(false);
    });
  }

  useEffect(() => {
    if (
      groupedActivities.length < 7 &&
      groupedActivities.length > 1 &&
      !!pagination
    )
      handleGetNext();
  }, [groupedActivities]);

  // const observer = new IntersectionObserver(
  //   ([e]) =>
  //     dateRef.current &&
  //     dateRef.current?.classList.toggle("visible", e.intersectionRatio < 1),
  //   { threshold: [1] }
  // );

  // if (dateRef.current) observer.observe(dateRef.current);

  return (
    <div className="flex overflow-hidden w-full h-screen">
      <div className="relative w-full mb-12">
        <ActivityActions />
        {/* <div className="w-full bg-white dark:bg-[#1e1f21] border-[#edeae9] absolute border-b -mt-px py-1.5 z-10 dark:border-[#424244] border-t"></div> */}
        {/* <div className="h-1.5 top-[4.9rem] bg-white dark:border-[#424244] border-b dark:bg-[#1e1f21] w-28 z-30 absolute"></div> */}

        <div
          id="scrollable"
          className="block overflow-y-auto max-h-full h-full pb-8"
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
              {groupedActivities.map(([group, activities], index) => (
                <div key={group} className="relative -mt-0.5">
                  <div
                    // ref={dateRef}
                    className="z-10 sticky -top-px -bottom-px first:border-t-none border-t border-b border-[#edeae9] dark:border-[#424244] bg-white dark:bg-[#1e1f21] px-6 py-1.5 text-xs dark:text-white"

                    // className="z-20 sticky dark:bg-[#1e1f21] text-xs top-px px-6 py-1.5 text-[#6d6e6f] tracking-tight"
                  >
                    <h3>{group}</h3>
                  </div>
                  <ul
                    role="list"
                    className="relative divide-y pb-0.5 dark:divide-y-0 divide-[#edeae9]/60 dark:divide-[#424244]/20"
                  >
                    {activities.map((activity) => (
                      <ActivityList
                        activity={activity}
                        key={activity.id + uuid() + index}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </InfiniteScroll>
          )}
          {!loadingInitial && loadingNext && (
            <div className="text-center h-2 mb-1">
              <Spinner small />
            </div>
          )}
        </div>
      </div>
      <div className="bg-transparent min-w-[41.3rem] border-l border-[#edeae9] overflow-y-auto dark:border-[#424244]  max-h-screen">
        <FilterDashboard />
      </div>
    </div>
  );
});
