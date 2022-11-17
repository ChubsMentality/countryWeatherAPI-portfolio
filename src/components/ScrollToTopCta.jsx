import React from 'react'
import arrowUp from '../assets/Icons/arrow-up.svg'
import { ScrollToTop } from './ScrollToTop'
import '../styles/scrollToTop.css'

const ScrollToTopCta = (props) => {
    return (
        <div className='scrollToTopCta' onClick={() => ScrollToTop()}>
            <img src={arrowUp} className='scrollToTopIcon' />
        </div>
    )
}

export default ScrollToTopCta