import React from "react";
import "./Card.css"
import { Link } from "react-router-dom";

export default function Card(props){

    return(
        
        <div className="card" /* background-color="gray" */>
            
            {/* <Link className="link" to={"/home/" + props.id}> */}
            <div >
                <h3 className="link">{props.name}</h3>
            </div>
            {/* </Link> */}
            <div>
                <img className="img-c" src={props.flag} alt="flag not found" />
            </div>
            <div className="continent">
                <h5 >{props.id}</h5>
                <h5 >{props.continent}</h5>

            </div>
        </div>
    )
}