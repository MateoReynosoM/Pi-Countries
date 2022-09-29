import React from "react";
import "./Card.css"


/* export default function Card(props){ */
    export default class Card extends React.Component {
        /* constructor(props) {
            super(props);
            console.log(this.props)
          } */
        render() {
    return(
        
        <div className="card" /* background-color="gray" */>
            
            {/* <Link className="link" to={"/home/" + props.id}> */}
            <div >
                <h3 className="link">{this.props.name}</h3>
            </div>
            {/* </Link> */}
            <div>
                <img className="img-c" src={this.props.flag} alt="flag not found" />
            </div>
            <div className="continent">
                <h5 >{this.props.id}</h5>
                <h5 >{this.props.continent}</h5>

            </div>
        </div>
    )
    }}

