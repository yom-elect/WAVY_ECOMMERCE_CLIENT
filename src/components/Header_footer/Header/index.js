import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logoutUser } from "../../../state/actions/userAction";

const Header = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const page = [
    {
      name: "Home",
      linkTo: "/",
      public: true,
    },
    {
      name: "Guitars",
      linkTo: "/shop",
      public: true,
    },
  ];

  const user = [
    {
      name: "My Cart",
      linkTo: "/user/cart",
      public: false,
    },
    {
      name: "My Account",
      linkTo: "/user/dashboard",
      public: false,
    },
    {
      name: "Login",
      linkTo: "/authorization",
      public: true,
    },
    {
      name: "Log out",
      linkTo: "/user/logout",
      public: false,
    },
  ];

  const logoutHandler = () => {
    dispatch(logoutUser()).then((response) => {
      if (response.payload.success) {
        props.history.push("/");
      }
    });
  };

  const defaultLink = (item, i) =>
    item.name === "Log out" ? (
      <div className="log_out_link" key={i} onClick={() => logoutHandler()}>
        {item.name}
      </div>
    ) : (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    );
  const cartLink = (item, i) => {
    const user = userInfo.userData;
    return (
      <div className="cart_link" key={i}>
        <span>{user.userData ? user.userData.cart.length : 0}</span>
        <Link to={item.linkTo}>{item.name}</Link>
      </div>
    );
  };

  const showLinks = (links) => {
    let list = [];
    if (userInfo.userData) {
      links.forEach((element) => {
        if (!userInfo.userData.isAuth) {
          if (element.public === true) {
            list.push(element);
          }
        } else {
          if (element.name !== "Login") {
            list.push(element);
          }
        }
      });
    }
    return list.map((item, i) => {
      if (item.name !== "My Cart") {
        return defaultLink(item, i);
      } else {
        return cartLink(item, i);
      }
    });
  };

  return (
    <header className="bck_b_light">
      <div className="container">
        <div className="left">
          <div className="logo">WAVES</div>
        </div>
        <div className="right">
          <div className="top">{showLinks(user)}</div>
          <div className="bottom">{showLinks(page)}</div>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
