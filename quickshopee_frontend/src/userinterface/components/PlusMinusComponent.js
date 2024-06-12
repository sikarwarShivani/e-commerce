import { useEffect, useState } from "react";
import { Button } from "@mui/material";
export default function PlusMinusComponent(props){
    const[value,setValue]=useState()



    useEffect(()=>{
        setValue(props.qty)
    },[props])

    const handlePlusClick=()=>{
        setValue((prev)=>{
            if(prev<5){
                props.onChange(prev+1)
          return  prev+1}
          else{
            props.onChange(prev)
          return prev}
        })
    }

    const handleMinusClick=()=>{
        setValue((prev)=>{
            if(prev>=1){
                props.onChange(prev-1)
          return  prev-1}
         
        })
    } 
    return(
        <div>
            <div style={{padding:10}}>
           {value==0?<Button onClick={handlePlusClick} variant="outlined" color="success">Add</Button>:
           <div style={{border:"1px solid #3498db",width:100,display:"flex",justifyContent:"space-between",borderRadius:5}}>
            <div onClick={handlePlusClick}  style={{cursor:'pointer',background:'#3498db',color:'#fff',width:35,display:"flex",justifyContent:'center'}}>+</div>
           {value}
            <div onClick={handleMinusClick}  style={{cursor:'pointer',background:'#3498db',color:'#fff',width:35,display:"flex",justifyContent:'center'}}>-</div>
            </div>}
            </div>
        </div>
    )
}