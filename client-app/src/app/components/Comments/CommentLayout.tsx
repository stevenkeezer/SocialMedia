import { formatDistanceToNow } from "date-fns";
import React from "react";
import { classNames } from "../../utils/classNames";

export default function CommentLayout({
  avatar,
  username,
  createdAt,
  children,
  dropdown,
  icon,
}: any) {
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
              className="h-8 w-8 rounded-full flex items-center justify-center"
              src={avatar}
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm flex justify-between items-center">
              <div className="flex space-x-1.5 items-baseline">
                <div className="flex items-center">
                  <a className="font-medium dark:text-white capitalize">
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
