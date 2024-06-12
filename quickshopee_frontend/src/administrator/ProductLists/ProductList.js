import { useEffect, useState } from "react";
import { useStyles } from "./ProductListCss";
import { Grid, TextField, MenuItem, Select, FormControl, InputLabel, Button, Avatar } from "@mui/material";
import { getData, postData } from "../../NodeServices/FetchNodeServices";
import Swal from "sweetalert2";

export default function ProductList() {
   var classes = useStyles()

   const [categoryList, setCategoryList] = useState([])
   const [subCategoryList, setSubCategoryList] = useState([])
   const [productList, setProductList] = useState([])


   const [categoryId, setCategoryId] = useState('')
   const [subCategoryId, setSubcategoryId] = useState('')
   const [productId, setProductId] = useState('')
   const [productListName, setProductListName] = useState('')
   const [description, setDescription] = useState('')
   const [rate, setRate] = useState('')
   const [offer, setOffer] = useState('')
   const [weight, setWeight] = useState('')
   const [type,setType]=useState('')
   const [stock, setStock] = useState('')
   const [status, setStatus] = useState('')
   const [picture, setPicture] = useState({ file: '/assets/shopping-cart.png', bytes: '' })
   const [error, setError] = useState({})




   useEffect(function () {
      fetchAllCategory()
   }, [])

   const fetchAllCategory = async () => {
      var response = await getData('category/fetch_all_category')
      setCategoryList(response.data)
      // alert(JSON.stringify(response.data))
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
      alert(JSON.stringify(response.data))
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


   const handlePicture = (e) => {
      setPicture({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
      handleError('picture', null)
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
      if (!type) {
         handleError('type', 'plz input type')
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
      if (!picture.bytes) {
         handleError('picture', 'plz select Picture')
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
         formData.append('type',type)
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
            handleReset()
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
   const handleReset = () => {
      setCategoryId('')
      setSubcategoryId('')
      setProductId('')
      setProductListName('')
      setDescription('')
      setRate('')
      setOffer('')
      setWeight('')
      setType('')
      setStock('')
      setStatus('')
      setPicture({ file: '/assets/shopping-cart.png', bytes: '' })
   }

   return (
      <div className={classes.container}>
         <div className={classes.box}>
            <Grid container spacing={3}>
               < Grid item lg={12} sx={{ fontWeight: 500 }}>
                  ProductList Interface
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
                     <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
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
                        onChange={(event) => setProductId(event.target.value)}
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
                     value={productListName}
                     placeholder="ProductList Name" variant="outlined" fullWidth
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
                  <TextField type="text" label='weight'
                     value={weight}
                     placeholder="weight" variant="outlined" fullWidth
                     onFocus={() => handleError('weight', null)}
                     onChange={(event) => setWeight(event.target.value)}
                     error={error.weight ? true : false}
                     helperText={error.weight}
                  />
               </Grid>
               <Grid item lg={6}>
                  <FormControl fullWidth>
                     <InputLabel id="demo-simple-select-label">Type</InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="type"
                        value={type}
                        onFocus={() => handleError('type', null)}
                        onChange={(event) => setType(event.target.value)}
                        error={error.type ? true : false}

                     >
                        <MenuItem value="Select weight">Select type</MenuItem>
                        <MenuItem value="Ltr">Ltr</MenuItem>
                        <MenuItem value="Kg">kg</MenuItem>
                        <MenuItem value="Ml">Ml</MenuItem>
                        <MenuItem value="g">g</MenuItem>
                        <MenuItem value="Piece">Piece</MenuItem>
                     </Select>
                  </FormControl>
                  <div>{error.type}</div>
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
               <Grid item lg={6}>
                  <Button variant="contained" component="label" size="large">
                     Upload Picture
                     <input hidden accept="image/*" onChange={handlePicture} multiple type='file' />
                  </Button>
                  <div>{error.picture}</div>
               </Grid>
               <Grid item lg={6} >
                  <Avatar
                     alt="picture"
                     src={picture.file}
                     style={{ width: 56, height: 56 }}
                  />
               </Grid>
               <Grid item lg={6}>
                  <Button color="primary" onClick={handleSubmit} variant="contained" fullWidth>
                     Submit
                  </Button>
               </Grid>
               <Grid item lg={6}>
                  <Button color="primary" onClick={handleReset} variant="contained" fullWidth>
                     Reset
                  </Button>
               </Grid>
            </Grid>
         </div>

      </div>
   )
}