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

          store.activityStore.selectedActivity!.commentCount++;
        });
      });

      this.hubConnection.on("ReceiveDelete", (commentId: any) => {
        runInAction(() => {
          this.comments = this.comments.filter(
            (c) => Number(commentId) !== Number(c.id)
          );

          const activity = store.activityStore.selectedActivity;
          if (activity) {
            activity.commentCount = activity.commentCount - 1;
          }
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
    const values = {} as any;
    const activityId = store.activityStore.selectedActivity?.id;
    values.commentId = commentId;

    try {
      await this.hubConnection?.invoke(
        "DeleteComment",
        String(commentId),
        activityId
      );

      toast.success(
        `Comment was removed from ${store.activityStore.selectedActivity?.title}`
      );

      this.loading = false;
    } catch (error) {
      console.log("error deleting comment:", error);
    }
  };

  editComment = async (values: any, body) => {
    this.loading = true;

    try {
      await agent.Comments.updateComment(values, body);

      runInAction(() => {
        this.comments = this.comments.map((comment) => {
          if (comment.id === values) {
            return { ...comment, body: body };
          } else {
            return comment;
          }
        });
      });

      this.loading = false;
    } catch (error) {
      console.log("error updating comment:", error);
    }
  };
}
