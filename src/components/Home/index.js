import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeSlider from "./homeSlider";
import HomePromotion from "./homePromotions";
import { getProductsData } from "../../state/actions/productsAction";
import CardBlock from "../component/cards/cardBlock";
import CircularProgress from "@material-ui/core/CircularProgress";
const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const getProducts = useCallback(() => {
    dispatch(getProductsData("sold")).then((response) => {});
    dispatch(getProductsData("createdAt")).then((response) => {});
  }, [dispatch]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div>
      <HomeSlider />
      {products.bySell.length > 0 ? (
        <CardBlock title="Best Selling Guitars" list={products.bySell} />
      ) : (
        <CircularProgress style={{ color: "#2196F3" }} thickness={3} />
      )}
      <HomePromotion />
      {products.byArrival.length > 0 ? (
        <CardBlock title="Latest Arrivals" list={products.byArrival} />
      ) : (
        <CircularProgress style={{ color: "#2196F3" }} thickness={3} />
      )}
    </div>
  );
};

export default Home;
