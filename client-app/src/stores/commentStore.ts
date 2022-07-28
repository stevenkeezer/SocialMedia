import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../app/api/agents";
import { ChatComment } from "../app/models/comment";
import { toast } from "react-toastify";
import { store } from "./store";
import ToastElement from "../app/components/ToastElement";

export default class CommentStore {
  comments: ChatComment[] = [];
  hubConnection: HubConnection | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  createHubConnection = (activityId: string) => {
    if (store.activityStore.selectedActivity) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(`http://localhost:5000/chat?activityId=${activityId}`, {
          accessTokenFactory: () => store.userStore.user?.token!,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      this.hubConnection
        .start()
        .catch((error) => console.log("error establishing connection:", error));

      this.hubConnection.on("LoadComments", (comments: ChatComment[]) => {
        runInAction(() => {
          comments.forEach((comment) => {
            comment.createdAt = new Date(comment.createdAt + "Z");
          });
          this.comments = comments;
        });
      });

      this.hubConnection.on("ReceiveComment", (comment: ChatComment) => {
        runInAction(() => {
          comment.createdAt = new Date(comment.createdAt);
          this.comments.push(comment);
        });
      });
    }
  };

  stopHubConnection = () => {
    this.hubConnection
      ?.stop()
      .catch((error) => console.log("error stopping connection:", error));
  };

  clearComments = () => {
    this.comments = [];
    this.stopHubConnection();
  };

  addComment = async (values: any) => {
    values.activityId = store.activityStore.selectedActivity?.id;

    try {
      await this.hubConnection?.invoke("SendComment", values);
    } catch (error) {
      console.log("error sending comment:", error);
    }
  };

  deleteComment = async (commentId: any) => {
    this.loading = true;

    try {
      await agent.Comments.deleteComment(commentId);

      runInAction(() => {
        this.comments = this.comments.filter((comment) => {
          return comment.id !== commentId;
        });
      });

      toast.success(
        `Comment was removed from ${store.activityStore.selectedActivity?.title}`
      );

      this.loading = false;
    } catch (error) {
      console.log("error deleting comment:", error);
    }
  };
}
