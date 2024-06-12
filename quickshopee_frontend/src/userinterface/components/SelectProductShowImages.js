import { createRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { serverURL } from "../../NodeServices/FetchNodeServices";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { postData } from "../../NodeServices/FetchNodeServices";

import { useEffect } from "react";

export default function SelectProductShowImages({ product }) {
  var sliderRef = createRef();
  const theme = useTheme();
  const navigate = useNavigate();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const [getImages, setImages] = useState([]);
  const [image, setImage] = useState("");

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: sm ? 2 : md ? 3 : lg ? 4 : 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  useEffect(function () {
    fetchAllPicture();
  }, []);

  const fetchAllPicture = async () => {
    var result = await postData(
      "userinterface/fetch_all_multipleimages_by_productid",
      { productListId: product.productlistid }
    );
    console.log("PICTURE", result.data[0].picture);
    var pic = result.data[0].picture.split(",");
    setImages(pic);
    setImage(`${serverURL}/images/${pic[0]}`);
    alert(JSON.stringify(pic))
  };

  const handleChangeimage = (item) => {
    setImage(`${serverURL}/images/${item}`);
  };

  const showImages = () => {
    return getImages.map((item) => {
      return (
        <div
          onClick={() => handleChangeimage(item)}
          style={{ cursor: "pointer" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "64px",
              width: "64px",
              border: "1px solid rgb(242, 242, 242)",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            <img src={`${serverURL}/images/${item}`} style={{ width: "80%" }} />
          </div>
        </div>
      );
    });
  };

  const handleBackClick = () => {
    sliderRef.current.slickPrev();
  };

  const handleForwardClick = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div>
      <div
        style={{
          width: "50%",
          marginLeft: "20%",
          marginTop: "5%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={image} style={{ width: "80%", height: "20%" }} />
      </div>
      <div style={{ position: "relative" }}>
        {!lg ? (
          <>
            <div
              style={{
                position: "absolute",
                top: "45%",
                left: "1%",
                zIndex: 1,
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: "#fff",
                opacity: 0.7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: "20px",
              }}
            >
              <ArrowBackIosIcon
                style={{ color: "#000" }}
                onClick={handleBackClick}
              />
            </div>
          </>
        ) : (
          <></>
        )}
        <Slider {...settings} ref={sliderRef}>
          {showImages()}
        </Slider>

        <div
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "45%",
            right: "1%",
            zIndex: 1,
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: "#fff",
            opacity: 0.7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: "20px",
          }}
        >
          <ArrowForwardIos
            style={{ color: "#000" }}
            onClick={handleForwardClick}
          />
        </div>
      </div>
    </div>
  );
}
