import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { Button, Grid } from '@mui/material';
import CartProducts from '../../components/CartProducts';
import Border from '../../components/Border';
import CartBill from '../../components/CartBill';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CartLocation from '../../components/CartLocation';
import DeliveryPartnerTip from '../../components/DeliveryPartnerTip';

export default function Cart() {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const md = useMediaQuery(theme.breakpoints.down('md'));

     const cart=useSelector((state)=>state.products)
     const cartData=Object.values(cart)
     const [userAddress,setUserAddress]=useState([])
    const [btnTitle,setBtnTitle]=useState("Go") 
     const[refresh,setRefresh]=useState(false)
    var refreshpage=()=>{
        setRefresh(!refresh)
    }

    return(
       
        <div>
        <Header/>
            <div>
                <Border/>
            </div>
            <div style={{display:'flex',paddingTop:'4%',justifyContent:'space-between'}}>
            <div style={{display:'flex',marginLeft:'14%'}}>
            
           <h3 style={{fontFamily:'Lato',fontSize: '1.125rem',lineHeight: '1.75rem',fontWeight:'100%',
    letterSpacing: '.05em'}}> cart({cartData.length } Items)</h3>
            </div>
       <div style={{color: 'rgba(var(--color-primary),var(--tw-text-opacity))',fontSize: '.875rem',
       lineHeight: '1.125rem',borderWidth: '1px',borderBlock:'#3498db',
       borderColor:'#3498db',borderRadius: '0.375rem',marginRight:'10%',marginTop:'14px'}}>
            <Button variant='outlined' >empty</Button>
        </div>
        </div> 
        <Grid container spacing={3}>
            <Grid item xs={sm?12:6}>
          <CartProducts cartData={cartData}  refreshpage={refreshpage}/>
          <DeliveryPartnerTip/>
            </Grid>
            <Grid item xs={sm?12:6}>
          <CartBill refreshpage={refreshpage}/>
          <CartLocation btnTitle={btnTitle} setBtnTitle={setBtnTitle}
           userAddress={userAddress} setUserAddress={setUserAddress} />
            </Grid>

        </Grid>
        </div>
        

    )
}