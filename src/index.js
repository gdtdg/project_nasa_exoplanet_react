import React from 'react';
import ReactDOM from "react-dom/client";
import './css/style.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Navigation} from "./components/navigation";
import {Footer} from "./components/footer";
import {About} from "./components/about";
import {ExoplanetSearcher} from "./components/exoplanet_searcher";
import {ExoplanetDetails} from "./components/exoplanet_details";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <div className="page_container">
        <div className="content_wrap">
            <Router>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<ExoplanetSearcher/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/exoplanet/:id" element={<ExoplanetDetails/>}/>
                </Routes>
                <Footer/>
            </Router>
        </div>
    </div>
);
