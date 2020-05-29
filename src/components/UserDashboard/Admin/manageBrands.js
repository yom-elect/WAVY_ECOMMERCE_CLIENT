import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormField from "../../component/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  resetFields,
} from "../../component/Form/formActions";

import { getBrands, addBrand } from "../../../state/actions/productsAction";

const ManageBrands = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [formError, setFormError] = useState(false);
  //const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: {
      element: "input",
      value: "",
      config: {
        name: "name_input",
        type: "text",
        placeholder: "Enter the brand",
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationMessage: "",
    },
  });

  const loadBrands = useCallback(() => {
    dispatch(getBrands());
  }, [dispatch]);

  useEffect(() => {
    loadBrands();
  }, [loadBrands]);

  const showCategoryItems = () =>
    products.brands
      ? products.brands.map((item, i) => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;

  const updateForm = async (element) => {
    const newFormData = update(element, formData, "brands");
    setFormError(false);
    setFormData(newFormData);
  };

  const resetFieldsHandler = () => {
    const newFormData = resetFields(formData, "brands");
    setFormData(newFormData);
    // setFormSuccess(true);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(formData, "brands");
    let formIsValid = isFormValid(formData, "brands");
    if (formIsValid) {
      dispatch(addBrand(dataToSubmit, products.brands)).then((resp) => {
        if (resp.payload.success) {
          resetFieldsHandler();
        } else {
          setFormError(true);
        }
      });
    } else {
      setFormError(true);
    }
  };

  return (
    <div className="admin_category_wrapper">
      <h1>brands</h1>
      <div className="admin_two_column">
        <div className="left">
          <div className="brands_container">{showCategoryItems()}</div>
        </div>
        <div className="right">
          <form onSubmit={(event) => submitForm(event)}>
            <div className="block">
              <FormField
                id={"name"}
                formData={formData.name}
                change={(element) => updateForm(element)}
              />
            </div>
            <div>
              {formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}
              <button onClick={(event) => submitForm(event)}>Add brand</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageBrands;
