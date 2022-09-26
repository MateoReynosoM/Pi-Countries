import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../actions";
import "./Home.css"

export default function SearchBar(){
    const dispatch= useDispatch();
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameCountries(name))
        setName("")

    }

    return(
        <div>
            <input 
            className="search-input"
            value={name}
            onChange={e=>handleInputChange(e)}
            type= 'text'
            placeholder='Search Country'
            />
            <button className="buttons-home" type='submit' onClick={e=>handleSubmit(e)}>Search</button>
        </div>
    )
}