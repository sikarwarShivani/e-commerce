import { AppBar, Grid, Toolbar } from "@mui/material";
import { useStyles } from "./HeaderCss";
import { serverURL } from "../../NodeServices/FetchNodeServices";

export default function Border(props) {
  var classes = useStyles();

  var images = [
        { id: 1, Image: "delivery.png" },]
 
  return (
    
       
            <div style={{display:"block",
            
            }}>
        <div style={{height:'3.7rem',justifyContent: 'center',borderRadius: 0,paddingTop: '0.75rem',background: 'url(https://cdn.zeptonow.com/web-static-assets-prod/artifacts/6.8.7/_next/static/media/eta_normal_lg_bg.0a1da1af.png) 0 0/cover no-repeat',display:'flex'}} >
        <img alt="" src="https://www.zeptonow.com/images/cart/delivery-banner-icon.svg" style={{width:90,height:80,display:'flex',justifyContent:'center'}}/>
      <h5 style={{color: 'rgba(var(--color-base),var(--tw-text-opacity))',paddingLeft:'0.5rem',letterSpacing:'.05em',fontSize:'inherit',fontFamily:"Lato",margin:0,paddingTop:'1rem'}} >Delivering to you in <span class="font-heading">10 mins</span></h5>
</div> 
</div>
       
    
  )
}