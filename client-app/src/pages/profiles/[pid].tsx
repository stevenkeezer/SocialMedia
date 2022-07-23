import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ActivityDashboard from "../../app/components/activities/ActivityDashboard";
import Layout from "../../app/layout/Layout";
import { useStore } from "../../stores/store";

export default observer(function Profile() {
  const router = useRouter();
  const { profileStore } = useStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleClickAway() {
    // activityStore.closeForm();
  }
  return (
    <Layout>
      <ActivityDashboard
        setSidebarOpen={setSidebarOpen}
        handleClickAway={handleClickAway}
      />
    </Layout>
  );
});
