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
  return Object.values({
    email: formData.email,
    firstName: formData.firstName,
    lastName: formData.lastName,
    city: formData.location.city,
    state: formData.location.state,
    country: formData.location.country,
    street: formData.location.street,
    zipCode: formData.location.zipCode,
    phoneNumber: formData.phoneNumber,
  }).every((value) => value?.trim().length > 0);
};
