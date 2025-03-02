interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  location: {
    street: string;
    city: string;
    state: string;
    country: string;
    buildingType: string;
    zipCode: string;
  };
  phoneNumber: string;
}

export const isFormComplete = (formData: FormData) => {
  const isPhoneNumberValid = validatePhoneNumber(formData.phoneNumber);
  return (
    Object.values({
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      city: formData.location.city,
      state: formData.location.state,
      country: formData.location.country,
      street: formData.location.street,
      zipCode: formData.location.zipCode,
      phoneNumber: formData.phoneNumber,
    }).every((value) => value?.trim().length > 0) && isPhoneNumberValid
  );
};

export const validatePhoneNumber = (phoneNumber: string) => {
  const localFormat = /^\d{11}$/;
  const intlFormat = /^\+\d{1,3}\d{6,12}$/;

  if (!localFormat.test(phoneNumber) && !intlFormat.test(phoneNumber)) {
    return false;
  }

  return true;
};
