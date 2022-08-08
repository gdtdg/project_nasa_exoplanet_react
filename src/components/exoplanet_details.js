import React from "react";

import {getExoplanetDocs} from "../service/exoplanetDocsService";
import {mergeExoplanetDocs} from "../javascripts/helper";
import {createExoplanetDisplay, createExoplanetTable} from "../javascripts/library";
import {mapping} from "../javascripts/configuration";


class ExoplanetDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exoplanetId: decodeURI((window.location.pathname.split('/').at(-1)))
        }
    }

    LoadExoplanetDisplay = async (planetName) => {
        const exoplanets = await getExoplanetDocs(planetName);
        const exoplanet = mergeExoplanetDocs(exoplanets);
        document.getElementById("show_exoplanet_display").innerHTML = createExoplanetDisplay(exoplanet);
    }

    LoadExoplanetTable = async (planetName) => {
        const exoplanets = await getExoplanetDocs(planetName);
        const exoplanet = mergeExoplanetDocs(exoplanets);
        document.getElementById("show_exoplanet_data").innerHTML = createExoplanetTable(mapping, exoplanet);
    }

    render() {
        return (
            <div>
                <h2>Exoplanet overview:</h2>
                <ExoplanetDisplay
                    exoplanetId={this.state.exoplanetId}
                    loadExoplanetData={this.LoadExoplanetDisplay}
                />
                <ExoplanetTable
                    exoplanetId={this.state.exoplanetId}
                    loadExoplanetTable={this.LoadExoplanetTable}
                />
            </div>
        );
    }
}

class ExoplanetDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.exoplanetId = this.props.exoplanetId
    }

    render() {
        const exoplanetId = this.props.exoplanetId
        this.props.loadExoplanetData(exoplanetId)

        return (
            <div className="exoplanet_center">
                <div id="show_exoplanet_display"></div>
                <div style={{"textAlign": "center"}}>
                    <div style={{"display": "flex", "alignItems": "center"}}>
                        <p style={{"color": "red", "fontSize": "40px", "marginRight": "5px"}}>*</p><p>Average values
                        displayed, you can see the exact values in the table below.</p>
                    </div>
                </div>
            </div>
        )
    }
}

class ExoplanetTable extends React.Component {
    constructor(props) {
        super(props);
        this.exoplanetId = this.props.exoplanetId
    }

    render() {
        const exoplanetId = this.props.exoplanetId
        this.props.loadExoplanetTable(exoplanetId)

        return (
            <div id="show_exoplanet_data"></div>
        )
    }
}

export {ExoplanetDetails}