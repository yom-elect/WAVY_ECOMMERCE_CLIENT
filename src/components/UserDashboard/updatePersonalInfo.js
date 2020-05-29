import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormField from "../component/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  populateFields,
} from "../component/Form/formActions";

const UpdatePersonalInfo = () => {
  const userInfo = useSelector((state) => state.user.userData);
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
  });

  const populateField = useCallback(() => {
    const newFormData = populateFields(formData, userInfo.userData);
    setFormData(newFormData);
  }, []);

  useEffect(() => {
    populateField();
  }, [populateField]);

  const updateForm = async (element) => {
    const newFormData = update(element, formData, "user_update");
    setFormError(false);
    setFormData(newFormData);
  };
  const submitForm = async (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(formData, "user_update");
    let formIsValid = isFormValid(formData, "user_update");
    if (formIsValid) {
      console.log(dataToSubmit);
      //   dispatch(registerUser(dataToSubmit))
      //     .then((response) => {
      //       if (response.payload.success) {
      //         setFormError(false);
      //         setFormSuccess(true);
      //         props.history.push("/authorization");
      //       } else {
      //         setFormError(true);
      //       }
      //     })
      //     .catch((err) => setFormError(true));
    } else {
      setFormError(true);
    }
  };

  return (
    <div>
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
        <div className="block">
          <FormField
            id={"email"}
            formData={formData.email}
            change={(element) => updateForm(element)}
          />
        </div>
        <div>
          {formSuccess && <div className="form_success">Success</div>}
          {formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}
          <button onClick={(event) => submitForm(event)}>Update Profile</button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePersonalInfo;
