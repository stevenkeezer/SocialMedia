import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { Field, FieldProps, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../../../stores/store";
import TextArea from "../../common/TextArea";
import * as Yup from "yup";
import { formatDistanceToNow } from "date-fns";

interface Props {
  activityId: string;
  setIsAddingComment: (isAddingComment: boolean) => void;
  showShadow: boolean;
}

export default observer(function Comment({
  activityId,
  showShadow,
  setIsAddingComment,
}: Props) {
  const { commentStore, userStore } = useStore();
  const { user } = userStore;

  return (
    <div
      style={{ boxShadow: "0 -3px 15px -5px rgba(0,0,0,0.11)" }}
      className="flex-shrink-0 border-t fixed bottom-0 max-w-[41.3rem] w-full dark:bg-[#252628] border-gray-200 dark:border-[#424244]"
    >
      <div className="bg-[#f9f8f8] dark:bg-[#252628] px-4 py-3 sm:px-6">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <img className="h-8 w-8 rounded-full" src={user?.image} alt="" />
          </div>

          <div className="min-w-0 flex-1">
            <Formik
              onSubmit={(values, { resetForm }) => {
                commentStore.addComment(values).then(() => {
                  setIsAddingComment(true);
                  resetForm();
                  setIsAddingComment(false);
                });
              }}
              initialValues={{ body: "" }}
              validationSchema={Yup.object({
                body: Yup.string().required("Required"),
              })}
            >
              {({ isSubmitting, isValid, handleSubmit }) => (
                <Form className="ui form">
                  <>
                    <div>
                      <Field name="body">
                        {(props: FieldProps) => (
                          <div>
                            <textarea
                              className="shadow-sm block w-full dark:border-[#424244] focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300  dark:bg-[#1e1f21] rounded-md"
                              placeholder="Add a comment..."
                              rows={3}
                              {...props.field}
                              onKeyPress={(e) => {
                                if (e.key === "Enter" && e.shiftKey) {
                                  return;
                                }
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  isValid && handleSubmit();
                                }
                              }}
                            />
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
                          </div>
                        )}
                      </Field>
                    </div>
                  </>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
});
