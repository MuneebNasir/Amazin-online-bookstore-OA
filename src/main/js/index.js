import React from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import Main from "./Main";

ReactDOM.render(
    <HashRouter>
        <Main />
    </HashRouter>,
    document.getElementById("root")
);