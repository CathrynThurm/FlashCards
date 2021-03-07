import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import NotFound from "./Layout/NotFound"
import Deck from "./Decks/Deck";
import Header from "./Layout/Header"


/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  return (
    <div className="app-routes">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path = "/decks">
          <Deck />
        </Route>
        <Route path = "*">
          <NotFound />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
