import React from 'react'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'

const Container = () => {
    return (
        <div
            className='
        max-w-[2520px]
        mx-auto
        xl:px-20
        md:px-10
        sm:px-2
        px-4
    '
        >
            <div
                className='
            flex
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0
        '
            >
                <Logo />
                <Search />
                <UserMenu />
            </div>
        </div>
    )
}

export default Container
