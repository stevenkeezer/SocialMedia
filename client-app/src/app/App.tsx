import { Fragment, useEffect, useRef, useState } from "react";
import ActivityDashboard from "./components/activities/ActivityDashboard";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import Layout from "./layout/Layout";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  function handleClickAway() {
    activityStore.closeForm();
  }

  return (
    <Layout>
      <ActivityDashboard />
    </Layout>
  );
}

export default observer(App);
