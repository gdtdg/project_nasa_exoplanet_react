import React from "react";
import Popover from "react-bootstrap/Popover"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import {PopoverBody, PopoverHeader} from "react-bootstrap";
import {getExoplanetDocsAdvancedSearch, getRandomExoplanetDocs} from "../service/exoplanetDocsService"
import {duplicateSingleValueInObject, mergeExoplanetDocs, removeEmptyKeysFromObject} from "../javascripts/helper";

class ExoplanetSearcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exoplanetsToDisplay: []
        }
    }

    handleNewValues = async (key, value) => {
        console.log("1st attempt Value: ", value, "and key", key, "was typed");
        this.setState({[key]: value}, () => {
            console.log(this.state)
        })
        console.log("2nd attempt Value: ", value, "and key", key, "was typed");

        const queryFromThisState = {
            "pl_name": [this.state.planetName].filter(n => n),
            "hostname": [this.state.hostname].filter(n => n),
            "default_flag": [this.state.defaultFlag].filter(n => n),
            "sy_num": [this.state.sySnum, this.state.sySnum2].filter(n => n),
            "sy_pum": [this.state.syPnum, this.state.syPnum2].filter(n => n),
            "discoverymethod": [this.state.discoveryMethod].filter(n => n),
            "disc_year": [this.state.discYear, this.state.discYear2].filter(n => n),
            "disc_facility": [this.state.discFacility].filter(n => n),
            "soltype": [this.state.solType].filter(n => n),
            "pl_controv_flag": [this.state.plControvFlag].filter(n => n),
            "pl_refname": [this.state.plRefname].filter(n => n),
            "pl_orbper": [this.state.plOrbper, this.state.plOrbper2].filter(n => n),
            "pl_orbsmax": [this.state.plOrbsmax, this.state.plOrbsmax2].filter(n => n),
            "pl_rade": [this.state.plRade, this.state.plRade2].filter(n => n),
            "pl_radj": [this.state.plRadj, this.state.plRadj2].filter(n => n),
            "pl_msinie": [this.state.plMsinie, this.state.plMsinie2].filter(n => n),
            "pl_msinij": [this.state.plMsinij, this.state.plMsinij2].filter(n => n),
            "pl_bmassprov": [this.state.plBmassprov].filter(n => n),
            "pl_orbeccen": [this.state.plOrbeccen, this.state.plOrbeccen2].filter(n => n),
            "pl_insol": [this.state.plInsol, this.state.plInsol2].filter(n => n),
            "pl_eqt": [this.state.plEqt, this.state.plEqt2].filter(n => n),
            "ttv_flag": [this.state.ttvFlag].filter(n => n),
            "st_refname": [this.state.stRefname].filter(n => n),
            "st_spectype": [this.state.stSpectype].filter(n => n),
            "st_teff": [this.state.stTeff, this.state.stTeff2].filter(n => n),
            "st_rad": [this.state.stRad, this.state.stRad2].filter(n => n),
            "st_mass": [this.state.stMass, this.state.stMass2].filter(n => n),
            "st_met": [this.state.stMet, this.state.stMet2].filter(n => n),
            "st_metratio": [this.state.stMetratio].filter(n => n),
            "st_logg": [this.state.stLogg, this.state.stLogg2].filter(n => n),
            "sy_refname": [this.state.syRefname].filter(n => n),
            "rastr": [this.state.rastr].filter(n => n),
            "decstr": [this.state.decstr].filter(n => n),
            "sy_dist": [this.state.syDist, this.state.syDist2].filter(n => n),
            "sy_vmag": [this.state.syVmag, this.state.syVmag2].filter(n => n),
            "sy_kmag": [this.state.syKmag, this.state.syKmag2].filter(n => n),
            "sy_gaiamag": [this.state.syGaiamag, this.state.syGaiamag2].filter(n => n),
            "rowupdate": [this.state.rowupdate].filter(n => n),
            "pl_pubdate": [this.state.plPubdate].filter(n => n),
            "releasedate": [this.state.releasedate].filter(n => n)
        };

        const queryWithoutEmptyKeys = removeEmptyKeysFromObject(queryFromThisState);

        const queryWithDuplicatesValues = duplicateSingleValueInObject(queryWithoutEmptyKeys);

        console.log("query", queryWithDuplicatesValues);

        const exoplanets = await getExoplanetDocsAdvancedSearch(queryWithDuplicatesValues);
        console.log(exoplanets);
        const exoplanet = mergeExoplanetDocs(exoplanets);
        console.log(exoplanet);

        // set State with new planets
        this.setState({exoplanetsToDisplay: exoplanet})
    }

    componentDidMount = async () => {
        const exoplanetsRandom = await getRandomExoplanetDocs();
        const exoplanetRandom = mergeExoplanetDocs(exoplanetsRandom)
        this.setState({exoplanetsToDisplay: exoplanetRandom})
    }

    render() {
        return (
            <div>
                <SearcherInput
                    handleNewValues={this.handleNewValues}
                />
                <SearchResult
                    exoplanets={this.state.exoplanetsToDisplay}
                />
            </div>
        );
    }
}


