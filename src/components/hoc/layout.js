import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Header from "./../Header_footer/Header";
import Footer from "./../Header_footer/Footer";
import { getSiteInfo } from "../../state/actions/siteActions";

const Layout = (props) => {
  const dispatch = useDispatch();
  const siteInfo = useSelector((state) => state.site);

  useEffect(() => {
    if (Object.keys(siteInfo).length === 0) {
      dispatch(getSiteInfo());
    }
  }, [dispatch, siteInfo]);

  return (
    <div>
      <Header />
      <div className="page_container">{props.children}</div>
      <Footer data={siteInfo} />
    </div>
  );
};

export default Layout;
