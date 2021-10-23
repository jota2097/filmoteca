import React, { createContext, useReducer } from "react";
import { IUserMovies } from '../interfaces/IUserMoviesModel';
import { ICardModel } from '../interfaces/ICardModel';
import { IProviderModel } from "../interfaces/IProviderModel";

type AppState = typeof initialState;
export type Action =
  | { type: "SET_WISHLIST"; payload: ICardModel }
  | { type: "SET_ALREADYSEEN"; payload: ICardModel }
  | { type: "ORDER_BY_NAME_ALREADYSEEN"; }
  | { type: "ORDER_BY_NAME_WISHLIST"; }
  | { type: "ORDER_BY_VOTE_ALREADYSEEN"; }
  | { type: "ORDER_BY_VOTE_WISHLIST"; };

interface Props {
  children: JSX.Element | JSX.Element[]
}

let storage = localStorage.getItem("userMovies");
const defaultState: IUserMovies = {
  wishlist: [],
  alreadySeen: []

};

const initialState: IUserMovies = storage != null ? JSON.parse(storage) : defaultState;

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
    case "ORDER_BY_NAME_ALREADYSEEN":
      state.alreadySeen.sort((a, b) => a.title.localeCompare(b.title));
      tempState =
      {
        ...state,
        alreadySeen: [...state.alreadySeen],
      };
      break;
    case "ORDER_BY_NAME_WISHLIST":
      state.wishlist.sort((a, b) => a.title.localeCompare(b.title));
      tempState =
      {
        ...state,
        alreadySeen: [...state.alreadySeen],
      };
      break;
    case "ORDER_BY_VOTE_ALREADYSEEN":
      state.alreadySeen.sort((a, b) => b.voteAverage - a.voteAverage)
      tempState =
      {
        ...state,
        alreadySeen: [...state.alreadySeen],
      };
      break;
    case "ORDER_BY_VOTE_WISHLIST":
      state.wishlist.sort((a, b) => b.voteAverage - a.voteAverage)
      tempState =
      {
        ...state,
        alreadySeen: [...state.alreadySeen],
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

export const Provider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <ProviderContext.Provider value={{ state, dispatch }}>
      {children}
    </ProviderContext.Provider>
  );
}

