import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { useRouter } from "next/router";
import WelcomePanel from "./WelcomePanel";
import ProfileNav from "./ProfileNav";

export default observer(function ProfileDashboard() {
  const router = useRouter();
  const {
    profileStore,
    userStore: { user },
  } = useStore();
  const {
    loadingProfile,
    loadProfile,
    profile,
    setActiveTab,
    loadUserActivities,
  } = profileStore;

  const { profile: username } = router.query;

  useEffect(() => {
    if (username) {
      loadProfile(username as string);
    }
    return () => {
      setActiveTab(0);
    };
  }, [loadProfile, username, setActiveTab]);

  useEffect(() => {
    loadUserActivities(profile?.username, "hosting");
  }, [loadUserActivities, profile?.username, router]);

  useEffect(() => {
    loadProfile(user?.username);
  }, [loadProfile, user?.username]);

  return (
    <article className="w-full h-full bg-[#f9f8f8] dark:bg-transparent">
      <WelcomePanel profile={profile} />
      <div className="dark:bg-transparent">
        <ProfileNav loadingProfile={loadingProfile} />
      </div>
    </article>
  );
});
