import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

class PageHeader extends Component {
    render() {

        return (
            <header id="home">
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
                            to="/publishers"
                        >
                            Publishers
                        </NavLink>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default PageHeader;