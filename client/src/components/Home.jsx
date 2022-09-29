import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, filterCountriesByContinent, filterActivities, alphabeticalOrder, orderByPopulation} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./Home.css"


export default function Home() {
  const dispatch = useDispatch(); //para despachar las actions
 /* Getting the countries from the state. */
  const allCountries = useSelector((state) => state.countries); 
  const [currentPage, setCurrentPage] = useState(1)
  const [countriesPerPage, setCountriesPerPage] = useState(10)
  const [order, setOrder] = useState("");
  const [orderP, setOrderPopulation] = useState("");
  const indexOfLastCountrie= currentPage * countriesPerPage
  const indexOfFirstCountrie= indexOfLastCountrie - countriesPerPage
  const currentCountries= allCountries.slice(indexOfFirstCountrie, indexOfLastCountrie)

  const paginado = (pageNumber)=>{
    setCurrentPage(pageNumber)
  }

  //trae del estado los countries cuando el componente se monta
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault(); //para que no se recarge la pagina
    dispatch(getCountries());
  }

  function handleFilterContinents(e){
    dispatch(filterCountriesByContinent(e.target.value))
    setCurrentPage(1); 
  }

  function handleSortName(e) {
    e.preventDefault();
    dispatch(alphabeticalOrder(e.target.value));
    setCurrentPage(1); //seteando para que arranque de la pagina uno
    setOrder(`Sort ${e.target.value}`); //para que cuando setea la pagina modifique el estado local y se reenderize
  }

  function handleSortPopulation(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1); 
    setOrderPopulation(`Ordenado ${e.target.value}`);
  }
  
  function handleFilterByActivities(e){
    dispatch(filterActivities(e.target.value))
    setCurrentPage(1); 
  }

  return (
    <div>
      <Link to="/activities">
        <button className="buttons-home">Create activity</button>
      </Link>
      <h1>Countries</h1>
      <button 
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload countries
      </button>
      <div>
        <SearchBar />
        <select defaultValue={"default"} onChange={(e) => handleSortPopulation(e)}>
            <option value="default" disabled>Order by population</option>
            <option value="des">Higher population</option>
            <option value="asc">Lower population</option>
          </select>

          <select onChange={(e) => handleSortName(e)} defaultValue={"default"}>
            <option value="default" disabled>
              Order Alphabeticaly
            </option>
            <option value="asc">A-Z</option>
            <option value="des">Z-A</option>
          </select>
        <select onChange={e=> handleFilterByActivities(e)}>
          <option value="all">Activities</option>
          <option value="act">With Activities</option>
          <option value="noA">Without Activities</option>
        </select>
        <select onChange={e=> handleFilterContinents(e)} >
          <option value="All">Continent</option>
          <option value="Asia">Asia</option>
          <option value="South America">South America</option>
          <option value="North America">North America</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Africa">Africa</option>
        </select>
        <Paginado
        countriesPerPage={countriesPerPage}
        allCountries={allCountries.length}
        paginado={paginado}
        />
        <div className="display-cards">
        {currentCountries?.map((m) => {
          return (
            <Link className="link" to={"/home/" + m.id}>
            <div className="country-cards">
                <Card name={m.name} flag={m.flag} continent={m.continent} id={m.id}/>
            </div>
            </Link>
          )
        })}
        </div>
      </div>
    </div>
  );
}
