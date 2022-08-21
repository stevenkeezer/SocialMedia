import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity, ActivityFormValues } from "../models/Activity";
import { toast } from "react-toastify";
import { User } from "../models/user";
import { store } from "../../stores/store";
import { ActivityPhoto, Photo, Profile, UserActivity } from "../models/profile";
import { PaginatedResult } from "../models/pagination";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(
        response.data,
        JSON.parse(pagination)
      );
      return response as AxiosResponse<PaginatedResult<any>>;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;

    switch (status) {
      case 400:
        if (typeof data === "string") {
          toast.error(data);
        }

        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          return "";
        }

        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) modalStateErrors.push(data.errors[key]);
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("Unauthorized");
        break;
      case 404:
        toast.error("Not Found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        break;
    }
    return Promise.reject(data);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Activity[]>>("/activities", { params })
      .then(responseBody),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: ActivityFormValues) =>
    requests.post<void>("/activities", activity),
  update: (activity: ActivityFormValues) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`/activities/${id}`),
  attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {}),
  uploadPhoto: (file: Blob, id: string, fileName: string, size: string) => {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    formData.append("fileName", fileName);
    formData.append("size", size);
    return axios.post<ActivityPhoto>(`activityphotos`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  setMainPhoto: (id: string, activityId: string) =>
    requests.post<ActivityPhoto>(
      `/activityPhotos/${id}/setMainActivityPhoto?activityId=${activityId}`,
      {}
    ),
  deletePhoto: (id: string, activityId: string) =>
    requests.del<Photo>(`/activityPhotos/${id}?activityId=${activityId}`),
};

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: User) => requests.post<User>("/account/login", user),
  register: (user: User) => requests.post<User>("/account/register", user),
};

const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
  uploadPhoto: (file: Blob) => {
    let formData = new FormData();
    formData.append("file", file);
    return axios.post<Photo>("photos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  setMainPhoto: (id: string) =>
    requests.post<Photo>(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => requests.del<Photo>(`/photos/${id}`),
  updateFollowing: (username: string) =>
    requests.post(`/follow/${username}`, {}),
  listFollowings: (username: string, predicate: string) =>
    requests.get<Profile[]>(`/follow/${username}/?predicate=${predicate}`),
  listActivities: (username: string, predicate: string) =>
    requests.get<UserActivity[]>(
      `/profiles/${username}/activities/?predicate=${predicate}`
    ),
};

const Comments = {
  deleteComment: (id: string) => requests.del<void>(`/comment/${id}`),
  updateComment: (id: string, body: string) =>
    requests.put<void>(`/comment/${id}/?body=${body}`, {}),
};

const agent = {
  Activities,
  Account,
  Profiles,
  Comments,
};

export default agent;
