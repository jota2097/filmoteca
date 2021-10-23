import { Link } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, CardActions, Typography, IconButton, Tooltip, Button } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { ICardModel } from '../../interfaces/ICardModel';
import Rating from '@mui/material/Rating';
import { Favorite } from '@material-ui/icons';
import { useState } from 'react';
import { URL_IMAGES } from '../../config';
import { ratingMovie } from '../../services/axios';
import { Alert, Snackbar, SnackbarOrigin } from '@mui/material';

export interface State extends SnackbarOrigin {
    open: boolean;
}
const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: 345,
            height: "100%"
        },
        button: {
            marginLeft: 'auto',
        },
        year: {
            marginBottom: "10px"
        }
    }));

export default function CardItem({ item, allowViewMore, isCallFromDetail = false }: { item: ICardModel, allowViewMore: boolean, isCallFromDetail: boolean }) {
    const classes = useStyles();
    const [rating, setRating] = useState<number | null>(0);
    const [snackBar, setSnackbar] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'right',

    });
    const { vertical, horizontal, open } = snackBar;

    const getRating = () => {
        return !isCallFromDetail ?
            <Rating defaultValue={item.voteAverage} precision={0.5} readOnly /> :
            <Rating
                value={rating}
                onChange={(_, value) => onChangeRating(value)}
            />;
    }

    const onChangeRating = async (value: number | null): Promise<void> => {
        if (value == null) return;
        await ratingMovie(item.id, value);
        setRating(value);
        handleClick();
    }
    const handleClick = () => {
        setSnackbar({ ...snackBar, open: true });
    };

    const handleClose = () => {
        setSnackbar({ ...snackBar, open: false });
    };

    const getButtonActions = () => {
        return !isCallFromDetail &&
            <>
                <Tooltip title="Agregar a wishlist">
                    <IconButton>
                        <Favorite />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Marcar como visto">
                    <IconButton>
                        <VisibilityIcon />
                    </IconButton>
                </Tooltip>
            </>;
    }

    const showSnackBar = () => {
        return <Snackbar open={open}
            anchorOrigin={{ vertical, horizontal }}
            autoHideDuration={3000}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Se ha enviado tu rating satisfactoriamente
            </Alert>
        </Snackbar>;
    }
    return (
        <>
            {showSnackBar()}
            <Card className={classes.root} raised={true}>
                <CardMedia
                    component="img"
                    image={URL_IMAGES + item.imageUrl}
                />
                <CardContent>
                    <Typography gutterBottom component="h4">
                        {item.title}
                    </Typography>
                    {getRating()}
                    <Typography className={classes.year} variant="body2" color="textSecondary">
                        Estreno el : {item.year}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {item.overview}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {getButtonActions()}
                    {allowViewMore &&
                        <Link to={`/movie?id=${item.id}`} className={classes.button}>
                            <Button size="small">Ver más</Button>
                        </Link>
                    }
                </CardActions>
            </Card >
        </>

    );
}