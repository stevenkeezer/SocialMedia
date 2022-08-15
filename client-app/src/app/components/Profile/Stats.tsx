import {
  CursorClickIcon,
  MailOpenIcon,
  UsersIcon,
} from "@heroicons/react/outline";

const stats = [
  {
    id: 1,
    name: "Total Events",
    stat: "71,897",
    icon: UsersIcon,
    change: "122",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Avg. Open Rate",
    stat: "58.16%",
    icon: MailOpenIcon,
    change: "5.4%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Followers",
    stat: "24.57%",
    icon: CursorClickIcon,
    change: "3.2%",
    changeType: "decrease",
  },
];

export default function Stats() {
  return (
    <div>
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative bg-white px-3.5 py-5 rounded-lg  dark:bg-[#2a2b2d] overflow-hidden border-[#edeae9] border dark:border-[#424244]"
          >
            <dt className="flex items-center">
              <div className="absolute bg-indigo-500 rounded-md p-1.5">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-12 text-sm font-medium text-gray-500 truncate">
                {item.name}
              </p>
            </dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
