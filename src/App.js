import React from 'react';
import './App.css';
import Drawer from './components/Drawer';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';

const useStyles = makeStyles({
  container: {
    display: "flex"
  }
});

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.container}>

        <Drawer />
        <Switch>
          <Route exact path="/Customerlist" render={props => <Customerlist {...props} />} />
          <Route exact path="/Traininglist" render={props => <Traininglist {...props} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
