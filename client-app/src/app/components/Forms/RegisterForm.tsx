import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React from "react";

import { useStore } from "../../../stores/store";
import * as Yup from "yup";
import TextInput from "../../common/Forms/TextInput";

export default observer(function RegisterForm() {
  const { userStore } = useStore();
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
            router.push("/0/list/0");
          });
      }}
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="error" onSubmit={handleSubmit}>
          <TextInput
            fieldOnly
            name="displayName"
            placeholder="Display Name"
            className="w-full px-3 py-2 mt-2 text-sm text-gray-500 bg-white border rounded-lg"
          />
          <TextInput
            fieldOnly
            name="username"
            placeholder="Username"
            className="w-full px-3 py-2 mt-2 text-sm text-gray-500 bg-white border rounded-lg"
          />
          <TextInput
            fieldOnly
            name="email"
            placeholder="Email"
            className="w-full px-3 py-2 mt-2 text-sm text-gray-500 bg-white border rounded-lg"
          />
          <TextInput
            fieldOnly
            name="password"
            placeholder="Password"
            className="w-full px-3 py-2 mt-2 text-sm text-gray-500 bg-white border rounded-lg"
          />

          <button
            type="submit"
            className="w-full flex mt-3 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4573d2] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register {isSubmitting ? "Creating your account" : ""}
          </button>
          <div className="text-red-500">{JSON.stringify(errors.error)}</div>
        </Form>
      )}
    </Formik>
  );
});
