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

  console.log(groupedActivities.length);

  useEffect(() => {
    if (groupedActivities.length < 7 && groupedActivities.length > 1)
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
    <div className="flex overflow-hidden w-full h-screen ">
      <div className="relative w-full mb-20">
        <ActivityActions />
        <div className="w-full bg-white dark:bg-[#1e1f21] border-[#edeae9] absolute border-b -mt-px h-[1.68rem] z-10 dark:border-[#424244] border-t"></div>
        <div className="h-1.5 top-[4.8rem] bg-white dark:border-[#424244] border-b dark:bg-[#1e1f21] w-28 z-30 absolute"></div>

        <div
          id="scrollable"
          className="block overflow-y-auto max-h-full pb-2 mt-[1.55rem]"
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
              {/* {activitiesByDraft.length > 0 &&
                activitiesByDraft.map((activity) => (
                  <ActivityList activity={activity} />
                ))} */}
              {groupedActivities.map(([group, activities], index) => (
                <div
                  key={group}
                  className="relative border-t first:border-t-0 dark:border-none divide-y dark:divide-y-[0.5] border-[#edeae9]/50 divide-[#edeae9]/60 dark:divide-[#424244]/5"
                >
                  {/* <div
                    ref={dateRef}
                    className="z-10 sticky invisible text-[.65rem] top-px px-6 py-1 text-[#6d6e6f] tracking-tight"
                  >
                    <h3>{group}</h3>
                  </div> */}
                  <ul
                    role="list"
                    className="relative divide-y dark:divide-y-0  divide-[#edeae9] dark:divide-[#424244]/5"
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
          {!loadingInitial && (
            <div className="text-center pt-2">
              {loadingNext && <Spinner small />}
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
