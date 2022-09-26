import React from "react";
import "./Paginado.css"

export default function Paginado({countriesPerPage,allCountries,paginado}){
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++) {
        console.log(allCountries/countriesPerPage);
        pageNumbers.push(i)
        
    }
    return(
        <nav>
            <ul className="paginated-bar">
                {
                    pageNumbers?.map(number=>(
                        <li className="number">
                        <button onClick={()=>paginado(number)} >{number}</button>
                    </li>
                    ))
                }
            </ul>
        </nav>
    )
}