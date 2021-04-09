import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Authors from "../pages/AuthorInterface/Authors";
import Publishers from "../pages/PublisherInterface/Publishers";
import Books from "../pages/Books/Books";
import BookInformation from "../pages/BookInterface/BookInformation";
import SignUp from "./SignUp";
import SignIn from "./SignIn";


const Routing = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/authors">
                <Authors/>
            </Route>
            <Route path="/publishers">
                <Publishers />
            </Route>
            <Route path="/books">
                <Books/>
            </Route>
            <Route path="/BookInformation">
                <BookInformation/>
            </Route>
            <Route path="/signup">
                <SignUp/>
            </Route>
            <Route path="/signin">
                <SignIn/>
            </Route>
            <Redirect to={"/"} />
        </Switch>
    )
}

export default Routing;