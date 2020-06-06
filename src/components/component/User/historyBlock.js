import React from "react";
import moment from "moment/moment";

const UserHistoryBlock = ({ products }) => {
  const renderBlocks = () =>
    products
      ? products.map((product, i) => (
          <tr key={i}>
            <td>{product.purchaseOrder}</td>
            <td>
              {product.brand} {product.name}
            </td>
            <td>$ {product.price}</td>
            <td>{product.quantity}</td>
          </tr>
        ))
      : null;

  return (
    <div className="history_blocks">
      <table>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Product</th>
            <th>Price paid</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{renderBlocks()}</tbody>
      </table>
    </div>
  );
};

export default UserHistoryBlock;
