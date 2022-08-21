import { User } from "./user";

export interface Profile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  following: boolean;
  photos?: Photo[];
  createdAt: Date;
}

export class Profile implements Profile {
  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
    this.createdAt = user.createdAt;
  }
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}

export interface ActivityPhoto {
  id: string;
  url: string;
  isMainActivityPhoto: boolean;
  createdAt: Date;
  fileName: string;
  size: string;
}

export interface UserActivity {
  id: string;
  title: string;
  category: string;
  date: Date;
  activityPhotos: ActivityPhoto[];
}
