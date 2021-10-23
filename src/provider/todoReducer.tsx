import { IUserMovies } from '../interfaces/IUserMoviesModel';
import { ICardModel } from '../interfaces/ICardModel';

type TodoAction =
    | { type: 'addTodo', payload: ICardModel }
    | { type: 'toggleTodo', payload: ICardModel };


export const todoReducer = (state: IUserMovies, action: TodoAction): IUserMovies => {

    switch (action.type) {
        case 'addTodo':
            return {
                ...state,
                wishlist: [action.payload, ...state.wishlist],
            }


        case 'toggleTodo':
            return {
                ...state,
                wishlist: [action.payload]
            }


        default:
            return state;
    }

}