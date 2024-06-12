import { Button, FormControl, InputAdornment, OutlinedInput } from "@mui/material"
import { useEffect, useState } from "react"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import OtpPopUp from "./OtpPopUp";

export default function PhoneNumberPopUp(props){
    const [status,setStatus]=useState(false)
    const [Dopen,setDopen]=useState(props.status)
    const [mobileno,setMobileno]=useState('')
    const [otpGen,setOtpGen]=useState('')
     
    const generateOtp=()=>{
      var otp=parseInt(Math.random()*8999)+1000
      setOtpGen(otp)
      alert(otp)
    }

    useEffect(function(){
        setDopen(props.status)
    },[props])

    const handleClick=()=>{
        generateOtp()
        setStatus(true)
    }

return(
    <div>
          <Dialog
           
            open={Dopen} 
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle style={{color:'grey',display:'flex' , alignItems:'center',justifyContent:'center',background:'#fff'}}>Phone Number Verification</DialogTitle>
            <DialogContent style={{background:'#e6e6f0'}}>
              <DialogContentText style={{display:'flex',marginTop:"7%",justifyContent:'center ',fontFamily:'Poppins',fontWeight:600}}>
                Enter Your Phone Number To Login/Sing Up
              </DialogContentText >
              <FormControl style={{ marginTop:"6%",display:'flex',justifyContent:'center',alignContent:'center'}}>
              <OutlinedInput onChange={(event)=>setMobileno( event.target.value)}
              style={{width:'60%',background:"#fff",marginLeft:'17%'}} startAdornment={<InputAdornment position="start"><PhoneIphoneIcon/>+91</InputAdornment>}
              />
             </FormControl>
              <div style={{marginTop:'3%',}}>
              <Button variant="contained" color="secondary" style={{width:'60%',marginLeft:'17%',marginBottom:15,marginTop:10}}  onClick={handleClick}>Next</Button>

              </div>
              <div style={{display:'flex',justifyContent:'center' ,color:'grey',fontWeight:'auto',marginTop:'2%'}}> By continuing you agree to our</div>
            <div style={{display:'flex',justifyContent:'center' ,color:'green',fontWeight:'600',marginTop:'2%',marginBottom:'4%',cursor:"pointer"}}> Term of service Privacy Policy </div>
            </DialogContent>
          </Dialog>
          
          <OtpPopUp otp={otpGen} 
           setStatus={props.setStatus} btnTitle={props.btnTitle} setBtnTitle={props.setBtnTitle} 
          mobileno={mobileno} status={status} userAddress={props.userAddress} setUserAddress={props.setUserAddress}  />
          </div>
)

}