import {store} from "./shared/redux/store";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import React, {Suspense} from "react";
import {ReduxLoader} from "./shared/routing/redux-loader";
import {NOTIFICATION_EPICS, NOTIFICATION_REDUX_KEY, notificationReducer} from "./notifications/notification.redux";
import {GlobalStyle} from "./stakater-theme";
import {LinearProgress} from "@material-ui/core";
import App from "./app";

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle>
      <ReduxLoader
        redux={[
          {
            key: NOTIFICATION_REDUX_KEY,
            reducer: notificationReducer,
            epics: NOTIFICATION_EPICS,
          },
        ]}
      >
        <Suspense fallback={<LinearProgress color={"secondary"}/>}>
          <App/>
        </Suspense>
      </ReduxLoader>
    </GlobalStyle>
  </Provider>,
  document.getElementById("app"),
);
