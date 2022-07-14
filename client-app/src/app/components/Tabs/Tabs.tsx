import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// set state with current tab

export default function Tabs() {
  const router = useRouter();
  const { asPath } = router;

  const tabs = [
    { name: "List", href: "/list", current: asPath == "/list" },
    { name: "Board", href: "#", current: false },
    { name: "Calendar", href: "/calendar", current: asPath == "/calendar" },
    { name: "Files", href: "#", current: false },
  ];
  const [currentTab, setCurrentTab] = useState(tabs[0]);

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
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-gray-200">
          <nav className="-mb-px flex space-x-4" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                aria-current={tab.current ? "page" : undefined}
              >
                <span
                  className={classNames(
                    tab.current
                      ? "border-gray-500 text-gray-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "whitespace-nowrap py-2 px-1 border-b-2 cursor-pointer font-medium text-sm"
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
}
