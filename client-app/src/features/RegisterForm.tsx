import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import TextInput from "../app/common/TextInput";
import { useStore } from "../stores/store";
import * as Yup from "yup";

export default observer(function RegisterForm() {
  const { userStore } = useStore();
  const { login } = userStore;
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        error: null,
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required("Display name is required"),
        username: Yup.string().required("Username is required"),
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={(values, { setErrors }) => {
        userStore
          .register(values)
          .catch((error) => {
            setErrors({ error });
            throw "Can not register";
          })
          .then(() => {
            router.push("/list/0");
          });
      }}
    >
      {({
        handleSubmit,
        isSubmitting,
        values,
        errors,
        touched,
        isValid,
        dirty,
      }) => (
        <Form className="error" onSubmit={handleSubmit}>
          <TextInput name="displayName" placeholder="Display Name" />
          <TextInput name="username" placeholder="Username" />
          <TextInput name="email" placeholder="Email" />
          <TextInput name="password" placeholder="Password" />

          <button
            type="submit"
            // disabled={!isValid || isSubmitting || !dirty}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register {isSubmitting ? "submitting" : ""}
          </button>
          <div className="text-red-500">{JSON.stringify(errors.error)}</div>
        </Form>
      )}
    </Formik>
  );
});