class SearcherInput extends React.Component {
    render() {
        return (
            <div>
                <FreeTextSearch
                    handleNewValues={this.props.handleNewValues}
                />
                <AdvancedSearch
                    handleNewValues={this.props.handleNewValues}
                />
            </div>
        );
    }
}


class FreeTextSearch extends React.Component {
    handleChange = (e) => {
        console.log("event LOOK HERE:", e)
        this.props.handleNewValues(e.currentTarget.id, e.target.value);
    }

    render() {
        return (
            <div style={{"marginBottom": "10px"}}>
                <h2>Explore the Archive:</h2>
                <form>
                    <input type="search" className="planet_name_search" name="planetName" id="planetName"
                           placeholder="Enter a planet name" onChange={this.handleChange}/>
                </form>
            </div>
        );
    }
}


class AdvancedSearch extends React.Component {
    toggleAdvancedSearchMenu = () => {
        const advancedSearch = document.getElementById('menu-box');
        if (advancedSearch.style.display === "block") { // if is advancedSearch displayed, hide it
            advancedSearch.style.display = "none";
        } else { // if is advancedSearch hidden, display it
            advancedSearch.style.display = "block";
        }
    }

    handleChange = (e) => {
        console.log("event LOOK HERE:", e)
        this.props.handleNewValues(e.currentTarget.id, e.target.value);
    }

    popoverToggle = (title, body, link) => (
        <Popover id="popover-trigger-click-root-close">
            <PopoverHeader>{title}</PopoverHeader>
            <PopoverBody>{body}</PopoverBody>
            <PopoverHeader>{link}</PopoverHeader>
        </Popover>
    );

