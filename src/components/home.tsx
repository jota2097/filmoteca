import { Grid, ButtonGroup, Button, makeStyles, createStyles, CircularProgress } from '@material-ui/core';
import { Pagination } from '../models/paginationPokemon';
import { useEffect, useState } from 'react';
import { getPokemonsPagination } from '../services/axios';
import List from './list';

const useStyles = makeStyles(() =>
    createStyles({
        gridButtons: {
            paddingTop: 10,
            paddingBottom: 10
        },
    }),
);

export default function Home() {
    const classes = useStyles();
    const [pagination, setPaginationData] = useState<Pagination>();

    useEffect(() => {
        const fetchData = async () => {
            let pagination: Pagination = await getPokemonsPagination();
            setPaginationData(pagination);
        };

        fetchData();
    }, []);

    if (pagination === undefined) return <CircularProgress />;

    const next = async () => {
        const pokemon = await getPokemonsPagination(pagination.next);
        setPaginationData(pokemon);
    }
    const previous = async () => {
        const pokemon = await getPokemonsPagination(pagination.previous);
        setPaginationData(pokemon);
    }



    return (
        <>
            <List results={pagination.results} />
            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
                className={classes.gridButtons}>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button disabled={pagination.previous === null} onClick={() => previous()}>Back</Button>
                    <Button disabled={pagination.next === null} onClick={() => next()}>Next</Button>
                </ButtonGroup>
            </Grid>
        </>
    );
}
