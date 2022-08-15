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
import { useRouter } from "next/router";

function App() {
  const { activityStore } = useStore();
  const router = useRouter();
  const { asPath } = router;

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  useEffect(() => {
    if (asPath === "/list") {
      router.push("list/0");
    }
  }, []);

  return (
    <Layout>
      <ActivityDashboard />
    </Layout>
  );
}

export default observer(App);
