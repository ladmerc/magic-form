import React from "react";
import BootstrapForm from "react-bootstrap/Form";

import { useForm } from "./hooks";
import { groupifyFormData, extractValidators } from "./utils";

export default function Form({ data }) {
  const onSubmit = (errors, values) => {
    if (errors) return;

    console.log({ values });
    return values;
  };
  const validators = extractValidators(data);
  const [values, setValue, submit, errors] = useForm({ onSubmit, validators });
  if (!data?.length) return null;

  // group form fields so we can use fieldsets. If a field has a 'group' property, it belongs
  // to the same fieldset as others with same group. Default group if not provided is 'default'
  const groupedFormData = groupifyFormData(data);
  const checkableFields = ["checkbox", "radio"];

  return (
    <BootstrapForm onSubmit={submit}>
      {Object.keys(groupedFormData).map(group => {
        return (
          <BootstrapForm.Group>
            <fieldset>
              {group !== "default" && (
                <legend className="font-weight-bold capitalize">{group}</legend>
              )}
              {groupedFormData[group].map((field, index) => {
                const {
                  id,
                  name,
                  human_label: label,
                  tag,
                  type,
                  conditional,
                  ...rest
                } = field;
                const fieldId = id ?? `field-${group}-${index}`;
                const shouldShow =
                  !conditional ||
                  !!conditional.show_if(values[conditional.name]);
                if (!shouldShow) return null;

                const error = errors?.[name];

                return checkableFields.includes(type) ? (
                  <BootstrapForm.Check
                    id={fieldId}
                    name={name}
                    type={type}
                    label={label}
                    key={fieldId}
                    custom
                    value={values[name]}
                    onChange={setValue}
                    {...rest}
                  />
                ) : (
                  <>
                    {label && (
                      <BootstrapForm.Label htmlFor={fieldId}>
                        {label}
                      </BootstrapForm.Label>
                    )}
                    <BootstrapForm.Control
                      id={fieldId}
                      name={name}
                      type={type}
                      className={`mb-3  ${error && "is-invalid"} `}
                      as={tag}
                      key={fieldId}
                      value={values[name]}
                      onChange={setValue}
                      {...rest}
                    >
                      {field.label}
                    </BootstrapForm.Control>
                    {error && <p className="text-danger">{error}</p>}
                  </>
                );
              })}
            </fieldset>
          </BootstrapForm.Group>
        );
      })}
      <div className="center">
        <button className="btn btn-block btn-success">Submit</button>
      </div>
    </BootstrapForm>
  );
}
