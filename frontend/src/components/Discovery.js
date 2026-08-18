import React from 'react'

const Discovery = () => {
    return (
        <div className='
        pr-16
        pl-16
        flex
        flex-col
        gap-20
        w-full
        mb-[50px]
    '>

            <div className='
            flex
            flex-col
            gap-9
        '>

                <div className='
                flex
            '>
                    <p className='
                    text-2xl
                    font-semibold
                '>Insiration for your next trip</p>
                </div>

                <div className='
                grid
                grid-cols-5
                gap-7
            '>

                    <div className='
                    flex
                    flex-col
                    justify-end
                    h-60
                    rounded-2xl
                    bg-amber-800
                '>
                        <img className='
                        h-40
                        rounded-t-2xl
                    ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdJ-SFJ3MikeGtOvn0_1jsWH3IthRFQK2Y_cQnptK0Og&s=10' alt='Paris' />

                        <div className='
                        flex
                        flex-col
                        justify-center
                        bg-[#d0354f]
                        rounded-b-2xl
                        h-20
                        pl-4
                    '>
                            <span className='
                            text-white
                            text-lg
                        '>Paris</span>
                            <p className='
                            text-white
                            text-xs
                        '>France</p>
                        </div>

                    </div>

                    <div className='
                    flex
                    flex-col
                    justify-end
                    h-60
                    rounded-2xl
                    bg-amber-800
                '>
                        <img className='
                        h-40
                        rounded-t-2xl
                    ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvSU1TJMM2x-F_GG68Lo1g3V6a4i_pZ7Pel75WTVjLNg&s=10' alt='USA' />

                        <div className='
                        flex
                        flex-col
                        justify-center
                        bg-[#d0354f]
                        rounded-b-2xl
                        h-20
                        pl-4
                    '>
                            <span className='
                            text-white
                            text-lg
                        '>New York</span>
                            <p className='
                            text-white
                            text-xs
                        '>USA</p>
                        </div>

                    </div>

                    <div className='
                    flex
                    flex-col
                    justify-end
                    h-60
                    rounded-2xl
                    bg-amber-800
                '>
                        <img className='
                        h-40
                        rounded-t-2xl
                    ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLbAyOxbUr0z9VkQoFz8H37qejc1-_x-fJuVJa9eVjLw&s=10' alt='Japan' />

                        <div className='
                        flex
                        flex-col
                        justify-center
                        bg-[#d0354f]
                        rounded-b-2xl
                        h-20
                        pl-4
                    '>
                            <span className='
                            text-white
                            text-lg
                        '>Tokyo</span>
                            <p className='
                            text-white
                            text-xs
                        '>Japan</p>
                        </div>

                    </div>

                    <div className='
                    flex
                    flex-col
                    justify-end
                    h-60
                    rounded-2xl
                    bg-amber-800
                '>
                        <img className='
                        h-40
                        rounded-t-2xl
                    ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwVNFVRqX3d0yD_37d5gLQHa1EW8kgx5NBXpdp_qF5XA&s=10' alt='Cape Town' />

                        <div className='
                        flex
                        flex-col
                        justify-center
                        bg-[#d0354f]
                        rounded-b-2xl
                        h-20
                        pl-4
                    '>
                            <span className='
                            text-white
                            text-lg
                        '>Cape Town</span>
                            <p className='
                            text-white
                            text-xs
                        '>South Africa</p>
                        </div>

                    </div>

                    <div className='
                    flex
                    flex-col
                    justify-end
                    h-60
                    rounded-2xl
                '>
                        <img className='
                        h-40
                        rounded-t-2xl
                    ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYOtZr_5FqjANl3ELBzkyQqppAGU-e2yd7tcGvKthLcA&s=10' alt='Durban' />

                        <div className='
                        flex
                        flex-col
                        justify-center
                        bg-[#d0354f]
                        rounded-b-2xl
                        h-20
                        pl-4
                    '>
                            <span className='
                            text-white
                            text-lg
                        '>Durban</span>
                            <p className='
                            text-white
                            text-xs
                        '>South Africa</p>
                        </div>

                    </div>

                </div>

            </div>


            {/* discover */}
            <div className='
            flex
            flex-col
            gap-9
        '>

                <div>
                    <p className='
                    font-semibold
                    text-2xl
                '>Discover Airbnb Experiences</p>
                </div>

                <div className='
                flex
                flex-row
                justify-center
                gap-7
            '>

                    {/* first card */}
                    <div className='
                    relative
                    rounded-md
                    h-[28rem]
                    w-full
                    max-w-[29rem]
                    overflow-hidden
                '>
                        <img className='
                        absolute
                        inset-0
                        w-full
                        h-full
                        object-cover
                        rounded-md
                    ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_j3rU1VEN4O_WITLkKp1dzX0hzHqLP3el59Fc1Lj67A&s=10' alt='Things to do on your trip' />
                        <div className='
                        relative
                        pt-10
                        pl-10
                    '>
                            <h2 className='
                            text-2xl
                            text-white
                        '>Things to do<br></br>on your trip</h2>
                            <button className='
                            text-white
                            bg-[#d0354f]
                            rounded-md
                            p-2
                            mt-5
                            hover:bg-black
                            transition-colors
                        '>Experiences</button>
                        </div>
                    </div>

                    {/* second card */}
                    <div className='
                    relative
                    rounded-md
                    h-[28rem]
                    w-full
                    max-w-[29rem]
                    overflow-hidden
                '>
                        <img className='
                        absolute
                        inset-0
                        w-full
                        h-full
                        object-cover
                        rounded-md
                    ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDsxOp_jNdQ20MzCuBsp_q_WTLdtwTtwWcKBY6fT0p6Q&s=10' alt='Things to do on your trip' />
                        <div className='
                        relative
                        pt-10
                        pl-10
                    '>
                            <h2 className='
                            text-2xl
                            text-white
                        '>Things to do<br></br>from home</h2>
                            <button className='
                            text-white
                            bg-[#d0354f]
                            rounded-md
                            p-2
                            mt-5
                            hover:bg-black
                            transition-colors
                        '>Online Experiences</button>
                        </div>
                    </div>

                </div>

            </div>


            {/* shop airbnb */}
            <div className='
            flex
            justify-between
            
        '>

                <div className='
                flex
                flex-col
                gap-6
            '>
                    <p className='
                    font-semibold
                    text-2xl
                '>Shop Airbnb<br></br>gift card</p>
                    <button className='
                    bg-black
                    text-white
                    p-2
                    rounded-md
                    hover:bg-rose-500
                '>Learn more</button>
                </div>

                <div className='
                pr-[3rem]
            '>
                    <img
                        className='
                    w-[320px]
                    h-[200px]
                    object-cover
                ' src='https://cdn.images.express.co.uk/img/dynamic/25/590x/secondary/Airbnb-3906241.webp?r=1644406120862' alt='Gift Card' />
                </div>

            </div>


            {/* questions about hosting! */}
            <div className='
            w-full
            rounded-[10px]
            h-[22rem]
        '>

                <img className='
                absolute
                w-[90%]
                object-cover
                h-[22rem]
                rounded-md
            ' src='https://media.smallbiztrends.com/2022/10/how-to-be-an-airbnb-host.png' alt='Questions about hosting' />
                <div className='
                relative
                pt-8
                pl-8
            '>
                    <p className='
                    text-white
                    text-[1.8rem]
                    font-semibold
                '>Questions<br></br>about<br></br>hosting?</p>
                    <button className='
                    mt-[30px]
                    p-2
                    bg-white
                    rounded-md
                    hover:bg-[#d0354f]
                    hover:text-white
                '>Ask a superhost</button>
                </div>

            </div>

        </div>
    )
}

export default Discovery
