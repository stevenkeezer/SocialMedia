import { makeAutoObservable, runInAction } from "mobx";
import { withRouter } from "next/router";
import agent from "../app/api/agents";
import { User, UserFormValues } from "../app/models/user";
import { store } from "./store";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      // withRouter.push("/list");
      console.log("login success");
      return "login success";
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    // history.push("/login");
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
      console.log("get user success");
      return "get user success";
    } catch (error) {
      console.log(error);
    }
  };

  register = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.register(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      console.log("register success");
      return "register success";
    } catch (error) {
      throw error;
    }
  };
}
