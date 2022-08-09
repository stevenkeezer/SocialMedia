// import { Fragment, useEffect, useRef, useState } from "react";
// import {
//   ClockIcon,
//   HomeIcon,
//   ViewListIcon,
//   XIcon,
// } from "@heroicons/react/outline";

// import ActivityDashboard from "./components/activities/ActivityDashboard";
// import { useStore } from "../stores/store";
// import { observer } from "mobx-react-lite";
// import Layout from "./layout/Layout";
// import { FormikProps } from "formik";

// function App() {
//   const { activityStore } = useStore();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     activityStore.loadActivities();
//   }, [activityStore]);

//   function handleClickAway() {
//     activityStore.closeForm();
//   }

//   return (
//     <Layout>
//       <ActivityDashboard
//         setSidebarOpen={setSidebarOpen}
//         handleClickAway={handleClickAway}
//       />
//     </Layout>
//   );
// }

// export default observer(App);
