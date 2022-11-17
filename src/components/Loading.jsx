import React, { useState, useContext } from 'react'
import { ThemeContext } from '../App'
import ReactLoading from 'react-loading'
import '../styles/loading.css'

const Loading = () => {
  const [loading, setLoading] = useState(true)
  const [darkTheme, setDarkTheme] = useContext(ThemeContext)
  const color = darkTheme === true ? 'white' : '#111' 

  return (
    <div className='loading-container'>
      {window.innerWidth < 1280 && <ReactLoading type={'spinningBubbles'} color={'#fff'} height={180} width={180} />}
      {/* <div className="loading-txt">Loading</div> */}
      {window.innerWidth >= 1280 && window.innerWidth < 1400 &&  <ReactLoading type={'spinningBubbles'} color={'#fff'} height={270} width={270} />}
      {window.innerWidth >= 1400 &&  <ReactLoading type={'spinningBubbles'} color={'#fff'} height={310} width={310} />}
    </div>
  )
}

export default Loading