import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import './App.css';
import Home from './components/home';
import Detail from './components/detail';
import Toolbar from './components/toolbar';


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
            <Router>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/detail" component={Detail} />
              </Switch>
            </Router>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
