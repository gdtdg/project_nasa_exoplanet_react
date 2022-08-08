import React from "react";


class About extends React.Component {
    render() {
        return (
            <article>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">About</h5>
                                <p className="card-text">NASA Exoplanet Query project.</p>
                                <p className="card-text">Find this project on <a href="https://github.com/gdtdg"
                                                                                 target="_blank" rel="noreferrer">Github</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

export {About}