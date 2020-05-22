import React from "react";
import MyButton from "../component/button";
import Login from "./login";

const Authorization = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customer</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do
              eiusmod tempor incididunt ut labore magna aliquia
            </p>
            <MyButton
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{ margin: "10px 0 0 0" }}
            />
          </div>
          <div className="right">
            <h2>Registered customer</h2>
            <p>Already have an account? please log in.</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
