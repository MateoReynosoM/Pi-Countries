const {Country, Activity, } = require("../db")
const axios = require("axios");


const getCountries = async (req, res) => {
    const { name } = req.query;
    if (!name) {
      let BD = await Country.findAll({
        attributes: ["id", "name", "flag", "continent", "population"],
        include:{
            model: Activity,
            attributes: ["name", "dificulty", "duration", "season"],
            through: {
                attributes: []
            }
        }
    })
      if (BD.length > 0) {
        return res.status(200).send(BD);
      } else {
        const allCountries = await axios.get("https://restcountries.com/v3/all");
        const pais = allCountries.data.map((e) => {
          return {
            id: e.cca3,
            name: e.name.common,
            flag: e.flags[0],
            continent: e.continents[0],
            capital: e.capital != null ? e.capital[0] : "No data",
            subregion: e.subregion,
            area: e.area,
            population: e.population,
          };
        });
        /* const filterCountry = pais.filter((c) => c !== undefined); */
        await Country.bulkCreate(pais, { validate: true });
  
        let BD = await Country.findAll({
          attributes: ["id", "name", "flag", "continent", "population"],
          include:{
              model: Activity,
              attributes: ["name", "dificulty", "duration", "season"],
              through: {
                  attributes: []
              }
          }
      })
        return res.status(200).send(BD);
      }
    }
     let allCountries = await Country.findAll({include:Activity});    
     let countriesName = allCountries.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
    
        return countriesName.length ?
        res.status(200).send(countriesName) :
        res.status(404).send('No existe ese Pais');
  };

const getCountryById = async (req, res) => {
    const { id } = req.params;
    let allCountries = await Country.findAll({include:{
      model: Activity,
      attributes:["name", "dificulty", "duration", "season"],
      through: {
          attributes: []
      }
  }});
    let countriesId = allCountries.filter( el => el.id.toLowerCase().includes(id.toLowerCase()))

    return countriesId.length ?
        res.status(200).send(countriesId) :
        res.status(404).send('No se recibio un id correcto');
  
  };
  

module.exports={
    getCountries,
    getCountryById
}