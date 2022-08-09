import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import ProfileFollowings from "./ProfileFollowings";
import ProfileImages from "./ProfileImages";
import EventsList from "./EventsList";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default observer(function ProfileNav() {
  const { profileStore } = useStore();
  const { activeTab, setActiveTab } = profileStore;

  let [categories] = useState({
    Events: <EventsList />,
    Photos: <ProfileImages />,
    Community: <ProfileFollowings />,
  });

  useEffect(() => {
    return () => {
      setActiveTab(0);
    };
  }, [setActiveTab]);

  return (
    <div className="w-full">
      <Tab.Group
        onChange={(index) => {
          setActiveTab(index);
        }}
      >
        <Tab.List className="flex px-6 border-b border-[#edeae9] dark:border-[#424244] bg-white dark:bg-transparent">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm border-b-2 font-medium leading-5 dark:text-white",
                  " focus:outline-none focus:border-[#6296f1]",
                  selected
                    ? "dark:border-[#a2a0a2]"
                    : "text-gray-500 hover:bg-white/[0.12] border-transparent hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "bg-transparent p-3",
                " focus:outline-none"
              )}
            >
              <ul>{posts}</ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
});
