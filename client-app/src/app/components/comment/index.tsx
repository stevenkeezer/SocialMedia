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
}

export default observer(function Comment({ activityId }: Props) {
  const { commentStore } = useStore();

  useEffect(() => {
    if (activityId) {
      commentStore.createHubConnection(activityId);
    }
    return () => {
      commentStore.clearComments();
    };
  }, [activityId, commentStore]);

  return (
    <div className="flex-shrink-0 border-t  dark:bg-[#252628] border-gray-200 dark:border-[#424244] pb-3">
      <div className="bg-gray-50 dark:bg-[#252628] px-4 py-3 sm:px-6">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              //   src={user.imageUrl}
              alt=""
            />
          </div>

          <div className="min-w-0 flex-1">
            <Formik
              onSubmit={(values, { resetForm }) => {
                commentStore.addComment(values).then(() => resetForm());
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
                              className="bg-transparent"
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
                          </div>
                        )}
                      </Field>

                      <button type="submit" disabled={isSubmitting || !isValid}>
                        <div>{isSubmitting && "loading"} ssubmit</div>
                      </button>
                      <textarea
                        id="comment"
                        name="comment"
                        rows={3}
                        className="shadow-sm block w-full dark:border-[#424244] focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300  dark:bg-[#1e1f21] rounded-md"
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
                  </>
                </Form>
              )}
            </Formik>

            {console.log(commentStore.comments, "comments")}
            {commentStore?.comments.map((comment) => (
              <div key={comment.id}>
                <img className="h-10 w-10 rounded-full" src={comment?.image} />
                <a href={`/profiles/${comment.username}`}>
                  {comment?.username}
                </a>
                <div>{formatDistanceToNow(comment?.createdAt)} ago</div>
                <p className="whitespace-pre-wrap">{comment?.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
