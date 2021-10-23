import { IUserMovies } from './IUserMoviesModel';
import { Action } from '../provider/provider';

export interface IProviderModel {
    state: IUserMovies;
    dispatch: React.Dispatch<Action>;
}
