import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { Field, FieldProps, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { useStore } from "../../../stores/store";
import TextArea from "../../common/TextArea";
import * as Yup from "yup";
import { formatDistanceToNow } from "date-fns";
import { useTheme } from "next-themes";
import { useOnClickOutside } from "../../hooks/useClickOutside";

interface Props {
  activityId: string;
  setIsAddingComment: (isAddingComment: boolean) => void;
  showShadow: boolean;
  setToggleCommentHt: (toggleCommentHt: boolean) => void;
  toggleCommentHt: boolean;
}

export default observer(function Comment({
  activityId,
  showShadow,
  setIsAddingComment,
  setToggleCommentHt,
  toggleCommentHt,
}: Props) {
  const { commentStore, userStore } = useStore();
  const { user } = userStore;
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setToggleCommentHt(false));
  const { theme } = useTheme();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // click handler generic
  function handleClick(element) {
    console.log(element, "yaya");

    if (element === "commentBox") setToggleCommentHt(true);
  }

  return (
    <div
      style={
        theme === "light"
          ? { boxShadow: "0 -3px 15px -5px rgba(0,0,0,0.11)" }
          : {}
      }
      className="flex-shrink-0 border-t fixed bottom-0 max-w-[41.3rem] w-full dark:bg-[#252628] border-gray-200 dark:border-[#424244]"
    >
      <div className="bg-[#f9f8f8] dark:bg-[#252628] px-4 py-2.5 sm:px-6">
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
                    <Field name="body">
                      {(props: FieldProps) => (
                        <div>
                          <div
                            ref={ref}
                            onClick={() => handleClick("commentBox")}
                            className={classNames(
                              !toggleCommentHt
                                ? "h-20"
                                : "focus-within:h-[8.95rem]",
                              "transition-all duration-200 ease-in-out relative overflow-hidden group dark:border-[#565557] dark:hover:border-[#6a696a] border-[1.85px] focus:border-[#6d6e6f]/80 border-[#cfcbcb]  dark:bg-[#1e1f21] rounded-md"
                            )}
                          >
                            <textarea
                              className="shadow-sm block h-full placeholder:text-[#6d6e6f] resize-none bg-white dark:bg-[#1e1f21] outline-none border-none group:focus:h-28 transition-all w-full focus:ring-0 sm:text-sm"
                              placeholder="Ask a question or post an update..."
                              rows={4}
                              {...props.field}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") return null;
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  isValid && handleSubmit();
                                }
                              }}
                            />

                            <div className="absolute flex justify-end top-[6rem] right-[.45rem]">
                              <button
                                type="submit"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  isValid && handleSubmit();
                                  !isSubmitting &&
                                    isValid &&
                                    setToggleCommentHt(false);
                                }}
                                className="bg-[#4573d2] text-sm py-2 px-2.5 text-white rounded-md"
                              >
                                Comment
                              </button>
                            </div>
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
                        </div>
                      )}
                    </Field>
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
