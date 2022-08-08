import React from "react";

import planet_banner from "../images/planet_banner.png"

class Navigation extends React.Component {
    render() {
        return (
            <header>
                <div className="navigation">
                    <nav className="navbar navbar-expand-md navbar-dark mb-3">
                        <a className="navbar-brand" href="http://localhost:3000/">
                            <img src={planet_banner} alt="planet banner"/>
                            Nasa Exoplanet archive
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div id="navbarContent" className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link" href="http://localhost:3000/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="http://localhost:3000/about">About</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}

export {Navigation}