import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'

export const BlueButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(blue[50]),
        backgroundColor: blue[50],
        margin: "6px",
        '&:hover': {
            backgroundColor: blue[500],
            color: theme.palette.getContrastText(blue[500]),
        },
    },
}))(Button);

export const ItemSelect = withStyles((theme) => ({
    root: {
        backgroundColor: "white",
        margin: "0px",
        padding: "0px 5px",
        borderRadius: "6px",
        transition: "all 0.3s ease",
        '&:focus': {
            backgroundColor:"white",
            borderRadius: "6px",
            margin: "0px",
            padding: "0px 5px",
        },
    }
}))(Select);

