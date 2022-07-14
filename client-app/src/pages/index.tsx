import App from "../app/App";
import { store, StoreContext } from "../stores/store";

export async function getStaticProps() {
  return { props: { isDark: true } };
}

export default function Example(props) {
  return (
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  );
}
