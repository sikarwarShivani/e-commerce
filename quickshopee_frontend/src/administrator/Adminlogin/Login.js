
import React, { useState } from "react";
import { Avatar, Box, Button, Card, Grid, Tab, TextField } from "@mui/material";
import shopping_image from '../Adminlogin/shopping_image.png'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { postData } from "../../NodeServices/FetchNodeServices";
import Swal from "sweetalert2";
import { json, useNavigate } from "react-router-dom";


const Login = () => {

  var navigate = useNavigate()
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')

  const handleClick = async () => {
    var result = await postData('adminlogin/check_admin_login', { emailId: emailId, password: password })

    if (result.status) {
      localStorage.setItem('ADMIN', JSON.stringify(result.data))
      navigate('/dashboard')

    }
    else {
      alert(result.status)
      Swal.fire({
        icon: 'error',
        title: "Server Error",
        text: "Invalid Submission Failed",
        showConfirmButton: false,
        timer: 2000
      })
    }

  }

  return (
    <div style={{ background: '#dff9fb' }}>
      <Grid container sx={{ height: '90vh', background: '#dff9fb' }}  >
        <Grid item lg={7} sm={5} sx={{
          background: `url(${shopping_image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: 'none', sm: 'block' },
        }} >

        </Grid>


        <Grid item lg={5} sm={7} >

          <Card sx={{ width: '100%', height: '100%' }}
          >

            <Box sx={{
              my: 4,
              mx: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>

              <Avatar sx={{ m: 0, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Tab label='Login' sx={{ textTransform: 'none', fontWeight: 'bold' }}></Tab>
              {/* <Box component="form" noValidate sx={{ mt: 1 }}> */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="emailId"
                label="Email Address"
                name="emailId"
                autoComplete="email"
                autoFocus
                variant='outlined'
                placeholder="Email Address"
                onChange={(event) => setEmailId(event.target.value)}

              />
              <TextField
                margin="normal"
                required
                variant='outlined'
                placeholder="Password"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                onClick={handleClick}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              {/* </Box> */}

            </Box>
          </Card>

        </Grid>
      </Grid>


    </div>
  )

}
export default Login;