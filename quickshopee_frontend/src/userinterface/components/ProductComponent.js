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
import { Button, Grid, Paper } from "@mui/material";


export default function ProductComponent(props) {
    var sliderRef = createRef()
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const md = useMediaQuery(theme.breakpoints.down('md'));

    

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


    

    const showImages = () => {
        return props.products.map((item) => {
                return (
                    
                        <div style={{margin:'20px'}} >
                        <Paper style={ { paddingBottom:3,margin:10,display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' ,width:160,height:200,}} variant="outlined">
                            <div style={{ padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width:140}}>
                                <img src={`${serverURL}/images/${item.picture}`} style={{ width: "70%" }} />
                            </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}/>
                            <div style={{ textAlign: 'center',  width: '100%',marginBottom:10 }}>{item.productlistname}</div>
                            <div style={{display: 'flex', flexDirection: 'column',width:178, fontFamily: 'Poppins',padding:2}}>
                                <div style={{paddingLeft:10,fontSize:12}}> {item.weight}</div>
                                <div style={{display: 'flex', flexDirection: 'row',justifyContent:'space-between'}}>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{paddingLeft:10,fontSize:12}}>&#8377;{item.rate}</div>
                                <div style={{paddingLeft:10,fontSize:12}}>&#8377;{item.offer}</div>
                                </div>
                                <div style={{paddingRight:12}}>
                                    <Button variant="outlined">ADD</Button>
                                </div>
                                </div>
                            </div>
                        </Paper>
                        
                    </div>)
            })
        

    }

    const handleBackClick = () => {
        sliderRef.current.slickPrev()
    }

    const handleForwardClick = () => {
        sliderRef.current.slickNext()
    }

    return (
        <div>
            <div style={{ padding:2, display: 'flex', justifyContent: 'space-between', alignItems: 'center',marginLeft:sm?15:40,marginRight:15 }}>
                <div style={{ fontFamily: 'Poppins', fontSize:!lg?20:18 }}>
                    {props.title}
                </div>
              {!lg?<>  <div style={{ display: 'flex', flexDirection: 'row', width: '5%'  }}>
                    <div >
                        <ArrowBackIosIcon style={{ color: '#000' }} onClick={handleBackClick} />
                    </div>
                    <div >
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
