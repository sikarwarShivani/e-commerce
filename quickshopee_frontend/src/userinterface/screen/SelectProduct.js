import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import SelectProductShowImages from '../components/SelectProductShowImages';
import { getData, postData } from "../../NodeServices/FetchNodeServices";
import SelectProductName from '../components/SelectProductName';
import { Divider } from '@mui/material';
import WhyQuickShope from '../components/WhyQuickShop';

export default function SelectProduct(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const[refresh,setRefresh]=useState(false)
    var refreshpage=()=>{
        setRefresh(!refresh)
    }

    console.log("location",location.state.product)
    var product = location.state.product
    // alert(product)
    return (<div>
        
          <Header />

        <div style={{ width: '100%' ,display:'flex' }}>
        <div style={{ width: '50%' }}>
            <SelectProductShowImages product={product} />
           
        </div>
        <Divider orientation='vertical' flexItem style={{marginTop:"2%"}}/>
        <div style={{ width: '40%' }}>
            <SelectProductName product={product} refreshpage={refreshpage} />
            <WhyQuickShope />
        </div>
        </div>

        <Divider orientation='horizontal' flexItem style={{marginTop:"2%",width:'100%'}}/>
    </div>
    )
}