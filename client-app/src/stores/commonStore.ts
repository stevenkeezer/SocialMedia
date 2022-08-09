import { makeAutoObservable, reaction } from "mobx";

export default class CommonStore {
  error: any | null = null;
  token: string | null =
    typeof window !== "undefined" ? window.localStorage.getItem("jwt") : null;
  appLoaded = false;
  modalState = false;
  photoViewer = false;
  mainImage = 0;

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

  setCurrentImage = (index: number) => {
    this.mainImage = index;
  };

  openPhotoViewer = (index: number) => {
    this.mainImage = index;
    this.photoViewer = true;
  };

  closePhotoViewer = () => {
    this.photoViewer = false;
  };

  openModal = () => {
    this.modalState = true;
  };

  closeModal = () => {
    this.modalState = false;
  };

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
