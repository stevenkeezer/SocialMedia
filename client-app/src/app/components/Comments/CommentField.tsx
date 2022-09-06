import { Field, FieldProps, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { useStore } from "../../../stores/store";
import * as Yup from "yup";
import { useTheme } from "next-themes";
import { useOnClickOutside } from "../../hooks/useClickOutside";
import { classNames } from "../../utils/classNames";

interface Props {
  activityId: string;
  setIsAddingComment: (isAddingComment: boolean) => void;
  showShadow: boolean;
  setToggleCommentHt: (toggleCommentHt: boolean) => void;
  toggleCommentHt: boolean;
  children: React.ReactNode;
}

export default observer(function CommentField({
  setIsAddingComment,
  setToggleCommentHt,
  toggleCommentHt,
  children,
}: Props) {
  const { commentStore, userStore } = useStore();
  const { user } = userStore;
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setToggleCommentHt(false));
  const { resolvedTheme } = useTheme();

  function handleClick(element) {
    if (element === "commentBox") setToggleCommentHt(true);
  }

  return (
    <div
      style={
        resolvedTheme === "light"
          ? { boxShadow: "0 -3px 4px -3px rgb(0 0 0 / 0.07)" }
          : {}
      }
      className="flex-shrink-0 border-t fixed bottom-0 max-w-[41.3rem] w-full dark:bg-[#252628] border-gray-200 dark:border-[#424244]"
    >
      <div className="bg-[#f9f8f8] dark:bg-[#252628] px-4 py-2.5 sm:pl-6 pr-[1.65rem]">
        <div className="flex space-x-2">
          <div className="flex-shrink-0">
            <img className="w-8 h-8 rounded-full" src={user?.image} alt="" />
          </div>

          <div className="flex-1 min-w-0">
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
                  <Field name="body">
                    {(props: FieldProps) => (
                      <div>
                        <div
                          ref={ref}
                          onClick={() => handleClick("commentBox")}
                          style={{ clip: "rect(0, 200px, 350px, 0)" }}
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
                        <div className="flex items-center justify-between mt-3">
                          <a
                            href="#"
                            className="inline-flex items-start space-x-2 text-sm text-gray-500 group hover:text-gray-900"
                          >
                            {children}
                          </a>
                        </div>
                      </div>
                    )}
                  </Field>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
});