    render() {
        return (
            <div>
                <div style={{"textAlign": "center"}}>
                    <button className="advanced_search_button" id="menu"
                            onClick={this.toggleAdvancedSearchMenu}> Advanced search
                    </button>
                </div>

                <div id="menu-box" style={{"display": "none"}}>
                    <p style={{"textAlign": "center", "fontSize": "1.2em"}}>Click on the parameter to get more
                        informations.</p>
                    <form>
                        <div id="inputs"></div>
                        <div className="flex_advanced_search">

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Hostname",
                                                "Enter your desired hostname. Value can be a string or an integer.")}>
                                <div className="input_box">
                                    <label>Hostname</label>
                                    <input type="search" className="form-control text-center" id="hostname"
                                           placeholder="Ex: 11 Com" onChange={this.handleChange}/>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Default Parameter Set",
                                                "Value must be 0 or 1.")}>
                                <div className="input_box">
                                    <label>Default Parameter Set</label>
                                    <div className="range_input">
                                        <select id="defaultFlag" onClick={this.handleChange}>
                                            <option value="" selected disabled hidden>Ex : 0</option>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Number of Stars",
                                                "Enter your desired number of Stars. Values must be an integer. Values are incluses. " +
                                                "Only one filled field is required.")}>
                                <div className="input_box">
                                    <label>Number of Stars</label>
                                    <div className="range_input">
                                        <input type="number" className="form-control text-center" id="sySnum"
                                               style={{"width": "45%"}} placeholder="Min" min="0"
                                               onChange={this.handleChange}/>
                                        <input type="number" className="form-control text-center" id="sySnum2"
                                               style={{"width": "45%"}} placeholder="Max" min="0"
                                               onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Number of Planets",
                                                "Enter your desired number of Planets. Values must be an integer. Values are incluses. " +
                                                "Only one filled field is required.")}>
                                <div className="input_box">
                                    <label>Number of Planets</label>
                                    <div className="range_input">
                                        <input type="search" className="form-control text-center" id="syPnum"
                                               style={{"width": "45%"}} placeholder="Min" onChange={this.handleChange}/>
                                        <input type="search" className="form-control text-center" id="syPnum2"
                                               style={{"width": "45%"}} placeholder="Max" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Discovery method",
                                                "Select your desired discovery method.",
                                                <a href='https://en.wikipedia.org/wiki/Methods_of_detecting_exoplanets'
                                                   target='_blank' rel="noreferrer">More information.</a>)}>
                                <div className="input_box">
                                    <label>Discovery method</label>
                                    <div className="range_input">
                                        <select id="discoveryMethod" onClick={this.handleChange}>
                                            <option value="" selected disabled hidden>Ex : Radial velocity</option>
                                            <option value="astrometry">Astrometry</option>
                                            <option value="disk kinematics">Disk Kinematics</option>
                                            <option value="eclipse timing variations">Eclipse Timing Variations</option>
                                            <option value="imaging">Imaging</option>
                                            <option value="microlensing">Microlensing</option>
                                            <option value="orbital brightness modulation">Orbital Brightness Modulation
                                            </option>
                                            <option value="pulsar timing">Pulsar Timing</option>
                                            <option value="pulsation brightness modulation">Pulsation Brightness
                                                Modulation
                                            </option>
                                            <option value="pulsation timing variations">Pulsation Timing Variations
                                            </option>
                                            <option value="radial velocity">Radial Velocity</option>
                                            <option value="transit">Transit</option>
                                            <option value="transit timing variations">Transit Timing Variations</option>
                                        </select>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Discovery Year",
                                                "Enter your desired discovery year. Values must be an integer. Values are incluses. Only one filled field is required.")}>
                                <div className="input_box">
                                    <label htmlFor="disc_year">Discovery year</label>
                                    <div className="range_input">
                                        <input type="search" className="form-control text-center" id="discYear"
                                               style={{"width": "45%"}} placeholder="Min" onChange={this.handleChange}/>
                                        <input type="search" className="form-control text-center" id="discYear2"
                                               style={{"width": "45%"}} placeholder="Max" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Discovery Facility",
                                                "Enter your desired discovery facility. Value can be a string or an integer.")}>
                                <div className="input_box">
                                    <label htmlFor="disc_facility">Discovery facility</label>
                                    <input type="search" className="form-control text-center" id="discFacility"
                                           placeholder="Ex: Kepler" onChange={this.handleChange}/>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Solution type",
                                                "Select your desired solution type.")}>
                                <div className="input_box">
                                    <label>Solution type</label>
                                    <div className="range_input">
                                        <select id="solType" onClick={this.handleChange}>
                                            <option value="" selected disabled hidden>Ex : Published Confirmed</option>
                                            <option value="Published Confirmed">Published Confirmed</option>
                                            <option value="Kepler Project Candidate (q1_q17_dr25_sup_koi)">Kepler
                                                Project
                                                Candidate (q1_q17_dr25_sup_koi)
                                            </option>
                                            <option value="Kepler Project Candidate (q1_q16_koi)">Kepler Project
                                                Candidate
                                                (q1_q16_koi)
                                            </option>
                                            <option value="Kepler Project Candidate (q1_q17_dr25_koi)">Kepler Project
                                                Candidate (q1_q17_dr25_koi)
                                            </option>
                                            <option value="Kepler Project Candidate (q1_q17_dr24_koi)">Kepler Project
                                                Candidate (q1_q17_dr24_koi)
                                            </option>
                                            <option value="Kepler Project Candidate (q1_q12_koi)">Kepler Project
                                                Candidate
                                                (q1_q12_koi)
                                            </option>
                                            <option value="Kepler Project Candidate (q1_q8_koi)">Kepler Project
                                                Candidate
                                                (q1_q8_koi)
                                            </option>
                                            <option value="Published Candidate">Published Candidate</option>
                                            <option value="TESS Project Candidate">TESS Project Candidate</option>
                                        </select>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Planet status",
                                                "Select your desired planet status.")}>
                                <div className="input_box">
                                    <label>Planet status</label>
                                    <div className="range_input">
                                        <select id="plControvFlag" onClick={this.handleChange}>
                                            <option value="" selected disabled hidden>Ex : Confirmed</option>
                                            <option value="0">Confirmed</option>
                                            <option value="1">Controversial</option>
                                        </select>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Planetary Parameter Reference",
                                                "Enter your desired planetary parameter reference. Value can be a string or an integer.")}>
                                <div className="input_box">
                                    <label>Planetary Parameter Reference</label>
                                    <input type="search" className="form-control text-center" id="plRefname"
                                           placeholder="Ex: Q1-Q17 DR25 Supplemental KOI Table"
                                           onChange={this.handleChange}/>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Orbital Period [days]",
                                                "Enter your desired number of Orbital Period [days]. Values must be an integer or a float. Values are incluses. Only one filled field is required.")}>
                                <div className="input_box">
                                    <label>Orbital Period [days]</label>
                                    <div className="range_input">
                                        <input type="number" className="form-control text-center" id="plOrbper"
                                               style={{"width": "45%"}} placeholder="Min" onChange={this.handleChange}/>
                                        <input type="number" className="form-control text-center" id="plOrbper2"
                                               style={{"width": "45%"}} placeholder="Max" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Orbit Semi-Major Axis [au]",
                                                "Enter your desired number of Orbit Semi-Major Axis [au]. Values must be an integer or a float. Values are incluses. Only one filled field is required.",
                                                <a href='https://en.wikipedia.org/wiki/Semi-major_and_semi-minor_axes'
                                                   target='_blank' rel="noreferrer">More information.</a>)}>
                                <div className="input_box">
                                    <label>Orbit Semi-Major Axis [au]</label>
                                    <div className="range_input">
                                        <input type="number" className="form-control text-center" id="plOrbsmax"
                                               style={{"width": "45%"}} placeholder="Min" onChange={this.handleChange}/>
                                        <input type="number" className="form-control text-center" id="plOrbsmax2"
                                               style={{"width": "45%"}} placeholder="Max" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Planet Radius [Earth Radius]",
                                                "Enter your desired number of Planet Radius [Earth Radius]. Values must be an integer or a float. Values are incluses.")}>
                                <div className="input_box">
                                    <label>Planet Radius [Earth Radius]</label>
                                    <div className="range_input">
                                        <input type="number" className="form-control text-center" id="plRade"
                                               style={{"width": "45%"}} placeholder="Min" onChange={this.handleChange}/>
                                        <input type="number" className="form-control text-center" id="plRade2"
                                               style={{"width": "45%"}} placeholder="Max" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Planet Radius [Jupiter Radius]",
                                                "Enter your desired number of Planet Radius [Jupiter Radius]. Values must be an integer or a float. Values are incluses. Only one filled field is required.")}>
                                <div className="input_box">
                                    <label>Planet Radius [Jupiter Radius]</label>
                                    <div className="range_input">
                                        <input type="number" className="form-control text-center" id="plRadj"
                                               style={{"width": "45%"}} placeholder="Min" onChange={this.handleChange}/>
                                        <input type="number" className="form-control text-center" id="plRadj2"
                                               style={{"width": "45%"}} placeholder="Max" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Planet Mass*sin(i) [Earth Mass]",
                                                "Enter your desired number of Planet Mass*sin(i) [Earth Mass]. Values must be an integer or a float. Values are incluses. Only one filled field is required.")}>
                                <div className="input_box">
                                    <label>Planet Mass*sin(i) [Earth Mass]</label>
                                    <div className="range_input">
                                        <input type="number" className="form-control text-center" id="plMsinie"
                                               style={{"width": "45%"}} placeholder="Min" onChange={this.handleChange}/>
                                        <input type="number" className="form-control text-center" id="plMsinie2"
                                               style={{"width": "45%"}} placeholder="Max" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Planet Mass*sin(i) [Jupiter Mass]",
                                                "Enter your desired number of Planet Mass*sin(i) [Jupiter Mass]. Values must be an integer or a float. Values are incluses. Only one filled field is required.")}>
                                <div className="input_box">
                                    <label>Planet Mass*sin(i) [Jupiter Mass]</label>
                                    <div className="range_input">
                                        <input type="number" className="form-control text-center" id="plMsinij"
                                               style={{"width": "45%"}} placeholder="Min" onChange={this.handleChange}/>
                                        <input type="number" className="form-control text-center" id="plMsinij2"
                                               style={{"width": "45%"}} placeholder="Max" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Planet Mass or Mass*sin(i) Provenance",
                                                "Select your desired Planet Mass or Mass*sin(i) Provenance.")}>
                                <div className="input_box">
                                    <label style={{"fontSize": "1em"}}>Planet Mass or Mass*sin(i) Provenance</label>
                                    <div className="range_input">
                                        <select id="plBmassprov" onClick={this.handleChange}>
                                            <option value="" selected disabled hidden>Ex : Mass</option>
                                            <option value="Mass">Mass</option>
                                            <option value="Msini">Msini</option>
                                            <option value="Msin(i)/sin(i)">Msin(i)/sin(i)</option>
                                        </select>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Eccentricity",
                                                "Enter your desired Eccentricity. Values must be an integer or a float between 0 and 1. Values are incluses. Only one filled field is required.",
                                                <a href='https://en.wikipedia.org/wiki/Orbital_eccentricity'
                                                   target='_blank' rel="noreferrer">More information.</a>)}>
                                <div className="input_box">
                                    <label>Eccentricity</label>
                                    <div className="range_input">
                                        <input type="number" className="form-control text-center" id="plOrbeccen"
                                               style={{"width": "45%"}} placeholder="Min" min="0" max="1" step="0.001"
                                               onChange={this.handleChange}/>
                                        <input type="number" className="form-control text-center" id="plOrbeccen2"
                                               style={{"width": "45%"}} placeholder="Max" min="0" max="1" step="0.001"
                                               onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Insolation Flux [Earth Flux]",
                                                "Enter your desired Insolation Flux [Earth Flux]. Values must be an integer or a float. Values are incluses. Only one filled field is required.")}>
                                <div className="input_box">
                                    <label>Insolation Flux [Earth Flux]</label>
                                    <div className="range_input">
                                        <input type="number" className="form-control text-center" id="plInsol"
                                               style={{"width": "45%"}} placeholder="Min" onChange={this.handleChange}/>
                                        <input type="number" className="form-control text-center" id="plInsol2"
                                               style={{"width": "45%"}} placeholder="Max" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Equilibrium Temperature [K]",
                                                "Enter your desired Equilibrium Temperature [K]. Values can be an integer or a float. Values are incluses. Only one filled field is required.")}>
                                <div className="input_box">
                                    <label>Equilibrium Temperature [K]</label>
                                    <div className="range_input">
                                        <input type="number" className="form-control text-center" id="plEqt"
                                               style={{"width": "45%"}} placeholder="Min" onChange={this.handleChange}/>
                                        <input type="number" className="form-control text-center" id="plEqt2"
                                               style={{"width": "45%"}} placeholder="Max" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Data show Transit Timing Variations",
                                                "Select your desired Data show Transit Timing Variations.")}>
                                <div className="input_box">
                                    <label style={{"fontSize": "1em"}}>Data show Transit Timing Variations</label>
                                    <div className="range_input">
                                        <select id="ttvFlag" onClick={this.handleChange}>
                                            <option value="" selected disabled hidden>Ex : Yes</option>
                                            <option value="0">No</option>
                                            <option value="1">Yes</option>
                                        </select>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Stellar Parameter Reference",
                                                "Enter your desired Stellar Parameter Reference. Value can be a string or an integer.")}>
                                <div className="input_box">
                                    <label>Stellar Parameter Reference</label>
                                    <input type="search" className="form-control text-center" id="stRefname"
                                           placeholder="Ex: Rodriguez et al. 2018" onChange={this.handleChange}/>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Spectral Type",
                                                "Enter your desired Spectral Type. Value can be a string or an integer.",
                                                <a href='https://en.wikipedia.org/wiki/Stellar_classification'
                                                   target='_blank' rel="noreferrer">More information.</a>)}>
                                <div className="input_box">
                                    <label>Spectral Type</label>
                                    <input type="search" className="form-control text-center" id="stSpectype"
                                           placeholder="Ex: G0 V" onChange={this.handleChange}/>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Stellar Effective Temperature [K]",
                                                "Enter your desired Stellar Effective Temperature [K]. Values can be an integer or a float. Values are incluses. Only one filled field is required.")}>
                                <div className="input_box">
                                    <label>Stellar Effective Temperature [K]</label>
                                    <div className="range_input">
                                        <input type="number" className="form-control text-center" id="stTeff"
                                               style={{"width": "45%"}} placeholder="Min" onChange={this.handleChange}/>
                                        <input type="number" className="form-control text-center" id="stTeff2"
                                               style={{"width": "45%"}} placeholder="Max" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Stellar Radius [Solar Radius]",
                                                "Enter your desired Stellar Radius [Solar Radius]. Values can be an integer or a float. Values are incluses. Only one filled field is required.")}>
                                <div className="input_box">
                                    <label>Stellar Radius [Solar Radius]</label>
                                    <div className="range_input">
                                        <input type="number" className="form-control text-center" id="stRad"
                                               style={{"width": "45%"}} placeholder="Min" onChange={this.handleChange}/>
                                        <input type="number" className="form-control text-center" id="stRad2"
                                               style={{"width": "45%"}} placeholder="Max" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Stellar Mass [Solar mass]",
                                                "Enter your desired Stellar Mass [Solar mass]. Values can be an integer or a float. Values are incluses.Only one filled field is required.")}>
                                <div className="input_box">
                                    <label>Stellar Mass [Solar mass]</label>
                                    <div className="range_input">
                                        <input type="number" className="form-control text-center" id="stMass"
                                               style={{"width": "45%"}} placeholder="Min" onChange={this.handleChange}/>
                                        <input type="number" className="form-control text-center" id="stMass2"
                                               style={{"width": "45%"}} placeholder="Max" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Stellar Metallicity [dex]",
                                                "Enter your desired Stellar Metallicity [dex]. Values can be an integer or a float. Values can be negative. Values are incluses. Only one filled field is required.",
                                                <a href='https://en.wikipedia.org/wiki/Metallicity' target='_blank'
                                                   rel="noreferrer">More information.</a>)}>
                                <div className="input_box">
                                    <label>Stellar Metallicity [dex]</label>
                                    <div className="range_input">
                                        <input type="number" className="form-control text-center" id="stMet"
                                               style={{"width": "45%"}} placeholder="Min" onChange={this.handleChange}/>
                                        <input type="number" className="form-control text-center" id="stMet2"
                                               style={{"width": "45%"}} placeholder="Max" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Stellar Metallicity Ratio",
                                                "Select your desired Stellar Metallicity Ratio.")}>
                                <div className="input_box">
                                    <label>Stellar Metallicity Ratio</label>
                                    <div className="range_input">
                                        <select id="stMetratio" onClick={this.handleChange}>
                                            <option value="" selected disabled hidden>Ex : [Fe/H]</option>
                                            <option value="[Fe/H]">[Fe/H]</option>
                                            <option value="[M/H]">[M/H]</option>
                                            <option value="[m/H]">[m/H]</option>
                                            <option value="[Me/H]">[Me/H]</option>
                                            <option value="[Fe/H[">[Fe/H[</option>
                                        </select>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Stellar Surface Gravity [log10(cm/s**2)]",
                                                "Enter your desired Stellar Surface Gravity [log10(cm/s**2)]. Values can be an integer or a float. Values are incluses. Only one filled field is required.")}>
                                <div className="input_box">
                                    <label style={{"fontSize": "1em"}}>Stellar Surface Gravity [log10(cm/s**2)]</label>
                                    <div className="range_input">
                                        <input type="number" className="form-control text-center" id="stLogg"
                                               style={{"width": "45%"}} placeholder="Min" onChange={this.handleChange}/>
                                        <input type="number" className="form-control text-center" id="stLogg2"
                                               style={{"width": "45%"}} placeholder="Max" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("System Parameter Reference",
                                                "Enter your desired System Parameter Reference. Value can be a string or an integer.")}>
                                <div className="input_box">
                                    <label>System Parameter Reference</label>
                                    <input type="search" className="form-control text-center" id="syRefname"
                                           placeholder="Ex: TICv8" onChange={this.handleChange}/>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("RA [sexagesimal]",
                                                "Enter your desired RA [sexagesimal]. Value format must be 'HHhMMmSS.SSs'.")}>
                                <div className="input_box">
                                    <label>RA [sexagesimal]</label>
                                    <input type="search" className="form-control text-center" id="rastr"
                                           placeholder="19h48m27.62s" onChange={this.handleChange}/>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Dec [sexagesimal]",
                                                "Enter your desired Dec [sexagesimal]. Value format must be '+DDdMMmSS.SSs' or '-DDdMMmSS.SSs'.")}>
                                <div className="input_box">
                                    <label>Dec [sexagesimal]</label>
                                    <input type="search" className="form-control text-center" id="decstr"
                                           placeholder="+41d54m32.79s" onChange={this.handleChange}/>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Distance [pc]",
                                                "Enter your desired Distance [pc]. Values can be an integer or a float. Values are incluses. Only one filled field is required.")}>
                                <div className="input_box">
                                    <label>Distance [pc]</label>
                                    <div className="range_input">
                                        <input type="number" className="form-control text-center" id="syDist"
                                               style={{"width": "45%"}} placeholder="Min" onChange={this.handleChange}/>
                                        <input type="number" className="form-control text-center" id="syDist2"
                                               style={{"width": "45%"}} placeholder="Max" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("V (Johnson) Magnitude",
                                                "Enter your desired V (Johnson) Magnitude. Values can be an integer or a float. Values are incluses. Only one filled field is required.")}>
                                <div className="input_box">
                                    <label>V (Johnson) Magnitude</label>
                                    <div className="range_input">
                                        <input type="number" className="form-control text-center" id="syVmag"
                                               style={{"width": "45%"}} placeholder="Min" onChange={this.handleChange}/>
                                        <input type="number" className="form-control text-center" id="syVmag2"
                                               style={{"width": "45%"}} placeholder="Max" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Ks (2MASS) Magnitude",
                                                "Enter your desired Ks (2MASS) Magnitude. Values can be an integer or a float. Values are incluses. Only one filled field is required.")}>
                                <div className="input_box">
                                    <label>Ks (2MASS) Magnitude</label>
                                    <div className="range_input">
                                        <input type="number" className="form-control text-center" id="syKmag"
                                               style={{"width": "45%"}} placeholder="Min" onChange={this.handleChange}/>
                                        <input type="number" className="form-control text-center" id="syKmag2"
                                               style={{"width": "45%"}} placeholder="Max" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Gaia Magnitude",
                                                "Enter your desired Gaia Magnitude. Values can be an integer or a float. Values are incluses. Only one filled field is required.")}>
                                <div className="input_box">
                                    <label>Gaia Magnitude</label>
                                    <div className="range_input">
                                        <input type="number" className="form-control text-center" id="syGaiamag"
                                               style={{"width": "45%"}} placeholder="Min" onChange={this.handleChange}/>
                                        <input type="number" className="form-control text-center" id="syGaiamag2"
                                               style={{"width": "45%"}} placeholder="Max" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Date of Last Update",
                                                "Enter your desired Date of Last Update.")}>
                                <div className="input_box">
                                    <label>Date of Last Update</label>
                                    <input type="date" className="form-control text-center" id="rowupdate"
                                           onClick={this.handleChange}/>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Planetary Parameter Reference Publication Date",
                                                "Enter your desired Planetary Parameter Reference Publication Date.")}>
                                <div className="input_box">
                                    <label style={{"fontSize": "1em"}}>Planetary Parameter Reference Publication
                                        Date</label>
                                    <input type="month" className="form-control text-center" id="plPubdate"
                                           onClick={this.handleChange}/>
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger trigger="click" rootClose placement="bottom"
                                            overlay={this.popoverToggle("Release Date",
                                                "Enter your desired Release Date.")}>
                                <div className="input_box">
                                    <label>Release Date</label>
                                    <input type="date" className="form-control text-center" id="releasedate"
                                           onClick={this.handleChange}/>
                                </div>
                            </OverlayTrigger>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


class SearchResult extends React.Component {
    render() {
        const listExoplanets = [];
        const plNames = this.props.exoplanets.pl_name;
        console.log(plNames);

        if (plNames !== undefined) {
            this.props.exoplanets.pl_name.forEach(plName => {
                listExoplanets.push(
                    <ExoplanetDisplay
                        exoplanetName={plName}
                    />
                );
            });
        }
        return (
            <div>
                <div><h2>Results:</h2></div>
                <div id="result">{listExoplanets}
                </div>

            </div>
        );
    }
}


class ExoplanetDisplay extends React.Component {
    render() {
        const exoplanetName = this.props.exoplanetName;
        const exoplanetNameURIEncoded = encodeURIComponent(exoplanetName);
        const redirectURL = "http://localhost:3000/exoplanet/";
        return (
            <a href={redirectURL + exoplanetNameURIEncoded}>
                <div className="frame">
                    <div className="planet_index">
                        <div className="wrap_index">
                            <div className="background_index"></div>
                        </div>
                        <div className="mask_index"></div>
                    </div>
                    <div className="exoplanet_name">{exoplanetName}</div>
                </div>
            </a>
        );
    }
}

export
{
    ExoplanetSearcher
}