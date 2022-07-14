import { observer } from "mobx-react-lite";
import * as React from "react";
import { useStore } from "../../../stores/store";
import { List, arrayMove } from "../Table/ListConfig";

const Table: React.FC = ({
  activityClickHandler,
  setOpen,
  selectActivity,
}: any) => {
  const { activityStore } = useStore();

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    // keep track of the items order in the list and save them to localstorage
    // const items = localStorage.getItem("items");
    // if (items) {
    //   setItems(JSON.parse(items));
    // } else {
    setItems(activityStore.activities);
  }, [activityStore]);

  return (
    <List
      transitionDuration={0}
      values={items}
      onChange={({ oldIndex, newIndex }) =>
        setItems(arrayMove(items, oldIndex, newIndex))
      }
      renderList={({ children, props, isDragged }) => (
        <tbody className="bg-white divide-y divide-gray-200" {...props}>
          {children}
        </tbody>
      )}
      renderItem={({ value: activity, props, isDragged, isSelected }) => (
        <>
          {isDragged ? (
            <div {...props} key={activity.id}>
              <div className="border bg-white/90 shadow  w-72 py-2 px-4 text-xs rounded">
                {activity.title}
              </div>
            </div>
          ) : (
            <tr
              onClick={(e) => {
                activityStore.selectActivity(activity.id);
                setOpen(true), activityClickHandler(e, 1);
              }}
              className="cursor-pointer"
              style={{
                ...props.style,
                listStyleType: "none",
                cursor: isDragged ? "grabbing" : "grab",
                backgroundColor: isDragged || isSelected ? "#EEE" : "#FFF",
              }}
              {...props}
              key={activity.id}
            >
              <td className="max-w-0 border w-full active:bg-gray-100 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center">
                  <div aria-hidden="true" />
                  <div className="truncate py-2.5 hover:text-gray-600">
                    <span className="cursor-pointer text-sm">
                      <button
                        data-movable-handle
                        className="pr-3 pl-2"
                        style={{
                          cursor: isDragged ? "grabbing" : "grab",
                        }}
                        tabIndex={-1}
                      >
                        <svg
                          className="h-[.75rem] w-[.75rem] fill-current text-gray-600"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path d="M10,4c0,1.1-0.9,2-2,2S6,5.1,6,4s0.9-2,2-2S10,2.9,10,4z M16,2c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S17.1,2,16,2z M8,10 c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S9.1,10,8,10z M16,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S17.1,10,16,10z M8,18 c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S9.1,18,8,18z M16,18c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S17.1,18,16,18z"></path>
                        </svg>
                      </button>{" "}
                      {activity.title}{" "}
                      <span className="text-gray-500 font-normal">
                        in {activity.venue}
                      </span>
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-3 border text-sm text-gray-500 font-medium">
                <div className="flex items-center space-x-2">
                  <div className="flex flex-shrink-0 -space-x-1">
                    <img
                      className="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
                      src={
                        "data:image/jpeg;base64,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"
                      }
                      alt="a"
                    />

                    <img
                      className="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
                      src={
                        "data:image/jpeg;base64,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"
                      }
                      alt="a"
                    />
                  </div>
                </div>
              </td>
              <td className="hidden border md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                March 14, 2019
              </td>
              <td className="px-6 py-3 border whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                  Edit
                </a>
              </td>
            </tr>
          )}
        </>
      )}
    />
  );
};

export default observer(Table);
