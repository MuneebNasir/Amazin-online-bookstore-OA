import React, { Component } from 'react';
import ParticlesBg  from "particles-bg";
import {NavLink} from "react-router-dom";

class Header extends Component {
    render() {

        return (
            <header id="home">
                <ParticlesBg type="circle" bg={true} />
                <nav id="nav-wrap">
                    <ul className="nav-options active">
                        <NavLink
                            className="option"
                            activeClassName="is-active"
                            to="/home"
                            exact
                        >
                            Home
                        </NavLink>

                        <NavLink
                            className="option"
                            activeClassName="is-active"
                            to="/about"
                        >
                            About
                        </NavLink>

                        <NavLink
                            className="option"
                            activeClassName="is-active"
                            to="/Publishers"
                        >
                            Publishers
                        </NavLink>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;