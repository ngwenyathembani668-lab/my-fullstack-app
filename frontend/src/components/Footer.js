import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
    return (
        <div className='
            flex
            flex-col
        '>

            <div className='
        flex
        flex-col
        pr-16
        pl-16
        mb-[35px]
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

            {/* footer! */}
            <footer className='
            w-full
            bg-[#F7F7F7]
            flex
            flex-col
        '>

                <div className='
                ml-[4rem]
                mr-[4rem]
                grid
                grid-cols-4
                border-b-2
                border-b-[#555]
                pt-[2.5rem]
                pb-[2.5rem]
            '>


                    {/* colomn 1 */}
                    <div className='
                    flex
                    flex-col
                '>
                        <div>
                            <p className='
                            text-[0.8rem]
                            font-semibold
                        '>Support</p>
                        </div>
                        <div className='
                        text-[0.8rem]
                        text-[#555]
                    '>
                            <p>Help Center</p>
                            <p>Safty information</p>
                            <p>Cancellation options</p>
                            <p>Our COVID-19 Response</p>
                            <p>Supporting people with disabilities</p>
                            <p>Report a neighborhood concern</p>
                        </div>
                    </div>


                    {/* colomn 2 */}
                    <div className='
                    flex
                    flex-col
                '>
                        <div>
                            <p className='
                            text-[0.8rem]
                            font-semibold
                        '>Community</p>
                        </div>
                        <div className='
                        text-[0.8rem]
                        text-[#555]
                    '>
                            <p>Airbnb.org: disaster relief housing</p>
                            <p>Support Afghan refugees</p>
                            <p>Combating discrimination</p>
                            <p>Join the LGBTQ+ community</p>
                            <p>Guest Referrals</p>
                            <p>Gift cards</p>
                        </div>
                    </div>


                    {/* colomn 3 */}
                    <div className='
                    flex
                    flex-col
                '>
                        <div>
                            <p className='
                            text-[0.8rem]
                            font-semibold
                        '>Hosting</p>
                        </div>
                        <div className='
                        text-[0.8rem]
                        text-[#555]
                    '>
                            <p>Try hosting</p>
                            <p>AirCover: protection for Hosts</p>
                            <p>Explore hosting resources</p>
                            <p>Visit our community forum</p>
                            <p>How to host responsibly</p>
                            <p>Host an online experience</p>
                        </div>
                    </div>


                    {/* colomn 4 */}
                    <div className='
                    flex
                    flex-col
                '>
                        <div>
                            <p className='
                            text-[0.8rem]
                            font-semibold
                        '>About</p>
                        </div>
                        <div className='
                        text-[0.8rem]
                        text-[#555]
                    '>
                            <p>Newsroom</p>
                            <p>Learn about new features</p>
                            <p>Letter from our founders</p>
                            <p>Careers</p>
                            <p>Investors</p>
                            <p>Airbnb Luxe</p>
                        </div>
                    </div>

                </div>

                <div className='
                    flex
                    justify-between
                    pt-[10px]
                    pb-[10px]
                    align-middle
                    pl-[40px]
                    pr-[40px]
                '>

                    <div className='
                        flex
                        items-center
                    '>
                        <p className='
                            text-[0.8rem]
                            text-[#555]
                        '>2026 Airbnb-Clone</p>
                    </div>

                    <div className='
                        flex
                        gap-[20px]
                        items-center
                    '>
                        <div>
                            <select className='
                                bg-[#f7f7f7]
                                border-[1px]
                                border-[#000]
                                p-[3px]
                                rounded
                            '>
                                <option>English</option>
                                <option>isiZulu</option>
                            </select>
                        </div>
                        <div className='
                            flex
                            gap-[10px]
                        '>
                            <FaFacebook className='
                                hover:text-rose-500
                            ' />
                            <FaXTwitter className='
                                hover:text-rose-500
                            ' />
                            <FaWhatsapp className='
                                hover:text-rose-500
                            ' />
                        </div>
                    </div>

                </div>

            </footer>

        </div>
    )
}

export default Footer
