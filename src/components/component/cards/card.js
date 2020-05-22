import React from "react";
import MyButton from "../button";

const Card = ({ card, grid }) => {
  const renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "./images/image_not_availble.png";
    }
  };

  return (
    <div className={`card_item_wrapper ${grid}`}>
      <div
        className="image"
        style={{ background: `url(${renderCardImage(card.images)}) no-repeat` }}
      ></div>
      <div className="action_container">
        <div className="tags">
          <div className="brand">{card.brand.name}</div>
          <div className="name">{card.name}</div>
          <div className="name">{card.price}</div>
        </div>

        {grid ? (
          <div className="description">
            <p>{card.description}</p>
          </div>
        ) : null}
        <div className="actions">
          <div className="button_wrapp">
            <MyButton
              type="default"
              altClass="card_link"
              title="View product"
              linkTo={`/product_detail/${card._id}`}
              assStyles={{
                margin: "10px 0 0 0",
              }}
            />
          </div>
          <div className="button_wrapp">
            <MyButton
              type="bag_link"
              runAction={() => {
                console.log("added to cart");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
