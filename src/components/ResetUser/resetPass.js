import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  update,
  generateData,
  isFormValid,
} from "../component/Form/formActions";
import Dialog from "@material-ui/core/Dialog";
import FormField from "../component/Form/formfield";
import { USER_SERVER } from "../../resource/util/misc";

const ResetPass = (props) => {
  const [formError, setFormError] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [formData, setFormData] = useState({
    password: {
      element: "input",
      value: "",
      config: {
        name: "password_input",
        type: "password",
        placeholder: "Enter your password",
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationMessage: "",
    },
    confirmPassword: {
      element: "input",
      value: "",
      config: {
        name: "confirm_password_input",
        type: "password",
        placeholder: "Confirm your password",
      },
      validation: {
        required: true,
        confirm: "password",
      },
      valid: false,
      touched: false,
      validationMessage: "",
    },
  });

  useEffect(() => {
    const resetToken = props.match.params.token;
    setResetToken(resetToken);
  }, [props]);

  const updateForm = async (element) => {
    const newFormData = update(element, formData, "reset_password");
    setFormError(false);
    setFormData(newFormData);
  };
  const submitForm = async (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(formData, "reset_password");
    let formIsValid = isFormValid(formData, "reset_password");
    if (formIsValid) {
      const response = await axios.post(
        `${USER_SERVER}/reset_password`,
        { ...dataToSubmit, resetToken: resetToken },
        {
          withCredentials: true,
        }
      );
      const resData = await response.data;
      if (resData.success) {
        setFormSuccess(true);
        setTimeout(() => {
          props.history.push("/authorization");
        }, 2000);
      } else {
        setFormError(false);
        setFormErrorMessage(resData.message);
      }
    } else {
      setFormError(true);
    }
  };
  return (
    <div>
      <div className="container">
        <form onSubmit={(event) => submitForm(event)}>
          <h2>Verify Password</h2>
          <div className="form_block_two">
            <div className="block">
              <FormField
                id={"password"}
                formData={formData.password}
                change={(element) => updateForm(element)}
              />
            </div>
            <div className="block">
              <FormField
                id={"confirmPassword"}
                formData={formData.confirmPassword}
                change={(element) => updateForm(element)}
              />
            </div>
          </div>
          <div>
            {formError ? (
              <div className="error_label">{formErrorMessage}</div>
            ) : (
              ""
            )}
            <button onClick={(event) => submitForm(event)}>
              Reset password
            </button>
          </div>
        </form>
      </div>
      <Dialog open={formSuccess}>
        <div className="dialog_alert">
          <div>Password Successfully updated !!</div>
          <div>You will be redirected to the login page...</div>
        </div>
      </Dialog>
    </div>
  );
};

export default ResetPass;
