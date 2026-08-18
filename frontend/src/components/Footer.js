import React from 'react'

const Footer = () => {
    return (
        <div className='
        flex
        flex-col
        pr-16
        pl-16
        mb-[500px]
    '>

            <div>
                <p className='
            text-[1.1rem]
            font-semibold
        '>Inspiration for future gateways</p>
            </div>

            <div className='
                flex
                mt-[20px]
                gap-[20px]
                text-[0.7rem]
                border-b-2
                border-b-[#555]
                pb-[5px]
      '>
                <span>Destinations for arts and culture</span>
                <span>Destinations for outdoor adventure</span>
                <span>Mountain cabins</span>
                <span>Beach destinations</span>
                <span>Popular destinations</span>
                <span>Unique stays</span>
            </div>

            <div className='
                grid
                grid-cols-4
                mt-[35px]
            '>
                
                {/* colomn 1 */}
                <div className='
                    flex
                    flex-col
                    gap-[15px]
                '>

                    <div>
                        <p className='
                            text-[0.9rem]
                            font-semibold
                        '>Eiffel Tower</p>
                        <p className='
                            text-[#555]
                            text-[0.9rem]
                        '>Paris, France</p>
                    </div>

                    <div>
                        <p className='
                            text-[0.9rem]
                            font-semibold
                        '>Colosseum</p>
                        <p className='
                            text-[#555]
                            text-[0.9rem]
                        '>Rome, Italy</p>
                    </div>

                    <div>
                        <p className='
                            text-[0.9rem]
                            font-semibold
                        '>Great Wall</p>
                        <p className='
                            text-[#555]
                            text-[0.9rem]
                        '>Beijing, China</p>
                    </div>

                </div>

                {/* colomn 2 */}
                <div className='
                    flex
                    flex-col
                    gap-[15px]
                '>

                    <div>
                        <p className='
                            text-[0.9rem]
                            font-semibold
                        '>Statue of Liberty</p>
                        <p className='
                            text-[#555]
                            text-[0.9rem]
                        '>New York, USA</p>
                    </div>

                    <div>
                        <p className='
                            text-[0.9rem]
                            font-semibold
                        '>Sydney Opera House</p>
                        <p className='
                            text-[#555]
                            text-[0.9rem]
                        '>Sydney, Australia</p>
                    </div>

                    <div>
                        <p className='
                            text-[0.9rem]
                            font-semibold
                        '>Christ the Redeemer</p>
                        <p className='
                            text-[#555]
                            text-[0.9rem]
                        '>Rio de Jeneiro, Brazil</p>
                    </div>

                </div>


                {/* colomn 3 */}
                <div className='
                    flex
                    flex-col
                    gap-[15px]
                '>

                    <div>
                        <p className='
                            text-[0.9rem]
                            font-semibold
                        '>Shibuya Crossing</p>
                        <p className='
                            text-[#555]
                            text-[0.9rem]
                        '>Tokyo, Japan</p>
                    </div>

                    <div>
                        <p className='
                            text-[0.9rem]
                            font-semibold
                        '>Table Mountain</p>
                        <p className='
                            text-[#555]
                            text-[0.9rem]
                        '>Cape Town, South Africa</p>
                    </div>

                    <div>
                        <p className='
                            text-[0.9rem]
                            font-semibold
                        '>Santorini</p>
                        <p className='
                            text-[#555]
                            text-[0.9rem]
                        '>Santorini, Greece</p>
                    </div>

                </div>


                {/* colomn 4 */}
                <div className='
                    flex
                    flex-col
                    gap-[15px]
                '>

                    <div>
                        <p className='
                            text-[0.9rem]
                            font-semibold
                        '>Big Ben</p>
                        <p className='
                            text-[#555]
                            text-[0.9rem]
                        '>London, UK</p>
                    </div>

                    <div>
                        <p className='
                            text-[0.9rem]
                            font-semibold
                        '>Sagrada Familia</p>
                        <p className='
                            text-[#555]
                            text-[0.9rem]
                        '>Barcelona, Spain</p>
                    </div>

                    <div>
                        <p className='
                            text-[0.9rem]
                            font-semibold
                        '>Grand Canyon</p>
                        <p className='
                            text-[#555]
                            text-[0.9rem]
                        '>Arizona, USA</p>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Footer
