import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";

export default observer(function ProfileStats() {
  const { profileStore } = useStore();
  const { activitiesCount } = profileStore;

  let stats = [
    {
      id: 1,
      name: "Total Events",
      count: activitiesCount["all"],
    },
    {
      id: 2,
      name: "Upcoming Events",
      count: activitiesCount["upcoming"],
    },
    {
      id: 3,
      name: "Past Events",
      count: activitiesCount["past"],
    },
  ];

  return (
    <div>
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative bg-white px-3.5 py-4 h-[6.5rem] rounded-lg  dark:bg-[#2a2b2d] overflow-hidden border-[#edeae9] border dark:border-[#424244]"
          >
            <dt className="flex items-center space-y-2 flex-col justify-center">
              <p className="truncate">{item.name}</p>
              <div className="text-3xl">{item.count}</div>
            </dt>
          </div>
        ))}
      </dl>
    </div>
  );
});
