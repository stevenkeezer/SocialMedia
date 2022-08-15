import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import ActivityDashboard from "../../app/components/activities/ActivityDashboard";
import Layout from "../../app/layout/Layout";

export default observer(function Profile() {
  return (
    <Layout>
      <ActivityDashboard />
    </Layout>
  );
});
