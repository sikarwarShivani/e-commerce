import React, { createRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../NodeServices/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SingleProductDetails(props) {
    var item=props.item
     var navigate=useNavigate()
  
    


   const  handleClick=(item)=>{
        navigate(props.url,{state:{product:item}})
    }


    
    const showImages = () => {
        
                return (
                    <div onClick={()=>handleClick(item)} style={{ margin:10}} >
                        <Paper style={ {cursor:'pointer',paddingBottom:3,margin:10,display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' ,width:160,height:200,}} variant="outlined">
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
    }


    return (
        <div>
        {showImages()}
        </div>
    );
}
