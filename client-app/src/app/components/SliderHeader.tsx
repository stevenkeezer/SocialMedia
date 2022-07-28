import { ArrowSmRightIcon, MinusSmIcon } from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { useStore } from "../../stores/store";
import ActionDropdown from "../common/ActionDropdown";
import AttendeesToolbar from "./activities/AttendeesToolbar";

export default observer(function SliderHeader({ activity }: any) {
  const { activityStore } = useStore();

  return (
    <div className="py-[.85rem] sm:px-6 border-b dark:border-[#424244] ">
      <div className="flex items-start justify-between space-x-3">
        <AttendeesToolbar activity={activity} />

        <div className="h-7 flex items-center">
          <ActionDropdown activity={activity} />

          <button
            type="button"
            className="text-gray-400 hover:text-gray-500"
            onClick={() => {
              activityStore.closeForm();
            }}
          >
            <span className="sr-only">Close panel</span>
            <div className="flex items-center space-x-[-0.95rem]">
              <ArrowSmRightIcon className="h-6 w-6" aria-hidden="true" />
              <MinusSmIcon className="h-6 w-6 rotate-90" aria-hidden="true" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
});
