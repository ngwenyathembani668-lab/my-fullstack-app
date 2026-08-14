import React from 'react'
import logo from '../assets/logo.png'

const Logo = () => {
  return (
    <div>
      <img
        className='hidden md:block cursor-pointer'
        alt='Logo'
        height='100'
        width='100'
        src={logo}
      />
    </div>
  )
}

export default Logo