import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStore } from "../../../stores/store";
import * as Yup from "yup";
import TextArea from "../../common/Forms/TextArea";
import { useRouter } from "next/router";
import { ActivityFormValues } from "../../models/Activity";
import { v4 as uuid } from "uuid";
import { categoryOptions } from "../../consts/categoryOptions";
import { AutoSave } from "./AutoSave";
import TextInput from "../../common/Forms/TextInput";
import TextInputLg from "../../common/Forms/TextInputLg";
import DateInput from "../../common/Forms/DateInput";
import SelectInput from "../../common/Forms/SelectInput";

export default observer(function ActivityForm() {
  const { activityStore, userStore } = useStore();
  const { user } = userStore;
  const {
    selectedActivity,
    loadActivity,
    createActivity,
    updateActivity,
    clearSelectedActivity,
    loadingActivity,
  } = activityStore;

  const router = useRouter();
  const { query } = router;
  const { id } = query;

  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );

  const validationSchema = Yup.object().shape({
    title: Yup.string(),
    category: Yup.string(),
    description: Yup.string(),
    date: Yup.string().nullable(),
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

  function handleFormSubmit(activity: ActivityFormValues) {
    if (!activity.id) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity).then(() => {
        router.push(`/list/${newActivity.id}`, undefined, { scroll: false });
      });
    } else {
      updateActivity({ ...activity, isDraft: false });
    }
  }

  const isHost = selectedActivity?.host.username === user?.username;

  return (
    <div className="min-h-[20rem]">
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="flex flex-col h-full"
          >
            <fieldset disabled={!isHost}>
              <div className="flex-1">
                <div className="sm:py-0 space-y-[0.03rem]">
                  <TextInputLg name="title" key="titleSidebar" />
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

            {!loadingActivity && isHost && (
              <AutoSave loadingActivity={loadingActivity} />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
});
