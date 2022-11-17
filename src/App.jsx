import { useState, useEffect, createContext } from 'react'
import { BrowserRouter as Router, RouterProvider, createBrowserRouter } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import Home from './pages/Home'
import Country from './pages/Country'

const weatherData = {
  "coord": {
    "lon": 122,
    "lat": 13
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 300.97,
    "feels_like": 305.09,
    "temp_min": 300.97,
    "temp_max": 300.97,
    "pressure": 1007,
    "humidity": 82,
    "sea_level": 1007,
    "grnd_level": 1007
  },
  "visibility": 8164,
  "wind": {
    "speed": 9.88,
    "deg": 197,
    "gust": 11.9
  },
  "clouds": {
    "all": 54
  },
  "dt": 1667290013,
  "sys": {
    "country": "PH",
    "sunrise": 1667252730,
    "sunset": 1667294733
  },
  "timezone": 28800,
  "id": 1694008,
  "name": "Philippines",
  "cod": 200
}

export const ThemeContext = createContext()

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path:'/country',
      element: <Country />,  
    }
  ])

  const [darkTheme, setDarkTheme] = useState(true)

  return (
    <ThemeContext.Provider value={[darkTheme, setDarkTheme]}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  )
}

export default App
