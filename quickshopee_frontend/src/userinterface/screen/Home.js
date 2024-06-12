import { useEffect, useState } from 'react';
import Header from '../components/Header';
import BannerComponent from "../components/BannerComponent";
import CircleScrollComponent from "../components/CircleScrollComponent";
import ProductComponent from "../components/ProductComponent";
import DealComponent from "../components/DealComponent";
import CategoryComponent from '../components/CategoryComponent';



import { getData, postData } from "../../NodeServices/FetchNodeServices";
import Category from "../../administrator/categories/Category";
export default function Home(props) {

    const [banners, setbanners] = useState([])
    const [category, setcategory] = useState([])
    const [subCategory, setsubcategory] = useState([])
    const [products, setProducts] = useState([])
    const [Trending, setTrending] = useState([])
    const fetchAllBanners = async () => {
        var result = await getData('userinterface/fetch_all_banners')
        var images = result.data.banners.split(",")
        setbanners(images)      
    }

    const fetchAllCategories = async (status) => {
        var body = { status: status }
        var result = await postData('userinterface/fetch_all_category', body)

        if (status == 'Continue')
            setcategory(result.data)
        else if (status == 'Trending')
            setTrending(result.data)
    }
    const fetchProducts = async (subCategoryName) => {
      
        var body = { subCategoryName: subCategoryName }
        var result = await postData('userinterface/fetch_products_by_category',body)

        setProducts(result.data)
    }

    useEffect(function () {
        fetchAllBanners()
        fetchAllCategories('Continue')
        fetchAllCategories('Trending')
        fetchProducts('Milk,Bread & Buttor')
    }, [])




    return (
        <div>
            <Header />
            <div style={{ display: 'flex', marginLeft: '4%', marginTop: '1%', marginRight: '4%', flexDirection: 'column' }} >
                <div style={{ width: '100%' }}>
                    <BannerComponent images={banners} />
                </div>
                <div style={{ width: '100%' }}>
                    <DealComponent />
                </div>
                <div style={{ width: "100%", marginTop: '20' }} >
                    <CircleScrollComponent category={category} title="Popular Categories" />
                </div>
                <div style={{ width: "100%", marginTop: '1%', }} >
                    <ProductComponent title="Milk,Bread & Buttor" products={products} />
                </div>
                <div style={{ width: "100%", marginTop: '20' }} >
                    <CircleScrollComponent category={Trending} title="Trending Products" />
                </div>
                <div style={{ width: "100%", display: 'flex', flexWrap: 'wrap', }} >
                    <CategoryComponent title="Categories" />
                </div>


            </div>
        </div>
    )
}