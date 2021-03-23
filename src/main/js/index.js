import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import Main from "./Main";
import AuthProvider from "./services/provider/AuthProvider";

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <Main />
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById("root")
);