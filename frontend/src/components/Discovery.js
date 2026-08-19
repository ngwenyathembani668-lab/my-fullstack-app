import React from 'react';

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
