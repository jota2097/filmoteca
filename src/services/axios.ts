import axios from 'axios';
import { API_URL, API_KEY } from '../config';
import { Pagination } from '../models/paginationPokemon';
import { Pokemon } from '../models/pokemon';
import { ITimelineMovies } from '../models/upconmigModel';
import { ITimelineTvShows } from '../models/topTvShowsModel';

export const getPokemonsPagination = async (url = "", limit = 6, offset = 0) => {
    let uri = url === "" ? `${API_URL}/pokemon?limit=${limit}&offset=${offset}` : url;
    return await axios.get<Pagination>(uri).then(response => {
        return response.data;
    }).catch(err => {
        throw new err();
    });
}

export const getPokemonByUri = async (uri: string) => {
    return await axios.get<Pokemon>(`${uri}`).then(response => {
        return response.data;
    }).catch(err => {
        console.error(err);
        return err;
    });
}

export const getPokemonByID = async (id: number) => {
    return await axios.get<Pokemon>(`${API_URL}/pokemon/${id}`).then(response => {
        return response.data;
    }).catch(err => {
        console.error(err);
        return err;
    });
}

export const getUpcomingMovies = async () => {
    let uri = `${API_URL}/3/movie/upcoming?api_key=${API_KEY}&language=es-ES&page=1`;
    return await axios.get<ITimelineMovies>(uri).then(response => {
        return response.data.results;
    }).catch(err => {
        throw new err();
    });
}

export const getPopularMovies = async () => {
    let uri = `${API_URL}/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`;
    return await axios.get<ITimelineMovies>(uri).then(response => {
        return response.data.results;
    }).catch(err => {
        throw new err();
    });
}


export const getTvShows = async () => {
    let uri = `${API_URL}/3/tv/top_rated?api_key=${API_KEY}&language=es-ES&page=1`;
    return await axios.get<ITimelineTvShows>(uri).then(response => {
        return response.data.results;
    }).catch(err => {
        throw new err();
    });
}