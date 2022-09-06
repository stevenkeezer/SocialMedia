import {
  ArrowSmRightIcon,
  LinkIcon,
  MinusSmIcon,
} from "@heroicons/react/outline";
import React from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { Activity } from "../../models/Activity";
import { useStore } from "../../../stores/store";
import AttendeesToolbar from "../Activities/AttendeesToolbar";
import ActionDropdown from "../../common/ActionDropdown";
import { toast } from "react-toastify";
import styles from "./styles.module.css";
import { classNames } from "../../utils/classNames";

interface Props {
  activity: Activity;
}

export default observer(function SliderHeader({ activity }: Props) {
  const { activityStore } = useStore();
  const router = useRouter();

  const copyLinkHandler = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("This task link was copied to your clipboard.");
  };

  const SliderToggle = () => (
    <button
      type="button"
      className="w-6"
      onClick={() => {
        activityStore.closeForm();
        if (router.pathname === "/0/list/[id]") {
          setTimeout(() => {
            router.push("/0/list/0");
          }, 400);
        }
      }}
    >
      <span className="sr-only">Close panel</span>
      <div className="flex items-center -ml-2.5 pl-0.5 group rounded-md space-x-[-0.90rem] py-1 button-hover">
        <ArrowSmRightIcon
          className="h-[1.4rem] w-[1.4rem] dark:group-hover:text-[#f5f4f3] text-[#6d6e6f]/80 dark:text-[#a2a0a2]"
          aria-hidden="true"
        />
        <MinusSmIcon
          className="h-[1.4rem] w-[1.4rem] rotate-90 dark:group-hover:text-[#f5f4f3] text-[#6d6e6f]/80 dark:text-[#a2a0a2]"
          aria-hidden="true"
        />
      </div>
    </button>
  );

  return (
    <div className="py-[.87rem] sm:pl-6 sm:pr-5 border-b border-[#edeae9] bg-white dark:border-[#424244] dark:bg-[#1e1f21] ">
      <div className="flex items-center justify-between">
        <AttendeesToolbar activity={activity} />

        <div className="flex items-center space-x-5 h-7">
          <LinkIcon
            onClick={copyLinkHandler}
            className={classNames(
              "button-hover rounded-lg",
              "h-[1.85rem] w-auto rounded-md bg-transparent p-1.5 cursor-pointer -mr-3.5 text-[#6d6e6f]/80 dark:text-[#a2a0a2]"
            )}
          />
          <ActionDropdown activity={activity} styles={styles} />
          <SliderToggle />
        </div>
      </div>
    </div>
  );
});
