import React from 'react';

const Discovery = () => {
    return (
        <div className='
        px-4
        sm:px-8
        md:px-12
        lg:pr-16
        lg:pl-16
        flex
        flex-col
        gap-10
        sm:gap-20
        w-full
        mb-[50px]
    '>

            {/* discover */}
            <div className='
            flex
            flex-col
            gap-6
            sm:gap-9
        '>

                <div>
                    <p className='
                    font-semibold
                    text-xl
                    sm:text-2xl
                '>Discover Airbnb Experiences</p>
                </div>

                <div className='
                flex
                flex-col
                sm:flex-row
                justify-center
                gap-4
                sm:gap-7
            '>

                    {/* first card */}
                    <div className='
                    relative
                    rounded-md
                    h-[20rem]
                    sm:h-[28rem]
                    w-full
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
                        pt-6
                        sm:pt-10
                        pl-6
                        sm:pl-10
                    '>
                            <h2 className='
                            text-lg
                            sm:text-2xl
                            text-white
                        '>Things to do<br></br>on your trip</h2>
                            <button className='
                            text-white
                            bg-[#d0354f]
                            rounded-md
                            p-2
                            mt-3
                            sm:mt-5
                            hover:bg-black
                            transition-colors
                            text-sm
                        '>Experiences</button>
                        </div>
                    </div>

                    {/* second card */}
                    <div className='
                    relative
                    rounded-md
                    h-[20rem]
                    sm:h-[28rem]
                    w-full
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
                        pt-6
                        sm:pt-10
                        pl-6
                        sm:pl-10
                    '>
                            <h2 className='
                            text-lg
                            sm:text-2xl
                            text-white
                        '>Things to do<br></br>from home</h2>
                            <button className='
                            text-white
                            bg-[#d0354f]
                            rounded-md
                            p-2
                            mt-3
                            sm:mt-5
                            hover:bg-black
                            transition-colors
                            text-sm
                        '>Online Experiences</button>
                        </div>
                    </div>

                </div>

            </div>


            {/* shop airbnb */}
            <div className='
            flex
            flex-col
            sm:flex-row
            sm:justify-between
            gap-6
            sm:gap-0
            items-start
        '>

                <div className='
                flex
                flex-col
                gap-6
            '>
                    <p className='
                    font-semibold
                    text-lg
                    sm:text-2xl
                '>Shop Airbnb<br></br>gift card</p>
                    <button className='
                    bg-black
                    text-white
                    p-2
                    rounded-md
                    hover:bg-rose-500
                    text-sm
                '>Learn more</button>
                </div>

                <div className='
                w-full
                sm:w-auto
            '>
                    <img
                        className='
                    w-full
                    sm:w-[320px]
                    h-[120px]
                    sm:h-[200px]
                    object-cover
                    rounded-md
                ' src='https://cdn.images.express.co.uk/img/dynamic/25/590x/secondary/Airbnb-3906241.webp?r=1644406120862' alt='Gift Card' />
                </div>

            </div>


            {/* questions about hosting! */}
            <div className='
            w-full
            rounded-[10px]
            h-[18rem]
            sm:h-[22rem]
            relative
        '>

                <img className='
                absolute
                w-full
                sm:w-[90%]
                object-cover
                h-full
                rounded-md
            ' src='https://media.smallbiztrends.com/2022/10/how-to-be-an-airbnb-host.png' alt='Questions about hosting' />
                <div className='
                relative
                pt-6
                sm:pt-8
                pl-6
                sm:pl-8
            '>
                    <p className='
                    text-white
                    text-lg
                    sm:text-[1.8rem]
                    font-semibold
                '>Questions<br></br>about<br></br>hosting?</p>
                    <button className='
                    mt-4
                    sm:mt-[30px]
                    p-2
                    bg-white
                    rounded-md
                    hover:bg-[#d0354f]
                    hover:text-white
                    text-sm
                '>Ask a superhost</button>
                </div>

            </div>

        </div>
    )
}

export default Discovery
