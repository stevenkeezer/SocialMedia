import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React from "react";
import TextInput from "../../common/TextInput";
import { useStore } from "../../../stores/store";

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
        <Form onSubmit={handleSubmit} className=" w-full">
          <div className="pb-2">
            <label className="text-xs text-gray-500">Email</label>
          </div>

          <TextInput
            fieldOnly
            name="email"
            placeholder="name@email.com"
            className="w-full border py-2 px-3 text-sm bg-white rounded-lg"
          />
          <div className="pt-3 pb-2">
            <label className="text-xs text-gray-500">Password</label>
          </div>

          <TextInput
            fieldOnly
            name="password"
            placeholder="Password"
            className="w-full border py-2 px-3 text-sm rounded-lg bg-white"
          />

          <button
            type="submit"
            className="w-full mt-5 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4573d2] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login {isSubmitting ? "Logging in" : ""}
          </button>
          <div className="text-red-500">{errors.error}</div>
        </Form>
      )}
    </Formik>
  );
});
