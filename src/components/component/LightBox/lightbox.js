import React, { useState, useEffect, useCallback } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";

const ImageLightBox = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(props.open);
  const [images, setImages] = useState([]);
  const [currentImage] = useState(props.pos);

  const UpdateImages = useCallback(() => {
    if (props.images) {
      let images = [];
      props.images.forEach((element) => {
        images.push({ source: `${element}` });
      });
      setImages(images);
    }
    return images;
  }, [props.images]);

  useEffect(() => {
    UpdateImages();
  }, [UpdateImages]);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
    props.onClose();
  };
  return (
    <ModalGateway>
      {modalIsOpen ? (
        <Modal onClose={toggleModal}>
          <Carousel views={images} currentIndex={currentImage} />
        </Modal>
      ) : null}
    </ModalGateway>
  );
};

export default ImageLightBox;
