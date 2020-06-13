export const groupifyFormData = data =>
  data.reduce((acc, field) => {
    const group = field.group ?? "default";
    if (acc[group]) {
      acc[group].push(field);
    } else {
      acc[group] = [field];
    }
    return acc;
  }, {});

export const extractValidators = data => {
  const validators = {};
  data.forEach(field => {
    if (!field.validate) return;

    validators[field.name] = field.validate;
  });
  return validators;
};
