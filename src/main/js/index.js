import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter} from "react-router-dom";
import Main from "./Main";
import UserProvider from "./services/provider/UserProvider";

ReactDOM.render(
    <HashRouter>
        <UserProvider>
            <Main />
        </UserProvider>
    </HashRouter>,
    document.getElementById("root")
);