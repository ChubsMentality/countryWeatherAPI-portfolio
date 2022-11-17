import React, { useState,useContext } from 'react'
import { ThemeContext } from '../App'
import { themes } from '../styles/ThemeStyles'
import { Link, useNavigate } from 'react-router-dom'
import Searchbar from './Searchbar'
import ToggleSwitch from './ToggleSwitch'
import LogoBlack from '../assets/Logo/logoBlack.png'
import LogoWhite from '../assets/Logo/logoWhite.png'
import '../styles/navbar.css'

const Navbar = () => {
    const [darkTheme, setDarkTheme] = useContext(ThemeContext)
    const navigate = useNavigate()
    const [searchQuery, setsSearchQuery] = useState('')
    const [themeMenu, setThemeMenu] = useState(false)

    const onSearchChange = (value) => {
        setsSearchQuery(value)
    }

    const searchClicked = () => {
        console.log(searchQuery)
    }

    return (
        <nav className='navbar' style={darkTheme === true ? {backgroundColor: themes.dark.bgColor} : {backgroundColor: themes.light.bgColor}}>
            {darkTheme === true ?
                <Link to='/'>
                    <img src={LogoWhite} className='navbar-logo' />
                </Link>
                :
                <Link to='/'>
                    <img src={LogoBlack} className='navbar-logo' />
                </Link>
            }

            <div className="navbar-right">
                <Searchbar
                    searchQuery={searchQuery}
                    onSearchChange={onSearchChange} 
                    searchClicked={searchClicked}
                />

                <ToggleSwitch 
                    themeMenu={themeMenu}
                    setThemeMenu={setThemeMenu}
                />
            </div>
        </nav>
    )
}

export default Navbar