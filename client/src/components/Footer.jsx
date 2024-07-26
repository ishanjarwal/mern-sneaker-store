import React from 'react'
import { FaGithub, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { PiLinkedinLogo } from 'react-icons/pi'
import { SlSocialFacebook } from 'react-icons/sl'

const Footer = () => {

    const socialLinks = [
        {
            name: "Github",
            icon: <FaGithub />,
            link: "https://www.github.com/ishanjarwal"
        },
        {
            name: "Instagram",
            icon: <FaInstagram />,
            link: "https://www.instagram.com/ishanjarwal"
        },
        {
            name: "Facebook",
            icon: <SlSocialFacebook />,
            link: "https://www.facebook.com/profile.php?id=100082865800854"
        },
        {
            name: "LinkedIn",
            icon: <PiLinkedinLogo />,
            link: "https://www.linkedin.com/in/ishan-jarwal-7a2356265/"
        },
        {
            name: "Twitter",
            icon: <FaXTwitter />,
            link: "https://x.com/ishanjarwal"
        },
    ]


    return (
        <footer className="relative bg-gray-100 pt-8 pb-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap">
                    <div className="w-full px-4">
                        <h4 className=" text-center text-3xl font-semibold text-blueGray-700">
                            Let's keep in touch!
                        </h4>
                        <h5 className=" text-center text-lg mt-0 mb-2 text-blueGray-600">
                            Find me on any of these platforms, I will respond back.
                        </h5>
                        <div className="flex justify-center items-center w-full mt-6 lg:mb-0 mb-6">
                            {socialLinks.map(link => {
                                return (
                                    <a
                                        href={link.link}
                                        target='_blank'
                                        title={link.name}
                                        className="p-4 rounded-full shadow-lg"
                                        type="button"
                                    >
                                        {link.icon}
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-blueGray-300" />
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div className="text-sm text-blueGray-500 font-semibold py-1">
                            Made with ❤️ by{' '}<a className='text-blue-500' href='https://www.instagram.com/ishanjarwal' target='_blank'>Ishan Jarwal</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer
