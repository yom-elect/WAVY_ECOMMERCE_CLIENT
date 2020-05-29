import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const links = [
  {
    name: "My account",
    linkTo: "/user/dashboard",
  },
  {
    name: "User information",
    linkTo: "/user/profile",
  },
  {
    name: "My account",
    linkTo: "/user/cart",
  },
];

const admin = [
  {
    name: "Site info",
    linkTo: "/admin/site_info",
  },
  {
    name: "Add products",
    linkTo: "/admin/add_product",
  },
  {
    name: "Manage categories",
    linkTo: "/admin/manage_categories",
  },
];
const UserLayout = (props) => {
  const user = useSelector((state) => state.user);
  const generateLinks = (links) =>
    links.map((item, i) => (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    ));

  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>My account</h2>
          <div className="links">{generateLinks(links)}</div>
          {user.userData.isAdmin ? (
            <div>
              <h2>Admin</h2>
              <div className="links">{generateLinks(admin)}</div>
            </div>
          ) : null}
        </div>
        <div className="user_right">{props.children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
