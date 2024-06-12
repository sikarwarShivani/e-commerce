import React from "react";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import InfoIcon from '@mui/icons-material/Info';
import { Paper } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect } from "react";
import {Divider} from  "@mui/material";

export default function CartBill(props){
    const theme =useTheme()
   
    const cart=useSelector((state)=>state.products)
    console.log("chhhhh",cart)
    const cartData=Object.values(cart)
    var totaloffer=cartData.reduce((p1,p2)=>{
        return p1+(p2.offer*p2.qty)},0)

        var totalAmount=cartData.reduce((p1,p2)=>{
            return p1+(p2.rate*p2.qty)},0)

     var totalsavings=totalAmount-totaloffer
     
    useEffect(function(){
      props.refreshpage()
    })
    
    return(
        <Paper style={{marginRight:'35%',marginTop:'5%'}} >
        <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row',height:'auto',marginTop:'5%'}}>
            <div>
            <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center',marginLeft:15,marginTop:'5%'}}>
                   Item total
                    <span >{totaloffer}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                <span style={{display:'flex',color:'#9DB2BF',justifyContent:'flex-start',flexDirection:'row',alignItems:'center'}}>
                    <span style={{marginLeft:10}}>Small Cart Fee</span>
                    <InfoIcon  style={{color:'#9DB2BF',width:'10%'}} />
                    </span>
                    <span>&#8377;25</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                <span style={{display:'flex',color:'#9DB2BF',justifyContent:'flex-start',flexDirection:'row',alignItems:'center'}}>
                <span style={{marginLeft:10}}>Heading Charge</span>
                <span style={{color:'green'}}>
                  &#8377; (10 saved)
                </span>
                <InfoIcon  style={{color:'#9DB2BF',width:'6%',}} />
                    </span>
                    <span>&#8377;25</span>
                </div>

                <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row',}}>
                <span style={{display:'flex',color:'#9DB2BF',justifyContent:'flex-start',flexDirection:'row',alignItems:'center'}}>
                <span style={{marginLeft:10}}>Delivery Fee</span>
                <InfoIcon  style={{color:'#9DB2BF',width:'12%'}} />
                    </span>
                    <span style={{marginLeft:220}} > &#8377;5</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',color:'green',marginLeft:5}}>
                    Add Product Worth &#8377;114 to get Free delivery
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',color:'green'}}>
                <span style={{display:'flex',color:'#9DB2BF',justifyContent:'flex-start',flexDirection:'row',alignItems:'center',color:'black'}}>
                <span style={{marginLeft:10}}>To Pay</span>
            </span>
            <span style={{marginLeft:220,color:'#000000',marginLeft:280}}>&#8377;{totaloffer+5}</span>
            </div>
            </div>
         
        </div>
        <Divider style={{width:'23vw',color:'#ccc',marginBottom:30,marginTop:7}}/>
        </Paper>
    )
}