import { Button } from "@mui/material";
import { Divider } from '@mui/material';
import SelectProductUnit from "./SelectProductUnit";
export default function SelectProductName({product,refreshpage}) {

    const ShowProductName=()=>{
        return(
            <div>
             <div style={{width:'98%'}}>
            <div style={{display:'flex',width:'98%',padding:5,marginLeft:'10%',marginTop:'10%',fontFamily:'Poppins '}}>
            <div style={{fontSize:13,fontWeight:'bold'}}>
                {'XXXXX'} / {'XXXXXX'} /
                </div>
              <div>
                {product.productlistname}
              </div>
              </div>
              <div style={{display:'flex',width:'98%',padding:5,marginLeft:'10%',fontFamily:'Poppins '}}>
             {product.productlistname}
             </div>
             
             
             <div style={{display:'flex',width:'98%',padding:5,marginLeft:'10%',fontFamily:'Poppins '}}>
                View All By{'amul'}
             </div>
             
             <Divider  style={{width:'95%',padding:5,marginLeft:"8%"}}/>
            <SelectProductUnit product={product} refreshpage={refreshpage}/>
            </div>
</div>
        )
    }
    return(
        <div>
          {ShowProductName()}  
        </div>
    )

}