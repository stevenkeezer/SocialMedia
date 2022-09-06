import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import ProfileFollowings from "./ProfileFollowings";
import ProfileImages from "./ProfileImages";
import EventsList from "./EventsList";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { classNames } from "../../utils/classNames";
import { useTheme } from "next-themes";
import styles from "../Slider/styles.module.css";
import Skeleton from "../Slider/Skeleton";

interface Props {
  loadingProfile: boolean;
}

export default observer(function ProfileNav({ loadingProfile }: Props) {
  const { profileStore } = useStore();
  const { setActiveTab, activeTab } = profileStore;

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

  const { resolvedTheme } = useTheme();
  const lightMode = resolvedTheme === "light";
  const skeleton = lightMode ? styles.skeleton : styles.skeletonDark;

  return (
    <div className="w-full">
      <Tab.Group
        defaultIndex={0}
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
                  " focus:outline-none font-medium",
                  selected
                    ? "border-gray-500 text-[#1e1f21] dark:text-white dark:border-[#a2a0a2]"
                    : "border-transparent text-[#6d6e6f] hover:text-gray-700 hover:border-gray-300 dark:text-[#a2a0a2]"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <hr className="border-[#edeae9] dark:border-[#424244]" />

        {loadingProfile && <Skeleton skeleton={skeleton} />}
        <Tab.Panels
          className={classNames(
            "mt-2",
            loadingProfile ? "invisible" : "visible"
          )}
        >
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
