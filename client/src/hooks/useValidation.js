import { useEffect } from "react";

export default function useValidation(data, validation, disableFn, exceptions) {
  useEffect(() => {
    const emptyFields = Object.keys(data).some(field => {
      if (exceptions && exceptions.some(exception => exception === field)) return false;
      return data[field] === "";
    });
    const validationErrors = Object.keys(validation).some((field) => validation[field] !== "");
    validationErrors || emptyFields
    ? disableFn(true) : disableFn(false);
  }, [validation, data, disableFn, exceptions]);
};