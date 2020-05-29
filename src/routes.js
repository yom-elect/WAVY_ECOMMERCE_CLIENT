import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/hoc/layout";
import Auth from "./components/hoc/auth";

import Home from "./components/Home";
import Authorization from "./components/Authorization";
import Register from "./components/Authorization/register";
import Shop from "./components/Shop";
import AddProduct from "./components/UserDashboard/Admin/addProduct";
import ManageCategories from "./components/UserDashboard/Admin/manageCategories";
import ManageSite from "./components/UserDashboard/Admin/manageSite";
import UserDashboard from "./components/UserDashboard";
import UpdateProfile from "./components/UserDashboard/updateProfile";
import UserCart from "./components/UserDashboard/cart";
import ProductDetail from "./components/component/Product";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route
          path="/admin/manage_categories"
          exact
          component={Auth(ManageCategories, true)}
        />
        <Route
          path="/admin/add_product"
          exact
          component={Auth(AddProduct, true)}
        />
        <Route
          path="/admin/site_info"
          exact
          component={Auth(ManageSite, true)}
        />
        <Route
          path="/user/dashboard"
          exact
          component={Auth(UserDashboard, true)}
        />
        <Route
          path="/user/profile"
          exact
          component={Auth(UpdateProfile, true)}
        />
        <Route path="/user/cart" exact component={Auth(UserCart, true)} />
        <Route
          path="/product_detail/:id"
          exact
          component={Auth(ProductDetail, null)}
        />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route
          path="/authorization"
          exact
          component={Auth(Authorization, false)}
        />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  );
};
export default Routes;
