import { CircularProgress } from '@material-ui/core';

import { useEffect, useState, useContext } from 'react';
import { getPopularMovies } from '../../services/axios';
import { IMovies } from '../../interfaces/IMoviesModel';
import GenericList from '../genericList/genericList';
import CardItem from '../card/card';
import { ICardModel } from '../../interfaces/ICardModel';
import CustomGrid from '../grid/grid';
import { ProviderContext } from '../../provider/provider';
import { TodoContext } from '../../provider/todoContext';

export default function PopularMovies() {
    let title = "Peliculas populares";
    const [data, setData] = useState<IMovies[]>();
    // const { todoState, toggleTodo } = useContext(TodoContext);
   
    //const { todos } = todoState;

    // return {
    //     todos: todos,
    //     pendingTodos: todos.filter(todo => !todo.completed).length,
    //     toggleTodo
    // }
    useEffect(() => {
        const fetchData = async () => {
            setData(await getPopularMovies());
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
        //   console.log(state.Provider);
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
