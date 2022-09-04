import { Dialog, Transition } from "@headlessui/react";
import { ViewListIcon, XIcon } from "@heroicons/react/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { ClockIcon, HomeIcon, MenuAlt1Icon } from "@heroicons/react/outline";
import { Fragment, useState } from "react";
import ActivityHeader from "../components/Activities/ActivityHeader";
import Slider from "../components/Slider/Slider";
import { useRouter } from "next/router";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import PhotoViewer from "../common/PhotoViewer/PhotoViewer";
import { classNames } from "../utils/classNames";
import { categoryColors } from "../consts/categoryOptions";
import Modal from "../common/Modal/Modal";
import ThemeSelector from "./ThemeSelector";
import Link from "next/link";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { commonStore, activityStore } = useStore();
  const { photoViewer, modalType } = commonStore;
  const { setPredicate } = activityStore;
  const router = useRouter();

  const navigation = [
    {
      name: "Home",
      href: "/0/home",
      icon: HomeIcon,
      current: router.pathname === "/home",
    },
    {
      name: "Events",
      href: "/0/list/0",
      icon: ViewListIcon,
      current:
        router.pathname === "/list/0" || router.pathname === "/list/[id]",
    },
    { name: "Diagnoser", href: "#", icon: ClockIcon, current: false },
  ];

  return (
    <div className="min-h-full relative min-w-[1100px]">
      {photoViewer && <PhotoViewer />}
      {modalType === "accessibility" && (
        <Modal title="Accessibility">
          <ThemeSelector />
        </Modal>
      )}

      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
                  alt="Growlab"
                />
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2">
                  <div className="mt-8">
                    <h3
                      className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      id="mobile-teams-headline"
                    >
                      Teams
                    </h3>
                    <div
                      className="mt-1 space-y-1"
                      role="group"
                      aria-labelledby="mobile-teams-headline"
                    >
                      {Object.keys(categoryColors).map((key) => (
                        <a
                          key={key}
                          href={`#${key}`}
                          className={classNames(
                            "text-base leading-6 font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50",
                            "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                          )}
                        >
                          <span className="mr-3 flex-shrink-0 h-6 w-6">
                            <span
                              className={classNames(
                                "h-6 w-6 inline-flex items-center justify-center rounded-full",
                                categoryColors[key]
                              )}
                            >
                              <span className="text-white">{key}</span>
                            </span>
                          </span>
                          {key}
                        </a>
                      ))}
                      {categoryColors}
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden xl:flex lg:flex-col lg:w-[15rem] lg:fixed lg:inset-y-0 lg:border-r lg:border-transparent lg:pt-5 lg:pb-4 dark:lg:bg-[#2e2e30]  lg:bg-[#1e1f21]">
        <div className="flex items-center flex-shrink-0 px-6">
          <img
            src="https://media.istockphoto.com/vectors/gardening-tools-and-plants-in-the-garden-vector-id1268196717?k=20&m=1268196717&s=612x612&w=0&h=RBA2SisPRx6OIeouAQ2R7I78eiazDS2gvGPr17mHvy4="
            className="h-8 w-8 mr-3 rounded-full shadow"
            alt="Growlab"
          />

          <h1 className="text-white text-xl font-snycopate">GrowLab</h1>
        </div>

        <div className="h-0 flex-1 flex flex-col overflow-y-auto">
          <nav className="px-0 mt-9">
            <div className="border-b pb-4 border-[#424244] dark:border-[#424244]">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                >
                  <div
                    className={classNames(
                      item.current
                        ? "bg-gray-700/80 text-white dark:bg-[#505051]"
                        : "text-white hover:text-white hover:bg-[#3e3e40]",
                      "group flex items-center px-6 py-1.5 text-sm font-medium"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-2 flex-shrink-0 h-5 w-5"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 border-b pb-6 border-[#424244] dark:border-[#424244]">
              {/* Secondary navigation */}
              <div className="flex items-center justify-between pr-5">
                <h3
                  className="px-6 text-sm font-semibold text-[#a2a0a2]"
                  id="desktop-teams-headline"
                >
                  Category
                </h3>
                <div
                  className="text-blue-500 cursor-pointer text-sm"
                  onClick={() => setPredicate("all", "true")}
                >
                  Reset
                </div>
              </div>
              <div
                className="mt-2 px-4 -space-y-1"
                role="group"
                aria-labelledby="desktop-teams-headline"
              >
                {Object.keys(categoryColors).map((key) => (
                  <div
                    key={key}
                    onClick={() => {
                      setPredicate("category", key);
                    }}
                    className="group flex items-center px-3 py-2 text-sm text-white rounded-md hover:text-gray-900 hover:bg-gray-50"
                  >
                    <span className="flex-shrink-0 mr-[0.6rem]">
                      <span
                        className={classNames(
                          "w-2 h-2 inline-flex items-center justify-center rounded-full",
                          categoryColors[key]
                        )}
                      />
                    </span>
                    <span className="truncate">{key}</span>
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </div>
        <div className="border-t text-white border-[#424244] dark:border-[#424244]">
          <div className="px-6 pt-4 text-sm flex items-center space-x-2">
            <div className="bg-white rounded-full">
              <QuestionMarkCircleIcon className="w-5 h-5 text-indigo-500" />
            </div>
            <span>Help & getting started</span>
          </div>
        </div>
      </div>
      {/* Main column */}
      <main className="xl:pl-[15rem] flex flex-col h-screen">
        <button
          type="button"
          className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
        </button>

        <ActivityHeader />

        {children}
      </main>

      <Slider />
    </div>
  );
}

export default observer(Layout);
