import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { getData, serverURL } from "../../NodeServices/FetchNodeServices";
import { useStyles } from "./DisplayProductCss";
import { Avatar, IconButton, Grid, TextField, Button, FormControl, Select, InputLabel, MenuItem, Icon, DialogContent, Dialog, DialogActions } from "@mui/material"
import { Hub, Kayaking, PhotoCamera, RocketLaunchSharp } from "@mui/icons-material"
import { postData } from "../../NodeServices/FetchNodeServices"
import Swal from "sweetalert2"


export default function DisplayProduct() {

    var classes = useStyles()
    const [productData, setProductData] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [subcategoryList, setSubcategoryList] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [productId, setProductId] = useState('')
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [icon, setIcon] = useState({ file: '/assets/shopping-cart.png', bytes: '' })
    const [error, setError] = useState({})
    const [btnStatus, setButtonStatus] = useState(false)
    const [oldIcon, setOldIcon] = useState('')
    const [uploadbtnstatus, setUploadbtnstatus] = useState(false)

    const [open, setOpen] = useState(false);

    useEffect(function () {
        fetchAllCategory()
        fetchAllProduct()
    }, [])

    const fetchAllSubcategory = async (categoryid) => {
        var body = { 'categoryId': categoryid }
        var response = await postData('subcategory/fetch_all_subcategory_by_categoryid', body)
        setSubcategoryList(response.data)
    }

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

    const fillSubcategoryList = () => {
        return (
            subcategoryList.map((item) => {
                return (
                    <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
                )
            })
        )
    }

    const fetchAllProduct = async () => {
        var response = await getData('product/fetch_all_product')
        setProductData(response.data)

    }
    const DisplayProductTable = () => {
        return (
            <div className={classes.box}>
                <MaterialTable
                    title="Simple Action Preview"
                    columns={[
                        { title: 'Category', field: 'categoryname' },
                        { title: 'SubCategory', field: 'subcategoryname' },
                        { title: 'Product', field: 'productname' },
                        { title: 'Description', field: 'description' },
                        { title: 'Status', field: 'status' },

                        {
                            title: 'Icon', field: 'icon',
                            render: rowData => <Avatar src={`${serverURL}/images/${rowData.icon}`} style={{ width: 75 }} variant='rounded' />
                        },
                    ]}
                    data={productData}

                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit Product',
                            onClick: (event, rowData) => handleOpen(rowData)
                        }
                    ]}
                />
            </div>
        )

    }

    const handleOpen = (rowData) => {
        setOpen(true);
        fetchAllSubcategory(rowData.categoryid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setProductId(rowData.productid)
        setProductName(rowData.productname)
        setDescription(rowData.description)
        setStatus(rowData.status)
        setIcon({ file: `${serverURL}/images/${rowData.icon}`, bytes: '' })
        setOldIcon(rowData.icon)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCategoryId = (e) => {
        setCategoryId(e.target.value)
        fetchAllSubcategory(e.target.value)
    }



    const EditDailog = () => {
        return (
            <div>
                <Dialog
                    open={open}>
                    <DialogContent>
                        {showProductForm()}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    const showProductForm = () => {
        return (
            <div className={{
                width: '30vw',
                height: 'auto',
                padding: 10,
                background: '#fff'
            }}>

                <Grid container spacing={3}>
                    < Grid item lg={12} sx={{ fontWeight: 500 }}>
                        Edit Product
                    </Grid>
                    <Grid item lg={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Category"
                                value={categoryId}
                                onFocus={() => handleError('categoryId', null)}
                                onChange={handleCategoryId}
                                error={error.categoryId ? true : false}
                            >
                                <MenuItem disabled value={null}>-Select Category-</MenuItem>
                                {fillCategoryList()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"> sub Category</InputLabel>
                            <Select
                                onFocus={() => handleError('subCategoryId', null)}
                                onChange={(event) => setSubCategoryId(event.target.value)}
                                label="Sub Category"
                                variant="outlined"
                                fullWidth
                                value={subCategoryId}
                                error={error.subCategoryId ? true : false}
                            >
                                <MenuItem disabled value={null}>-Select Sub Category-</MenuItem>
                                {fillSubcategoryList()}

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={12}>
                        <TextField type="text" error={error.productName ? true : false} value={productName}
                            helperText={error.productName} onFocus={() => handleError('productName', null)}
                            onChange={(event) => setProductName(event.target.value)} label='Product Name'
                            placeholder="Produsct Name" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item lg={12}>
                        <TextField type="text" error={error.description ? true : false} value={description}
                            helperText={error.description} onFocus={() => handleError('description', null)}
                            onChange={(event) => setDescription(event.target.value)} label='Description'
                            placeholder="Description" variant="outlined" fullWidth />
                    </Grid>

                    <Grid item lg={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                onFocus={() => handleError('status', null)}
                                error={error.status ? true : false}
                            >
                                <MenuItem value={null}>Select Status</MenuItem>
                                <MenuItem value="Continue">Continue</MenuItem>
                                <MenuItem value="Discontinue">Discontinue</MenuItem>
                                <MenuItem value="Popular">Popular</MenuItem>
                            </Select>
                        </FormControl>
                        <div className={classes.errorstyles}>
                            {error.status}
                        </div>
                    </Grid>

                    <Grid item lg={4}>
                        <Button variant="contained" value={icon} onChange={handleIcon} component="label" size="large">
                            Upload Icon
                            <input hidden accept="image/*" multiple type='file' />
                        </Button>
                        <div className={classes.errorstyles}>
                            {error.icon}</div>

                    </Grid>
                    <Grid item lg={4} sx={{ display: 'flex' }}>
                        <Avatar
                            alt="Icon"
                            src={icon.file}
                            style={{ width: 56, height: 56 }}
                        />
                    </Grid>
                    <Grid item lg={4} >
                        {btnStatus ? <>
                            <Button onClick={handleEditicon}>Save</Button>
                            <Button onClick={handleCancel}>Cancel</Button></> : <></>}
                    </Grid>

                    <Grid item lg={6}>
                        <Button color="primary" variant="contained" onClick={handleEdit} fullWidth>
                            Edit
                        </Button>
                    </Grid>
                    <Grid item lg={6}>
                        <Button color="primary" onClick={handleDelete} variant="contained" fullWidth>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }


    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }))
    }

    const handleIcon = (e) => {
        setIcon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
        handleError('icon', null)
        setButtonStatus(true)
        setUploadbtnstatus(true)

    }

    const validation = () => {
        var isValid = true
        if (!categoryId) {
            handleError('categoryId', 'Please Select Category')
            isValid = false
        }
        if (!subCategoryId) {
            handleError('subCategoryId', 'Please Select Subcategory')
            isValid = false
        }
        if (!productName) {
            handleError('productName', 'Please Input Product Name')
            isValid = false
        }
        if (!description) {
            handleError('description', 'Please input Description')
            isValid = false
        }
        if (!status) {
            handleError('status', 'Please Select Status')
            isValid = false
        }
        return isValid
    }

    const handleEdit = async () => {
        if (validation()) {
            var body = { categoryId: categoryId, subCategoryId: subCategoryId, productId: productId, productName: productName, description: description, status: status }
            var response = await postData('product/edit_product', body)
            if (response.status) {
                setOpen(false)
                fetchAllProduct()
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
                    text: "Failed to Edit",
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    }



    const handleCancel = () => {
        setIcon({ file: `${serverURL}/images/${oldIcon}`, bytes: '' })
        setButtonStatus(false)
        setUploadbtnstatus(false)
    }

    const handleEditicon = async () => {
        setButtonStatus(false)
        setOpen(false)
        var data = new FormData()
        data.append('productId', productId)
        data.append('icon', icon.bytes)
        var response = await postData('product/edit_icon', data)
        if (response.status) {
            Swal.fire({
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 2000
            })
            fetchAllProduct()
        }
        else {
            Swal.fire({
                icon: 'error',
                title: "Server Error",
                text: "Product Submission Failed",
                showConfirmButton: false,
                timer: 2000
            })
        }
    }

    const handleDelete = async () => {
        var body = { productId: productId }
        var response = await postData('product/delete_product', body)
        if (response.status) {
            Swal.fire({
                icon: 'success',
                title: "Product Deleted Successfully",
                showConfirmButton: false,
                timer: 2000
            })
            setOpen(false)
            fetchAllProduct()
        }
        else {
            Swal.fire({
                icon: 'error',
                title: "Server Error",
                text: "Category Delete Failed",
                showConfirmButton: false,
                timer: 2000
            })
        }
    }



    return (
        <div className={classes.mainContainer}>
            {DisplayProductTable()}
            <div>
                {EditDailog()}
            </div>
        </div>
    )
}
