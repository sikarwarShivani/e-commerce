import { Button, Paper } from "@mui/material";
import React, { useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneNumberPopUp from '../components/PopUpComponent/PhoneNumberPopUp'

export default function CartLocation(props){
const [status,setStatus]=useState(false)

const handleClick=()=>{
    setStatus(true)
}


    return(
        <Paper style={{marginRight:'35%',marginTop:'5%'}} >
        <div style={{display:'flex',flexDirection:'column',height:'auto'}}>
    <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
    <LocationOnIcon style={{marginTop:'2%'}}/>
   <div style={{marginTop:'2%'}}> Your Location </div>
   </div>
   <Button variant="contained" color="secondary" style={{width:'70%',marginLeft:'15%',marginBottom:15,marginTop:10}}  onClick={handleClick}>Go</Button>
        </div>
        <PhoneNumberPopUp 
        setStatus={setStatus } 
        setBtnTitle={props.setBtnTitle} 
        status={status}
        userAddress={props.userAddress} setUserAddress={props.setUserAddress}/>
        </Paper>
    )
}