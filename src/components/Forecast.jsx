import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../App'
import { themes } from '../styles/ThemeStyles'
import clearDark from '../assets/WeatherIcons/clear-dark.svg'
import clearLight from '../assets/WeatherIcons/clear-light.svg'
import brokenCloudsDark from '../assets/WeatherIcons/brokenCloudsDark.svg'
import brokenCloudsLight from '../assets/WeatherIcons/brokenCloudsLight.svg'
import fewCloudsDark from '../assets/WeatherIcons/fewCloudsDark.svg'
import fewCloudsLight from '../assets/WeatherIcons/fewCloudsLight.svg'
import mistDark from '../assets/WeatherIcons/mistDark.svg'
import mistLight from '../assets/WeatherIcons/mistLight.svg'
import rainDark from '../assets/WeatherIcons/rainDark.svg'
import rainLight from '../assets/WeatherIcons/rainLight.svg'
import scatteredDark from '../assets/WeatherIcons/scatteredDark.svg'
import scatteredLight from '../assets/WeatherIcons/scatteredLight.svg'
import showerDark from '../assets/WeatherIcons/showerDark.svg'
import showerLight from '../assets/WeatherIcons/showerLight.svg'
import snowDark from '../assets/WeatherIcons/snowDark.svg'
import snowLight from '../assets/WeatherIcons/snowLight.svg'
import thunderstormDark from '../assets/WeatherIcons/thunderstormDark.svg'
import thunderstormLight from '../assets/WeatherIcons/thunderstormLight.svg'
import moment from 'moment'
import '../styles/forecast.css'

const Forecast = (props) => {
    // main, description, temp, date
    const [darkTheme, setDarkTheme] = useContext(ThemeContext)
    const [lightIcon, setLightIcon] = useState(null)
    const [darkIcon, setDarkIcon] = useState(null)
    const date = moment(props.date).format('dddd, h:mm a')

    useEffect(() => {
        // if(props.main === 'Clear') {
        //     iconDark = darkTheme === true ? clearLight : clearDark 
        // } else if(props.main === 'Clouds') {
        //     iconDark = darkTheme === true ? fewCloudsLight : fewCloudsDark 
        // } else if(props.main === 'Thunderstorm') {
        //     iconDark = darkTheme === true ? thunderstormLight : thunderstormDark
        // } else if(props.main === 'Drizzle') {
        // }
        if(props.main === 'Thunderstorm') {
            setLightIcon(thunderstormLight)
            setDarkIcon(thunderstormDark)
        } else if (props.main === 'Drizzle') {
            setLightIcon(showerLight)
            setDarkIcon(showerDark)
        } else if (props.main === 'Rain') {
            setLightIcon(rainLight)
            setDarkIcon(rainDark)
        } else if (props.main === 'Snow') {
            setLightIcon(snowLight)
            setDarkIcon(snowDark)
        } else if (props.main === 'Mist') {
            setLightIcon(mistLight)
            setDarkIcon(mistDark)
        } else if (props.main === 'Clear') {
            setLightIcon(clearLight)
            setDarkIcon(clearDark)
        } else if (props.main === 'Clouds') {
            setLightIcon(scatteredLight)
            setDarkIcon(scatteredDark)
        }
        console.log(props.main)
    }, [])    

    return (
        darkTheme === true ?
            <div className='forecast-card forecastDark' style={{backgroundColor: '#111'}}>
                <img src={lightIcon} className='forecast-weather-icon' />
                <p className='forecastDark-text forecast-main'>{props.main}</p>
                <p className='forecastDark-text forecast-desc'>{props.description}</p>
                <p className='forecastDark-text forecast-temp'>{props.temp} °C</p>
                <p className='forecastDark-text forecast-date'>{date}</p>
            </div>
            :
            <div className='forecast-card forecastLight' style={{backgroundColor: '#fff'}}>
                <img src={darkIcon}  className='forecast-weather-icon' />
                <p className='forecastLight-text forecast-main'>{props.main}</p>
                <p className='forecastLight-text forecast-desc'>{props.description}</p>
                <p className='forecastLight-text forecast-temp'>{props.temp} °C</p>
                <p className='forecastLight-text forecast-date'>{date}</p>
            </div>
    )
}

export default Forecast