import { formatDistanceToNow } from "date-fns";
import { Form } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { useStore } from "../../../stores/store";
import Dropdown from "../../common/Dropdown";

export default observer(function Comment({ comment }: any) {
  const { commentStore } = useStore();

  const ref = useRef<HTMLDivElement>(null);

  const onSubmit = (e: any) => {
    e.preventDefault();
    commentStore.editComment(comment.id, ref.current.innerText);
  };

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.innerText = comment.body;
    }
  }, []);

  return (
    <li key={comment.id}>
      <div className="relative pb-3.5">
        <div className="relative flex items-start space-x-3">
          <div className="relative pt-1">
            <img
              className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center"
              src={comment.image}
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1 space-y-[0.15rem]">
            <div>
              <div className="text-sm flex justify-between items-center">
                <div className="flex space-x-2 items-baseline">
                  <a className="font-medium dark:text-white capitalize">
                    {comment.username}
                  </a>
                  <p className="text-xs text-[#a2a0a2]">
                    {formatDistanceToNow(comment?.createdAt)} ago
                  </p>
                </div>
                <Dropdown
                  data={comment}
                  buttonClass="hover:bg-gray-300 rounded-md py-1 px-1 flex items-center text-[#6d6e6f] dark:text-white dark:hover:bg-gray-600 focus:outline-none"
                >
                  <button
                    type="submit"
                    onClick={(e) => {
                      commentStore.deleteComment(comment.id);
                    }}
                  >
                    Delete comment
                  </button>
                  <br />
                  <button>Edit</button>
                </Dropdown>
              </div>
            </div>
            <div
              contentEditable
              ref={ref}
              // submit on enter
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSubmit(e);
                }
                if (e.key === "Enter" && e.shiftKey) {
                  e.preventDefault();
                }
              }}
              className="text-sm dark:text-white whitespace-pre-wrap text-gray-700"
            />
          </div>
        </div>
      </div>
    </li>
  );
});
