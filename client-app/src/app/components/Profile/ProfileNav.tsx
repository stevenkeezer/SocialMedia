import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import ProfileFollowings from "./ProfileFollowings";
import ProfileImages from "./ProfileImages";
import EventsList from "./EventsList";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { classNames } from "../../utils/classNames";

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
        <Tab.List className="flex px-[1.7rem] space-x-6 pt-2  dark:border-[#424244] bg-white dark:bg-transparent">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "py-2.5 w-auto text-sm border-b-2 leading-5 ",
                  " focus:outline-none font-medium focus:border-[#6296f1]",
                  selected
                    ? "dark:border-[#a2a0a2] dark:text-white"
                    : "text-[#6d6e6f] border-transparent hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <hr className="border-[#edeae9] dark:border-[#424244]" />

        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "bg-transparent px-2 py-3",
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
