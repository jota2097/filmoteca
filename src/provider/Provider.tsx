import React, { createContext, useReducer } from "react";
import { IUserMovies } from '../interfaces/IUserMoviesModel';
import { ICardModel } from '../interfaces/ICardModel';
import { IProviderModel } from "../interfaces/IProviderModel";

type AppState = typeof initialState;
export type Action =
  |
  { type: "SET_WISHLIST"; payload: ICardModel }
  | { type: "SET_ALREADYSEEN"; payload: ICardModel };

interface Props {
  children: JSX.Element | JSX.Element[]
}

const initialState: IUserMovies = {
  wishlist: [],
  alreadySeen: []

};

const reducer = (state: AppState, action: Action) => {
  let tempState;
  switch (action.type) {
    case "SET_WISHLIST":
      tempState =
      {
        ...state,
        wishlist: [action.payload, ...state.wishlist],
      };
      break;
    case "SET_ALREADYSEEN":
      tempState =
      {
        ...state,
        alreadySeen: [action.payload, ...state.alreadySeen],
      };
      break;
    default:
      tempState = state;
      break;
  }
  localStorage.setItem('userMovies', JSON.stringify(tempState));
  return tempState;
};





export const ProviderContext = createContext<IProviderModel>({} as IProviderModel);
// const InputValueContext = React.createContext<any>(null);

export const Provider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <ProviderContext.Provider value={{ state, dispatch }}>
      {children}
    </ProviderContext.Provider>
  );
}

