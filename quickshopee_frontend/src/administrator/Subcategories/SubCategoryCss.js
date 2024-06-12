import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({

    maincontainer: {
        background: 'grey',
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    box: {
        background: '#fff',
        width: '50vw',
        borderRadius: '15px',
        padding: '20px'

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


})