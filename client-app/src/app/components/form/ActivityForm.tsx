import { Dialog } from "@headlessui/react";
import {
  XIcon,
  PlusSmIcon,
  LinkIcon,
  ArrowSmRightIcon,
  MinusSmIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline";
import {
  Formik,
  Field,
  Form,
  useField,
  useFormikContext,
  useFormik,
} from "formik";
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
import TextInputLg from "../../common/TextInputLg";

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
  const { activityStore, commentStore, userStore } = useStore();
  const { user } = userStore;
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
    venue: Yup.string(),
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

  const isHost = selectedActivity?.host.username === user.username;

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
            <fieldset disabled={!isHost}>
              <div className="flex-1">
                {/* Divider container */}

                <div className="sm:py-0 -space-y-[.08rem]">
                  <TextInputLg name="title" key="titleSidebar" />

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
                  <TextInput name="city" label="City" />
                  <TextInput name="venue" label="Location" />
                  <DateInput
                    disabled={!isHost}
                    name="date"
                    placeholderText="Date"
                    showTimeSelect
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
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
                  <TextArea rows={3} name="description" label="Description" />
                </div>
              </div>
            </fieldset>

            {isHost && (
              <div className="space-x-3 px-6 flex  justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting ? "submitting" : "Save"}
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
});
