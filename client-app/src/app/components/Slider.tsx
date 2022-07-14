import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
  LinkIcon,
  PlusSmIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";
import ActivityForm from "./form/ActivityForm";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function Slider({
  cancelSelectedActivity,
  handleDeleteActivity,
  submitting,
}: any) {
  const { activityStore } = useStore();
  const { editMode } = activityStore;

  return (
    <Transition.Root show={editMode} as={Fragment}>
      <Dialog as="div" className="" onClose={() => {}}>
        <div className="fixed inset-y-0 right-0 mt-[4.45rem] max-w-[41.3rem] flex">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-400 sm:duration-[400ms]"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-400 sm:duration-[400ms]"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
            afterLeave={cancelSelectedActivity}
          >
            <div className="w-screen border-l bg-white border-gray-200">
              <ActivityForm />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
});
