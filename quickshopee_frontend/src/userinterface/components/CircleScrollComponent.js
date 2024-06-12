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
import { useNavigate } from "react-router-dom";

export default function CircleScrollComponent(props) {
    var sliderRef = createRef()
    const theme = useTheme();
    const navigate=useNavigate()
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const md = useMediaQuery(theme.breakpoints.down('md'));

    var color = ['#58B19F', '#D6A2E8', '#F8EFBA', '#CAD3C8', '#ffcccc', '#b8e994', '#ccae62', '#ea8685', '#33d9b2']

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: sm?2:md?3:lg?4:6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false


    };


    // var images = [
    //     { id: 2, Image: "Dairy & Bakery.png", name: 'Dairy & Bakery' },
    //     { id: 3, Image: "Fruits & Vegetables.png", name: 'Fruits & Vegetables' },
    //     { id: 4, Image: "Snacks & Branded Foods.avif", name: 'Snacks & Branded Foods' },
    //     { id: 4, Image: "rice.png", name: 'rice' },
    //     { id: 5, Image: "Detergents.png", name: 'Detergents' },
    //     { id: 6, Image: "oil.png", name: 'oil' },
    //     { id: 7, Image: "oil.png", name: 'oil' }
    // ]

    const showImages = () => {
       
         

        return props.category.map((item) => {
                return (
                    <div onClick={()=>handleClick(item)} style={{cursor:'pointer'}}>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ padding:1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width:sm?80:160, height:sm?80:160, borderRadius:sm?45:80, background: color[parseInt(Math.random() * (color.length - 1))] }}>
                                <img src={`${serverURL}/images/${item.icon}`} style={{  width: "80%" }} />
                            </div>
                            
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                            <div style={{ textAlign: 'center',  width: '100%' }}>{item.categoryname}</div>
                        </div>
                    </div>)
            })
        

    }

    const handleBackClick = () => {
        sliderRef.current.slickPrev()
    }

    const handleForwardClick = () => {
        sliderRef.current.slickNext()
    }

    const handleClick=(item) =>{ 
        // alert(JSON.stringify(item))
        navigate("/ProductViewWithCategory",{state:{categoryid:item.category_id}})
    }

    return (
        <div >
            <div style={{ padding:5, display: 'flex', justifyContent: 'space-between', alignItems: 'center',marginLeft:sm?15:30,marginRight:15 }}>
                <div style={{ fontFamily: 'Poppins', fontWeight:sm?400:700 }}>
                    {props.title}
                </div>
              {!lg?<>  <div style={{ display: 'flex', flexDirection: 'row', width: '5%' }}>
                    <div >
                        <ArrowBackIosIcon style={{ color: '#000' }} onClick={handleBackClick} />
                    </div>
                    <div>
                        <ArrowForwardIos style={{ color: '#000' }} onClick={handleForwardClick} />
                    </div>
                </div></>:<></>}
            </div>
            <Slider {...settings} ref={sliderRef}>
                {showImages()}
            </Slider>

        </div>
    );


    
}
