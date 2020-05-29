import React, { useState, useEffect } from "react";

import ImageLightBox from "../LightBox/lightbox";

const ProdImg = ({ detail }) => {
  const [lightBox, setLightBox] = useState(false);
  const [imagePos, setImagePos] = useState(0);
  const [lightBoxImages, setLightBoxImages] = useState([]);

  useEffect(() => {
    if (detail.images.length > 0) {
      let lightboxImages = [];
      detail.images.forEach((element) => {
        lightboxImages.push(element.url);
      });
      setLightBoxImages(lightboxImages);
    }
  }, [detail.images]);

  const renderCardImage = (img) => {
    if (img) {
      if (img.length > 0) {
        return img[0].url;
      } else {
        return `/images/image_not_available.png`;
      }
    }
  };

  const lightBoxHandler = (pos) => {
    if (lightBoxImages.length > 0) {
      setLightBox(true);
      setImagePos(pos);
    }
  };

  const showThumbs = (detail) =>
    lightBoxImages.map((item, i) =>
      i > 0 ? (
        <div
          key={i}
          onClick={() => lightBoxHandler(i)}
          className="thumb"
          style={{ background: `url(${item}) no-repeat` }}
        />
      ) : null
    );

  return (
    <div className="product_image_container">
      <div className="main_pic">
        <div
          style={{
            background: `url(${renderCardImage(
              detail.images ? detail.images : null
            )}) no-repeat`,
          }}
          onClick={() => lightBoxHandler(0)}
        />
      </div>
      <div className="main_thumbs">{showThumbs(detail)}</div>
      {lightBox ? (
        <ImageLightBox
          id={detail.id}
          images={lightBoxImages}
          pos={imagePos}
          open={lightBox}
          onClose={() => setLightBox(!lightBox)}
        />
      ) : null}
    </div>
  );
};

export default ProdImg;
