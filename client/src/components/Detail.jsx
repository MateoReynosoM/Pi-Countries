import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

import "./Detail.css"


export default function Detail(props){
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    },[dispatch])
    
    const myCountry = useSelector((state)=>state.detail)

    return(
        <div>
            {
                myCountry.length>0?
                <div className="container">
                    <div>
                    <img className="img" src={myCountry[0].flag} alt="country flag"/>
                    </div>
                    <div className="card-detail">
                        
                    
                    <h1>Name:{myCountry[0].name}</h1>
                    <h2>Id:{myCountry[0].id}</h2>
                    <h3>Capital:{myCountry[0].capital}</h3>
                    <h3>Subregion:{myCountry[0].subregion}</h3>
                    <h3>Area:{myCountry[0].area}</h3>
                    <h3>Population:{myCountry[0].population}</h3>
                    </div>
                    <div className="container-activities-cards">
                    {myCountry[0].activities.length?<h3><b>Activities: </b></h3>:""}
                    {myCountry[0].activities?.map(e=><div>
                    <ul className="card-activities" >
                    <li>Name:{e.name}</li>
                    <li>Dificultad:{e.dificulty}</li>
                    <li>Duration:{e.duration}HS</li>
                    <li>Season:{e.season}</li>
                    </ul>
                </div>
          )}
                </div></div>:<p>Loading...</p>
                
            }
            
            <Link to="/home">
                <button>Back</button>
            </Link>
        </div>
    )


}