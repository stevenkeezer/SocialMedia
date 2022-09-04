import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default observer(function EventTabs() {
  const { profileStore } = useStore();
  const { profile, loadUserActivities } = profileStore;
  const router = useRouter();

  let [categories] = useState({
    upcoming: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
    ],
    past: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
    ],
  });

  useEffect(() => {
    setSelectedIndex(0);
    loadUserActivities(profile?.username, "upcoming");
  }, [profile?.username, router]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="w-full">
      <Tab.Group
        selectedIndex={selectedIndex}
        onChange={(index) => {
          setSelectedIndex(index);
          index === 0
            ? loadUserActivities(profile?.username, "upcoming")
            : loadUserActivities(profile?.username, "past");
        }}
      >
        <Tab.List className="flex space-x-5 rounded-xl">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-auto text-sm capitalize font-medium pb-2 leading-5",
                  selected
                    ? " border-b-2 text-[#f5f4f3] border-[#a2a0a2]"
                    : "text-[#6d6e6f] hover:text-[#f5f4f3]"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
});
