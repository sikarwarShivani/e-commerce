import { useStyles } from "./BannersCss";
import { useState, useEffect } from "react";
import { postData } from "../../NodeServices/FetchNodeServices";
import { DropzoneArea } from "material-ui-dropzone";
import { Button, Grid } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Swal from "sweetalert2";

export default function Banners() {
    const classes = useStyles('')

    const [status, setStatus] = useState('')
    const [banners, setBanners] = useState('')

    const handleSubmit = async () => {

        var formData = new FormData()
        formData.append('status', status)

        banners.map((item, index) => {
            formData.append('picture' + index, item)


        })
        
        var response = await postData('banners/submit_banner', formData)
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
                text: "banners Submission Failed",
                showConfirmButton: false,
                timer: 2000
            })
        }


    }

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        Banner Interface
                    </Grid>
                    <Grid item lg={12}>
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            filesLimit={10}
                            dropzoneText={"Drag and drop an image here or click"}
                            onChange={(files) => setBanners(files)}
                        />
                    </Grid>
                    <Grid item lg={12} >
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Banner status</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="Show" control={<Radio onChange={(event) => setStatus(event.target.value)} />} label="Show" />
                                <FormControlLabel value="Hide" control={<Radio onChange={(event) => setStatus(event.target.value)} />} label="Hide" />

                            </RadioGroup>
                        </FormControl>
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