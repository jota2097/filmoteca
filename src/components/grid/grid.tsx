import { Grid, Typography, IconButton, Tooltip } from '@material-ui/core';
import { SortByAlpha, StarBorder } from '@material-ui/icons';





export default function CustomGrid({ title, child, sortByName, sortByVotes }: { title: string, child: React.ReactNode, sortByName: () => void, sortByVotes: () => void }) {
    return (
        <>
            <Grid container
                direction="row"
                justify="flex-end" spacing={1}>
                <Grid item>

                    <Tooltip title="Ordenar por nombre">
                        <IconButton onClick={() => sortByName()}>
                            <SortByAlpha />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Ordenar por calificación">
                        <IconButton onClick={() => sortByVotes()}>
                            <StarBorder />
                        </IconButton>
                    </Tooltip>

                </Grid>
            </Grid>
            <Grid container
                spacing={3}
                direction="column"
                alignItems="center">
                <Grid item>
                    <Typography variant="h3" color="inherit">{title}</Typography>
                </Grid>
                <Grid item>
                    {child}
                </Grid>
            </Grid>
            {/* <Grid container
                spacing={3}
                direction="column"
                alignItems="center"
            >
                <Grid item>
                    <Typography variant="h3" color="inherit">Peliculas populares</Typography>
                </Grid>
                <Grid item>
                    <List results={pagination.results} />
                </Grid>

                {/* <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button disabled={pagination.previous === null} onClick={() => previous()}>Back</Button>
                    <Button disabled={pagination.next === null} onClick={() => next()}>Next</Button>
                </ButtonGroup> 
            </Grid> */}
        </>
    );
}
