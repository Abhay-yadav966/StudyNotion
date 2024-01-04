import React from 'react'
import {FooterLink2} from '../../data/footer-links';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {

    // company data array
    const company = [
        "About",
        "Careers",
        "Affiliates"
    ]

    // resource data array
    const Resource = [
        "Articles",
        "Blog",
        "Chart Sheet",
        "Code challenges",
        "Docs",
        "Projects",
        "Videos",
        "Workspaces"
    ]

    // plan data array
    const plan = [
        "Paid memberships",
        "For students",
        "Business solutions",
    ]

    //community
    const community = [
        "Forums",
        "Chapters",
        "Events"
    ]

    // bottom footer
    const bottom_footer = [
        "Privacy Policy",
        "Cookie Policy",
        "Terms"
    ]

  return (
    <div className=' bg-richblack-800 ' >
        <div className='w-11/12 max-w-maxContent mx-auto flex flex-col py-14 ' >
            {/* top */}
            <div className='flex flex-col gap-10 lg:flex-row lg:gap-0 ' >
                {/* left */}
                <div className='flex flex-row flex-wrap justify-between lg:justify-start gap-5 w-[100%] lg:w-[50%] ' >
                    {/* 1 */}
                    <div className='flex flex-col gap-3' >
                        {/* Logo */}
                        <div className='text-richblack-50 w-[90%] ' >
                            <img src={Logo} alt=""  />
                        </div>
                        {/* company */}
                        <div className='space-y-3' >
                            <h1 className='text-base font-semibold text-richblack-100  ' >Company</h1>
                            <div className='flex flex-col gap-3' >
                                {
                                    company.map((element, index) => {
                                        return(
                                            <Link key={index} to={element.split(" ").join("-").toLowerCase()} >
                                                <p key={index} className=' font-inter text-sm font-medium text-richblack-400 cursor-pointer hover:text-richblack-100 transition-all duration-200 ' >{element}</p>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {/* social media */}
                        <div className='flex flex-row gap-3 text-richblack-400 ' >
                            <FaFacebook className='h-5 w-5' />
                            <FaGoogle className='h-5 w-5' />
                            <FaTwitter className='h-5 w-5' />
                            <FaYoutube className='h-5 w-5' />
                        </div>
                    </div>
                    {/* 2 */}
                    <div className='flex flex-col gap-9 w-[30%] ' >
                        {/* resource */}
                        <div className='flex flex-col gap-3' >
                            <h1 className='text-base font-semibold text-richblack-100' >Resources</h1>
                            <div className='flex flex-col gap-3' >
                                {
                                    Resource.map( (element, index) => {
                                        return(
                                            <Link key={index} to={element.split(" ").join("-").toLowerCase()} >
                                                <p key={index} className='text-sm font-medium text-richblack-400 cursor-pointer hover:text-richblack-100 transition-all duration-200 ' >{element}</p>
                                            </Link>
                                        )
                                    } )
                                }
                            </div>
                        </div>

                        {/* support */}
                        <div className='flex flex-col gap-3' >
                            <h1 className='font-semibold text-base text-richblack-100 ' >Support</h1>
                            <Link to={"help-center"} >
                                <p className='font-medium text-sm text-richblack-400 cursor-pointer hover:text-richblack-100 transition-all duration-200' >Help Center</p>
                            </Link>
                        </div>
                    </div>

                    {/* 3 */}
                    <div className='flex flex-col gap-9' >
                        {/* plans */}
                        <div  className='flex flex-col gap-3' >
                            <h1 className='font-semibold text-base text-richblack-100 ' >Plans</h1>
                            <div className='flex flex-col gap-3' >
                                {
                                    plan.map( (element, index) => {
                                        return(
                                            <Link key={index} to={element.split(" ").join("-").toLowerCase()} >
                                                <p key={index} className='text-sm font-medium text-richblack-400 cursor-pointer hover:text-richblack-100 transition-all duration-200' >{element}</p>
                                            </Link>
                                        )
                                    } )
                                }
                            </div>
                        </div>
                        {/* community */}
                        <div  className='flex flex-col gap-3' >
                            <h1 className='font-semibold text-base text-richblack-100 ' >Community</h1>
                            <div className='flex flex-col gap-3' >
                                {
                                    community.map((element, index) => {
                                        return(
                                            <Link key={index} to={element.toLowerCase()} >
                                                <p key={index} className='text-sm font-medium text-richblack-400 cursor-pointer hover:text-richblack-100 transition-all duration-200 ' >{element}</p>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div> 
                    </div>
                </div>

                {/* right */}
                <div className=' border-0 lg:border-l border-richblack-700 flex flex-row flex-wrap gap-5 lg:gap-0 justify-between w-[100%] lg:w-[50%] lg:pl-5 pb-8 ' >
                    {
                        FooterLink2.map( (element, index) => {
                            return(
                                <div key={index} className='flex flex-col gap-3 '  >
                                    <h1 className='font-semibold text-base text-richblack-100 ' >{element.title}</h1>
                                    <div className='flex flex-col gap-3' >
                                        {
                                            element.links.map( (element, index) => {
                                                return(
                                                    <Link key={index} to={element.link} >
                                                        <p key={index} className='text-sm font-medium text-richblack-400 hover:text-richblack-100 transition-all duration-200 ' >{element.title}</p>
                                                    </Link>
                                                )
                                            } )
                                        }
                                    </div>
                                </div>
                            )
                        } )
                    }
                </div>
            </div>

            {/* bottom */}
            <div className=' flex flex-row justify-center lg:justify-between border-t border-richblack-700 mt-5 pt-14  ' >
                {/* left */}
                <div className='flex flex-row items-center ml-3 gap-3 ' >
                    {
                        bottom_footer.map( (element, index) => {
                            return(
                                <Link key={index} to={element.split(" ").join("-").toLowerCase()} >
                                    <p key={index} className={`${bottom_footer.length - 1 === index ? "font-medium text-sm  text-richblack-400" : "font-medium text-sm  text-richblack-400 border-r border-richblack-700 pr-3 "}`} >{element}</p>
                                </Link>
                            )
                        } )
                    }
                </div>

            </div>
        </div>
    </div>
  )
}

export default Footer;