import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
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

function App() {
  const { activityStore } = useStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  function handleClickAway() {
    activityStore.closeForm();
  }

  return (
    <Layout>
      <ActivityDashboard
        setSidebarOpen={setSidebarOpen}
        handleClickAway={handleClickAway}
      />
    </Layout>
  );
}

export default observer(App);
