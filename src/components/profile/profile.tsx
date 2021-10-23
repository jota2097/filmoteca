import * as React from 'react';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Favorite } from '@material-ui/icons';

import { CircularProgress } from '@material-ui/core';

import { useEffect, useState } from 'react';
import { getUpcomingMovies } from '../../services/axios';
import { IMovies } from '../../interfaces/IUpconmigModel';
import CardItem from '../card/card';
import { ICardModel } from '../../interfaces/ICardModel';
import GenericList from '../genericList/genericList';
import CustomGrid from '../grid/grid';
const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);
export default function Profile() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [data, setData] = useState<IMovies[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setData(await getUpcomingMovies());
        };
        fetchData();
    }, []);


    return (
        <>
            <Tabs
                className={classes.root}
                value={value}
                onChange={handleChange}
            // className={classes.root}>
            >
                <Tab icon={<VisibilityIcon />} label="Vistos" />
                <Tab icon={<Favorite />} label="Wishlist" />
            </Tabs>
            {value === 0 ? <CustomGrid
                title={""}
                sortByName={() => null}
                sortByVotes={() => null}
                child={<GenericList
                    keyExtractor={({ id }) => id.toString()}
                    data={data}
                    renderItem={(item) =>
                        <CardItem
                            isCallFromDetail={false}
                            allowViewMore={true}
                            item={{
                                id: item.id,
                                title: item.title,
                                imageUrl: item.poster_path,
                                year: item.release_date,
                                voteAverage: item.vote_average
                            } as ICardModel} />}
                />} /> : <p>adios</p>}
        </>
    );
}
