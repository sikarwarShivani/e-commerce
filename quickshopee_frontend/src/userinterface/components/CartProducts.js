import React from "react";
import { serverURL } from "../../NodeServices/FetchNodeServices";
import { Paper, divider } from "@mui/material";
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch } from "react-redux";
import {useState} from "react";
export default function CartProducts({cartData ,refreshpage}) {
    
    const dispatch=useDispatch()

    const handleQtyChange = ( selectedProduct,value) => {
        var product=selectedProduct
        if(value>=1){
        
        product['qty']=value
        dispatch({type:'ADD_PRODUCT',payload:[product.productlistid,product]})
        }
        else
        {product['qty']=0
        dispatch({type:'Delete_PRODUCT',payload:[product.productlistid,product]})
        }
        refreshpage()
      };


    return(<Paper style={{width:'auto',borderRadius:'10px',marginLeft:'20%',marginRight:'15%',marginTop:'2%'}} >
       
            {
        cartData.map((item)=>{
                    return(
   <div style={{display:'flex',marginLeft:10}}>
    <div  style={{display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'2%'}}>
    <img src={`${serverURL}/images/${item.picture}`} style={{width:60,height:60, }} />
    </div>
    <div style={{marginLeft:'2%'}} >
    <div style={{display:'flex'}}>{item.productlistname}</div>
    {item.offer>0?<div>&#8377;{item.offer}/{item.weight}{item.Type}</div>:<div>&#8377;{item.offer}/{item.weight}{item.Type}</div>}
    <div>{item.weight}{item.Type}</div>
    {item.offer>0?<div style={{display:'flex'}}><s>&#8377;{item.rate*item.qty}</s><div>&#8377;{item.offer*item.qty}</div></div>:
        <div><div style={{display:'flex'}}><s>&#8377;{item.rate*item.qty}</s></div></div> }</div>
       
        <div style={{display:'flex',justifyContent:'center',marginTop:20,marginLeft:'25%'}}>
        <PlusMinusComponent qty={item?.qty}
         onChange={(value)=>handleQtyChange(item,value)} 
         />
            </div>
            </div>
        
       
        
                    )
       })
}

</Paper>
       
    )
           }                        
                                    
                                        
                                    
