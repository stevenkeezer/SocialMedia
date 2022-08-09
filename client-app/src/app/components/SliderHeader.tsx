import {
  ArrowSmRightIcon,
  LinkIcon,
  MinusSmIcon,
} from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import { useStore } from "../../stores/store";
import ActionDropdown from "../common/ActionDropdown";
import AttendeesToolbar from "./activities/AttendeesToolbar";

export default observer(function SliderHeader({ activity }: any) {
  const { activityStore } = useStore();
  const router = useRouter();

  return (
    <div className="py-[.87rem] sm:pl-6 sm:pr-5 border-b border-[#edeae9] bg-white dark:border-[#424244] dark:bg-[#1e1f21] ">
      <div className="flex items-center justify-between">
        <AttendeesToolbar activity={activity} />

        <div className="h-7 flex items-center space-x-5">
          <LinkIcon className="h-[1.1rem] w-[1.1rem] text-[#6d6e6f]" />

          <ActionDropdown activity={activity} />

          <button
            type="button"
            className="text-[#6d6e6f] hover:text-gray-500"
            onClick={() => {
              activityStore.closeForm();
              // router.push("/list/0");
            }}
          >
            <span className="sr-only">Close panel</span>
            <div className="flex items-center -ml-2 space-x-[-0.90rem]">
              <ArrowSmRightIcon
                className="h-[1.4rem] w-[1.4rem]"
                aria-hidden="true"
              />
              <MinusSmIcon
                className="h-[1.4rem] w-[1.4rem] rotate-90"
                aria-hidden="true"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
});
