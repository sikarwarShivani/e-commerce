import React, { useEffect, useState } from "react";
import { useStyles } from "./ProductCss"
import { Grid, TextField, FormControl, Select, InputLabel, MenuItem, Button, Icon, Avatar } from "@mui/material";
import { getData, postData } from "../../NodeServices/FetchNodeServices";
import Swal from "sweetalert2"

export default function Product() {
   const classes = useStyles()
   const [categoryList, setCategoryList] = useState([])
   const [subCategoryList, setSubCategoryList] = useState([])
   const [categoryId, setCategoryId] = useState('')
   const [subCategoryId, setSubcategoryId] = useState('')
   const [productName, setProductName] = useState('')
   const [description, setDescription] = useState('')
   const [status, setStatus] = useState('')
   const [icon, setIcon] = useState({ file: '/assets/shopping-cart.png', bytes: '' })
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
               <MenuItem value={item.category_id}>{item.categoryname} </MenuItem>
            )
         })
      )
   }

   const handleCategoryId = (e) => {
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
               <MenuItem value={item.subcategoryid}>{item.subcategoryname} </MenuItem>
            )
         })
      )
   }


   const handleStatus = (e) => {
      setStatus(e.target.value)
   }

   const handleIcon = (e) => {
      setIcon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
      handleError('icon', null)
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
      if (!productName) {
         handleError('productName', 'plz input product name')
         isValid = false
      }
      if (!description) {
         handleError('description', 'plz input description')
         isValid = false
      }
      if (!status) {
         handleError('status', 'plz input status')
         isValid = false
      }
      if (!icon.bytes) {
         handleError('icon', 'plz select icon')
         isValid = false
      }
      return isValid
   }

   const handleSubmit = async () => {
      if (validation()) {
         var data = new FormData()
         data.append('categoryId', categoryId)
         data.append('subCategoryId', subCategoryId)
         data.append('productName', productName)
         data.append('description', description)
         data.append('status', status)
         data.append('icon', icon.bytes)
         var response = await postData('product/submit_Product', data)
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
               text: "Sub Product Submission Failed",
               showConfirmButton: false,
               timer: 2000
            })
         }
      }
   }
   const handleReset = () => {
      setCategoryId('')
      setSubcategoryId('')
      setProductName('')
      setDescription('')
      setStatus('')
      setIcon({ file: '/assets/shopping-cart.png', bytes: '' })
   }

   return (
      <div className={classes.container}>
         <div className={classes.box}>
            <Grid container spacing={3}>
               < Grid item lg={12} sx={{ fontWeight: 500 }}>
                  Product Interface
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
                        <MenuItem value={null} disabled>-Select Category-</MenuItem>
                        {fillCategoryList()}
                     </Select>
                  </FormControl>
               </Grid>
               <Grid item lg={12}>
                  <FormControl fullWidth>
                     <InputLabel id="demo-simple-select-label"> Sub Category</InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Sub Category"
                        error={error.subCategoryId ? true : false}
                        helperText={error.subCategoryId}
                        value={subCategoryId}
                        onFocus={() => handleError('subCategoryId', null)}
                        onChange={(event) => setSubcategoryId(event.target.value)}
                     >
                        <MenuItem value={null} disabled>-Select Sub Category-</MenuItem>
                        {fillSubCategoryList()}
                     </Select>
                  </FormControl>
               </Grid>
               <Grid item lg={12}>
                  <TextField type="text" error={error.productName ? true : false} value={productName}
                     helperText={error.productName} onFocus={() => handleError('productName', null)}
                     onChange={(event) => setProductName(event.target.value)}
                     label='Product Name' placeholder="Produsct Name"
                     variant="outlined" fullWidth />
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
                        onChange={handleStatus}
                        onFocus={() => handleError('status', null)}
                        error={error.status ? true : false}
                     >
                        <MenuItem value="Select Status">Select Status</MenuItem>
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


               <Grid item lg={6}>
                  <Button color="primary" onClick={handleSubmit} variant="contained" fullWidth>
                     Submit
                  </Button>
               </Grid>
               <Grid item lg={6}>
                  <Button color="primary" variant="contained" fullWidth>
                     Reset
                  </Button>
               </Grid>
            </Grid>
         </div>
      </div>
   )
}
