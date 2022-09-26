/* import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to my page</h1>
      <Link to="/home">
        <button>Enter</button>
      </Link>
    </div>
  );
} */
import React from "react";
import {Link} from "react-router-dom";
import "./LandingPage.css"

export default function LandingPage (){
    return (
        <div className="landingContainer">
            <div className="landingPag">
                <h1 className="landingTitle">Countries</h1>
                <Link to="/home">
                    <button className="landingBtn"><span>Start</span></button>
                </Link> 
            </div>
        </div>
    )
}
