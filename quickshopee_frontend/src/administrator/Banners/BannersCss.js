import { makeStyles } from "@mui/styles"
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
        width: '50vw',
        height: 'auto',
        padding: 10,
        background: '#fff'
    }
})