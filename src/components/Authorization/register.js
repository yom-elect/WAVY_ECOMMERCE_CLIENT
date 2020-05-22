import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormField from "../component/Form/formfield";
import Dialog from "@material-ui/core/Dialog";
import {
  update,
  generateData,
  isFormValid,
} from "../component/Form/formActions";
import { registerUser } from "../../state/actions/userAction";

const Register = (props) => {
  const dispatch = useDispatch();
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: {
      element: "input",
      value: "",
      config: {
        name: "name_input",
        type: "text",
        placeholder: "Enter your name",
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationMessage: "",
    },
    lastname: {
      element: "input",
      value: "",
      config: {
        name: "lastname_input",
        type: "text",
        placeholder: "Enter your lastname",
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationMessage: "",
    },
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

  const updateForm = async (element) => {
    const newFormData = update(element, formData, "register");
    setFormError(false);
    setFormData(newFormData);
  };
  const submitForm = async (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(formData, "register");
    let formIsValid = isFormValid(formData, "register");
    if (formIsValid) {
      dispatch(registerUser(dataToSubmit))
        .then((response) => {
          if (response.payload.success) {
            setFormError(false);
            setFormSuccess(true);
            props.history.push("/authorization");
          } else {
            setFormError(true);
          }
        })
        .catch((err) => setFormError(true));
    } else {
      setFormError(true);
    }
  };

  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <form onSubmit={(event) => submitForm(event)}>
              <h2>Personal Information</h2>
              <div className="form_block_two">
                <div className="block">
                  <FormField
                    id={"name"}
                    formData={formData.name}
                    change={(element) => updateForm(element)}
                  />
                </div>
                <div className="block">
                  <FormField
                    id={"lastname"}
                    formData={formData.lastname}
                    change={(element) => updateForm(element)}
                  />
                </div>
              </div>
              <div>
                <div className="block">
                  <FormField
                    id={"email"}
                    formData={formData.email}
                    change={(element) => updateForm(element)}
                  />
                </div>
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
              </div>
              <div>
                {formError ? (
                  <div className="error_label">Please check your data</div>
                ) : null}
                <button onClick={(event) => submitForm(event)}>
                  CREATE AN ACCOUNT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Dialog open={formSuccess}>
        <div className="dialog_alert">
          <div>Congratulations !!</div>
          <div>You will be redirected to the login page...</div>
        </div>
      </Dialog>
    </div>
  );
};

export default Register;
