import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Logo = () => {
  return (
    <Link to='/' aria-label='Go to home page'>
      <img
        className='hidden md:block cursor-pointer'
        alt='Logo'
        height='100'
        width='100'
        src={logo}
      />
    </Link>
  )
}

export default Logo