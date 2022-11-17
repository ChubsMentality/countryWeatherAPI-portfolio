import React, { useState, useEffect, useRef, useContext } from 'react'
import { ThemeContext } from '../App'
import { themes } from '../styles/ThemeStyles'
import { IoArrowBack } from 'react-icons/io5'
import { useLocation, useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Forecast from '../components/Forecast'
import BlurredOverlay from '../components/BlurredOverlay'
import Loading from '../components/Loading'
import '../styles/country.css'

// Icons
import brokenCloudsDark from '../assets/WeatherIcons/brokenCloudsDark.svg'
import brokenCloudsLight from '../assets/WeatherIcons/brokenCloudsLight.svg'
import clearDark from '../assets/WeatherIcons/clear-dark.svg'
import clearLight from '../assets/WeatherIcons/clear-light.svg'
import fewCloudsDark from '../assets/WeatherIcons/fewCloudsDark.svg'
import fewCloudsLight from '../assets/WeatherIcons/fewCloudsLight.svg'
import mistDark from '../assets/WeatherIcons/mistDark.svg'
import mistLight from '../assets/WeatherIcons/mistLight.svg'
import rainDark from '../assets/WeatherIcons/rainDark.svg'
import rainLight from '../assets/WeatherIcons/rainLight.svg'
import scatteredDark from '../assets/WeatherIcons/scatteredDark.svg'
import scatteredLight from '../assets/WeatherIcons/scatteredLight.svg'
import drizzleDark from '../assets/WeatherIcons/showerDark.svg'
import drizzleLight from '../assets/WeatherIcons/showerLight.svg'
import snowDark from '../assets/WeatherIcons/snowDark.svg'
import snowLight from '../assets/WeatherIcons/snowLight.svg'
import thunderstormDark from '../assets/WeatherIcons/thunderstormDark.svg'
import thunderstormLight from '../assets/WeatherIcons/thunderstormLight.svg'

const Country = () => {
    const brokenClouds = 'https://res.cloudinary.com/drvd7jh0b/video/upload/v1668661801/brokenClouds_esonml.mp4'
    const clearSkies = 'https://res.cloudinary.com/drvd7jh0b/video/upload/v1668662307/clearSkies_xw2c5g.mp4'
    const fewClouds = 'https://res.cloudinary.com/drvd7jh0b/video/upload/v1668662405/fewClouds2_k03pjs.mp4'
    const mist = 'https://res.cloudinary.com/drvd7jh0b/video/upload/v1668662452/mist_j7txfl.mp4'
    const rain = 'https://res.cloudinary.com/drvd7jh0b/video/upload/v1668662511/rain_ievyld.mp4'
    const scatteredClouds = 'https://res.cloudinary.com/drvd7jh0b/video/upload/v1668662564/scatteredClouds_fuyiwn.mp4'
    const drizzle = 'https://res.cloudinary.com/drvd7jh0b/video/upload/v1668662616/showerRain_pnmppg.mp4'
    const snow = 'https://res.cloudinary.com/drvd7jh0b/video/upload/v1668662696/snow_ja5oki.mp4'
    const thunderstorm = 'https://res.cloudinary.com/drvd7jh0b/video/upload/v1668662738/thunderstorm_ihgm7m.mp4'

    const location = useLocation()
    const navigate = useNavigate()
    const [darkTheme, setDarkTheme] = useContext(ThemeContext)
    const API_KEY = 'd4959daab579e179cc4efe2a81d330ca'
    
    const [country, setCountry] = useState()
    const [countryCurrency, setCountryCurrency] = useState()
    const [countryLanguage, setCountryLanguage] = useState()
    const [population, setPopulation] = useState()
    const [loading, setLoading] = useState(false)

    const [weather, setWeather] = useState()
    const [weatherIcon, setWeatherIcon] = useState(null)
    const [video, setVideo] = useState(null)
    const [forecast, setForecast] = useState()

    useEffect(() => {
        setLoading(true)
        const countryDetails = fetch(`https://restcountries.com/v3.1/name/${location.state.countryName}`)
        const current = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.state.lat}&lon=${location.state.lon}&appid=${API_KEY}&units=metric`)
        const weatherForecast = fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.state.lat}&lon=${location.state.lon}&appid=${API_KEY}&units=metric`)

        Promise.all([countryDetails, current, weatherForecast])
            .then(async (response) => {
                const countryRes = await response[0].json()
                const cWeatherRes = await response[1].json()
                const weatherForecastRes = await response[2].json()
    
                console.log(countryRes)
                console.log(cWeatherRes)
                console.log(weatherForecastRes)

                if(cWeatherRes.weather[0].main === 'Thunderstorm') {
                    console.log(cWeatherRes.weather[0].main)
                    darkTheme === true ? setWeatherIcon(thunderstormLight) : setWeatherIcon(thunderstormDark) 
                    setVideo(thunderstorm)
                } else if (cWeatherRes.weather[0].main === 'Drizzle') {
                    console.log(cWeatherRes.weather[0].main)
                    darkTheme === true ? setWeatherIcon(drizzleLight) : setWeatherIcon(drizzleDark)
                    setVideo(drizzle)
                } else if (cWeatherRes.weather[0].main === 'Rain') {
                    console.log(cWeatherRes.weather[0].main)
                    darkTheme === true ? setWeatherIcon(rainLight) : setWeatherIcon(rainDark) 
                    setVideo(rain)
                } else if (cWeatherRes.weather[0].main === 'Snow') {
                    console.log(cWeatherRes.weather[0].main)
                    darkTheme === true ? setWeatherIcon(snowLight) : setWeatherIcon(snowDark) 
                    setVideo(snow)
                } else if (cWeatherRes.weather[0].main === 'Mist') {
                    console.log(cWeatherRes.weather[0].main)
                    darkTheme === true ? setWeatherIcon(mistLight) : setWeatherIcon(mistDark) 
                    setVideo(mist)
                } else if (cWeatherRes.weather[0].main === 'Clear') {
                    console.log(cWeatherRes.weather[0].main)
                    darkTheme === true ? setWeatherIcon(clearLight) : setWeatherIcon(clearDark) 
                    setVideo(clearSkies)
                } else if (cWeatherRes.weather[0].main === 'Clouds') {
                    console.log(cWeatherRes.weather[0].main)
                    darkTheme === true ? setWeatherIcon(scatteredLight) : setWeatherIcon(scatteredDark) 
                    setVideo(brokenClouds)
                }

                let a = countryRes[0].population.toString()
                let b = a.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                let c = Object.values(countryRes[0].currencies)[0].name  // Accessing the value of the 'currencies' object, specifically the name
                let d = Object.values(countryRes[0].languages) // Accessing the value of the 'languages' object

                setCountry(countryRes[0])
                setPopulation(b)
                setCountryCurrency(c)
                setCountryLanguage(d)
                setWeather(cWeatherRes)
                setForecast(weatherForecastRes)
            })
            .catch((error) => console.log(error))

        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [location.state, location])

    return (
        <div className='country-body' style={darkTheme === true ? {backgroundColor: themes.dark.bgColor} : {backgroundColor: themes.light.bgColor}}>
            <Navbar />
            {loading && <Loading />}
            {loading && <BlurredOverlay />}

            {/* <div className="country-back-container" onClick={() => navigate('/')}>
                {darkTheme === true ?
                    <IoArrowBack color={'white'} size={30} />
                    :
                    <IoArrowBack color={'#111'} size={30} />
                }
            
                <p className="country-back-txt" style={darkTheme === true ? {color: '#fff'} : {color: '#111'}}>Back</p>
            </div> */}

            <div className="country-info-container">
                <div className="country-info-left">
                    <img src={country?.flags.svg} alt="" className="country-flag-img" loading='lazy' />
                    
                    {window.innerWidth >= 768 ?
                        <>
                            <div className="country-info-label-container googlemapContainer">
                                <p className="country-info-label-head" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>Google Maps</p>
                                <a className="country-info-label-value" target='_blank' href={country?.maps.googleMaps} style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{country?.maps.googleMaps}</a>
                            </div>

                            <div className="country-info-label-container googleStreetContainer">
                                <p className="country-info-label-head" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>Google Street View</p>
                                <a className="country-info-label-value" target='_blank' href={country?.maps.openStreetMaps} style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{country?.maps.openStreetMaps}</a>
                            </div>
                        </>
                        :
                        null
                    }
                </div>
                
                <div className="country-info-right">
                    <p className="country-info-name" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{country?.name.common}</p>
                    
                    <div className="country-info-right-subContainer">
                        <div className="country-info-right-sub-left">
                            {/* <p className="country-info-label" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>
                                Label
                                <span className="country-info-value" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>Value</span>
                            </p>   */}

                            <div className="country-info-label-container">
                                <p className="country-info-label-head" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>Offical Name</p>
                                <p className="country-info-label-value" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{country?.name.official}</p>
                            </div>

                            <div className="country-info-label-container">
                                <p className="country-info-label-head" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>Capital</p>
                                <p className="country-info-label-value" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{country?.capital[0]}</p>
                            </div>

                            <div className="country-info-label-container">
                                <p className="country-info-label-head" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>Continent</p>
                                <p className="country-info-label-value" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{country?.continents[0]}</p>
                            </div>

                            <div className="country-info-label-container">
                                <p className="country-info-label-head" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>Sub-Region</p>
                                <p className="country-info-label-value" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{country?.subregion}</p>
                            </div>
                        </div>
                        
                        <div className="country-info-right-sub-right" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>
                            <div className="country-info-label-container">
                                <p className="country-info-label-head" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>Population</p>
                                <p className="country-info-label-value" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{population}</p>
                            </div>

                            <div className="country-info-label-container">
                                <p className="country-info-label-head" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>Language(s)</p>
                                <p className="country-info-label-value" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>
                                    {countryLanguage?.length > 1 ?
                                        countryLanguage?.map((c) => (`${c}, `))
                                        :
                                        countryLanguage
                                    }
                                </p>
                            </div>

                            <div className="country-info-label-container">
                                <p className="country-info-label-head" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>Currency</p>
                                <p className="country-info-label-value" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{countryCurrency}</p>
                            </div>

                            <div className="country-info-label-container">
                                <p className="country-info-label-head" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>Timezone</p>
                                <p className="country-info-label-value" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{country?.timezones[0]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="weather-info-container" style={darkTheme === true ? {backgroundColor: '#0F0F0F'} : {backgroundColor: '#FDFDFD'}}>
                <p className="weather-info-header" style={darkTheme === true ? {color: '#fff'} : {color: '#111'}}>Weather Forecast | {country?.capital[0]}</p>

                <div className="weather-current-container">
                    {window.innerWidth >= 768 ?
                        <>
                            <div className="weather-current-left">
                                <div className="video-overlay"></div>

                                <div className="weather-info-overlay">
                                    <p className="weather-current-description">{weather?.weather[0].main}</p>
                                    <p className="weather-current-subdesc">{weather?.weather[0].description}</p>
                                    <p className="weather-current-temp">{weather?.main.temp} °C</p>
                                </div>

                                <video src={video} autoPlay loop muted controls='' className='weatherVideo'></video>
                            </div>

                            <div className='weather-current-right'>
                                <div className="weather-extraInfo-container">
                                    <p className="weather-extra-label" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>Pressure</p>
                                    <p className="weather-extra-value" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{weather?.main.pressure} Pa</p>
                                </div>

                                <div className="weather-extraInfo-container">
                                    <p className="weather-extra-label" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>Humidity</p>
                                    <p className="weather-extra-value" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{weather?.main.humidity} gm³</p>
                                </div>

                                <div className="weather-extraInfo-container">
                                    <p className="weather-extra-label" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>Wind Speed</p>
                                    <p className="weather-extra-value" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{weather?.wind.speed} km / s</p>
                                </div>

                                <div className="weather-extraInfo-container">
                                    <p className="weather-extra-label" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>Feels Like</p>
                                    <p className="weather-extra-value" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{weather?.main.feels_like} °C</p>
                                </div>
                            </div>
                        </>
                        :
                        <div className='weather-current-mobile'>
                            <div className="weather-current-container-mobile">
                                <img className='weather-current-icon' src={weatherIcon} />

                                <p  className="weather-current-description" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{weather?.weather[0].main}</p>
                                <p  className="weather-current-subdesc" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{weather?.weather[0].description}</p>
                                <p  className="weather-current-temp" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{weather?.main.temp} °C</p>
                            </div>

                            <div className="weather-current-extraInfo">
                                <div className="weather-extraInfo-container">
                                    <p className="weather-extra-label" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>Pressure</p>
                                    <p className="weather-extra-value" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{weather?.main.pressure} Pa</p>
                                </div>

                                <div className="weather-extraInfo-container">
                                    <p className="weather-extra-label" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>Humidity</p>
                                    <p className="weather-extra-value" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{weather?.main.humidity} gm³</p>
                                </div>

                                <div className="weather-extraInfo-container">
                                    <p className="weather-extra-label" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>Wind Speed</p>
                                    <p className="weather-extra-value" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{weather?.wind.speed} km / s</p>
                                </div>

                                <div className="weather-extraInfo-container">
                                    <p className="weather-extra-label" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>Feels Like</p>
                                    <p className="weather-extra-value" style={darkTheme === true ? {color: 'white'} : {color: '#111'}}>{weather?.main.feels_like} °C</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>

                <div className="weather-forecast-container" style={darkTheme === true ? {backgroundColor: themes.dark.accent} : {backgroundColor: themes.light.accent}}>
                    {forecast?.list.map((item) => (
                        <Forecast
                            key={uuid()}
                            main={item.weather[0].main}
                            description={item.weather[0].description}
                            temp={item.main.feels_like}
                            date={item.dt_txt}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Country