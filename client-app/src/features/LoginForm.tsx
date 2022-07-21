import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import TextInput from "../app/common/TextInput";
import { useStore } from "../stores/store";

export default observer(function LoginForm() {
  const { userStore } = useStore();
  const { login } = userStore;
  const router = useRouter();

  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) => {
        userStore
          .login(values)
          .catch((error) => {
            setErrors({ error: "Invalid email or password" });
            throw "Can not login";
          })
          .then(() => {
            router.push("/list");
          });
      }}
    >
      {({ handleSubmit, isSubmitting, values, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <TextInput name="email" placeholder="Email" />
          <TextInput name="password" placeholder="Password" />

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit {isSubmitting ? "submitting" : ""}
          </button>
          <div className="text-red-500">{errors.error}</div>
        </Form>
      )}
    </Formik>
  );
});
