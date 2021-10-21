import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { makeStyles, Theme, Container, Box, CardMedia, CircularProgress, Typography, createStyles, Card, CardContent, Button } from '@material-ui/core';
import { Pokemon } from '../models/pokemon';
import { getPokemonByID } from '../services/axios';
import { getColorOfPokemon } from '../util/util';
import GridListSprite from './gridListSprite';
import CustomChip from './customChip';




const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 800,
            marginBottom: "50px",
            textTransform: "capitalize"
        },
        box: {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            margin: "10px",
        },
        content: {
            backgroundColor: "#FFFFFF",

        },
        title: {
            color: "#FFFFFF"
        },
        grid: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden'
        },
        gridList: {
            flexWrap: 'nowrap',
            transform: 'translateZ(0)',
        },
        mediaImg: {
            height: "auto",
            width: "50%",
            margin: "auto"
        },
        chipStats: {
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(0.5),
            },
        }
    }),
);

const GetQuery = () => {
    let query = new URLSearchParams(useLocation().search);
    return Number(query.get("id"));
}

export default function Detail() {
    let q = GetQuery();

    const [pokemon, setData] = useState<Pokemon>();
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            let data: Pokemon = await getPokemonByID(q);
            console.log(JSON.stringify(data.stats));
            setData(data);
        };
        fetchData();
    }, [q]);

    if (pokemon === undefined || pokemon === null) { return (<CircularProgress />); }

    const color = getColorOfPokemon(pokemon.types[0].type.name);
    const getDefaultSprite = () => [pokemon.sprites.front_default, pokemon.sprites.back_default, pokemon.sprites.front_shiny, pokemon.sprites.back_shiny];

    const getFormmatedString = (text: string[]): string => {
        return text.join(', ');
    }

    const getChip = (label: string, key?: number) => {
        return (
            <CustomChip label={label} color={color} key={key} />
        );
    }

    const getStats = () => {
        return (
            <div className={classes.chipStats}>
                {pokemon.stats.map((item, index) => (
                    getChip(`${item.stat.name}: ${item.base_stat}`, index)
                ))}
            </div>
        );
    }

    return (

        <Container maxWidth="sm">

            <Link to="/" style={{ textDecoration: 'none' }} >
                <Button variant="outlined" color="primary" style={{ marginBottom: "10px" }}>
                    Back
                </Button>
            </Link>

            <Card className={classes.root} style={{ backgroundColor: color }}>
                <Box display="flex" flexDirection="column" borderRadius="50%" className={classes.box}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                        {pokemon.name} - #{pokemon.id}
                    </Typography>
                    <CardMedia className={classes.mediaImg}
                        component="img"
                        alt={pokemon.name}
                        image={pokemon.sprites.other?.['official-artwork'].front_default}
                        title={pokemon.name}
                    />
                </Box>

                <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h5" component="h2" style={{ color: color }}>
                        Type
                    </Typography>

                    {getChip(pokemon.types[0].type.name)}

                    <Typography gutterBottom variant="h5" component="h2" style={{ color: color }}>
                        Weight
                    </Typography>

                    {getChip(`${pokemon.weight} Kg`)}

                    <Typography gutterBottom variant="h5" component="h2" style={{ color: color }}>
                        Stats
                    </Typography>
                    {getStats()}
                    <Typography gutterBottom variant="h5" component="h2" style={{ color: color }}>
                        Default Sprites
                    </Typography>
                    <GridListSprite sprites={getDefaultSprite()} />
                    <Typography gutterBottom variant="h5" component="h2" style={{ color: color }}>
                        Abilities
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">
                        {getFormmatedString(pokemon.abilities.map(e => e.ability.name))}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2" style={{ color: color }}>
                        Moves
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">
                        {getFormmatedString(pokemon.moves.map(e => e.move.name))}
                    </Typography>
                </CardContent>
            </Card>
        </Container >

    )
}