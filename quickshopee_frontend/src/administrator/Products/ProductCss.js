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
    },
    errorstyles: {
        color: '#d32f2f',
        fontSize: '12px',
        fontFamily: 'arial',
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
        textAlign: 'left',
        marginTop: '3px',
        marginRight: '14px',
        marginBottom: 0,
        marginLeft: '14px',
    }
});