import React from "react";
import {Redirect, Route, Switch} from "react-router";
import {HashRouter} from "react-router-dom";
import {NotFound} from "./404";
import {TopMenu} from "./navigation/top-menu";
import {Reviews} from "./review/reviews";
import {createInstance, MatomoProvider} from '@datapunt/matomo-tracker-react'
declare var MATOMO_BASE_URL: string;

const instance = createInstance({
  urlBase: MATOMO_BASE_URL,
  siteId: 1,
})

export const App = () => {
  return (
    <MatomoProvider value={instance}>
      <HashRouter>
        <TopMenu/>

        <Switch>
          <Redirect exact from="/" to="/reviews"/>

          <Route exact path="/reviews">
            <Reviews/>
          </Route>

          <Route path="/reviews/:id">
            <Reviews/>
          </Route>

          <Route>
            <NotFound/>
          </Route>
        </Switch>
      </HashRouter>
    </MatomoProvider>
  );
};

export default App;
