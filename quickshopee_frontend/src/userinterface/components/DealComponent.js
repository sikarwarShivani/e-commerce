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


export default function DealComponent(props) {
    var sliderRef = createRef()
    const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows:false
        

    };


    var images = [
        { id: 1, Image: "d1.avif" },
        { id: 2, Image: "d2.avif" },
        { id: 3, Image: "d3.avif" },
        { id: 4, Image: "d4.avif" },
        { id: 5, Image: "d5.avif" },
        { id: 6, Image: "d6.avif" },
    ]

    const showImages = () => {

        return images.map((item) => {

            return (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{ padding:1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  }}>
                    <img src={`${serverURL}/images/${item.Image}`} style={{ width: "92%" }} />
                </div>
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
        {matches?<><div style={{ position: 'absolute', top: '45%', left: '2%', zIndex: 1, width: 30, height: 30, borderRadius: 15, backgroundColor: '#fff', opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowBackIosIcon style={{ color: '#000' }} onClick={handleBackClick} />
            </div></>:<></>}
            <Slider {...settings} ref={sliderRef}>

                {showImages()}

            </Slider>

            {matches?<>  <div style={{ cursor:'pointer', position: 'absolute', top: '45%', right: '2%', zIndex: 1, width: 30, height: 30, borderRadius: 15, backgroundColor: '#fff', opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowForwardIos style={{ color: '#000' }} onClick={handleForwardClick} />
            </div></>:<></>}
        </div>
    );
}
