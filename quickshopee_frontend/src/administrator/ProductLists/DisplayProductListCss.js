import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'grey',
        width: '100vw',
        height: '100vh'
    },
    box: {
        background: '#fff',
        height: 'auto',
        width: '50vw',
        padding: '10px',
        borderRadius: '15px'
    }
})