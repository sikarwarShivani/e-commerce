import React, { createRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { KeyboardReturn } from "@mui/icons-material";
import { serverURL } from "../../NodeServices/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function BannerComponent(props) {
    var sliderRef = createRef()
    const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows:false
    };


    // var images = [
    //     { id: 2, Image: "1 (1).jpg" },
    //     { id: 3, Image: "1 (2).jpg" },
    //     { id: 4, Image: "1 (3).jpg" },
    //     { id: 4, Image: "1 (4).jpg" },
    //     { id: 5, Image: "1 (5).jpg" },
    //     { id: 6, Image: "1 (6).avif" },
    //     { id: 7, Image: "1 (7).avif" },
    //     { id: 8, Image: "1 (8).avif" }
    // ]
    const showImages = () => {
        return props.images.map((item) => {
            return (
                <div>
                    <img src={`${serverURL}/images/${item}`} style={{ width: "100%" }} />
                </div>
            )
        })

    }

    const handleBackClick = () => {

        sliderRef.current.slickPrev()

    }

    const handleForwardClick = () => {

        sliderRef.current.slickNext()
    }


    return (
        <div style={{ position: 'relative' }}>
        {matches?<><div style={{ position: 'absolute', top: '45%', left: '1%', zIndex: 1, width: 30, height: 30, borderRadius: 15, backgroundColor: '#fff', opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowBackIosIcon style={{ color: '#000' }} onClick={handleBackClick} />
            </div></>:<></>}
            <Slider {...settings} ref={sliderRef}>

                { showImages()}

            </Slider>

            {matches?<>  <div style={{ cursor:'pointer', position: 'absolute', top: '45%', right: '1%', zIndex: 1, width: 30, height: 30, borderRadius: 15, backgroundColor: '#fff', opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowForwardIos style={{ color: '#000' }} onClick={handleForwardClick} />
            </div></>:<></>}
        </div>
    );
}
