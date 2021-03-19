import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PageHeader from './components/PageHeader';
import Home from "./pages/Home";
import About from "./pages/About";
import Publishers from "./pages/PublisherInterface/Publishers";
import ParticlesBg from 'particles-bg'


function App() {
    return (
        <>
            <div className="App">
                <BrowserRouter>
                    <PageHeader />
                    <div className="banner-text">
                        <h1 className="headline" style={{fontSize : '70px'}}>
                            Welcome To Amazin Book Store
                        </h1>
                    </div>
                    <div className="container mt-2" style={{ marginTop: 40 }}>
                        <Switch>
                            <Route exact path="/home">
                                <Home />
                            </Route>
                            <Route path="/about">
                                <About />
                            </Route>
                            <Route path="/Publishers">
                                <Publishers/>
                            </Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
            <ParticlesBg id="background" type="cobweb" bg={true} />
        </>
    );
}

export default App;