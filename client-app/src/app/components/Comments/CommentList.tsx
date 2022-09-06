import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import Comment from "./Comment";
import Dropdown from "../../common/Dropdown/Dropdown";

export default observer(function CommentList() {
  const { commentStore } = useStore();

  const DropdownElement = ({ comment, position, originTopRight }: any) => (
    <Dropdown
      data={comment}
      buttonClass="hover:bg-gray-300 rounded-md py-1 px-1 flex items-center text-[#6d6e6f] dark:text-white dark:hover:bg-gray-600 focus:outline-none"
      originTopRight={originTopRight}
      position={position}
      buttons={[
        <button className="dropdown-item">Edit</button>,
        <button
          type="submit"
          className="dropdown-item text-[#e26d7e] "
          onClick={(e) => {
            commentStore.deleteComment(comment.id);
          }}
        >
          Delete comment
        </button>,
      ]}
    />
  );

  return (
    <div className="flow-root pt-2">
      <ul role="list">
        {commentStore?.comments.map((comment, index) => (
          <Comment
            key={comment.id}
            id={comment.id}
            body={comment.body}
            avatar={comment.image}
            username={comment.username}
            createdAt={comment.createdAt}
            dropdown={
              <DropdownElement
                comment={comment}
                originTopRight={
                  index === commentStore.comments.length - 1 && true
                }
                position="bottom-[1.7rem] right-0"
              />
            }
          />
        ))}
      </ul>
    </div>
  );
});
