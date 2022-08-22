import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useFormikContext } from "formik";

export function AutoSave({ loadingActivity }) {
  const formik = useFormikContext();

  const saveForm = useDebouncedCallback(() => {
    formik.submitForm();
  }, 400);

  useEffect(() => {
    if (!loadingActivity && formik.dirty) {
      saveForm();
    }
  }, [formik.values, formik.isValid]);

  return null;
}
