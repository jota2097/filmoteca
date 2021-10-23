import { CircularProgress } from '@material-ui/core';

import { useEffect, useState } from 'react';
import { getUpcomingMovies } from '../../services/axios';
import { IMovies } from '../../interfaces/IUpconmigModel';
import CardItem from '../card/card';
import { ICardModel } from '../../interfaces/ICardModel';
import GenericList from '../genericList/genericList';
import CustomGrid from '../grid/grid';

export default function UpcomingMovies() {
    let title = "Próximas peliculas";
    const [data, setData] = useState<IMovies[]>();

    useEffect(() => {
        const fetchData = async () => {
            setData(await getUpcomingMovies());
        };
        fetchData();
    }, []);


    if (data === undefined) return <CircularProgress />;

    const sortByName = (): void => {
        data.sort((a, b) => a.title.localeCompare(b.title));
        setData([...data]);
    }

    const sortByVotes = (): void => {
        data.sort((a, b) => b.vote_average - a.vote_average);
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
                />} />
        </>
    );
}
