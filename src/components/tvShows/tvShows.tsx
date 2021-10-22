import { CircularProgress } from '@material-ui/core';

import { useEffect, useState } from 'react';
import { getTvShows } from '../../services/axios';
import CardItem from '../card/card';
import { ICardModel } from '../../models/cardModel';
import GenericList from '../genericList/genericList';
import CustomGrid from '../grid/grid';
import { ITVShows } from '../../models/topTvShowsModel';

export default function TvShows() {
    let title = "Tv shows";
    const [data, setData] = useState<ITVShows[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setData(await getTvShows());
        };
        fetchData();
    }, []);

    if (data === undefined) return <CircularProgress />;

    const sortByName = (): void => {
        data.sort((a, b) => a.name.localeCompare(b.name));
        setData([...data]);
    }

    const sortByVotes = (): void => {
        data.sort((a, b) =>  b.vote_average - a.vote_average);
        setData([...data]);
    }
    return (
        <>

            <CustomGrid
                title={title}
                sortByName={sortByName}
                sortByVotes={sortByVotes}
                child={<GenericList
                    keyExtractor={({ id }) => id.toString()}
                    data={data}
                    renderItem={(item) => <CardItem
                        item={{
                            id: item.id,
                            title: item.name,
                            imageUrl: item.poster_path,
                            year: item.first_air_date,
                            voteAverage: item.vote_average
                        } as ICardModel} />}
                />} />
        </>
    );
}
