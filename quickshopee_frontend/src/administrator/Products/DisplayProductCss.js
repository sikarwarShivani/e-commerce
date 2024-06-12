import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({


    mainContainer: {
        background: 'grey',
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    box: {

        background: '#fff',
        width: 'auto',
        hight: 'auto',
        padding: '1%',
        borderRedius: '2%'
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