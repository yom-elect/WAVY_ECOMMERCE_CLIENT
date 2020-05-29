import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTop from "../pageTop";
import {
  getProductDetail,
  clearProductDetail,
} from "../../../state/actions/productsAction";
import { addToCart } from "../../../state/actions/userAction";

import ProdInfo from "./prodInfo";
import ProdImg from "./prodImg";

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const fetchInfo = useCallback(() => {
    const id = props.match.params.id;
    dispatch(getProductDetail(id)).then((resp) => {
      if (resp.payload === "N") {
        props.history.push("/");
      }
    });
  }, [props, dispatch]);

  useEffect(() => {
    fetchInfo();

    return () => {
      dispatch(clearProductDetail());
    };
  }, [fetchInfo, dispatch]);

  const addToCartHandler = (id) => {
    dispatch(addToCart(id));
  };

  return (
    <div>
      <PageTop title="Product detail" />
      <div className="container">
        {products.prodDetail.name && products.prodDetail !== "N" ? (
          <div className="product_detail_wrapper">
            <div className="left">
              <div style={{ width: "500px" }}>
                <ProdImg detail={products.prodDetail} />
              </div>
            </div>
            <div className="right">
              <ProdInfo
                addToCart={(id) => addToCartHandler(id)}
                detail={products.prodDetail}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductDetail;
