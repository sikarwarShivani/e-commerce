import { Button, Dialog,  Input,  InputLabel, Paper, TextField } from "@mui/material";
import React from "react";
import { Grid,MenuItem,FormControl,Select } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react"
import SearchIcon from '@mui/icons-material/Search';
import { postData } from "../../../NodeServices/FetchNodeServices";


export default function AddressPopUp(props) {
 const [Dopen,setDopen]=useState(props.status)
 const [title,setTitle]=useState('')
 const [name,setName]=useState('')
 const [emailid,setEmailid]=useState('')
 const [addressOne,setAddressOne]=useState('')
 const [addressTwo,setAddressTwo]=useState('')
 const[city,setCity]=useState('')
 const[state,setState]=useState('')
 const[zipcode,setZipCode]=useState('')


const handleSubmit=async()=>{
   var body={emailid:emailid, mobileno:props.mobileno, addressone:addressOne, addresstwo:addressTwo, city:city, state:state, pincode:zipcode, username:title+""+name, addressstatus:"default"}
   var result=await postData('userinterface/add_address',body)

  }

  useEffect(
    function () {
      setDopen(props.status);
    },
    [props]
  );

  return (
    <Dialog
      open={Dopen}
      fullWidth
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >

      <Grid container spacing={2} alignItems="center" >
        <Grid item lg={12} sx={{ fontWeight: 900 }}> Location Information</Grid>
        <Grid item xs={6}>
          <Grid container alignItems="center">
            <Grid item lg={12} sx={{ fontWeight: 800, }}>
            <Paper style={{background:'red',marginLeft:'5%'}}>
            <SearchIcon style={{ marginLeft:'5%',marginTop:"4%",fontSize:'35'}}/>
             </Paper>
            </Grid>
            <Grid item lg={12} >
            <LocationOnIcon fontSize="large" style={{marginBottom:'100%'}} />
            </Grid>
          </Grid>
          
        </Grid>
        <Grid item xs={6}>
        <Grid container spacing={2} alignItems="center" style={{
        background: '#fff',
        height: 'auto',
        padding: '10px',
        borderRadius: '15px'}}>
        <Grid item lg={12} sx={{ fontWeight: 500 }}> Enter Location Information</Grid>
        <Grid item lg={4} >
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Title</InputLabel>
                    <Select  
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value="Title"
                        label="title"
                        onChange={(event)=>{setTitle(event.target.value)}}

                       
                        >
                        <MenuItem value="Mr">Mr</MenuItem>
                        <MenuItem value="Miss">Miss</MenuItem>
                        <MenuItem value="Miss">Mrs</MenuItem>
                       
                     </Select>
                     </FormControl>
                     </Grid>
                     <Grid item lg={8}>
                    <TextField type="text" label='UseName'
                     placeholder="Userneme" variant="outlined" fullWidth 
                     onChange={(event)=>{setName(event.target.value)}}
                  />
               </Grid>

               <Grid item lg={12}>
                    <TextField type="text" label=' Email Address'
                     placeholder="Email Address" variant="outlined" fullWidth 
                     onChange={(event)=>{setEmailid(event.target.value)}}
                  />
               </Grid>

               <Grid item lg={12}>
                    <TextField type="text" label='address1'
                     placeholder="address1" variant="outlined" fullWidth 
                     onChange={(event)=>{setAddressOne(event.target.value)}}
                  />
               </Grid>
               <Grid item lg={12}>
                    <TextField type="text" label='address2'
                     placeholder='address2' variant="outlined" fullWidth
                     onChange={(event)=>{setAddressTwo(event.target.value)}} 
                  />
               </Grid>


               <Grid item lg={6}>
                    <TextField type="text" label='City'
                     placeholder="City" variant="outlined" fullWidth 
                     onChange={(event)=>{setCity(event.target.value)}}
                  />
               </Grid>                                                                                                                           

               <Grid item lg={6}>
                    <TextField type="text" label='State'
                     placeholder="State" variant="outlined" fullWidth 
                     onChange={(event)=>{setState(event.target.value)}}
                  />
               </Grid>
              
               <Grid item lg={12}>
                    <TextField type="text" label='ZipCode'
                     placeholder="Zipcode" variant="outlined" fullWidth 
                     onChange={(event)=>{setZipCode(event.target.value)}}
                 />
               </Grid>
               <Grid item lg={12}>
                  <Button color="primary" variant="contained" fullWidth 
                  onClick={()=>handleSubmit()}>
                     Save & Continue
                  </Button>
               </Grid>
        </Grid>
          </Grid>
        </Grid>
      
    </Dialog>
  );
}
