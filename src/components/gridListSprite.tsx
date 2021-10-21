import { makeStyles, createStyles } from '@material-ui/core/styles';
import { GridList, GridListTile } from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        gridList: {
            flexWrap: 'nowrap',
            transform: 'translateZ(0)',
        },
    }),
);

export default function GridListSprite(props: { sprites: string[] }) {
    const classes = useStyles();

    return (<GridList className={classes.gridList} cols={4}>
        {props.sprites.map((tile, index) => (
            <GridListTile key={index}>
                <img src={tile} alt={tile} />
            </GridListTile>
        ))}
    </GridList>
    );
}
