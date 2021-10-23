import { useReducer } from 'react';


import { todoReducer } from './todoReducer';
import { IUserMovies } from '../interfaces/IUserMoviesModel';
import { TodoContext } from './todoContext';
import { ICardModel } from '../interfaces/ICardModel';

const INITIAL_STATE: IUserMovies = {
    wishlist: [],
    alreadySeen: []
}




interface props {
    children: JSX.Element | JSX.Element[]
}

export const TodoProvider = ({ children }: props) => {

    const [todoState, dispatch] = useReducer(todoReducer, INITIAL_STATE);

    const toggleTodo = (id: string) => {
        dispatch({ type: 'toggleTodo', payload: {} as ICardModel })
    }


    return (
        <TodoContext.Provider value={{
            todoState,
            toggleTodo
        }}>
            {children}
        </TodoContext.Provider>
    )
}