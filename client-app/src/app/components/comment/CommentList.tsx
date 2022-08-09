import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import Comment from "./Comment";

export default observer(function CommentList() {
  const { commentStore } = useStore();

  return (
    <div className="flow-root pt-3">
      <ul role="list" className="px-6">
        {commentStore?.comments.map((comment) => (
          <Comment
            id={comment.id}
            comment={comment}
            body={comment.body}
            avatar={comment.image}
            username={comment.username}
            createdAt={comment.createdAt}
          />
        ))}
      </ul>
    </div>
  );
});
