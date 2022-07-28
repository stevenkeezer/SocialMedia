import { Fragment } from "react";
import { ChatAltIcon, TagIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";
import Dropdown from "../../common/Dropdown";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default observer(function CommentList() {
  const { commentStore } = useStore();
  const router = useRouter();

  return (
    <div className="flow-root pt-3.5">
      <ul role="list" className="px-6">
        {commentStore?.comments.map((comment, commentItemIdx) => (
          <li key={comment.id}>
            <div className="relative pb-8">
              <div className="relative flex items-center space-x-3">
                <div className="relative">
                  <img
                    className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-1 ring-white"
                    src={comment.image}
                    alt=""
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm flex justify-between">
                      <div className="flex space-x-2 items-center">
                        <a className="font-medium text-white">
                          {comment.username}
                        </a>
                        <p className="mt-0.5 text-xs text-gray-500">
                          {formatDistanceToNow(comment?.createdAt)} ago
                        </p>
                      </div>
                      <Dropdown data={comment} />
                    </div>
                  </div>
                  <div className="text-sm dark:text-white text-gray-700">
                    <p>{comment.body}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});
