import React, { useContext } from 'react'
import { ThemeContext } from '../App'
import { useNavigate } from 'react-router-dom'
import '../styles/card.css'

const Card = (props) => {
    const navigate = useNavigate()
    const [darkTheme, setDarkTheme] = useContext(ThemeContext)

    const navigateToCountry = () => {
        navigate('/country', { state: { countryName: props.countryName, lat: props.lat, lon: props.lon }})
    }

    return (
        <div className='card-body' onClick={() => navigateToCountry()}>
            <div className="card-img-container">
                <img src={props.flagImg} alt="Country's Flag" className="card-flag-img" loading="lazy" />
            </div>

            <p className="card-country-title" style={darkTheme === true ? {color: '#fff'} : {color: '#111'}}>{props.countryName}</p>
            <p className="card-country-content" style={darkTheme === true ? {color: '#fff'} : {color: '#111'}}>Region: {props.region}</p>
            <p className="card-country-content" style={darkTheme === true ? {color: '#fff'} : {color: '#111'}}>Capital: {props.capital}</p>
        </div>
    )
}

export default Card