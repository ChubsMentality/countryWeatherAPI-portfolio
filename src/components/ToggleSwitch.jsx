import React, { useContext } from 'react'
import { ThemeContext } from '../App'
import sunLight from '../assets/Icons/Navbar/sunLight.svg'
import sunDark from '../assets/Icons/Navbar/sunDark.svg'
import moonDark from '../assets/Icons/Navbar/moonDark.svg'
import moonLight from '../assets/Icons/Navbar/moonLight.svg'
import '../styles/toggleSwitch.css'

const ToggleSwitch = (props) => {
    const [darkTheme, setDarkTheme] = useContext(ThemeContext)

    return (
      window.innerWidth >= 1024 ?
        <div className="toggleThemeDesktop">
          <img src={darkTheme === true ? sunLight : sunDark} alt="" className="toggleSwitchIcon lightIcon" />

          <label style={darkTheme === true ? { outline: '1px solid white'} : {outline: '1px solid #111'}}>
            <span className={`switch-wrapper`}>
              <input
                type="checkbox"
                checked={darkTheme}
                onChange={() => setDarkTheme(!darkTheme)}
              />
              <span className={`switch`}>
                <span className="switch-handle" style={darkTheme === true ? {background: 'white'} : {background: '#111'}} />
              </span>
            </span>
          </label>

          <img src={darkTheme === true ? moonLight : moonDark} alt="" className="toggleSwitchIcon darkIcon" />
        </div>
        :
        <div className="toggleThemeMobileContainer" onClick={() => props.setThemeMenu(!props.themeMenu)} style={darkTheme === true ? {backgroundColor: '#ffffff'} : {backgroundColor: '#111111'}}>
            {darkTheme === true ?
                <img src={moonDark} className='toggleThemeMobileIcon' />
                // <BsMoonFill color='#111111' className='toggleThemeMobileIcon' />
                :
                <img src={sunLight} className='toggleThemeMobileIcon' />
                // <BsSunFill color='#ffffff' className='toggleThemeMobileIcon' />
            }

            {props.themeMenu === true ?
                <div className="toggleThemeMenu" style={darkTheme === true ? {backgroundColor: '#fff'} : {backgroundColor: '#111'}}>
                    {darkTheme === true ?
                        <>
                            <div className="themeMenu" onClick={() => setDarkTheme(false)}>
                                <img src={sunDark} className='toggleThemeMenuIcon' />
                                <p className="themeMenuTxt" style={darkTheme === true ? {color: '#111'} : {color: '#fff'}}>Light</p>
                            </div>

                            <div className="themeMenu" onClick={() => setDarkTheme(true)}>
                                <img src={moonDark} className='toggleThemeMenuIcon' />
                                <p className="themeMenuTxt" style={darkTheme === true ? {color: '#111'} : {color: '#fff'}}>Dark</p>
                            </div>
                        </>
                        :
                        <>
                            <div className="themeMenu" onClick={() => setDarkTheme(false)}>
                                <img src={sunLight} className='toggleThemeMenuIcon' />
                                <p className="themeMenuTxt" style={darkTheme === true ? {color: '#111'} : {color: '#fff'}}>Light</p>
                            </div>

                            <div className="themeMenu" onClick={() => setDarkTheme(true)}>
                                <img src={moonLight} className='toggleThemeMenuIcon' />
                                <p className="themeMenuTxt" style={darkTheme === true ? {color: '#111'} : {color: '#fff'}}>Dark</p>
                            </div>
                        </>
                    }
                </div>
                :
                null
            }
        </div>
    )
}

export default ToggleSwitch