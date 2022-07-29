import { useEffect, useState } from "react";
import {
  ClockIcon,
  HomeIcon,
  ViewListIcon,
  XIcon,
} from "@heroicons/react/outline";

import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Layout from "../../app/layout/Layout";
import ActivityDashboard from "../../app/components/activities/ActivityDashboard";
import { useRouter } from "next/router";
import { PagingParams } from "../../app/models/pagination";

function Activity({ props }) {
  const { activityStore } = useStore();
  const { setPagingParams, pagination, loadActivities } = activityStore;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  function handleClickAway() {
    activityStore.closeForm();
  }
  const router = useRouter();
  const { query } = router;
  const { id } = query;

  return (
    <Layout>
      <ActivityDashboard
        setSidebarOpen={setSidebarOpen}
        handleClickAway={handleClickAway}
      />
    </Layout>
  );
}

export default observer(Activity);
