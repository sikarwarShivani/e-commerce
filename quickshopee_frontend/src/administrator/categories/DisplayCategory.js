import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { getData, serverURL } from "../../NodeServices/FetchNodeServices";
import { useStyles } from "./DisplayCategoryCss";
import { Avatar, IconButton, Grid, TextField, Button, FormControl, Select, InputLabel, MenuItem, Icon } from "@mui/material"
import { Hub, Kayaking, PhotoCamera, RocketLaunchSharp } from "@mui/icons-material"
import { postData } from "../../NodeServices/FetchNodeServices"
import Swal from "sweetalert2"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useNavigate } from "react-router-dom";



export default function DisplayCategory() {
    const [categoryData, setCategoryData] = useState([])
    const navigate=useNavigate()

    useEffect(function () {
        fetchAllCategory()
    }, [])

    var classes = useStyles()
    const [open, setOpen] = useState(false);

    const [categoryId, setCategoryId] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [status, setStatus] = useState('')
    const [icon, setIcon] = useState({ file: '/assets/shopping-cart.png', bytes: '' })
    const [error, setError] = useState({})
    const [btnStatus, setButtonStatus] = useState(false)
    const [oldIcon, setOldIcon] = useState('')
    const [uploadbtnstatus, setUploadbtnstatus] = useState(false)


    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }))
    }

    const handlestatus = (event) => {
        setStatus(event.target.value)
    }

    const handleIcon = (e) => {
        setIcon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
        handleError('icon', null)
        setButtonStatus(true)
        setUploadbtnstatus(true)
    }

    const validation = () => {
        var isValid = true
        if (!categoryName) {
            handleError('categoryName', 'plz input category name')
            isValid = false
        }
        if (!status) {
            handleError('status', 'plz select status')
            isValid = false
        }
        return isValid
    }

    const handleEdit = async () => {
        if (validation()) {
            var body = { categoryId: categoryId, categoryName: categoryName, status: status }
            var response = await postData('category/edit_category', body)
            if (response.status) {

                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 2000
                })
                setOpen(false)
                fetchAllCategory()
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: "Server Error",
                    text: "Category Submission Failed",
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    }


    const fetchAllCategory = async () => {
        var response = await getData('category/fetch_all_category')
        setCategoryData(response.data)
    }

    const handleOpen = (rowData) => {
        setOpen(true);
        setCategoryId(rowData.category_id)
        setCategoryName(rowData.categoryname)
        setStatus(rowData.status)
        setIcon({ file: `${serverURL}/images/${rowData.icon}`, bytes: '' })
        setOldIcon(rowData.icon)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setIcon({ file: `${serverURL}/images/${oldIcon}`, bytes: '' })
        setButtonStatus(false)
        setUploadbtnstatus(false)
    }

    const handleEditicon = async () => {
        setButtonStatus(false)
        setOpen(false)
        var data = new FormData()
        data.append('categoryId', categoryId)
        data.append('icon', icon.bytes)
        var response = await postData('category/edit_icon', data)
        if (response.status) {
            Swal.fire({
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 2000
            })
            fetchAllCategory()
        }
        else {
            Swal.fire({
                icon: 'error',
                title: "Server Error",
                text: "Category Submission Failed",
                showConfirmButton: false,
                timer: 2000
            })
        }
    }

    const handleDelete = async () => {
        var body = { categoryId: categoryId }
        var response = await postData('category/delete_category', body)
        if (response.status) {
            Swal.fire({
                icon: 'success',
                title: "Category Deleted Successfully",
                showConfirmButton: false,
                timer: 2000
            })
            setOpen(false)
            fetchAllCategory()
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



    const DisplayCategoryTable = () => {
        return (
            <div className={classes.box}>
                <MaterialTable
                    title="Simple Action Preview"
                    columns={[
                        { title: 'Categoryid', field: 'category_id' },
                        { title: 'Category Name', field: 'categoryname' },
                        { title: 'status', field: 'status' },
                        {
                            title: 'Icon', field: 'icon',
                            render: rowData => <Avatar src={`${serverURL}/images/${rowData.icon}`} style={{ width: 75 }} variant='rounded' />
                        },
                    ]}
                    data={categoryData}

                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit Category',
                            onClick: (event, rowData) => handleOpen(rowData)
                        },
                        {
                            icon: 'add',
                            isFreeAction:'true',
                            tooltip: 'add Category',
                            onClick: () => navigate("/dashboard/Category")
                        }

                    ]}
                />
            </div>
        )
    }

    
    const showCategoryForm = () => {
        return (

            <div className={{
                width: '30vw',
                height: 'auto',
                padding: 10,
                background: '#fff'
            }}>
                <Grid container spacing={3}>
                    <Grid item lg={12} sx={{ fontWeight: 500 }}>
                        Category Interface
                    </Grid>
                    <Grid item lg={12}  >
                        <TextField label="Category Name"
                            error={error.categoryName ? true : false}
                            helperText={error.categoryName}
                            value={categoryName}
                            onFocus={() => handleError('categoryName', null)}
                            onChange={(event) => setCategoryName(event.target.value)}
                            variant='outlined' fullWidth />
                    </Grid>
                    <Grid item lg={12} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">status</InputLabel>
                            <Select
                                onChange={handlestatus}
                                value={status}
                                onFocus={() => handleError('status', null)}
                                labelId="demo-simple-select-label"
                                error={error.status ? true : false}
                                id="demo-simple-select"
                                label="Status"
                            >
                                <MenuItem disabled value="select status">select status</MenuItem>
                                <MenuItem value="Contniue">Continue</MenuItem>
                                <MenuItem value="Discontniue">Discontinue</MenuItem>
                                <MenuItem value="Popular">Popular</MenuItem>
                            </Select>
                        </FormControl>
                        <div className={classes.errorstyles}>
                            {error.status}
                        </div>
                    </Grid>
                    <Grid item lg={4}>
                        <IconButton disabled={uploadbtnstatus} color="primary" aria-label="upload picture" component="label">
                            <input onChange={handleIcon} hidden accept="image/*" type="file" />
                            <PhotoCamera />
                        </IconButton>
                        <div className={classes.errorstyles}>{error.icon}</div>
                    </Grid>
                    <Grid item lg={4}>
                        <Avatar
                            alt="Icon"
                            src={icon.file}
                            style={{ width: 56, height: 56 }}
                        />
                    </Grid>
                    <Grid item lg={4} >
                        {btnStatus ? <>
                            <Button onClick={handleEditicon}>save</Button>
                            <Button onClick={handleCancel}>cancel</Button></> : <></>}
                    </Grid>
                    <Grid item lg={6}>
                        <Button onClick={handleEdit} fullWidth color="primary" variant="contained">
                            Edit
                        </Button>
                    </Grid>
                    <Grid item lg={6}>
                        <Button fullWidth onClick={handleDelete} color="primary" variant="contained">Delete</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }


    const EditDailog = () => {
        return (
            <div>
                <Dialog
                    open={open}>

                    <DialogContent>
                        {showCategoryForm()}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    return (
        <div className={classes.mainContainer}>
            {DisplayCategoryTable()}
            <div>
                {EditDailog()}
            </div>
        </div>
    )
}
