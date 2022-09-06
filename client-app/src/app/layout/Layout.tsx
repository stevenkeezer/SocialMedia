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
  const { setPredicate, closeForm } = activityStore;
  const router = useRouter();

  const navigation = [
    {
      name: "Home",
      href: "/0/home",
      icon: HomeIcon,
      current: router.pathname === "/0/home",
    },
    {
      name: "Events",
      href: "/0/list/0",
      icon: ViewListIcon,
      current:
        router.pathname === "/0/list/0" || router.pathname === "/0/list/[id]",
    },
    { name: "Diagnoser", href: "#", icon: ClockIcon, current: false },
  ];

  const TransitionElement = () => (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 flex lg:hidden"
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
          <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 pt-2 -mr-12">
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );

  const CategoryNavigation = () => (
    <div className="mt-6 border-b pb-6 border-[#424244] dark:border-[#424244]">
      <div className="flex items-center justify-between pr-5">
        <h3
          className="px-6 text-sm font-semibold text-[#a2a0a2]"
          id="desktop-teams-headline"
        >
          Category
        </h3>
      </div>
      <div
        className="px-4 mt-2 -space-y-1"
        role="group"
        aria-labelledby="desktop-teams-headline"
      >
        {Object.keys(categoryColors).map((key) => (
          <div
            key={key}
            onClick={() => {
              setPredicate("category", key);
            }}
            className="group cursor-pointer flex items-center px-3 py-2 text-sm text-[#f5f4f3] rounded-md hover:bg-[#3e3e40]"
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
  );

  const SidebarNavigation = () => (
    <div className="flex flex-col flex-1 h-0 overflow-y-auto">
      <nav className="px-0 mt-9">
        <div
          onClick={() => closeForm()}
          className="border-b pb-4 border-[#424244] dark:border-[#424244]"
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-current={item.current ? "page" : undefined}
            >
              <div
                className={classNames(
                  item.current
                    ? "bg-gray-700/80 text-[#f5f4f3] dark:bg-[#505051]"
                    : "text-[#f5f4f3] hover:text-white hover:bg-[#3e3e40]",
                  "group flex items-center px-6 py-1.5 cursor-pointer text-sm font-medium"
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
        <CategoryNavigation />
      </nav>
    </div>
  );

  const Sidebar = () => (
    <div className="hidden xl:flex lg:flex-col lg:w-[15rem] lg:fixed lg:inset-y-0 lg:border-r lg:border-transparent lg:pt-5 lg:pb-4 dark:lg:bg-[#2e2e30]  lg:bg-[#1e1f21]">
      <div className="flex items-center flex-shrink-0 px-6">
        <img
          src="https://media.istockphoto.com/vectors/gardening-tools-and-plants-in-the-garden-vector-id1268196717?k=20&m=1268196717&s=612x612&w=0&h=RBA2SisPRx6OIeouAQ2R7I78eiazDS2gvGPr17mHvy4="
          className="w-8 h-8 mr-3 rounded-full shadow"
          alt="Growlab"
        />
        <h1 className="text-xl text-white font-snycopate">GrowLab</h1>
      </div>

      <SidebarNavigation />
      <div className="border-t text-[#f5f4f3] border-[#424244] dark:border-[#424244]">
        <div className="flex items-center px-6 pt-4 space-x-2 text-sm">
          <div className="bg-white rounded-full">
            <QuestionMarkCircleIcon className="w-5 h-5 text-indigo-500" />
          </div>
          <span>Help & getting started</span>
        </div>
      </div>
    </div>
  );

  const MenuButton = () => (
    <button
      type="button"
      className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
      onClick={() => setSidebarOpen(true)}
    >
      <span className="sr-only">Open sidebar</span>
      <MenuAlt1Icon className="w-6 h-6" aria-hidden="true" />
    </button>
  );

  return (
    <div className="min-h-full relative min-w-[1100px]">
      {photoViewer && <PhotoViewer />}
      {modalType === "accessibility" && (
        <Modal title="Accessibility">
          <ThemeSelector />
        </Modal>
      )}
      <TransitionElement />
      <Sidebar />

      <main className="xl:pl-[15rem] flex flex-col h-screen">
        <MenuButton />
        <ActivityHeader />
        {children}
      </main>

      <Slider />
    </div>
  );
}

export default observer(Layout);
