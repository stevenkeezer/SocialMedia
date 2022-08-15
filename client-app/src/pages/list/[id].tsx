import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Layout from "../../app/layout/Layout";
import ActivityDashboard from "../../app/components/activities/ActivityDashboard";

function Activity({ props }) {
  const { activityStore } = useStore();

  useEffect(() => {
    if (activityStore.activityRegistry.size > 1) return;
    activityStore.loadActivities();
  }, [activityStore]);

  return (
    <Layout>
      <ActivityDashboard />
    </Layout>
  );
}

export default observer(Activity);
