import { Pokemon } from '../models/pokemon';
import PokeCard from './card';
import { Grid, CircularProgress } from '@material-ui/core';
import { Result } from '../models/paginationPokemon';
import { useEffect, useState } from 'react';
import { getPokemonByUri } from '../services/axios';

export default function List(props: { results: Result[] }) {

  const [data, setData] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let data: Pokemon[] = [];
      for (const item of props.results) {
        const pokemon = await getPokemonByUri(item.url);
        data.push(pokemon);
      }
      setData(data);
    };

    fetchData();
  }, [data, props.results]);

  if (data.length === 0) return <CircularProgress />;

  return (
    <div>
      <Grid container
        alignItems="center"
        direction="row"
        justify="center" spacing={3}>
        {data.map((pokemon: Pokemon, index: number) =>

          <Grid item xs={12} sm={6} md={4} key={index} >
            <PokeCard pokemon={pokemon} />
          </Grid>


        )}
      </Grid>
    </div>
  );
}
