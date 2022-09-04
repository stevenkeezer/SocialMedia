import { Fragment, useEffect, useRef, useState } from "react";
import ActivityDashboard from "./components/Activities/ActivityDashboard";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import Layout from "./layout/Layout";
import { useRouter } from "next/router";

function App() {
  const { activityStore } = useStore();
  const router = useRouter();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  function handleClickAway() {
    activityStore.closeForm();
  }

  if (router.pathname === "/") {
    router.push("/list/0");
  }

  return (
    <Layout>
      <ActivityDashboard />
    </Layout>
  );
}

export default observer(App);
