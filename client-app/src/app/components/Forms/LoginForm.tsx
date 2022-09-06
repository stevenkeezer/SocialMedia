import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React from "react";
import { useStore } from "../../../stores/store";
import TextInput from "../../common/Forms/TextInput";

export default observer(function LoginForm() {
  const { userStore } = useStore();
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
            router.push("/0/list/0");
          });
      }}
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form onSubmit={handleSubmit} className="w-full ">
          <div className="pb-2">
            <label className="text-xs text-gray-500">Email</label>
          </div>
          <TextInput
            fieldOnly
            name="email"
            placeholder="name@email.com"
            className="w-full px-3 py-2 text-sm text-gray-500 bg-white border rounded-lg"
          />

          <div className="pt-3 pb-2">
            <label className="text-xs text-gray-500">Password</label>
          </div>
          <TextInput
            fieldOnly
            name="password"
            placeholder="Password"
            className="w-full px-3 py-2 text-sm text-gray-500 bg-white border rounded-lg"
          />

          <button
            type="submit"
            className="w-full mt-5 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4573d2] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isSubmitting ? "Logging in" : "Login"}
          </button>
          <div className="text-red-500">{errors.error}</div>
        </Form>
      )}
    </Formik>
  );
});
