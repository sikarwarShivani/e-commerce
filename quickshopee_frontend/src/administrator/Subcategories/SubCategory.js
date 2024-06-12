import React, { useEffect, useState } from "react";
import { useStyles } from "./SubCategoryCss";
import { Grid, TextField, Select, FormControl, InputLabel, MenuItem, IconButton, Avatar, Button } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material";
import { getData, postData } from "../../NodeServices/FetchNodeServices";
import Swal from "sweetalert2";

export default function SubCategory() {
    const classes = useStyles()

    const [categoryList, setCategoryList] = useState([])

    const [categoryId, setCategoryId] = useState('')
    const [subCategoryrName, setSubcategoryName] = useState('')
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
                    <MenuItem value={item.category_id}>{item.categoryname}</MenuItem>
                )
            })
        )
    }


    const handleStatus = (event) => {
        setStatus(event.target.value)
    }
    const handleIcon = (event) => {
        setIcon({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        handleError('icon', null)
    }

    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }))
    }

    const validation = () => {
        var isValid = true
        if (!categoryId) {
            handleError('categoryId', "Please Select Category")
            isValid = false
        }
        if (!subCategoryrName) {
            handleError('subCategoryName', "Please input Subcategory Name")
            isValid = false
        }
        if (!status) {
            handleError('status', "Please Select Status")
            isValid = false
        }
        if (!icon.bytes) {
            handleError('icon', "Please select Icon")
            isValid = false
        }
        return isValid

    }

    const handleSubmit = async () => {
        if (validation() == true) {
            var data = new FormData()
            data.append('categoryId', categoryId)
            data.append('subCategoryName', subCategoryrName)
            data.append('status', status)
            data.append('icon', icon.bytes)
            var response = await postData('subcategory/submit_subcategory', data)
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
                    text: "Sub Category Submission Failed",
                    showConfirmButton: false,
                    timer: 2000
                })
            }

        }
    }

    const handleReset = () => {
        setCategoryId('')
        setSubcategoryName('')
        setStatus('')
        setIcon({ file: '/assets/shopping-cart.png', bytes: '' })
    }

    return (
        <div className={classes.maincontainer} >
            <div className={classes.box}>
                <Grid container spacing={3}>
                    <Grid item lg={12}>
                        Sub Category Interface
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
                                onChange={(e) => setCategoryId(e.target.value)}
                                error={error.categoryId ? true : false}
                            >
                                <MenuItem disabled value={null}>-Select Category-</MenuItem>
                                {fillCategoryList()}
                            </Select>
                        </FormControl>
                        <div className={classes.errorstyles}>{error.categoryId}</div>

                    </Grid>
                    <Grid item lg={12}>
                        <TextField id="outlined-basic"
                            onFocus={() => handleError('subCategoryName', null)}
                            onChange={(event) => setSubcategoryName(event.target.value)}
                            label="Sub Category"
                            variant="outlined"
                            fullWidth
                            value={subCategoryrName}
                            error={error.subCategoryName ? true : false}
                            helperText={error.subCategoryName}
                        />
                    </Grid>

                    <Grid item lg={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Status"
                                value={status}
                                onFocus={() => handleError('status', null)}
                                onChange={handleStatus}
                                error={error.status ? true : false}
                            >
                                <MenuItem value="Continue">Continue</MenuItem>
                                <MenuItem value="DisContinue">Discontinue</MenuItem>
                                <MenuItem value="Popular">Popular</MenuItem>
                                <MenuItem value="Trending">Trending</MenuItem>
                            </Select>
                        </FormControl>
                        <div className={classes.errorstyles}>{error.status}</div>

                    </Grid>
                    <Grid item lg={6}>
                        <IconButton color="primary" onChange={handleIcon} aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" />
                            <PhotoCamera />
                        </IconButton>
                        <div className={classes.errorstyles}>{error.icon}</div>
                    </Grid>
                    <Grid item lg={6}>
                        <Avatar
                            variant='square'
                            src={icon.file} />
                    </Grid>
                    <Grid item lg={6}>
                        <Button variant="contained" onClick={handleSubmit} fullWidth  >Submit</Button>
                    </Grid>
                    <Grid item lg={6}>
                        <Button variant="contained" onClick={handleReset} fullWidth  >Reset</Button>
                    </Grid>

                </Grid>
            </div>
        </div>
    )
} 