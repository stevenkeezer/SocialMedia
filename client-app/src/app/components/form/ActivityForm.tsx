import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStore } from "../../../stores/store";
import * as Yup from "yup";
import TextInput from "../../common/TextInput";
import TextArea from "../../common/TextArea";
import SelectInput from "../../common/SelectInput";
import DateInput from "../../common/DateInput";
import { useRouter } from "next/router";
import { Activity, ActivityFormValues } from "../../models/Activity";
import { v4 as uuid } from "uuid";
import TextInputLg from "../../common/TextInputLg";
import { categoryOptions } from "../../consts/categoryOptions";

export default observer(function ActivityForm() {
  const { activityStore, userStore } = useStore();
  const { user } = userStore;
  const {
    selectedActivity,
    loadActivity,
    createActivity,
    updateActivity,
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
    category: Yup.string(),
    description: Yup.string(),
    date: Yup.string().required("Date is required").nullable(),
    city: Yup.string(),
    venue: Yup.string(),
    isDraft: Yup.boolean().required("IsDraft is required"),
  });

  useEffect(() => {
    if ((id as string) && id !== "0") {
      loadActivity(id as string).then((activity) => {
        return setActivity(new ActivityFormValues(activity));
      });
    }
    if (!id) return () => clearSelectedActivity();
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

  const isHost = selectedActivity?.host.username === user?.username;

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
                    options={categoryOptions}
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
