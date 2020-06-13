import { useState } from "react";

const noop = () => {};

const isEmptyObject = obj =>
  Object.prototype.toString.call(obj) === "[object Object]";


const validate = (validators, fields) => {
  const errors = {};
  Object.keys(validators).forEach(fieldName => {
    console.log({ fieldName });
    Object.keys(validators[fieldName]).some(validatorName => {
      const validator = validators[fieldName][validatorName];
      if (!Array.isArray(validator))
        throw new Error("validator should be an array");

      const [handler, message] = validator;
      if (!handler(fields)) {
        errors[fieldName] = message;
        return true;
      }
      return false;
    });
  });
  return errors;
};


export const useForm = ({
  initialState = {},
  onSubmit = noop,
  validators = {}
}) => {
  const [fields, setValues] = useState(initialState);
  const [errors, setErrors] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    const _errors = validate(validators, fields);
    const hasErrors = isEmptyObject(_errors);
    setErrors(hasErrors ? _errors : null);
    if (!isEmptyObject(_errors)) onSubmit(fields);
  };
  return [
    fields,
    // updater using target name
    ({ target: { name, type, checked, value } }) => {
      setValues({
        ...fields,
        [name]: type === "checkbox" ? checked : value
      });
    },
    handleSubmit,
    errors
  ];
};
