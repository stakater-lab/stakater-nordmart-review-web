import React, {useEffect, useMemo, useState} from "react";
import {Redirect, Route, Switch} from "react-router";
import {HashRouter} from "react-router-dom";
import {NotFound} from "./404";
import {TopMenu} from "./navigation/top-menu";
import {Reviews} from "./review/reviews";
import {createInstance, MatomoProvider} from '@datapunt/matomo-tracker-react'
import {httpClient} from "./shared/services/client";
import {API} from "./shared/services/api";

export const App = () => {
  const [matomoUrl, setMatomoUrl] = useState<string>("");
  useEffect(() => {
    const sub = httpClient.get(API.matomoUrl).subscribe((res) => {
      if (res.response.url) {
        setMatomoUrl(res.response.url)
      }
    });

    return () => {
      sub.unsubscribe()
    }
  }, [])

  const instance = useMemo(() => {
    return matomoUrl ? createInstance({
      urlBase: matomoUrl,
      siteId: 1,
    }) : undefined
  }, [matomoUrl]);

  return instance ? (
    <MatomoProvider value={instance}>
      <AppRenderer/>
    </MatomoProvider>
  ) : (
    <AppRenderer/>
  );
};

const AppRenderer = () => (
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
)

export default App;
