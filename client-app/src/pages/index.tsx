import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import App from "../app/App";
import { useStore } from "../stores/store";
// import { store, StoreContext, useStore } from "../stores/store";

export async function getStaticProps() {
  return { props: { isDark: true } };
}

export default observer(function Example(props) {
  const { commonStore, userStore } = useStore();

  return <App />;
});
