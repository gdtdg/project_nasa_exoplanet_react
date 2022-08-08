import React from "react";

import github_logo from "../images/github_logo.png"
import linkedin_logo from "../images/linkedin_logo.png"
import icon_nasa_gray from "../images/icon_nasa_grey.png"

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="footer">
                    <div className="footer_links">
                        <a href="https://github.com/gdtdg" target="_blank" rel="noreferrer"><img
                            src={github_logo}
                            alt="github logo" height="55px"
                            width="55px"/></a>
                        <a href="https://www.linkedin.com/in/gr%C3%A9goire-d-ab9b05233/" target="_blank"
                           rel="noreferrer"><img
                            src={linkedin_logo} alt="linkedin logo"
                            style={{"paddingLeft": "10px"}}/></a>
                        <a href="https://www.nasa.gov/" target="_blank" rel="noreferrer"><img
                            src={icon_nasa_gray}
                            alt="nasa logo grey"/></a>
                    </div>
                    <div className="footer_text">
                        <p>
                            This website is a revamp of the <a href="https://exoplanetarchive.ipac.caltech.edu/index.html">NASA
                            Exoplanet Archive</a> is operated by the California Institute of Technology,
                            under contract with the National Aeronautics and Space Administration under the Exoplanet
                            Exploration
                            Program.
                        </p>
                    </div>
                </div>
            </footer>
        );
    }
}

export {Footer}