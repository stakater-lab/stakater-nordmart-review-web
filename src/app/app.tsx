import React from "react";
import {Redirect, Route, Switch} from "react-router";
import {HashRouter} from "react-router-dom";
import {NotFound} from "./404";
import {TopMenu} from "./navigation/top-menu";
import {Products} from "./review/products";

export const App = () => {
  return (
    <HashRouter>
      <TopMenu/>

      <Switch>
        <Redirect exact from="/" to="/reviews"/>

        <Route path="/reviews">
          <Products/>
        </Route>

        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default App;
