import { createContext } from "react";
import { IUserMovies } from '../interfaces/IUserMoviesModel';


export type TodoContextProps = {
    todoState: IUserMovies;
    toggleTodo: (id: string) => void;
}


export const TodoContext = createContext<TodoContextProps>({} as TodoContextProps);