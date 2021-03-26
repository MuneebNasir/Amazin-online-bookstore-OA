import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter} from "react-router-dom";
import Main from "./Main";
import AuthProvider from "./services/provider/AuthProvider";

ReactDOM.render(
    <HashRouter>
        <AuthProvider>
            <Main />
        </AuthProvider>
    </HashRouter>,
    document.getElementById("root")
);