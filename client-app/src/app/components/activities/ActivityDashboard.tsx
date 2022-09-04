import React, { useEffect, useRef, useState } from "react";

import Skeleton from "../../layout/Skeleton";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import FilterDashboard from "../Profile/ProfileDashboard";
import { PagingParams } from "../../models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../../common/Spinner";
import ActivityActions from "./ActivityActions";
import ActivityList from "./ActivityList";

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const {
    groupedActivities,
    setPagingParams,
    loadActivities,
    pagination,
    loadingInitial,
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

  return (
    <div className="flex overflow-hidden w-full h-screen">
      <div className="relative w-full mb-12">
        <ActivityActions />

        <div
          id="scrollable"
          className="block overflow-y-auto max-h-full overflow-x-hidden h-full pb-8"
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
                <div key={group} className="relative -mt-0.5 overflow-x-hidden">
                  <div className="z-10 sticky -top-px -bottom-px first:border-t-none border-t border-b border-[#edeae9] dark:border-[#424244] bg-white dark:bg-[#1e1f21] px-6 py-1.5 text-xs dark:text-white">
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
      <div className="bg-transparent min-w-[41.22rem] border-l border-[#edeae9] overflow-y-auto dark:border-[#424244]  max-h-screen">
        <FilterDashboard />
      </div>
    </div>
  );
});
