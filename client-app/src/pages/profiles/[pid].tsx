import { observer } from "mobx-react-lite";
import React from "react";
import ActivityDashboard from "../../app/components/Activities/ActivityDashboard";
import Layout from "../../app/layout/Layout";

export default observer(function Profile() {
  return (
    <Layout>
      <ActivityDashboard />
    </Layout>
  );
});
