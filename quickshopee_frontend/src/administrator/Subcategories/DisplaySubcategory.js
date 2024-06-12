import React, { useEffect, useState } from "react";
import { useStyles } from "./DisplaySubcategoryCss";
import MaterialTable from "material-table";
import { getData, postData, serverURL } from "../../NodeServices/FetchNodeServices";
import { Grid, TextField, Select, FormControl, InputLabel, MenuItem, IconButton, Avatar, Button } from "@mui/material"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from "sweetalert2";
import { Kayaking, LaptopWindows, PhotoCamera } from "@mui/icons-material";


export default function DisplaySubcategory() {
    var classes = useStyles()

    useEffect(function () {
        fetchAllSubcategory()
        fetchAllCategory()
    }, [])

    const fetchAllSubcategory = async () => {
        var response = await getData('subcategory/fetch_all_subcategory')
        setSubcategoryData(response.data)
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




    const [subCategoryData, setSubcategoryData] = useState([])
    const [categoryList, setCategoryList] = useState([])

    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [subCategoryName, setSubCategoryName] = useState('')
    const [status, setStatus] = useState('')
    const [icon, setIcon] = useState({ file: '', bytes: '' })
    const [error, setError] = useState({})
    const [open, setOpen] = useState(false);
    const [btnStatus, setBtnStatus] = useState(false)
    const [uploadbtnstatus, setUploadbtnstatus] = useState(false)
    const [oldIcon, setOldIcon] = useState('')


    const handleOpen = (rowData) => {
        setOpen(true);
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setSubCategoryName(rowData.subcategoryname)
        setStatus(rowData.status)
        setIcon({ file: `${serverURL}/images/${rowData.icon}`, bytes: '' })
        setOldIcon(rowData.icon)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleIcon = (event) => {
        setIcon({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        handleError('icon', null)
        setBtnStatus(true)
        setUploadbtnstatus(true)
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
        if (!subCategoryName) {
            handleError('subCategoryName', "Please input Subcategory Name")
            isValid = false
        }
        if (!status) {
            handleError('status', "Please Select Status")
            isValid = false
        }
        return isValid
    }


    const DisplaySubcategoryTable = () => {
        return (
            <div className={classes.box}>
                <MaterialTable
                    title="Simple Action Preview"
                    columns={[
                        { title: 'Category', field: 'categoryname' },
                        { title: 'Subcategory', field: 'subcategoryid' },
                        { title: 'Subcategory Name', field: 'subcategoryname' },
                        { title: 'Status', field: 'status' },
                        {
                            title: 'icon',
                            field: 'icon',
                            render: rowData => <Avatar src={`${serverURL}/images/${rowData.icon}`} style={{ width: 75 }} variant='rounded' />

                        },
                    ]}
                    data={subCategoryData}

                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit Subcategory',
                            onClick: (event, rowData) => handleOpen(rowData)
                        }
                    ]}
                />
            </div>
        )
    }

    const handleEdit = async () => {
        if (validation()) {
            var body = { 'subCategoryId': subCategoryId, 'categoryId': categoryId, 'subCatgoryName': subCategoryName, 'status': status }
            var response = await postData('subcategory/edit_subcategory', body)
            if (response.status) {
                setOpen(false)
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 2000
                })
                fetchAllSubcategory()
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: "Server Error",
                    text: "Failed To edit",
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    }
    const handleDelete = async () => {
        var body = { 'subCategoryId': subCategoryId }
        var response = await postData("subcategory/delete_subcategory", body)
        if (response.status) {
            setOpen(false)
            Swal.fire({
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 2000
            })
            fetchAllSubcategory()
        }
        else {
            Swal.fire({
                icon: 'error',
                title: "Server Error",
                text: "Failed To Delete",
                showConfirmButton: false,
                timer: 2000
            })
        }
    }


    const handleEditicon = async () => {
        var formData = new FormData()
        formData.append("subCategoryId", subCategoryId)
        formData.append('icon', icon.bytes)
        var response = await postData('subcategory/edit_icon', formData)
        if (response.status) {
            setOpen(false)
            Swal.fire({
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 2000
            })
            fetchAllSubcategory()
        }
        else {
            Swal.fire({
                icon: 'error',
                title: "Server Error",
                text: "Failed To edit Icon",
                showConfirmButton: false,
                timer: 2000
            })
        }
    }

    const handleCancel = () => {
        setIcon({ file: `${serverURL}/images/${oldIcon}`, bytes: '' })
        setBtnStatus(false)
        setUploadbtnstatus(false)
    }





    const showSubCategoryForm = () => {
        return (
            <div className={{
                width: 'auto',
                height: 'auto',
                padding: 10,
                background: '#fff'
            }}>

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
                        <div className={classes.errorstyles}>{error.status}</div>

                    </Grid>
                    <Grid item lg={12}>
                        <TextField id="outlined-basic"
                            onFocus={() => handleError('subCategoryName', null)}
                            onChange={(event) => setSubCategoryName(event.target.value)}
                            label="Sub Category"
                            variant="outlined"
                            fullWidth
                            value={subCategoryName}
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
                                onChange={(e) => setStatus(e.target.value)}
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
                    <Grid item lg={4}>
                        <IconButton disabled={uploadbtnstatus} color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" onChange={handleIcon} type="file" />
                            <PhotoCamera />
                        </IconButton>

                    </Grid>
                    <Grid item lg={4}>
                        <Avatar
                            variant='square'
                            src={icon.file} />
                    </Grid>
                    <Grid item lg={4} >
                        {btnStatus ? <>
                            <Button onClick={handleEditicon}>Save</Button>
                            <Button onClick={handleCancel}>Cancel</Button></> : <></>}
                    </Grid>
                    <Grid item lg={6}>
                        <Button variant="contained" onClick={handleEdit} fullWidth  >Edit</Button>
                    </Grid>
                    <Grid item lg={6}>
                        <Button variant="contained" onClick={handleDelete} fullWidth >Delete</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }


    const EditDailog = () => {
        return (
            <div>
                <Dialog
                    open={open}
                >
                    <DialogContent>
                        {showSubCategoryForm()}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }


    return (
        <div className={classes.maincontainer}>
            {DisplaySubcategoryTable()}
            <div>
                {EditDailog()}
            </div>
        </div>
    )

}
