import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "darkkhaki",
    },
    menuButton: {
        marginRight: theme.spacing(1),
        color: "black",
    },
    title: {
        fontSize: "1.38rem",
        color: "#5f6368",
        marginLeft: "5px",
        cursor: "pointer",
        letterSpacing: "5px",
        fontWeight: "bolder",
        textDecoration: "overline",
        paddingLeft: '20px'
    },
    appBar: {
        backgroundColor: "white",
        color: "black",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerWrapper: {
        display: "flex",
        alignItems: "center",
    },
    header__wrapper__right: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    icon: {
        marginRight: "15px",
        color: "#5f6368",
        cursor: "pointer",
    },
    header__image: {
        width: "100px",
        borderRadius: "50px",
        objectFit: "contain"
    }
}));