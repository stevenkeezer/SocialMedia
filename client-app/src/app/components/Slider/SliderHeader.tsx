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
      className="text-[#6d6e6f]/80 hover:text-gray-500"
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
      <div className="flex items-center -ml-2 space-x-[-0.90rem]">
        <ArrowSmRightIcon
          className="h-[1.4rem] w-[1.4rem] text-[#6d6e6f]/80 dark:text-[#a2a0a2]"
          aria-hidden="true"
        />
        <MinusSmIcon
          className="h-[1.4rem] w-[1.4rem] rotate-90 text-[#6d6e6f]/80 dark:text-[#a2a0a2]"
          aria-hidden="true"
        />
      </div>
    </button>
  );

  return (
    <div className="py-[.87rem] sm:pl-6 sm:pr-5 border-b border-[#edeae9] bg-white dark:border-[#424244] dark:bg-[#1e1f21] ">
      <div className="flex items-center justify-between">
        <AttendeesToolbar activity={activity} />

        <div className="h-7 flex items-center space-x-5">
          <LinkIcon
            onClick={copyLinkHandler}
            className="h-[1.65rem] w-auto rounded hover:bg-gray-400/50 bg-transparent p-1 cursor-pointer -mr-1 text-[#6d6e6f]/80 dark:text-[#a2a0a2]"
          />
          <ActionDropdown activity={activity} />
          <SliderToggle />
        </div>
      </div>
    </div>
  );
});
