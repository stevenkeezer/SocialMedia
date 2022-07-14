import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useStore } from "../../../stores/store";
import { format } from "date-fns";

export default observer(function ActivityList({ activity }: any) {
  const { activityStore } = useStore();
  const { selectActivity, openForm } = activityStore;

  const activityClickHandler = (event, arg) => {
    event.stopPropagation();
    if (arg !== 1) {
      activityStore.closeForm();
    }
  };
  return (
    <Link href={`/list/${activity.id}`}>
      <li
        className="border-none"
        key={activity.id}
        onClick={(e) => {
          selectActivity(activity.id);
          openForm(activity.id);
          activityClickHandler(e, 1);
        }}
      >
        <div className="block  group hover:bg-gray-100">
          <div className="px-4 flex justify-between border-t mx-6 py-1 sm:px-6">
            <div className="flex items-center justify-between">
              <button
                className="-ml-10 pr-10"
                data-movable-handle
                tabIndex={-1}
              >
                <div>
                  <svg
                    className="h-[.75rem] w-[.75rem] invisible group-hover:visible fill-current text-gray-600"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M10,4c0,1.1-0.9,2-2,2S6,5.1,6,4s0.9-2,2-2S10,2.9,10,4z M16,2c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S17.1,2,16,2z M8,10 c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S9.1,10,8,10z M16,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S17.1,10,16,10z M8,18 c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S9.1,18,8,18z M16,18c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S17.1,18,16,18z"></path>
                  </svg>
                </div>
              </button>

              <input
                value={activity?.title}
                type="text"
                name="title"
                id="project-name"
                className="border-transparent bg-transparent  hover:border-gray-300 ml-4 px-1.5 py-0.5 text-sm inline-block"
              />
              <div className="ml-2 flex-shrink-0 flex">
                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {activity.type}
                </p>
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <p>
                  <time dateTime={activity.closeDate}>
                    {format(activity.date!, "dd MMM yyyy hh:mm aa")}
                  </time>
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
});
