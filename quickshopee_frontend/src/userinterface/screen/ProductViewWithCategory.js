import { useEffect, useState } from 'react';
import Header from '../components/Header';
import CategoryListComponent from '../components/CategoryListComponent';
import SingleProductDetails from '../components/SingleProductDetails';
import { Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';


import { getData, postData } from "../../NodeServices/FetchNodeServices";

export default function ProductViewWithCategory(props) {
    const location = useLocation()
    const navigate = useNavigate()
    console.log("location", location)

    const [subcategory, setSubcategory] = useState([])
    const [subCategoryrName, setSubcategoryName] = useState('')
    const [subcategoryId, setSubcategoryId] = useState('')
    const [productList, setProductList] = useState([])
    const fetchAllSubcategory = async () => {
        var result = await postData(
            "userinterface/fetch_all_subcategory_by_categoryid",
            { categoryid: location.state.categoryid }
        )
        setSubcategory(result.data);
    };

    const fetchAllProducts = async (scid) => {
        var result = await postData(
            "userinterface/fetch_all_Products_by_subcategoryid",
            { subcategoryid: scid }
        )
        setProductList(result.data);
    };

    
    const fetchAllProductsbyCategory = async () => {
        var result = await postData( "userinterface/fetch_products_by_categoryid ",
            { categoryId: location.state.categoryid  }
        )
    
        setProductList(result.data);
    };

    useEffect(function(){
        fetchAllProductsbyCategory()
    },[])


    const getSubCategoryId = (scid,sname) => {
        setSubcategoryName(sname)
        setSubcategoryId(scid)
        fetchAllProducts(scid)

    }

    useEffect(function () {
        fetchAllSubcategory()
    }, [])

    const ListofProducts = () => {
        return productList.map((item) => {
            return <SingleProductDetails item={item} url={"/selectproduct"} />
        })
    }


    return (
        <div>
            <Header />
            <div >
                <Grid container spacing={2} padding={1} >
                    <Grid item xs={2}>
                        <CategoryListComponent data={subcategory} getSubCategoryId={getSubCategoryId} />
                    </Grid>
                    <Grid item xs={10}>
                        <div>
                            {subCategoryrName} ({productList.length}) Items
                        </div>
                        <div style={{ display: 'flex', flexDirection: "row", flexWrap: 'wrap', }} >
                            {ListofProducts()}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}