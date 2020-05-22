import React, { useCallback, useEffect, useState } from "react";
import PageTop from "../component/pageTop";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrands,
  getWoods,
  getShopProduct,
} from "../../state/actions/productsAction";
import CollapseCheckBox from "../component/CollapseCheckBox";
import CollapseRadio from "../component/CollapseRadio";
import { frets, price } from "../../resource/util/fixedCategories";

import LoadMoreCards from "./loadMoreCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";
import faTh from "@fortawesome/fontawesome-free-solid/faTh";

const Shop = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [grid, setGrid] = useState("");
  const [setup, setSetup] = useState({
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: [],
    },
  });

  const getCategories = useCallback(() => {
    dispatch(getBrands());
    dispatch(getWoods());
  }, [dispatch]);

  useEffect(() => {
    getCategories();
    dispatch(getShopProduct(setup.skip, setup.limit, setup.filters));
  }, [getCategories, dispatch]);

  const priceHandler = (filter) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(filter, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const filtersHandler = (filters, type) => {
    const newFilters = { ...setup.filters };
    newFilters[type] = filters;

    if (type === "price") {
      let priceValues = priceHandler(filters);
      newFilters[type] = priceValues;
    }
    showFilteredResults(newFilters);
    setSetup({
      ...setup,
      filters: newFilters,
    });
  };

  const showFilteredResults = (filters) => {
    dispatch(getShopProduct(0, setup.limit, filters)).then(() => {
      setSetup({
        ...setup,
        skip: 0,
        filters,
      });
    });
  };

  const loadMoreCards = () => {
    let skip = setup.skip + setup.limit;
    dispatch(
      getShopProduct(skip, setup.limit, setup.filters, products.toShop)
    ).then((results) => {
      setSetup({
        ...setup,
        skip,
        filters: results.payload.articles,
      });
    });
  };
  const gridHandler = () => {
    setGrid(!grid ? "grid_bars" : "");
  };
  //console.log(products.toShop);
  return (
    <div>
      <PageTop title="Browse Product" />
      <div className="container">
        <div className="shop_wrapper">
          <div className="left">
            {products.brands.length > 0 ? (
              <CollapseCheckBox
                initState={true}
                title="Brands"
                list={products.brands}
                filtersHandler={(filters) => filtersHandler(filters, "brand")}
              />
            ) : null}
            <CollapseCheckBox
              initState={false}
              title="Frets"
              list={frets}
              filtersHandler={(filters) => filtersHandler(filters, "frets")}
            />
            {products.woods.length > 0 ? (
              <CollapseCheckBox
                initState={false}
                title="Wood"
                list={products.woods}
                filtersHandler={(filters) => filtersHandler(filters, "wood")}
              />
            ) : null}
            <CollapseRadio
              initState={true}
              title="Price"
              list={price}
              filtersHandler={(filters) => filtersHandler(filters, "price")}
            />
          </div>
          <div className="right">
            <div className="shop_options">
              <div className="shop_grids clear">
                <div
                  className={`grid_btn ${grid ? "" : "active"}`}
                  onClick={() => gridHandler()}
                >
                  <FontAwesomeIcon icon={faTh} />
                </div>
                <div
                  className={`grid_btn ${!grid ? "" : "active"}`}
                  onClick={() => gridHandler()}
                >
                  <FontAwesomeIcon icon={faBars} />
                </div>
              </div>
            </div>
            <div>
              {products.toShop ? (
                <LoadMoreCards
                  grid={grid}
                  limit={setup.limit}
                  size={products.toShopSize}
                  products={products.toShop}
                  loadMore={() => loadMoreCards()}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
