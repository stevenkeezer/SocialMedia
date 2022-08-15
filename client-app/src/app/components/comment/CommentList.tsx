import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import Comment from "./Comment";
import Dropdown from "../../common/Dropdown";

export default observer(function CommentList() {
  const { commentStore } = useStore();

  const DropdownElement = ({ comment }: any) => (
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
  );

  return (
    <div className="flow-root pt-2">
      <ul role="list">
        {commentStore?.comments.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            body={comment.body}
            avatar={comment.image}
            username={comment.username}
            createdAt={comment.createdAt}
            dropdown={<DropdownElement comment={comment} />}
          />
        ))}
      </ul>
    </div>
  );
});
