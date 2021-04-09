import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter} from "react-router-dom";
import Main_old from "./Main_old";
import UserProvider from "./services/provider/UserProvider";
import Main from "./Main";

import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
    <HashRouter>
        <UserProvider>
            {/*<Main_old />*/}
            <Main />
        </UserProvider>
    </HashRouter>,
    document.getElementById("root")
);