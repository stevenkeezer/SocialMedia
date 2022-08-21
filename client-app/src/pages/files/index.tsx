import { DocumentTextIcon } from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import Spinner from "../../app/common/Spinner";
import Layout from "../../app/layout/Layout";
import { useStore } from "../../stores/store";

export default observer(function Files() {
  const {
    profileStore,
    userStore: { currentUser },
    activityStore,
  } = useStore();
  const {
    loadProfile,
    profile,
    setActiveTab,
    loading,
    userActivities,
    loadUserActivities,
    clearUserActivities,
    loadingUserActivities,
  } = profileStore;

  const router = useRouter();
  const { activityPhotos, loadingInitial } = activityStore;

  useEffect(() => {
    return () => {
      setActiveTab(0);
    };
  }, [loadProfile, setActiveTab]);

  useEffect(() => {
    loadUserActivities(currentUser?.username, "activityPhotos"); // also past default is upcoming events

    return () => clearUserActivities();
  }, [loadUserActivities, currentUser?.username, router]);

  return (
    <Layout>
      <div className="max-h-screen h-screen pb-8 bg-[#f9f8f8] dark:bg-[#252628] overflow-y-auto">
        {loadingUserActivities ? (
          <div className="flex justify-center pt-6">
            <Spinner />
          </div>
        ) : (
          <div className="gap-8 container pt-8 grid grid-cols-2 max-w-[874px] mx-auto flex-wrap">
            {userActivities.map((activity) => (
              <Fragment key={activity.id}>
                {activity.activityPhotos.map(({ id, url, fileName, size }) => (
                  <div
                    key={id}
                    className="border bg-white dark:bg-[#2a2b2d] border-[#edeae9] dark:border-[#424244] rounded-lg w-full h-[17.1rem] overflow-hidden"
                  >
                    <div className="p-3.5 px-4">
                      <div className="flex items-center text-xs">
                        <svg
                          className="text-[#a2a0a2] w-8 h-8 mb-px"
                          viewBox="0 0 32 32"
                          aria-hidden="true"
                          fill="currentColor"
                          focusable="false"
                        >
                          <path d="M0 6a6 6 0 0 1 6-6h11.84a7 7 0 0 1 4.48 1.622l7.161 5.967A7 7 0 0 1 32 12.967V26a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6zm20.658 12.93c-.687 0-1.567 1.4-2.334 2.953-1.22-3.124-2.998-6.883-4.5-6.883-1.864 0-4.568 6.398-5.747 9.435-.295.76.294 1.565 1.14 1.565H22.782c.84 0 1.431-.795 1.145-1.553-.787-2.081-2.24-5.517-3.269-5.517zM23 9a3 3 0 1 0-6 0 3 3 0 0 0 6 0z"></path>
                        </svg>
                        <div className="flex space-y-1 ml-3.5 flex-col">
                          <div>{fileName}</div>
                          <div>
                            {size} · {currentUser?.displayName}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="border-[#edeae9] dark:border-[#6a696a]" />
                    <img className="w-full object-cover" src={url} alt="" />
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
});
