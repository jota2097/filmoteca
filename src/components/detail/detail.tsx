import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles, Container, CircularProgress, createStyles } from '@material-ui/core';
import { getMovieByID } from '../../services/axios';
import { IMovies } from '../../interfaces/IUpconmigModel';
import CardItem from '../card/card';
import { ICardModel } from '../../interfaces/ICardModel';


const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: 800,
            marginBottom: "50px",
            marginTop: "20px",
        }
    }),
);

const GetQuery = () => {
    let query = new URLSearchParams(useLocation().search);
    return Number(query.get("id"));
}

export default function Detail() {
    let q = GetQuery();

    const [movie, setData] = useState<IMovies>();
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            setData(await getMovieByID(q));
        };
        fetchData();
    }, [q]);

    if (movie === undefined || movie === null) { return (<CircularProgress />); }

    return (
        <Container className={classes.root}>
            <CardItem
                isCallFromDetail={true}
                allowViewMore={false}
                item={{
                    id: movie.id,
                    title: movie.title,
                    imageUrl: movie.poster_path,
                    year: movie.release_date,
                    voteAverage: movie.vote_average,
                    overview: movie.overview
                } as ICardModel} />
        </Container >
    )
}