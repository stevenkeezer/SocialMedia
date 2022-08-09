import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useStore } from "../../../stores/store";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default observer(function Tabs({ tabs }: any) {
  const { activityStore } = useStore();

  const router = useRouter();
  const { asPath, pathname } = router;

  const selectedTabs = tabs || [
    {
      name: "List",
      href: "/list",
      current: asPath === "/list" || pathname === "/list/[id]",
    },
    { name: "Board", href: "#", current: false },
    { name: "Calendar", href: "/calendar", current: asPath == "/calendar" },
    { name: "Files", href: "/files", current: asPath == "/files" },
  ];

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          defaultValue={"List"}
        >
          {selectedTabs.map((tab) => (
            <option key={tab.name} className="tracking-tight">
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-gray-200">
          <nav className="-mb-px flex space-x-[1.55rem]" aria-label="Tabs">
            {selectedTabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                aria-current={tab.current ? "page" : undefined}
              >
                <span
                  onClick={() => {
                    activityStore.closeForm();
                  }}
                  className={classNames(
                    tab.current
                      ? "border-gray-500 text-[#1e1f21] dark:text-white dark:border-[#a2a0a2]"
                      : "border-transparent text-[#6d6e6f] hover:text-gray-700 hover:border-gray-300 dark:text-gray-400",
                    "whitespace-nowrap py-1.5 border-b-2 cursor-pointer font-semibold text-sm tracking-tight"
                  )}
                >
                  {tab.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
});
