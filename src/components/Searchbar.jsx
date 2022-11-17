import React, { useContext } from 'react'
import { ThemeContext } from '../App'
import { themes } from '../styles/ThemeStyles'
import { useNavigate } from 'react-router-dom'
import searchLight from '../assets/Icons/Navbar/searchLight.svg'
import searchDark from '../assets/Icons/Navbar/searchDark.svg'

const Searchbar = (props) => {
  const navigate = useNavigate()
  const [darkTheme, setDarkTheme] = useContext(ThemeContext)

  const onEnterPressed = (e) => {
    if(e.key === 'Enter') {
      fetch(`https://restcountries.com/v3.1/name/${props.searchQuery}`)
        .then(async (response) => response.json())
        .then((res) => {
          console.log(res)
          navigate('/country', { state: { countryName: res[0].name.common, lat: res[0].latlng[0], lon: res[0].latlng[1] } })
        })
        .catch(err => alert('Invalid input'))
    }
  }
  
  const onSearchClick = () => {
    fetch(`https://restcountries.com/v3.1/name/${props.searchQuery}`)
        .then(async (response) => response.json())
        .then((res) => {
          console.log(res)
          navigate('/country', { state: { countryName: res[0].name.common, lat: res[0].latlng[0], lon: res[0].latlng[1] } })
        })
        .catch(err => alert('Invalid input'))
  }

  return (
    <div className="navbar-search-container" style={darkTheme === true ? {border: `.5px solid white`} : {border: `1px solid #111111`}}>
      <input type="text" value={props.searchQuery} onChange={(e) => props.onSearchChange(e.target.value)} onKeyDown={(e) => onEnterPressed(e)} style={darkTheme === true ? {color: themes.dark.color} : {color: themes.light.color}} className="navbar-search-field" placeholder='Search for a country...' />
      {darkTheme === true ?
        <div onClick={() => onSearchClick()}>
          <img src={searchLight} className='navbar-searchIcon' onClick={() => onSearchClick()} />
        </div>
        :  
        <div onClick={() => onSearchClick()}>
          <img src={searchDark} className='navbar-searchIcon' onClick={() => onSearchClick()} />
        </div>
        // <CiSearch className='navbar-searchIcon' color='#111'/>
      }
    </div>
  )
}

export default Searchbar