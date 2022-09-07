import { makeAutoObservable, runInAction } from "mobx";
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

  get currentUser() {
    return this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));

      return "login success";
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));

      return "get user success";
    } catch (error) {
      console.log(error);
    }
  };

  register = async (creds: UserFormValues) => {
    const credsWithColor = {
      ...creds,
      defaultColor: this.generateColor(creds.username),
    };

    try {
      const user = await agent.Account.register(credsWithColor);
      store.commonStore.setToken(user.token);

      runInAction(() => (this.user = user));

      return "register success";
    } catch (error) {
      throw error;
    }
  };

  setImage = (image: string) => {
    if (this.user) {
      this.user.image = image;
    }
  };

  generateColor = (username: string) => {
    const saturation = 50;
    const lightness = 60;
    const range = 10;

    const getHashOfString = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      hash = Math.abs(hash);
      return hash;
    };

    const normalizeHash = (hash, min, max) => {
      return Math.floor((hash % (max - min)) + min);
    };

    const generateHSL = (name, saturationRange, lightnessRange) => {
      const hash = getHashOfString(name);
      const h = normalizeHash(hash, 0, 360);
      const s = normalizeHash(hash, saturationRange[0], saturationRange[1]);
      const l = normalizeHash(hash, lightnessRange[0], lightnessRange[1]);
      return [h, s, l];
    };

    const getRange = (value, range) => {
      return [Math.max(0, value - range), Math.min(value + range, 100)];
    };

    function hslToHex(h, s, l) {
      l /= 100;
      const a = (s * Math.min(l, 1 - l)) / 100;
      const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
          .toString(16)
          .padStart(2, "0"); // convert to Hex and prefix "0" if needed
      };
      return `${f(0)}${f(8)}${f(4)}`;
    }

    const generateColorHex = (id, saturationRange, lightnessRange) => {
      const hsl = generateHSL(id, saturationRange, lightnessRange);
      return hslToHex(hsl[0], hsl[1], hsl[2]);
    };

    const saturationRange = getRange(saturation, range);
    const lightnessRange = getRange(lightness, range);
    return generateColorHex(username, saturationRange, lightnessRange);
  };
}
