import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormField from "../../component/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  populateFields,
} from "../../component/Form/formActions";
import {
  getSiteInfo,
  updateSiteInfo,
} from "../../../state/actions/siteActions";

const SiteInfo = () => {
  const dispatch = useDispatch();
  //const siteInfo = useSelector((state) => state.site);
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState({
    address: {
      element: "input",
      value: "",
      config: {
        label: "Address ",
        name: "address_input",
        type: "text",
        placeholder: "Enter the site address",
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true,
    },
    hours: {
      element: "input",
      value: "",
      config: {
        label: "Working hours",
        name: "hours_input",
        type: "text",
        placeholder: "Enter the site working hours",
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true,
    },
    phone: {
      element: "input",
      value: "",
      config: {
        label: "Phone number",
        name: "phone_input",
        type: "text",
        placeholder: "Enter the phone number",
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true,
    },
    email: {
      element: "input",
      value: "",
      config: {
        label: "Enter Email",
        name: "email_input",
        type: "text",
        placeholder: "Enter the site Email",
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true,
    },
  });

  const populateField = useCallback(() => {
    dispatch(getSiteInfo()).then((resp) => {
      const newFormData = populateFields(formData, resp.payload[0]);
      setFormData(newFormData);
    });
  }, [dispatch]);

  useEffect(() => {
    populateField();
  }, [populateField]);

  const updateForm = async (element) => {
    const newFormData = update(element, formData, "site_update");
    setFormError(false);
    setFormData(newFormData);
  };
  const submitForm = async (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(formData, "site_update");
    let formIsValid = isFormValid(formData, "site_update");
    if (formIsValid) {
      dispatch(updateSiteInfo(dataToSubmit))
        .then((response) => {
          if (response.payload.success) {
            setFormError(false);
            setFormSuccess(true);
            setTimeout(() => {
              setFormSuccess(false);
            }, 2000);
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
    <div>
      <form onSubmit={(event) => submitForm(event)}>
        <h2>Site Information</h2>
        <div className="block">
          <FormField
            id={"address"}
            formData={formData.address}
            change={(element) => updateForm(element)}
          />
        </div>
        <div className="block">
          <FormField
            id={"phone"}
            formData={formData.phone}
            change={(element) => updateForm(element)}
          />
        </div>
        <div className="block">
          <FormField
            id={"email"}
            formData={formData.email}
            change={(element) => updateForm(element)}
          />
        </div>
        <div className="block">
          <FormField
            id={"hours"}
            formData={formData.hours}
            change={(element) => updateForm(element)}
          />
        </div>
        <div>
          {formSuccess && <div className="form_success">Success</div>}
          {formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}
          <button onClick={(event) => submitForm(event)}>Update Info</button>
        </div>
      </form>
    </div>
  );
};

export default SiteInfo;
