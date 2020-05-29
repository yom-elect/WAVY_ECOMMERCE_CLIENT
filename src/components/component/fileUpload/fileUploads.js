import React, { useState, useCallback } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { USER_SERVER } from "../../../resource/util/misc";

const FileUploads = (props) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [fresh, setFresh] = useState(true);

  const reset = useCallback(() => {
    if (props.reset === fresh) {
      console.log(props.reset);
      setUploadedFiles([]);
      setFresh(true);
    }
  }, [props, fresh]);

  reset();

  const onDrop = async (files) => {
    setUploading(true);
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
      withCredentials: true,
    };
    formData.append("file", files[0]);
    try {
      const request = await axios.post(
        `${USER_SERVER}/uploadimage`,
        formData,
        config
      );
      const resData = await request.data;
      //   console.log(resData);
      if (resData) {
        setUploading(false);
        setUploadedFiles((prevState) => {
          return [...prevState, resData];
        });

        props.imagesHandler(uploadedFiles);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onRemove = async (id) => {
    try {
      const request = await axios.get(
        `${USER_SERVER}/removeimage?public_id=${id}`,
        {
          withCredentials: true,
        }
      );
      const resData = await request.data;
      if (resData) {
        let images = uploadedFiles.filter((item) => {
          return item.public_id !== id;
        });
        setUploadedFiles(images);
        props.imagesHandler(images);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const showUploadedImages = () =>
    uploadedFiles.map((item) => (
      <div
        className="dropzone_box"
        key={item.public_id}
        onClick={() => onRemove(item.public_id)}
      >
        <div
          className="wrap"
          style={{ background: `url(${item.url}) no-repeat` }}
        />
      </div>
    ));

  return (
    <div>
      <section>
        <div className="dropzone clear">
          <Dropzone
            onDrop={(acceptedFiles) => onDrop(acceptedFiles)}
            multiple={false}
            className={"dropzone_box"}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div className="wrap" {...getRootProps()}>
                  <FontAwesomeIcon icon={faPlusCircle} size={"3x"} />
                  <input {...getInputProps()} />
                  {uploading ? (
                    <div
                      className="dropzone_box"
                      style={{
                        textAlign: "center",
                        paddingTop: "60px",
                      }}
                    >
                      <CircularProgress
                        style={{ color: "#00bcd4" }}
                        thickness={7}
                      />
                    </div>
                  ) : null}
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
          {showUploadedImages()}
        </div>
      </section>
    </div>
  );
};

export default FileUploads;
