import axios from 'axios';
import { API_URL } from '../config';
import { Pagination } from '../models/paginationPokemon';
import { Pokemon } from '../models/pokemon';

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