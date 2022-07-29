import React, { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "../styles/index.css";
import { store, StoreContext, useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { Activity } from "../app/components/activities/Activity";
import Spinner from "../app/common/Spinner";

export default observer(function MyApp({ Component, pageProps }: any) {
  const { commonStore, userStore } = useStore();
  const router = useRouter();
  const { user, isLoggedIn } = userStore;

  useEffect(() => {
    document.body.className = "dark:bg-[#1e1f21] bg-white overflow-hidden";
  });

  useEffect(() => {
    if (!commonStore.token) {
      router.push("/login");
    }

    if (commonStore.token) {
      userStore.getUser().finally(() => {
        commonStore.setAppLoaded();
      });
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  const { query } = router;
  const { id } = query;

  const [activity, setActivity] = useState<Activity>(null);

  if (!commonStore.appLoaded) {
    return (
      <div className="w-full h-full fixed block top-0 left-0 bg-[#252628] z-50">
        <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
          <Spinner />
        </span>
      </div>
    );
  }

  return (
    <StoreContext.Provider value={store}>
      <ThemeProvider attribute="class">
        <ToastContainer position="bottom-left" hideProgressBar icon={false} />
        <Component {...pageProps} activity={activity} />;
      </ThemeProvider>
    </StoreContext.Provider>
  );
});
