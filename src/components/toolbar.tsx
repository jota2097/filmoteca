import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, IconButton, Typography, Menu, MenuItem } from '@material-ui/core';
import logo from "../assets/images/logo.svg";
import { useChangeTheme } from '../theme';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1
        },

        flex: {
            flexGrow: 1,
        },
        toolbar: {
            "background-color": "#EF5350"
        },
        btn: {
            backgroundColor: "transparent",
            border: "none"
        }
    }),
);

const goHome = () => {

}

export default function ToolBar() {
    const classes = useStyles();
    const theme = useTheme();
    const changeTheme = useChangeTheme();

    return (
        <div className={classes.root}>
            <AppBar className={classes.toolbar} position="static" >
                <Toolbar variant="dense">
                    <Typography variant="h5" color="inherit" className={classes.flex}>
                        Filmoteca
                    </Typography>
                    <div>
                        <IconButton
                            title="Toggle light/dark mode"
                            onClick={() => changeTheme()}
                        >
                            {theme.palette.type === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                        </IconButton>
                    </div>
                </Toolbar>

            </AppBar>
        </div>
    );
}
