import { DocumentTextIcon } from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect } from "react";
import Spinner from "../../app/common/Spinner";
import Layout from "../../app/layout/Layout";
import { useStore } from "../../stores/store";

export default observer(function Files() {
  const { profileStore, userStore, activityStore } = useStore();
  const {
    loadProfile,
    profile,
    setActiveTab,
    userActivities,

    loadUserActivities,
  } = profileStore;
  const { user } = userStore;

  const {
    activitiesByDate,
    groupedActivities,
    activityPhotos,
    setPagingParams,
    loadActivities,
    loadingInitial,
    pagination,
  } = activityStore;

  useEffect(() => {
    return () => {
      setActiveTab(0);
    };
  }, [loadProfile, setActiveTab]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  return (
    <Layout>
      <div className="max-h-screen h-screen pb-8 bg-[#f9f8f8] dark:bg-[#252628] overflow-y-auto">
        {loadingInitial && (
          <div className="flex justify-center pt-6">
            <Spinner />
          </div>
        )}
        <div className=" flex  gap-8 container pt-8 max-w-[880px] mx-auto flex-wrap">
          {activityPhotos.map(({ id, title, photos }) => (
            <Fragment key={id}>
              {photos.map(({ id, url }) => (
                <div
                  key={id}
                  className="border bg-white dark:bg-[#2a2b2d] border-[#edeae9] dark:border-[#6a696a] rounded-lg w-[26.5rem] h-72 overflow-hidden"
                >
                  <div className="p-3">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-10 w-10 text-[#a2a0a2] mr-2" />
                      {title}
                    </div>
                  </div>
                  <hr className="border-[#edeae9] dark:border-[#6a696a]" />
                  <img className="w-full object-cover" src={url} alt="" />
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </Layout>
  );
});
