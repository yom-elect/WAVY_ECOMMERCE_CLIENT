import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import FormField from "../component/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
} from "../component/Form/formActions";
import { loginUser, asyncLocalStorage } from "../../state/actions/userAction";

const Login = (props) => {
  //const response = useSelector((state) => state.user.loginSuccess);
  const dispatch = useDispatch();
  const [formError, setFormError] = useState(false);
  //const [formSuccess, setFormSuccess] = useState("");
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
  });

  const updateForm = async (element) => {
    const newFormData = update(element, formData, "login");
    setFormError(false);
    setFormData(newFormData);
  };
  const submitForm = async (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(formData, "login");
    let formIsValid = isFormValid(formData, "login");
    if (formIsValid) {
      dispatch(loginUser(dataToSubmit));
      const response = await asyncLocalStorage.getItem("login");
      if (response) {
        props.history.push("/user/dashboard");
      }
    } else {
      setFormError(true);
    }
  };

  return (
    <div className="sigin_wrapper">
      <form onSubmit={(event) => submitForm(event)}>
        <FormField
          id={"email"}
          formData={formData.email}
          change={(element) => updateForm(element)}
        />
        <FormField
          id={"password"}
          formData={formData.password}
          change={(element) => updateForm(element)}
        />
        {formError ? (
          <div className="error_label">Please check your data</div>
        ) : null}
        <button onClick={(event) => submitForm(event)}>LOGIN</button>
      </form>
    </div>
  );
};

export default withRouter(Login);
