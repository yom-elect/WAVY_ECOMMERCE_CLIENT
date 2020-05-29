export const validate = (element, formData = []) => {
  let error = [true, ""];

  if (element.validation.email) {
    // eslint-disable-next-line
    const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      element.value
    );
    const message = `${
      !valid ? "You have entered an invalid email address" : ""
    }`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.confirm) {
    const valid =
      element.value.trim() === formData[element.validation.confirm].value;
    const message = `${!valid ? "Password mismatch" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== "";
    const message = `${!valid ? "This field is required" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  return error;
};

export const update = (element, formData, formName) => {
  const newFormData = {
    ...formData,
  };
  const newElement = {
    ...newFormData[element.id],
  };
  newElement.value = element.event.target.value;

  if (element.blur) {
    let validData = validate(newElement, formData);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }
  newElement.touched = element.blur;
  newFormData[element.id] = newElement;

  return newFormData;
};

export const generateData = (formData, formName) => {
  let dataToSubmit = {};
  for (let key in formData) {
    if (key !== "confirmPassword") {
      dataToSubmit[key] = formData[key].value;
    }
  }
  return dataToSubmit;
};

export const isFormValid = (formData, formName) => {
  let formIsValid = true;
  for (let key in formData) {
    formIsValid = formData[key].valid && formIsValid;
  }
  return formIsValid;
};

export const populateOptionsFields = (formData, arrayData = [], field) => {
  const newArray = [];
  const newFormData = { ...formData };
  arrayData.forEach((item, i) => {
    newArray.push({
      key: item._id,
      value: item.name,
    });
  });
  newFormData[field].config.options = newArray;
  return newFormData;
};

export const resetFields = (formData, formName) => {
  const newFormData = { ...formData };

  for (let key in newFormData) {
    newFormData[key].value = key === "images" ? [] : "";
    newFormData[key].valid = false;
    newFormData[key].touched = false;
    newFormData[key].validationMessage = "";
  }
  return newFormData;
};

export const populateFields = (formData, fields) => {
  const newFormData = { ...formData };

  for (let key in newFormData) {
    newFormData[key].value = fields[key];
    newFormData[key].valid = true;
    newFormData[key].touched = true;
    newFormData[key].validationMessage = "";
  }

  return newFormData;
};
