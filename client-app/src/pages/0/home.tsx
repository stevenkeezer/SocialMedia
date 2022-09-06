import { Fragment, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Layout from "../../app/layout/Layout";
import ActivityDashboard from "../../app/components/Activities/ActivityDashboard";
import { useRouter } from "next/router";

function Home() {
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
      <div></div>
    </Layout>
  );
}

export default observer(Home);
