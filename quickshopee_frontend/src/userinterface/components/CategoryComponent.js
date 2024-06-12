import { useEffect, useState } from 'react';
import { getData } from "../../NodeServices/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import { useStyles } from './CategoryComponentCss';
import Slider from "react-slick";
import { Divider } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function CategoryComponent(props) {

    const [category, setcategory] = useState([])
    const theme = useTheme();
    const classes = useStyles()

    const fetchAllCategories = async () => {
        var result = await getData('userinterface/fetch_footer_categories')
        setcategory(result.data)
    }

    useEffect(() => {
        fetchAllCategories()
    },[])


    const data = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {category.map((item) => {
                    return (
                        <div style={{ padding: '10px', margin: '10px', boxShadow: '0px 0px 0px 2px lightgrey', borderRadius: '10px' }}>{item.categoryname}</div>
                    )
                })}
            </div>
        )
    }
    return (
        <div >
            <Divider  style={{margin:'10px 0px'}}/>
            <div style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                {props.title}
            </div>
            {data()}
        </div>
    )
}
