import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserLayout from "../hoc/userLayout";
import ProductBlock from "../component/User/productBlock";

import MyButton from "../component/button";
import Paypal from "../component/paypal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faFrown from "@fortawesome/fontawesome-free-solid/faFrown";
import faSmile from "@fortawesome/fontawesome-free-solid/faSmile";
import {
  getCartItems,
  removeCartItem,
  SuccessfulPurchase,
} from "../../state/actions/userAction";

//AS1ceWuQbymyI95gTZrxyLXTdb6OHypek7oQib_qfp0br7yEtkJ8c25V2taC3NLGbA_DsC1XhhCFBy_v
const UserCart = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [showTotal, setShowTotal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const calculateTotal = (cartDetail) => {
    let totalPrice = 0;
    cartDetail.forEach((item) => {
      totalPrice += parseInt(item.price, 10) * item.quantity;
    });
    setTotal(totalPrice);
    setShowTotal(true);
  };

  const loadCartInfo = useCallback(() => {
    let cartItem = [];
    const cartItems = userInfo.userData.userData.cart;
    if (cartItems) {
      if (cartItems.length > 0) {
        cartItems.forEach((item) => {
          cartItem.push(item.id);
        });
        dispatch(getCartItems(cartItem, cartItems)).then((resp) => {
          if (resp.payload.length > 0) {
            calculateTotal(resp.payload);
          }
        });
      }
    }
  }, [dispatch]);

  useEffect(() => {
    loadCartInfo();
  }, [loadCartInfo]);

  const removeFromCart = (id) => {
    dispatch(removeCartItem(id)).then((resp) => {
      //console.log(resp.payload.cartDetail.length);
      if (resp.payload.cartDetail.length <= 0) {
        setShowTotal(false);
      } else {
        calculateTotal(resp.payload.cartDetail);
      }
    });
  };
  const showNoItemMessage = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown} />
      <div>You have no items</div>
    </div>
  );

  const transactionError = (data) => {
    console.log("Paypal Error");
  };
  const transactionCanceled = (data) => {
    console.log("Transaction Canceled");
  };
  const transactionSuccess = (data) => {
    dispatch(
      SuccessfulPurchase({
        cartDetail: userInfo.cartDetail,
        paymentData: data,
      })
    ).then((resp) => {
      if (resp.payload.successBuy) {
        setShowTotal(false);
        setShowSuccess(true);
      }
    });
    setTotal(false);
    setShowSuccess(true);
  };
  return (
    <UserLayout>
      <div>
        <h1>My Cart</h1>
        <div className="user_cart">
          <ProductBlock
            products={userInfo}
            type="cart"
            removeItem={(id) => removeFromCart(id)}
          />
          {showTotal ? (
            <div>
              <div className="user_cart_sum">
                <div>Total amount: $ {total}</div>
              </div>
            </div>
          ) : showSuccess ? (
            <div className="cart_success">
              <FontAwesomeIcon icon={faSmile} />
              <div>THANK YOU</div>
              <div>YOUR ORDER IS NOW COMPLETE</div>
            </div>
          ) : (
            showNoItemMessage()
          )}
        </div>
        {showTotal ? (
          <div className="paypal">
            <Paypal
              toPay={total}
              transactionError={(data) => transactionError(data)}
              transactionCanceled={(data) => transactionCanceled(data)}
              onSuccess={(data) => transactionSuccess(data)}
            />
          </div>
        ) : null}
      </div>
    </UserLayout>
  );
};

export default UserCart;
