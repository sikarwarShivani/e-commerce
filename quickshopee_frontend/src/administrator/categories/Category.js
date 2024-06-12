import { useState } from "react"
import { useStyles } from "./CategoryCss"
import { Avatar, IconButton, Grid, TextField,Button, FormControl, Select, InputLabel, MenuItem, Icon } from "@mui/material"
import { PhotoCamera, ViewList } from "@mui/icons-material"
import { postData } from "../../NodeServices/FetchNodeServices"
import Swal from "sweetalert2"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export default function Category() {
    const classes = useStyles()
    const [categoryName, setCategoryName] = useState('')
    const [status, setStatus] = useState('')
    const [icon, setIcon] = useState({ file: '/assets/shopping-cart.png', bytes: '' })
    const [error, setError] = useState({})

    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }))
    }
    const handlestatus = (event) => {
        setStatus(event.target.value)
    }
    const handleIcon = (e) => {
        setIcon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
        handleError('icon', null)
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
        if (!icon.bytes) {

            handleError('icon', 'plz select icon')
            isValid = false
        }
        return isValid
    }
    const handleSubmit = async () => {
        if (validation()) {
            var formData = new FormData()
            formData.append('categoryname', categoryName)
            formData.append('status', status)
            formData.append('icon', icon.bytes)
            var response = await postData('category/submit_category', formData)
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
                    text: "Category Submission Failed",
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    }



    const handleReset = () => {
        setCategoryName('')
        setStatus('')
        setIcon({ file: '/assets/shopping-cart.png', bytes: '' })
    }
    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <Grid container spacing={3}>
                    <Grid item lg={12} sx={{ fontWeight: 500 }}>
                        Category Interface
                    </Grid>
                    <div>
                        < FormatListBulletedIcon/>
                    </div>
                    <Grid item lg={6} >
                        <TextField label="Category Name"
                            error={error.categoryName ? true : false}
                            helperText={error.categoryName}
                            value={categoryName}
                            onFocus={() => handleError('categoryName', null)}
                            onChange={(event) => setCategoryName(event.target.value)}
                            variant='outlined' fullWidth />
                    </Grid>
                    <Grid item lg={6} >
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
                                <MenuItem value="Continue">Continue</MenuItem>
                                <MenuItem value="Trending">Treding</MenuItem>
                                <MenuItem value="Discontniue">Discontinue</MenuItem>
                                <MenuItem value="Popular">Popular</MenuItem>
                            </Select>
                        </FormControl>
                        <div className={classes.errorstyles}>
                            {error.status}
                        </div>
                    </Grid>
                    <Grid item lg={6}>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <input onChange={handleIcon} hidden accept="image/*" type="file" />
                            <PhotoCamera />
                        </IconButton>
                        <div className={classes.errorstyles}>{error.icon}</div>
                    </Grid>
                    <Grid item lg={6}>
                        <Avatar
                            alt="Icon"
                            src={icon.file}
                            style={{ width: 56, height: 56 }}
                        />
                    </Grid>
                    <Grid item lg={6}>
                        <Button onClick={handleSubmit} fullWidth color="primary" variant="contained">
                            Submit
                        </Button>
                    </Grid>
                    <Grid item lg={6}>
                        <Button onClick={handleReset} fullWidth color="primary" variant="contained">Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
