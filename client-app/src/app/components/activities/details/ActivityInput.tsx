import { useField, useFormikContext } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import TextInput from "../../../common/TextInput";

export default function ActivityInput() {
  return <TextInput name="title" key="blah" />;
}
