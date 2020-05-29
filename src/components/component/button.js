import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faShoppingBag from "@fortawesome/fontawesome-free-solid/faShoppingBag";

const MyButton = ({ type, linkTo, title, addStyles, altClass, runAction }) => {
  const buttons = () => {
    let template = "";

    switch (type) {
      case "default":
        template = (
          <Link
            className={!altClass ? "link_default" : altClass}
            to={linkTo}
            {...addStyles}
          >
            {title}
          </Link>
        );
        break;
      case "bag_link":
        template = (
          <div className="bag_link" onClick={() => runAction()}>
            <FontAwesomeIcon icon={faShoppingBag} />
          </div>
        );
        break;
      case "addToCartLink":
        template = (
          <div className="add_to_cart_link" onClick={() => runAction()}>
            <FontAwesomeIcon icon={faShoppingBag} />
            Add to cart
          </div>
        );
        break;
      default:
        template = "";
    }
    return template;
  };

  return <div className="my_link">{buttons()}</div>;
};

export default MyButton;
