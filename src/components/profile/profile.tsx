import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Favorite } from '@material-ui/icons';

import { CircularProgress } from '@material-ui/core';

import { useEffect, useState } from 'react';
import { getUpcomingMovies } from '../../services/axios';
import { IMovies } from '../../interfaces/IMoviesModel';
import CardItem from '../card/card';
import { ICardModel } from '../../interfaces/ICardModel';
import GenericList from '../genericList/genericList';
import CustomGrid from '../grid/grid';
import Box from '@mui/material/Box';


export default function Profile() {
    const [value, setValue] = React.useState(0);

    const [data, setData] = useState<IMovies[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setData(await getUpcomingMovies());
        };
        fetchData();
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} centered>
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
        </Box>
    );
}
