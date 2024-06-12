import { useEffect, useState } from "react";
import { useStyles } from "./DisplayProductListCss";
import MaterialTable from "material-table";
import { getData, serverURL, postData } from "../../NodeServices/FetchNodeServices";
import { TextField, MenuItem, Dialog, Select, FormControl, InputLabel, Button, Avatar, DialogActions, DialogContent, Grid } from "@mui/material";
import Swal from "sweetalert2";


export default function DisplayProductList() {
    const classes = useStyles()

    const [productListData, setProductListData] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [productList, setProductList] = useState([])


    const [open, setOpen] = useState(false)

    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubcategoryId] = useState('')
    const [productId, setproductId] = useState('')
    const [productListId, setproductListId] = useState('')
    const [productListName, setProductListName] = useState('')
    const [description, setDescription] = useState('')
    const [rate, setRate] = useState('')
    const [offer, setOffer] = useState('')
    const [weight, setWeight] = useState('')
    const [stock, setStock] = useState('')
    const [status, setStatus] = useState('')
    const [picture, setpicture] = useState({ file: '/assets/shopping-cart.png', bytes: '' })
    const [error, setError] = useState({})
    const [oldpicture, setOldPicture] = useState('')
    const [uploadbtnstatus, setUploadbtnstatus] = useState(false)
    const [btnStatus, setButtonStatus] = useState(false)


    useEffect(function () {
        fetchAllProductList()
        fetchAllCategory()
    }, [])

    const fetchAllProductList = async () => {
        var response = await getData('productlist/fetch_all_productlist')
        setProductListData(response.data)
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

    const handleCategoryID = (e) => {
        setCategoryId(e.target.value)
        fetchAllSubCategory(e.target.value)
    }

    const fetchAllSubCategory = async (categoryId) => {
        var body = { categoryId: categoryId }
        var response = await postData('subcategory/fetch_all_subcategory_by_categoryid', body)
        setSubCategoryList(response.data)

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
        fetchAllProduct(e.target.value)
    }

    const fetchAllProduct = async (subCategoryId) => {
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

    function DisplayProductListTable() {
        return (
            <div className={classes.box}>
                <MaterialTable
                    title="Simple Action Preview"
                    columns={[
                        { title: 'Category', field: 'categoryname' },
                        { title: 'SubCategory', field: 'subcategoryname' },
                        { title: 'Product', field: 'productname' },
                        { title: 'ProductList', field: 'productlistname' },
                        { title: 'Description', field: 'description' },
                        { title: 'Rate', field: 'rate' },
                        { title: 'Offer', field: 'offer' },
                        { title: 'weight', field: 'weight' },
                        { title: 'Stock', field: 'stock' },
                        { title: 'Status', field: 'status' },

                        {
                            title: 'Picture', field: 'picture',
                            render: rowData => <Avatar src={`${serverURL}/images/${rowData.picture}`} style={{ width: 75 }} variant='rounded' />
                        },
                    ]}
                    data={productListData}

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
        setOpen(true)
        fetchAllSubCategory(rowData.categoryid)
        fetchAllProduct(rowData.subcategoryid)
        setCategoryId(rowData.categoryid)
        setSubcategoryId(rowData.subcategoryid)
        setproductId(rowData.productid)
        setproductListId(rowData.productlistid)
        setProductListName(rowData.productlistname)
        setDescription(rowData.description)
        setRate(rowData.rate)
        setOffer(rowData.offer)
        setWeight(rowData.weight)
        setStock(rowData.stock)
        setStatus(rowData.status)
        setOldPicture(rowData.oldpicture)
        setpicture({ file: `${serverURL}/images/${rowData.picture}`, bytes: '' })
    }


    const EditDailog = () => {
        return (
            <div>
                <Dialog

                    open={open}>
                    <DialogContent>
                        {showDisplayProductListForm()}

                    </DialogContent>
                    <DialogActions>
                        <Button >close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    const handlePicture = (e) => {
        setpicture({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
        handleError('picture', null)
        setButtonStatus(true)
        setUploadbtnstatus(true)
    }

    const handleStatus = (e) => {
        setStatus(e.target.value)
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
        if (!productListName) {
            handleError('productListName', 'plz input productListName')
            isValid = false
        }
        if (!description) {
            handleError('description', 'plz input description')
            isValid = false
        }
        if (!rate) {
            handleError('rate', 'plz input rate')
            isValid = false
        }
        if (!offer) {
            handleError('offer', 'plz input offer')
            isValid = false
        }
        if (!weight) {
            handleError('weight', 'plz input weight')
            isValid = false
        }
        if (!stock) {
            handleError('stock', 'plz input stock')
            isValid = false
        }
        if (!status) {
            handleError('status', 'plz input status')
            isValid = false
        }

        return isValid
    }

    const handleSubmit = async () => {
        if (validation()) {
            var formData = new FormData()
            formData.append('categoryId', categoryId)
            formData.append('subCategoryId', subCategoryId)
            formData.append('productId', productId)
            formData.append('productListName', productListName)
            formData.append('description', description)
            formData.append('rate', rate)
            formData.append('offer', offer)
            formData.append('weight', weight)
            formData.append('stock', stock)
            formData.append('status', status)
            formData.append('picture', picture.bytes)

            var response = await postData('productlist/submit_productlist', formData)
            if (response.status) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 2000
                })
                fetchAllProductList()

            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: "Server Error",
                    text: "product Submission Failed",
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    }

    const showDisplayProductListForm = () => {
        return (
            <div className={{
                width: '30vw',
                height: 'auto',
                padding: 10,
                background: '#fff'
            }}>
                <Grid container spacing={3}>
                    < Grid item lg={12} sx={{ fontWeight: 500 }}>
                        Product Interface
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
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
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
                                onChange={(event) => setproductId(event.target.value)}
                                error={error.productId ? true : false}
                            >
                                <MenuItem disabled value="Select Product ">Select Product</MenuItem>
                                {fillProductList()}
                            </Select>
                        </FormControl>
                        <div>{error.productId}</div>
                    </Grid>

                    <Grid item lg={6}>
                        <TextField type="text" label='ProductList Name'
                            placeholder="ProductList Name" variant="outlined" fullWidth
                            value={productListName}
                            onFocus={() => handleError('ProductListName', null)}
                            onChange={(event) => setProductListName(event.target.value)}
                            error={error.productListName ? true : false}
                            helperText={error.productListName}
                        />
                    </Grid>
                    <Grid item lg={6}>
                        <TextField type="text" label='Description'
                            value={description}
                            placeholder="Description" variant="outlined" fullWidth
                            onFocus={() => handleError('description', null)}
                            onChange={(event) => setDescription(event.target.value)}
                            error={error.description ? true : false}
                            helperText={error.description}
                        />
                    </Grid>
                    <Grid item lg={6}>

                        <TextField type="text" label='Rate'
                            value={rate}
                            placeholder="Rate" variant="outlined" fullWidth
                            onFocus={() => handleError('rate', null)}
                            onChange={(event) => setRate(event.target.value)}
                            error={error.rate ? true : false}
                            helperText={error.rate}
                        />
                    </Grid>
                    <Grid item lg={6}>
                        <TextField type="text" label='Offer'
                            value={offer}
                            placeholder="Offer" variant="outlined" fullWidth
                            onFocus={() => handleError('offer', null)}
                            onChange={(event) => setOffer(event.target.value)}
                            error={error.offer ? true : false}
                            helperText={error.offer}
                        />
                    </Grid>
                    <Grid item lg={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">weight</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Weight"
                                value={weight}
                                onFocus={() => handleError('weight', null)}
                                onChange={(event) => setWeight(event.target.value)}
                                error={error.weight ? true : false}

                            >
                                <MenuItem value="Select weight">Select weight</MenuItem>
                                <MenuItem value="Ltrs">Ltrs</MenuItem>
                                <MenuItem value="Kgs">kgs</MenuItem>
                                <MenuItem value="Piece">Piece</MenuItem>
                            </Select>
                        </FormControl>
                        <div>{error.weight}</div>
                    </Grid>
                    <Grid item lg={6}>
                        <TextField type="text" label='Stock'
                            value={stock}
                            placeholder="Stock" variant="outlined" fullWidth
                            onFocus={() => handleError('stock', null)}
                            onChange={(event) => setStock(event.target.value)}
                            error={error.stock ? true : false}
                            helperText={error.stock}
                        />
                    </Grid>
                    <Grid item lg={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Status"
                                value={status}
                                onFocus={() => handleError('status', null)}
                                onChange={handleStatus}
                                error={error.status ? true : false}

                            >
                                <MenuItem value="Select Status">Select Status</MenuItem>
                                <MenuItem value="Continue">Continue</MenuItem>
                                <MenuItem value="Discontinue">Discontinue</MenuItem>
                                <MenuItem value="Popular">Popular</MenuItem>
                            </Select>
                        </FormControl>
                        <div>{error.status}</div>
                    </Grid>
                    <Grid item lg={4}>
                        <Button variant="contained" component="label" size="large">
                            Upload Picture
                            <input hidden accept="image/*" onChange={handlePicture} multiple type='file' />
                        </Button>
                        <div>{error.picture}</div>
                    </Grid>
                    <Grid item lg={4} >
                        <Avatar
                            alt="Picture"
                            src={picture.file}
                            style={{ width: 56, height: 56 }}
                        />
                    </Grid>
                    <Grid item lg={4} >
                        {btnStatus ? <>
                            <Button onClick={handleEditicon}>Save</Button>
                            
                            <Button onClick={handleCancel}>Cancel</Button></> : <></>}
                    </Grid>

                    <Grid item lg={6}>
                        <Button color="primary" onClick={handleEdit} variant="contained" fullWidth>
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

    const handleEdit = async () => {
        if (validation()) {
            var body = {
                categoryId: categoryId, subCategoryId: subCategoryId, productId: productId, productListId: productListId, productListName: productListName,
                description: description, rate: rate, offer: offer, weight: weight, stock: stock, status: status
            }
            var response = await postData('productList/edit_productList', body)
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
        setpicture({ file: `${serverURL}/images/${oldpicture}`, bytes: '' })
        setButtonStatus(false)
        setUploadbtnstatus(false)
    }



    const handleEditicon = async () => {
        setButtonStatus(false)
        setOpen(false)
        var data = new FormData()
        data.append('productListId', productListId)
        data.append('picture', picture.bytes)
        var response = await postData('productList/edit_icon', data)
        if (response.status) {
            Swal.fire({
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 2000
            })
            fetchAllProductList()
        }
        else {
            Swal.fire({
                icon: 'error',
                title: "Server Error",
                text: "Productlist Submission Failed",
                showConfirmButton: false,
                timer: 2000
            })
        }
    }

    const handleDelete = async () => {
        var body = { productListId: productListId }
        var response = await postData('productList/delete_productList', body)
        if (response.status) {
            Swal.fire({
                icon: 'success',
                title: "Product Deleted Successfully",
                showConfirmButton: false,
                timer: 2000
            })
            setOpen(false)
            fetchAllProductList()
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
        <div className={classes.container}>
            {DisplayProductListTable()}
            <div>
                {EditDailog()}
            </div>
        </div>
    )
}

