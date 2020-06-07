import React, { useState } from "react";
import axios from "axios";
import {
  update,
  generateData,
  isFormValid,
} from "../component/Form/formActions";
import FormField from "../component/Form/formfield";
import { USER_SERVER } from "../../resource/util/misc";

const ResetUser = () => {
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: {
      element: "input",
      value: "",
      config: {
        name: "email_input",
        type: "email",
        placeholder: "Enter your email",
      },
      validation: {
        required: true,
        email: true,
      },
      valid: false,
      touched: false,
      validationMessage: "",
    },
  });

  const updateForm = async (element) => {
    const newFormData = update(element, formData, "reset_email");
    setFormError(false);
    setFormData(newFormData);
  };
  const submitForm = async (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(formData, "reset_email");
    let formIsValid = isFormValid(formData, "reset_email ");
    if (formIsValid) {
      const response = await axios.post(
        `${USER_SERVER}/reset_user`,
        dataToSubmit,
        {
          withCredentials: true,
        }
      );
      const resData = await response.data;
      if (resData.success) {
        setFormSuccess(true);
      }
    } else {
      setFormError(true);
    }
  };
  return (
    <div className="container">
      <h1>Reset passwords</h1>
      <form onSubmit={(event) => submitForm(event)}>
        <div className="block">
          <FormField
            id={"email"}
            formData={formData.email}
            change={(element) => updateForm(element)}
          />
        </div>
        <div>
          {formSuccess ? (
            <div className="form_success">Done, check your email</div>
          ) : null}
          {formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}
          <button onClick={(event) => submitForm(event)}>
            Send email to reset password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetUser;
