import { Route, Switch } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import './App.css';
import UpcomingMovies from './components/upcomingMovies/upconmigMovies';
import Detail from './components/detail';
import Toolbar from './components/toolbar/toolbar';
import PopularMovies from './components/popularMovies/popularMovies';
import TvShows from './components/tvShows/tvShows';


function App() {

  return (
    <>
      <Toolbar />
      <Container>
        <Grid
          style={{ minHeight: "100vh", margin: 'auto', height: "100%" }}
          container
          alignItems="center"
          direction="row"
          justify="center">
          <Grid item style={{ marginTop: "5%" }}>
            <Switch>
              <Route exact path="/" component={PopularMovies} />
              <Route path="/upcoming" component={UpcomingMovies} />
              <Route path="/tvShow" component={TvShows} />
              <Route path="/detail" component={Detail} />
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
