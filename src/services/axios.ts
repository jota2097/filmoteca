import axios from 'axios';
import { API_URL, API_KEY, LANG, SESSION_ID } from '../config';
import { ITimelineMovies, IMovies } from '../interfaces/IUpconmigModel';
import { ITimelineTvShows } from '../interfaces/ITopTvShowsModel';

export const getUpcomingMovies = async () => {
    return await axios.get<ITimelineMovies>(`${API_URL}/3/movie/upcoming?api_key=${API_KEY}&language=${LANG}&page=1`).then(response => {
        return response.data.results;
    }).catch(err => {
        throw new err();
    });
}

export const getPopularMovies = async () => {
    return await axios.get<ITimelineMovies>(`${API_URL}/3/movie/popular?api_key=${API_KEY}&language=${LANG}&page=1`).then(response => {
        return response.data.results;
    }).catch(err => {
        throw new err();
    });
}


export const getTvShows = async () => {
    return await axios.get<ITimelineTvShows>(`${API_URL}/3/tv/top_rated?api_key=${API_KEY}&language=${LANG}&page=1`).then(response => {
        return response.data.results;
    }).catch(err => {
        throw new err();
    });
}


export const getMovieByID = async (id: number) => {
    return await axios.get<IMovies>(`${API_URL}/3/movie/${id}?api_key=${API_KEY}&language=${LANG}&page=1`).then(response => {
        return response.data;
    }).catch(err => {
        throw new err();
    });
}

export const ratingMovie = async (movieID: number, rating: number) => {
    return await axios.post<string>(`${API_URL}/3/movie/${movieID}/rating?api_key=${API_KEY}&session_id=${SESSION_ID}`, {
        "value": rating
    }).then(_ => {
        return "Success";
    }).catch(err => {
        throw new err();
    });
}
