import React, { useEffect, useState } from "react";
import { Field, useField } from "formik";

export const UploadField = ({
  field,
  form: { touched, errors },
  name,
  label,
  isError,
  ...props
}) => {
  return (
    <>
      <Field
        variant="outlined"
        name="uploader"
        title={label}
        type={"file"}
        style={{
          display: "flex",
          color: isError ? "red" : "var(--main-color)",
        }}
        {...props}
      />
      {/* {isError && <FormHelperText>{errors[field.name]}</FormHelperText>} */}
    </>
  );
};

const FileInput = (props) => {
  const [field, meta, helper] = useField(props.name);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && error && true;
  const { value } = field;

  const [fileName, setFileName] = useState(value.name);
  const [file, setFile] = useState(value.file);
  const [src, setSrc] = useState(value.src);

  const _onChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    if (file) {
      reader.onloadend = () => setFileName(file.name);
      if (file.name !== fileName) {
        reader.readAsDataURL(file);
        setSrc(reader);
        setFile(file);
      }
    }
  };

  useEffect(() => {
    if (file && fileName && src) {
      const blob = new Blob([file], { type: file.type });
      if (blob) setValue(blob);
    }
  }, [src, fileName, file]);

  return (
    <>
      <Field
        variant="outlined"
        field={field}
        component={UploadField}
        onChange={_onChange}
        isError={isError}
      />
      {/* {isError && <FormHelperText>{errors[field.name]}</FormHelperText>} */}
    </>
  );
};

export default FileInput;
