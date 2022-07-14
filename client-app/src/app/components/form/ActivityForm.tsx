import { Dialog } from "@headlessui/react";
import {
  XIcon,
  PlusSmIcon,
  LinkIcon,
  ArrowSmRightIcon,
  MinusSmIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStore } from "../../../stores/store";
import * as Yup from "yup";
import TextInput from "../../common/TextInput";
import TextArea from "../../common/TextArea";
import SelectInput from "../../common/SelectInput";
import ActionDropdown from "../../common/ActionDropdown";
import DateInput from "../../common/DateInput";
import { useRouter } from "next/router";
import { Activity } from "../activities/Activity";
import { v4 as uuid } from "uuid";
import Link from "next/link";

const user = {
  name: "Whitney Francis",
  email: "whitney@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
};

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    selectedActivity,
    loading,
    loadActivity,
    createActivity,
    updateActivity,
    openForm,
  } = activityStore;

  const router = useRouter();
  const { query } = router;
  const { id } = query;

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    date: Yup.string().required("Date is required").nullable(),
    city: Yup.string().required("City is required"),
    venue: Yup.string().required("Venue is required"),
  });

  useEffect(() => {
    if (id as string) {
      loadActivity(id as string).then((activity) => {
        return setActivity(activity!);
      });
    }
  }, [id, loadActivity]);

  function handleFormSubmit(activity: Activity) {
    console.log(activity, "activity.id");
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity).then(() =>
        router.push(`/list/${newActivity.id}`)
      );
    } else {
      updateActivity(activity).then(() => router.push(`/list/${activity.id}`));
    }
  }

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={activity}
      onSubmit={(values) => handleFormSubmit(values)}
    >
      {({ handleSubmit, values: activity }) => (
        <Form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="h-full flex flex-col"
        >
          <div className="px-4 py-3 sm:px-6 border-b">
            <div className="flex items-start justify-between space-x-3">
              <button className="border text-xs rounded-md px-2 py-1">
                Mark complete
              </button>
              <div className="h-7 flex items-center">
                <ActionDropdown activity={activity} />
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => activityStore.closeForm()}
                >
                  <span className="sr-only">Close panel</span>
                  <div className="flex items-center space-x-[-0.95rem]">
                    <ArrowSmRightIcon className="h-6 w-6" aria-hidden="true" />
                    <MinusSmIcon
                      className="h-6 w-6 rotate-90"
                      aria-hidden="true"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* Divider container */}
            <div className="py-6 space-y-1 h-full sm:py-0 sm:space-y-0">
              <div className="space-y-1 py-4 px-6">
                <Dialog.Title className="text-xl font-medium text-gray-900">
                  {activity?.title}
                </Dialog.Title>
                {/* {!activity.id && (
                  <p className="text-sm text-gray-500">
                    Get started by filling in the information below to create
                    your new project.
                  </p>
                )} */}
              </div>
              <TextInput name="title" label="Project name" />
              <TextInput name="category" label="Category" />

              {/* <SelectInput
                options={[
                  {
                    id: 1,
                    name: "Test 1",
                    avatar: "https://picsum.photos/201",
                  },
                  {
                    id: 2,
                    name: "Test 2",
                    avatar: "https://picsum.photos/202",
                  },
                  {
                    id: 3,
                    name: "Test 3",
                    avatar: "https://picsum.photos/203",
                  },
                ]}
                name="category"
                label="Category"
              /> */}
              <DateInput
                name="date"
                placeholderText="Date"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              <TextInput name="city" label="City" />
              <TextInput name="venue" label="Venue" />
              <TextArea rows={3} name="description" label="Description" />
            </div>
          </div>

          <div className="flex-shrink-0 border-t bg-white border-gray-200 pb-3">
            <div className="bg-gray-50 px-4 py-3 sm:px-6">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.imageUrl}
                    alt=""
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <form action="#">
                    <div>
                      <label htmlFor="comment" className="sr-only">
                        About
                      </label>
                      <textarea
                        id="comment"
                        name="comment"
                        rows={3}
                        className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Ask a question or post and update..."
                        defaultValue={""}
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <a
                        href="#"
                        className="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900"
                      >
                        <QuestionMarkCircleIcon
                          className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span>Some HTML is okay.</span>
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="space-x-3 px-6 flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "submitting" : "Save"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
});
