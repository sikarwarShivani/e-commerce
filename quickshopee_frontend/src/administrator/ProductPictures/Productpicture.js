import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useStyles } from "./ProductpictureCss";
import { useEffect, useState } from "react";
import { getData, postData } from "../../NodeServices/FetchNodeServices";
import Swal from "sweetalert2";
import { DropzoneArea } from "material-ui-dropzone";

export default function Productpicture() {
    const classes = useStyles('')
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryyList] = useState([])
    const [productList, setProductList] = useState([])
    const [productItemList, setProductItemList] = useState([])

    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubcategoryId] = useState('')
    const [productId, setproductId] = useState('')
    const [productListId, setproductListId] = useState('')
    const [picture, setpicture] = useState('')
    const [error, setError] = useState({})


    useEffect(function () {
        fetchAllCategory()
    }, [])

    const fetchAllCategory = async () => {
        var response = await getData('category/fetch_all_category')
        setCategoryList(response.data)
    }

    const fillCategoryList = () => {
        return (
            categoryList.map((item) => {
                return (
                    <MenuItem value={item.category_id}>{item.categoryname}</MenuItem>
                )
            })
        )
    }

    const handleCategoryID = (e) => {
        setCategoryId(e.target.value)
        fetchAllSubCategory(e.target.value)
    }

    const fetchAllSubCategory = async (categoryId) => {
        var body = { categoryId: categoryId }
        var response = await postData('subcategory/fetch_all_subcategory_by_categoryid', body)
        setSubCategoryyList(response.data)
    }

    const fillSubCategoryList = () => {
        return (
            subCategoryList.map((item) => {
                return (
                    <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
                )
            })
        )
    }

    const handleSubCategoryId = (e) => {
        setSubcategoryId(e.target.value)
        fetchAllProductList(e.target.value)
    }

    const fetchAllProductList = async (subCategoryId) => {
        var body = { subCategoryId: subCategoryId }
        var response = await postData('Product/fetch_all_product_by_subcategoryid', body)
        setProductList(response.data)

    }

    const fillProductList = () => {
        return (
            productList.map((item) => {
                return (
                    <MenuItem value={item.productid}>{item.productname}</MenuItem>
                )
            })
        )
    }

    const handleProductId = (e) => {
        setproductId(e.target.value)
        fetchAllProductItemList(e.target.value)
        alert(e.target.value)
    }

    const fetchAllProductItemList = async (productId) => {
        var body = { productId: productId }
        var response = await postData('productlist/fetch_all_productList_by_productid', body)
        alert(JSON.stringify(response.data))
        setProductItemList(response.data)
    }
    const fillProductItemList = () => {
        return (
            productItemList.map((item) => {
                return (
                    <MenuItem value={item.productlistid}>{item.productlistname}{item.weight}</MenuItem>
                )
            })
        )
    }

    

    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }))
    }

    const validation = () => {
        var isValid = true
        if (!categoryId) {
            handleError('categoryId', 'plz input category Id')
            isValid = false
        }
        if (!subCategoryId) {
            handleError('subCategoryId', 'plz input subCategory Id')
            isValid = false
        }
        if (!productId) {
            handleError('productId', 'plz input product Id')
            isValid = false
        }
        if (!productListId) {
            handleError('productListId', 'plz input product List Id')
            isValid = false
        }
        return isValid
    }


    const handleSubmit = async () => {

        var formData = new FormData()
        formData.append('categoryId', categoryId)
        formData.append('subCategoryId', subCategoryId)
        formData.append('productId', productId)
        formData.append('productListId', productListId)

       picture.map((item, index) => {
            formData.append('picture' + index, item)


        })

        var response = await postData('productpictures/submit_productpictures', formData)
        if (response.status) {
            Swal.fire({
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 2000
            })

        }
        else {
            Swal.fire({
                icon: 'error',
                title: "Server Error",
                text: "product picture Submission Failed",
                showConfirmButton: false,
                timer: 2000
            })
        }
    }

    return (
        <div className={classes.container} >
            <div className={classes.box}>
                <Grid container spacing={3}>
                    < Grid item lg={12} sx={{ fontWeight: 500 }}>
                        Product Pictures
                    </Grid>
                    <Grid item lg={6}>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Category"
                                value={categoryId}
                                onFocus={() => handleError('categoryId', null)}
                                onChange={handleCategoryID}
                                error={error.categoryId ? true : false}

                            >
                                <MenuItem disabled value="Select Category">Select Category</MenuItem>
                                {fillCategoryList()}
                            </Select>
                        </FormControl>
                        <div>{error.categoryId}</div>
                    </Grid>
                    <Grid item lg={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">SubCategory</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Category"
                                value={subCategoryId}
                                onFocus={() => handleError('subCategoryId', null)}
                                onChange={handleSubCategoryId}
                                error={error.subCategoryId ? true : false}

                            >
                                <MenuItem disabled value="Select Sub Category">Select Sub Category</MenuItem>
                                {fillSubCategoryList()}
                            </Select>
                        </FormControl>
                        <div>{error.subCategoryId}</div>
                    </Grid>
                    <Grid item lg={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Product</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Product"
                                value={productId}
                                onFocus={() => handleError('productId', null)}
                                onChange={handleProductId}
                                error={error.productId ? true : false}
                            >
                                <MenuItem disabled value="Select Product ">Select Product</MenuItem>
                                {fillProductList()}
                            </Select>
                        </FormControl>
                        <div>{error.productId}</div>
                    </Grid>
                    <Grid item lg={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Product List</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Product List"
                                value={productListId}
                                onFocus={() => handleError('productListId', null)}
                                onChange={(event) => setproductListId(event.target.value)}
                                error={error.productListId ? true : false}
                            >
                                <MenuItem disabled value="Select Product List ">Select Product List</MenuItem>
                                {fillProductItemList()}
                            </Select>
                        </FormControl>
                        <div>{error.productlistId}</div>
                    </Grid>
                    <Grid item lg={12}>
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            filesLimit={6}
                            dropzoneText={"Drag and drop an image here or click"}
                            onChange={(files) => setpicture(files)}
                        />
                    </Grid>
                    <Grid item lg={6}>
                        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>Submit</Button>
                    </Grid>
                    <Grid item lg={6}>
                        <Button variant="contained" color="primary" fullWidth>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}