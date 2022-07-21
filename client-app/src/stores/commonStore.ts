import { makeAutoObservable, reaction } from "mobx";

export default class CommonStore {
  error: any | null = null;
  token: string | null =
    typeof window !== "undefined" ? window.localStorage.getItem("jwt") : null;
  appLoaded = false;

  // if typeof window !== "undefined" set token to  window.localStorage.getItem("jwt");

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }

  setServerError = (error: any | null) => {
    this.error = error;
  };

  setToken = (token: string | null) => {
    this.token = token;
  };

  setAppLoaded = () => {
    this.appLoaded = true;
  };
}
