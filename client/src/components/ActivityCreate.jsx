import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivities } from "../actions";
import "./ActivityCreate.css"


export default function CreateActivity(){
    const dispatch = useDispatch()
    const countries = useSelector((state)=>state.countries)
    const history = useHistory()
    const [errors,setErrors]=useState({})
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [input, setInput]=useState({
        name:"",
        dificulty:"",
        duration:"",
        season:"",
        countriesName:[]
    })
    function validate(input){
        let errors={};
        if(!input.name)errors.name="*Activity name required*"
        setButtonEnabled(false)
        if(input.name.length<3 ||input.name.length>15 ) errors.name = "*Invalid activity name*";
        setButtonEnabled(false)
        if(input.duration <= 0 || input.duration >= 24 )errors.duration = "*Please type a duration between 1 and 24 hours*"
        setButtonEnabled(false)
        if(!input.duration) errors.duration="*Duration time required*"
        setButtonEnabled(false)
        if(!input.season) errors.season = "*Please select a season*"
        setButtonEnabled(false)
        if(!input.countriesName) errors.countriesName = "*Please select a country*"
        setButtonEnabled(false)
        if(!input.dificulty) errors.dificulty = "*Please select a dificulty*"
        setButtonEnabled(false)

        if (Object.entries(errors).length === 0) setButtonEnabled(true);

        return errors
    }
    
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleCountrySelect(e){
        if (input.countriesName.includes(e.target.value)) // aca decimos que, si mi estado local input.temp... incluye el value, retorne un alert.
        return alert("You've already selected that country");
        setInput({
            ...input,
            countriesName:[...input.countriesName,e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleSelect(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleDelete(e){
        setInput({
            ...input,
            countriesName: input.countriesName.filter(f=>f!==e)
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(postActivities(input))
        alert("Activity created!!")
        setInput({
            name:"",
            dificulty:"",
            duration:"",
            season:"",
            countriesName:[]
        })
        history.push('/home')
    }

   /* A hook that is called when the component is mounted. */
    useEffect(()=>{
        dispatch(getCountries())
        },[]);
    
    return(
        <div>
        <div className="container-create">
            <Link to="/home"><button>Back</button></Link>
            <h1 className="titulo">Create your Activity!</h1>
            <form className="form" onSubmit={e=>handleSubmit(e)}>
                <div>
                    <label>Activity:</label>
                    <input /* className="input" */ type="text"
                    value= {input.name}
                    name="name"
                    onChange={handleChange}
                    />
                    {errors.name&&(
                        <p className="warning">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Difficulty:</label>
                    <select defaultValue={'default'} name="dificulty" onChange={e=>handleSelect(e)}>
                        <option value='default' disabled>Difficulty</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div>
                {errors.dificulty&&(
                        <p className="warning">{errors.dificulty}</p>
                    )}
                </div>
                <div>
                    <label>Duration:</label>
                    <input /* className="input" */ type="number"
                    value= {input.duration}
                    name="duration"
                    onChange={handleChange}
                    />
                    {errors.duration&&(
                        <p className="warning">{errors.duration}</p>
                    )}
                </div>
                <div>
                    <label>Season:</label>
                    <select defaultValue={'default'} name="season" onChange={e=>handleSelect(e)}>
                        <option value='default' disabled>Season</option>
                        <option value="summer">Summer</option>
                        <option value="winter">Winter</option>
                        <option value="autumn">Autumn</option>
                        <option value="spring">Spring</option>
                    </select>
                </div>
                <div>
                {errors.season&&(
                        <p className="warning">{errors.season}</p>
                    )}
                </div>
                <div>
                <select defaultValue={'default'} name="countriesName" onChange={e=>handleCountrySelect(e)}>
                <option value='default' disabled>Select Country</option>
                    {countries.map(m=>(
                        <option value={m.name}>{m.name}</option>
                    ))}
                
                </select>
                {errors.countriesName&&(
                        <p className="warning">{errors.countriesName}</p>
                    )}
                </div>
                {/* <div>
                {errors.countriesName&&(
                        <p className="warning">{errors.countriesName}</p>
                    )}
                </div> */}
                <button className="boton" type='submit' disabled={!buttonEnabled}>Create</button>
            </form>
            {input.countriesName.map(el=>
                <div className="form">
                    <p>{el}         
                    <button classname="boton" onClick={()=>handleDelete(el)} >X</button>
                    </p>
                </div>
                )}
            {/* Para borrar los paises seleccionados */}
        </div>
        </div>
    )
}