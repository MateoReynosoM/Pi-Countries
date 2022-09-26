const initialState = {
  countries: [],
  allCountries: [],
  detail:[]
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
//////////////////////////////////////////////////////////////////////////////
    case "GET_COUNTRIES": //trae todo lo que mande getcountries
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload //en este estado manda todo lo que mande la action get_countries
      };
//////////////////////////////////////////////////////////////////////////////
    case "GET_NAME_COUNTRIES":
    return {
      ...state,
      countries: action.payload,
    };
//////////////////////////////////////////////////////////////////////////////
    case "POST_ACTIVITY":
    return {
      ...state
    };
//////////////////////////////////////////////////////////////////////////////
    case "FILTER_BY_CONTINENT":
      const allCountries = state.allCountries
      const continentFiltered = action.payload === 'All' ? allCountries: allCountries.filter(f=>f.continent === action.payload)
      return{
        ...state,
        countries: continentFiltered
      };
//////////////////////////////////////////////////////////////////////////////      
    case "FILTER_BY_ACTIVITY":
      const allCountry = state.allCountries
      console.log(allCountry)
      const activityFilter= action.payload === 'act'? allCountry.filter(f=>f.activities.length!==0):action.payload === 'noA'? allCountry.filter(f=>!f.activities.length) :allCountry
      return{
        ...state,
        countries:activityFilter
      }
//////////////////////////////////////////////////////////////////////////////
    case 'ORDER_BY_ALPHABET':
      let sortedArr =
        action.payload === "asc"
          ? state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortedArr,
      };
//////////////////////////////////////////////////////////////////////////////
    case "ORDER_BY_POPULATION":    
      let sortPopulationArr =
      action.payload === "asc"
      ? state.countries.sort(function (a, b) {
          if (a.population > b.population) {
            return 1;
          }
          if (b.population > a.population) {
            return -1;
          }
            return 0;
            
      })
      : state.countries.sort(function (a, b) {
          if (a.population > b.population) {
            return -1;
          }
          if (b.population > a.population) {
            return 1;
          }
            return 0;
      });
      return {
        ...state,
        countries: sortPopulationArr,
      };
//////////////////////////////////////////////////////////////////////////////
    case "GET_DETAILS":
      return {
        ...state,
        detail:action.payload
      };
    default:
      return state;
  }
}

export default rootReducer;
