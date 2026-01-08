"use client";

import { useState, useCallback } from "react";
import _ from "lodash";

const checkArray = (data) => {
  const result = data.map((err) =>
    Object.keys(err).some((key) => {
      if (Array.isArray(err[key])) {
        return checkArray(err[key]);
      } else {
        return err[key];
      }
    })
  );
  return result.some((err) => err);
};

const useForm = (initFormState = {}, option = {}) => {
  const [error, setError] = useState({});
  const [form, setForm] = useState(initFormState);

  const checkFormError = useCallback(
    () => option.formValidation(form),
    [form, option]
  );

  const setFormError = (form) => setError(checkFormError(form));

  const isFormError = useCallback(
    (err) => {
      const isError = Object.keys(err).some((key) => {
        if (Array.isArray(err[key])) {
          return checkArray(err[key]);
        } else {
          return err[key];
        }
      });
      return isError;
    },
    [setError]
  );

  const setField = useCallback(
    (field) => (value) => {
      setForm((currentForm) => ({
        ...currentForm,
        [field]: value,
      }));
    },
    [setForm]
  );

  return {
    form,
    setForm,
    setFormError,
    setField,
    setError,
    error,
    checkFormError,
    isFormError,
  };
};

export default useForm;
