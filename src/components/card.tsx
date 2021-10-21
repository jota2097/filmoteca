import { Link } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, CardActions, Avatar, Box, Typography, IconButton, Tooltip } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Pokemon } from '../models/pokemon';
import { getColorOfPokemon } from '../util/util';



const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: 800,
        },
        typographyColor: {
            color: "#FFFFFF"
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
        icon: {
            color: "#FFFFFF"
        }
    }),
);

export default function PokeCard(props: { pokemon: Pokemon }) {
    const classes = useStyles();

    return (
        <Card className={classes.root} style={{ backgroundColor: getColorOfPokemon(props.pokemon.types[0].type.name) }}>
            <Box display="flex" flexDirection="column" borderRadius="50%" className={classes.box}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="auto"
                    image={props.pokemon.sprites.other?.['official-artwork'].front_default}
                    title="Contemplative Reptile"
                />
                <Avatar className={classes.avatar}>#{props.pokemon.id}</Avatar>
            </Box>

            <CardContent>
                <Typography gutterBottom variant="h5" component="h2" className={classes.typographyColor}>
                    {props.pokemon.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Tooltip title="Show more" aria-label="Show more">
                    <Link to={`/detail?id=${props.pokemon.id}`} className={classes.button}>
                        <IconButton>
                            <VisibilityIcon className={classes.icon} />
                        </IconButton>
                    </Link>
                </Tooltip>
            </CardActions>
        </Card>
    );
}
