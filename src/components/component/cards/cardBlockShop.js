import React from "react";
import Card from "./card";

const CardBlockShop = ({ grid, list }) => {
  const renderCards = (lists) =>
    lists
      ? lists.map((value) => <Card key={value._id} card={value} grid={grid} />)
      : null;

  return (
    <div className="card_block_shop">
      <div>
        {list ? (
          list.length === 0 ? (
            <div className="no_result">Sorry , no results</div>
          ) : null
        ) : null}
        {renderCards(list)}
      </div>
    </div>
  );
};

export default CardBlockShop;
