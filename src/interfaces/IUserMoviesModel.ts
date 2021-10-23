import { ICardModel } from './ICardModel';

export interface IUserMovies {
    wishlist: ICardModel[];
    alreadySeen: ICardModel[];
}
