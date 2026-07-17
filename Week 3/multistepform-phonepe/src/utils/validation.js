export function validate(step, formData) {
  const errors = {};

  if (step === 1) {
    if (!formData.firstName)
      errors.firstName = "Required";

    if (!formData.lastName)
      errors.lastName = "Required";
  }

  if (step === 2) {
    if (!formData.email)
      errors.email = "Required";

    if (!formData.age)
      errors.age = "Required";
  }

  if (step === 3) {
    if (!formData.city)
      errors.city = "Required";
  }

  return errors;
}