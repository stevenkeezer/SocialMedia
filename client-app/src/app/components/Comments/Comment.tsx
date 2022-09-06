import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { useStore } from "../../../stores/store";
import CommentLayout from "./CommentLayout";

interface Props {
  avatar?: string;
  createdAt?: Date;
  username?: string;
  body?: string;
  id: string;
  dropdown?: any;
}

export default observer(function Comment({
  dropdown,
  avatar,
  createdAt,
  username,
  id,
  body,
}: Props) {
  const { commentStore } = useStore();
  const ref = useRef<HTMLDivElement>(null);

  const onSubmit = (e: any) => {
    e.preventDefault();
    commentStore.editComment(id, ref.current.innerText);
  };

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.innerText = body;
    }
  }, []);

  return (
    <CommentLayout
      dropdown={dropdown}
      avatar={avatar}
      createdAt={createdAt}
      username={username}
    >
      <div
        contentEditable
        ref={ref}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSubmit(e);
          }
          if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
          }
        }}
        className="text-sm text-gray-700 whitespace-pre-wrap dark:text-white"
      />
    </CommentLayout>
  );
});
