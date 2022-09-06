import { formatDistanceToNow } from "date-fns";
import React from "react";
import { classNames } from "../../utils/classNames";

interface Props {
  avatar: string;
  username: string;
  createdAt: Date;
  dropdown?: any;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function CommentLayout({
  avatar,
  username,
  createdAt,
  children,
  dropdown,
  icon,
}: Props) {
  return (
    <li className="list-none">
      <div className="relative pb-3.5">
        <div
          className={classNames(
            children ? "items-start" : "items-center",
            "relative flex space-x-2"
          )}
        >
          <div className="relative pt-1">
            <img
              className="flex items-center justify-center w-8 h-8 rounded-full"
              src={avatar}
              alt=""
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between text-sm">
              <div className="flex space-x-1.5 items-baseline">
                <div className="flex items-center">
                  <a className="font-medium capitalize dark:text-white">
                    {username}
                  </a>
                  {icon}
                </div>
                <p className="text-xs text-[#6d6e6f] pl-0.5 font-normal dark:text-[#a2a0a2]">
                  {formatDistanceToNow(createdAt)} ago
                </p>
              </div>
              {dropdown}
            </div>

            {children}
          </div>
        </div>
      </div>
    </li>
  );
}
