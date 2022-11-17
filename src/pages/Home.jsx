import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../App'
import { themes } from '../styles/ThemeStyles'
import { v4 as uuid } from 'uuid'
import { ScrollToTop } from '../components/ScrollToTop'
import { gsap } from 'gsap'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import BlurredOverlay from '../components/BlurredOverlay'
import Card from '../components/Card'
import ScrollToTopCta from '../components/ScrollToTopCta'
import Lottie from 'lottie-react'
import EarthLottie from '../assets/Lottie/earth.json'
import EarthLottie2 from '../assets/Lottie/earth2.json'
import axios from 'axios'
import '../styles/home.css'

const Home = () => {
    const [darkTheme, setDarkTheme] = useContext(ThemeContext)
    const [countries, setCountries] = useState()
    const [filterBy, setFilterBy] = useState('')
    const [ctaVisible, setCtaVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('https://restcountries.com/v3.1/all')
            setCountries(data)
            setTimeout(() => {
                setLoading(false)
            }, 1500)
        } catch (error) {
            console.log(error)            
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useLayoutEffect(() => {

    }, [])

    window.addEventListener('scroll', () => {
        if(window.scrollY >= 4500) {
            setCtaVisible(true)
        } else {
            setCtaVisible(false)
        }
    })

    return (
        <div className='home-body' style={darkTheme === true ? {backgroundColor: themes.dark.bgColor} : {backgroundColor: themes.light.bgColor}}>
            <Navbar/>
            {loading && <Loading />}
            {loading && <BlurredOverlay />}

            {ctaVisible === true ?
                <ScrollToTopCta />
                :
                null
            }

            <div className="home-hero-section">
                <div className="home-hero-left">
                    <div className="home-hero-title-container" style={darkTheme === true ? {backgroundColor: themes.white} : {backgroundColor: '#111'}}>
                        <p className="home-hero-title" style={darkTheme === true ? {color: '#111'} : {color: '#fff'}}>FrontEnd Mentor</p>
                    </div>
                    <p className="home-hero-header" style={darkTheme === true ? {color: '#fff'} : {color: '#111'}}>Country, Weather REST API</p>
                    <p className="home-hero-desc" style={darkTheme === true ? {color: '#fff'} : {color: '#111'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit delectus, quo unde voluptatem assumenda quis officia neque repellat</p>
                </div>

                <Lottie
                    animationData={EarthLottie}
                    loop={true}
                    controls={true}
                    className='home-hero-lottie'
                />
            </div>

            <div className="home-countries-container" style={darkTheme === true ? {backgroundColor: themes.dark.accent} : {backgroundColor: themes.light.accent}}>
                <div className="home-countries-head">
                    <p className="home-countries-header" style={darkTheme === true ? {color: '#fff'} : {color: '#111'}}>COUNTRIES</p>

                    <select className='home-countries-select' style={darkTheme === true ? {border: '1px solid white',borderRadius: 5, background: 'none', color: '#fff' } : { border: '1px solid #111', color: '#111', borderRadius: 5}} value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                        <option disabled selected>Filter By Region</option>
                        <option value=''>All</option>
                        <option value='Africa'>Africa</option>
                        <option value='Asia'>Asia</option>
                        <option value='Europe'>Europe</option>
                        <option value='North America'>North America</option>
                        <option value='Oceania'>Oceania</option>
                        <option value='South America'>South America</option>
                    </select>
                </div>

                <div className="home-countries-cards">
                    {countries?.filter((country) => {
                        if(filterBy === '') {
                            return country
                        } else if (filterBy === 'Africa') {
                            return country.continents[0] === 'Africa'
                        } else if (filterBy === 'Asia') {
                            return country.continents[0] === 'Asia'
                        } else if (filterBy === 'Europe') {
                            return country.continents[0] === 'Europe'
                        } else if (filterBy === 'North America') {
                            return country.continents[0] === 'North America'
                        } else if (filterBy === 'Oceania') {
                            return country.continents[0] === 'Oceania'
                        } else if (filterBy === 'South America') {
                            return country.continents[0] === 'South America'
                        }
                    }).map((country) => (
                        <Card
                            key={uuid()}
                            flagImg={country.flags.svg}
                            countryName={country.name.common}
                            region={country.continents}
                            population={country.population}
                            capital={country.capital} 
                            lat={country.latlng[0]}
                            lon={country.latlng[1]}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home