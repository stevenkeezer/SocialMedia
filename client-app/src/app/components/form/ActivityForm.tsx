import { Dialog } from "@headlessui/react";
import {
  XIcon,
  PlusSmIcon,
  LinkIcon,
  ArrowSmRightIcon,
  MinusSmIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline";
import { Formik, Field, Form, useField, useFormikContext } from "formik";
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
import { Activity, ActivityFormValues } from "../activities/Activity";
import { v4 as uuid } from "uuid";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import FieldInput from "../../common/FileInput";
import FileInput from "../../common/FileInput";

const user = {
  name: "Whitney Francis",
  email: "whitney@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
};

// const MyField = (props) => {
//   const {
//     values: { textA, textB },
//     touched,
//     setFieldValue,
//   } = useFormikContext();
//   const [field, meta] = useField(props);

//   React.useEffect(() => {
//     // set the value of textC, based on textA and textB
//     if (
//       textA.trim() !== "" &&
//       textB.trim() !== "" &&
//       touched.title &&
//       touched.textB
//     ) {
//       setFieldValue(props.name, `title: ${title}, textB: ${textB}`);
//     }
//   }, [textB, title, touched.title, touched.textB, setFieldValue, props.name]);

//   return (
//     <>
//       <input {...props} {...field} />
//       {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
//     </>
//   );
// };

// const MyField2 = (props) => {
//   const {
//     values: { title, textB },
//     touched,
//     setFieldValue,
//   } = useFormikContext();
//   const [field, meta] = useField(props);

//   React.useEffect(() => {
//     // set the value of textC, based on title and textB
//     if (
//       title.trim() !== "" &&
//       textB.trim() !== "" &&
//       touched.title &&
//       touched.textB
//     ) {
//       setFieldValue(props.name, `title: ${title}, textB: ${textB}`);
//     }
//   }, [textB, title, touched.title, touched.textB, setFieldValue, props.name]);

//   return (
//     <>
//       <input {...props} {...field} />
//       {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
//     </>
//   );
// };

export default observer(function ActivityForm() {
  const { activityStore, commentStore } = useStore();
  const {
    selectedActivity,
    loading,
    loadActivity,
    createActivity,
    updateActivity,
    openForm,
    updateAttendance,
    clearSelectedActivity,
  } = activityStore;

  const router = useRouter();
  const { query } = router;
  const { id } = query;

  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    date: Yup.string().required("Date is required").nullable(),
    city: Yup.string().required("City is required"),
    venue: Yup.string().required("Venue is required"),
    isDraft: Yup.boolean().required("IsDraft is required"),
  });

  useEffect(() => {
    if (id as string) {
      loadActivity(id as string).then((activity) => {
        return setActivity(new ActivityFormValues(activity));
      });
    }
    return () => clearSelectedActivity();
  }, [id, loadActivity, clearSelectedActivity]);

  function handleFormSubmit(activity: ActivityFormValues, setSubmitting: any) {
    if (!activity.id) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity).then(() => {
        router.push(`/list/${newActivity.id}`, undefined, { scroll: false });
        setSubmitting(false);
      });
    } else {
      updateActivity({ ...activity, isDraft: false }).then(() => {
        router.push(`/list/${activity.id}`, undefined, { scroll: false });
        setSubmitting(false);
      });
    }
  }

  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values, { setSubmitting }) =>
          handleFormSubmit(values, setSubmitting)
        }
      >
        {({
          handleSubmit,
          values: activity,
          isSubmitting,
          submitForm,
          setFieldValue,
          handleChange,
        }) => (
          <Form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="h-full flex flex-col"
          >
            <div className="flex-1 overflow-y-auto">
              {/* Divider container */}

              <div className="py-6 space-y-1 h-full sm:py-0 sm:space-y-0">
                <div className="space-y-1 py-4 px-6">
                  <div className="text-xl font-medium text-gray-900 dark:text-white">
                    {activity?.title}
                  </div>
                  {/* {!activity.id && (
                  <p className="text-sm text-gray-500">
                    Get started by filling in the information below to create
                    your new project.
                  </p>
                )} */}
                </div>
                {/* <input
                name="title"
                style={{ textRendering: "optimizeSpeed" }}
                value={activity.title}
                onChange={(e) => {
                  handleChange(e);
                  // setTimeout(submitForm, 100);
                  // const inputChanged = (e) => {
                  // setInputValue(e.target.value)

                  clearTimeout(timer);

                  const newTimer = setTimeout(() => {
                    submitForm();
                  }, 200);

                  setTimer(newTimer);
                  // };
                }}
              /> */}
                <TextInput
                  name="title"
                  label="Project name"
                  key="titleSidebar"
                />
                {/* <TextInput name="category" label="Category" /> */}

                <SelectInput
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
                />
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
            <div className="space-x-3 px-6 flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSubmitting ? "submitting" : "Save"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
});
