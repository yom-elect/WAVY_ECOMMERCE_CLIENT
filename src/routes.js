import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/hoc/layout";
import Auth from "./components/hoc/auth";

import Home from "./components/Home";
import Authorization from "./components/Authorization";
import Register from "./components/Authorization/register";
import Shop from "./components/Shop";

import UserDashboard from "./components/UserDashboard";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route
          path="/user/dashboard"
          exact
          component={Auth(UserDashboard, true)}
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
