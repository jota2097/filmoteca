import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { useChangeTheme } from '../../theme';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { Link } from 'react-router-dom';

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
        },
        menuOpt: {
            fontWeight: 'bold',
            paddingRight: "20px"

        },
        textLink: {
            color: "white",
            textDecorationLine: "inherit"
        }
    }),
);

// const goHome = () => {

// }

export default function ToolBar() {
    const classes = useStyles();
    const theme = useTheme();
    const changeTheme = useChangeTheme();

    return (
        <div className={classes.root}>
            <AppBar className={classes.toolbar} position="static" elevation={0}  >
                <Toolbar variant="dense">
                    <Typography variant="h5" color="inherit" className={classes.flex}>
                        Filmoteca
                    </Typography>
                    <div>

                        <Link to="/" color="white" className={`${classes.flex} ${classes.menuOpt} ${classes.textLink}`}>
                            Películas populares
                        </Link>
                        <Link to="/upcoming" color="white" className={`${classes.flex} ${classes.menuOpt} ${classes.textLink}`}>
                            Próximas películas
                        </Link>
                        <Link to="/tvShow" color="white" className={`${classes.flex} ${classes.menuOpt} ${classes.textLink}`}>
                            Tv shows
                        </Link>
                        <IconButton
                            title="Toggle light/dark mode"
                            onClick={() => changeTheme()}
                        >
                            {theme.palette.type === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                        </IconButton>
                    </div>
                </Toolbar>

            </AppBar>
        </div >
    );
}
