import { Fragment, useEffect, useState } from "react";
import Layout from "../../app/layout/Layout";
import CalendarFilter from "../../app/components/activities/ActivityFilters/CalendarFilter";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import ActivityList from "../../app/components/activities/ActivityList";
import InfiniteScroll from "react-infinite-scroller";
import Skeleton from "../../app/layout/Skeleton";
import { PagingParams } from "../../app/models/pagination";

export default observer(function CalendarPage() {
  const { activityStore } = useStore();

  const {
    setPagingParams,
    loadActivities,
    groupedActivitiesByDate,
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
    setPredicate("startDateSort", "true");

    return () => {
      setPredicate("all", "true");
    };
  }, [setPredicate]);

  return (
    <Layout>
      <div className="lg:grid lg:grid-cols-12  lg:gap-x-16 pr-6">
        <div className="py-6 pr-8 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-7">
          <CalendarFilter />
        </div>
        <ol className="border-[#edeae9] dark:border-[#424244] border-r divide-y divide-gray-100 text-sm overflow-hidden h-[90.5vh] leading-6 lg:col-span-7 xl:col-span-6">
          <div
            id="scrollable"
            className="block overflow-y-auto max-h-full h-full"
          >
            {loadingInitial ? (
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
                {groupedActivitiesByDate.map(([group, activities], index) => (
                  <div key={group} className="relative -mt-0.5">
                    <div
                      // ref={dateRef}
                      className="z-10 sticky -top-px -bottom-px first:border-t-none border-t border-b border-[#edeae9] dark:border-[#424244] bg-white dark:bg-[#1e1f21] px-6 py-1.5 text-xs dark:text-white"
                    >
                      <h3>{group}</h3>
                    </div>
                    <ul
                      role="list"
                      className="relative divide-y pb-0.5 dark:divide-y-0 divide-[#edeae9] dark:divide-[#424244]/20"
                    >
                      {activities.map((activity) => (
                        <ActivityList
                          activity={activity}
                          key={activity.id + index}
                        />
                      ))}
                    </ul>
                  </div>
                ))}
              </InfiniteScroll>
            )}
          </div>
        </ol>
      </div>
    </Layout>
  );
});
