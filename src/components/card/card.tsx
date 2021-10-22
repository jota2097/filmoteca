import { Link } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, CardActions, Typography, IconButton, Tooltip } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { ICardModel } from '../../models/cardModel';
import Rating from '@mui/material/Rating';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: 345,
            height: "100%"
        },
        box: {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            margin: "5px"
        },
        avatar: {
            margin: "auto",
            backgroundColor: "unset",
            width: 50,
        },
        actions: {
            float: "right"
        },
        button: {
            marginLeft: 'auto',
        },
    }));

export default function CardItem({ item }: { item: ICardModel }) {
    const classes = useStyles();
    const url = "https://www.themoviedb.org/t/p/original/";
    return (
        <Card className={classes.root} raised={true}>

            <CardMedia
                component="img"
                image={url + item.imageUrl}
            />
            <CardContent>
                <Typography gutterBottom component="h4">
                    {item.title}
                </Typography>
                <Typography variant="body2">
                    Estreno el : {item.year}
                </Typography>
                <Rating name="half-rating-read" defaultValue={item.voteAverage} precision={0.5} readOnly />
            </CardContent>
            <CardActions>
                <Tooltip title="Show more" aria-label="Show more">
                    <Link to={`/detail?id=${item.id}`} className={classes.button}>
                        <IconButton>
                            <VisibilityIcon />
                        </IconButton>
                    </Link>
                </Tooltip>
            </CardActions>
        </Card>
    );
}
