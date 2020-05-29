import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import UserLayout from "../../hoc/userLayout";

import FormField from "../../component/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  populateOptionsFields,
  resetFields,
} from "../../component/Form/formActions";

import {
  getBrands,
  getWoods,
  addProduct,
} from "../../../state/actions/productsAction";

import FileUpload from "../../component/fileUpload/fileUploads";

const AddProduct = () => {
  const dispatch = useDispatch();
  //const products = useSelector((state) => state.products);
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: {
      element: "input",
      value: "",
      config: {
        label: "Product name",
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
      showLabel: true,
    },
    description: {
      element: "textarea",
      value: "",
      config: {
        label: "Product description",
        name: "description_input",
        type: "text",
        placeholder: "Enter your description ",
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true,
    },
    price: {
      element: "input",
      value: "",
      config: {
        label: "Product price",
        name: "price_input",
        type: "number",
        placeholder: "Enter your price",
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true,
    },
    brand: {
      element: "select",
      value: "",
      config: {
        label: "Product Brand",
        name: "brands_input",
        options: [],
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true,
    },
    shipping: {
      element: "select",
      value: "",
      config: {
        label: "Shipping",
        name: "shipping_input",
        options: [
          { key: true, value: "Yes" },
          { key: false, value: "No" },
        ],
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true,
    },
    available: {
      element: "select",
      value: "",
      config: {
        label: "Available, in stock",
        name: "available_input",
        options: [
          { key: true, value: "Yes" },
          { key: false, value: "No" },
        ],
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true,
    },
    wood: {
      element: "select",
      value: "",
      config: {
        label: "Wood material",
        name: "woods_input",
        options: [],
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true,
    },
    frets: {
      element: "select",
      value: "",
      config: {
        label: "Frets",
        name: "frets_input",
        options: [
          { key: 20, value: 20 },
          { key: 21, value: 21 },
          { key: 22, value: 22 },
          { key: 24, value: 24 },
        ],
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true,
    },
    publish: {
      element: "select",
      value: "",
      config: {
        label: "Publish",
        name: "publish_input",
        options: [
          { key: true, value: "Public" },
          { key: false, value: "Hidden" },
        ],
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true,
    },
    images: {
      value: [],
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
      validationMessage: "",
      showLabel: false,
    },
  });

  const getBrandsAndWoods = useCallback(async () => {
    dispatch(getBrands()).then((resp) => {
      const newFormData = populateOptionsFields(
        formData,
        resp.payload,
        "brand"
      );
      updateFields(newFormData);
    });
    dispatch(getWoods()).then((resp) => {
      const newFormData = populateOptionsFields(formData, resp.payload, "wood");
      updateFields(newFormData);
    });
  }, [dispatch]);

  const updateFields = (newFormData) => {
    setFormData(newFormData);
  };
  useEffect(() => {
    let reload = true;
    if (reload) {
      getBrandsAndWoods();
    }
    return () => {
      reload = false;
    };
  }, [getBrandsAndWoods]);

  const updateForm = async (element) => {
    const newFormData = update(element, formData, "products");
    setFormError(false);
    setFormData(newFormData);
  };

  const resetFieldHandler = () => {
    const newFormData = resetFields(formData, "products");
    setFormData(newFormData);
    setFormSuccess(true);

    setTimeout(() => {
      setFormSuccess(false);
    }, 3000);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(formData, "products");
    let formIsValid = isFormValid(formData, "products");
    if (formIsValid) {
      dispatch(addProduct(dataToSubmit)).then((resp) => {
        if (resp.payload.success) {
          resetFieldHandler();
        } else {
          setFormError(true);
        }
      });
    } else {
      setFormError(true);
    }
  };

  const imagesHandler = (images) => {
    const newFormData = {
      ...formData,
    };
    newFormData["images"].value = images;
    newFormData["images"].valid = true;

    setFormData(newFormData);
  };
  return (
    <UserLayout>
      <div>
        <h1>Add product</h1>

        <form onSubmit={(event) => submitForm(event)}>
          <FileUpload
            imagesHandler={(images) => imagesHandler(images)}
            reset={formSuccess}
          />
          <div className="block">
            <FormField
              id={"name"}
              formData={formData.name}
              change={(element) => updateForm(element)}
            />
          </div>
          <div className="block">
            <FormField
              id={"description"}
              formData={formData.description}
              change={(element) => updateForm(element)}
            />
          </div>
          <div className="block">
            <FormField
              id={"price"}
              formData={formData.price}
              change={(element) => updateForm(element)}
            />
          </div>
          <div className="form_devider" />
          <div className="block">
            <FormField
              id={"brand"}
              formData={formData.brand}
              change={(element) => updateForm(element)}
            />
          </div>
          <div className="block">
            <FormField
              id={"shipping"}
              formData={formData.shipping}
              change={(element) => updateForm(element)}
            />
          </div>
          <div className="block">
            <FormField
              id={"available"}
              formData={formData.available}
              change={(element) => updateForm(element)}
            />
          </div>
          <div className="form_devider" />
          <div className="block">
            <FormField
              id={"wood"}
              formData={formData.wood}
              change={(element) => updateForm(element)}
            />
          </div>
          <div className="block">
            <FormField
              id={"frets"}
              formData={formData.frets}
              change={(element) => updateForm(element)}
            />
          </div>
          <div className="form_divider" />
          <div className="block">
            <FormField
              id={"publish"}
              formData={formData.publish}
              change={(element) => updateForm(element)}
            />
          </div>
          {formSuccess ? <div className="form_success">Success</div> : null}
          <div>
            {formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}
            <button onClick={(event) => submitForm(event)}>Add Product</button>
          </div>
        </form>
      </div>
    </UserLayout>
  );
};

export default AddProduct;
