import React, { useEffect, useState } from 'react'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { IoIosArrowDown } from "react-icons/io";


// const subLink = [
//     {
//         title:"Python",
//         link:"/catalog/python"
//     },
//     {
//         title:"Web development",
//         link:"/catalog/webdev"
//     }
// ]

const Navbar = () => { 

    // import data from redux
    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector( (state) => state.profile );
    const {totalItems} = useSelector((state) => state.cart);

    // state variable for changing tab
    const [ tab, setTab ] = useState(NavbarLinks[0].title) 

    // state variable for storing categories data
    const [ subLinks, setSubLinks ] = useState([]);

    // function for fetching data from backend
    const fetchSublinks = async () => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API );
            console.log("Printing Sublinks results : ",result);
            setSubLinks(result.data.allCategories);
        }
        catch(err){
            console.log("Something went wrong in fetching category list from backend", err);
            console.error(err);
        }
    }

    useEffect(() => {
        fetchSublinks();
    }, [])


  return (
    <div className='border-b border-richblack-700 bg-richblack-800  ' >
        <div className='flex w-11/12 max-w-maxContent items-center justify-between mx-auto py-2 ' >

            {/* image */}
            <div>
                <Link to={"/"} >
                    <img src={Logo} alt="" width={160} height={32} loading='lazy' />
                </Link>
            </div>

            {/* links */}
            <div>
                <nav>
                    <ul className='flex flex-row items-center' >
                        {
                            NavbarLinks.map( (element, index) => {
                                return(
                                    <li key={index}  >  
                                        {
                                            element.title === "Catalog" ?
                                            (
                                                <div className='relative cursor-pointer group ' >
                                                    <p className='text-richblack-25 font-normal text-base py-1 px-3 flex items-center gap-1 ' >
                                                        {element.title}
                                                        <IoIosArrowDown />
                                                    </p>

                                                    
                                                    {/* hover */}
                                                    <div className='invisible absolute flex flex-col rounded-lg bg-richblack-5 z-10
                                                                    p-4 text-richblack-900 transition-all duration-200 group-hover:visible lg:w-[300px] 
                                                                    opacity-0 group-hover:opacity-100 top-[140%] right-[-95%] ' >


                                                        {/* small diamond hover */}
                                                        <div className='invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 absolute rotate-45 rounded-md bg-richblack-5 w-6 h-6 top-[0] translate-y-[-38%]  right-[34%] ' ></div>
                                                    
                                                        {/* links */}
                                                        {
                                                            subLinks.length ? (
                                                                subLinks.map( (element, index) => {
                                                                    return(
                                                                        <Link key={index} to={`/catalog/${element.name.split(" ").join("-").toLowerCase()}`} >
                                                                            <p className=' hover:bg-richblack-50 rounded-lg pl-4 py-4 font-medium ' >
                                                                                {element.name}
                                                                            </p>
                                                                        </Link>
                                                                    )
                                                                } )
                                                            ):
                                                            (
                                                                <p className='mx-auto' >Loading....</p>
                                                            )
                                                        }
                                                        
                                                    </div>


                                                </div>
                                            ) : 
                                            (
                                                <Link to={element?.path} >
                                                    <p className={`${ tab === element.title? "text-yellow-50 " : " text-richblack-25" } font-normal text-base py-1 px-3 `} 
                                                        onClick={ () => setTab(element.title) } >
                                                        {element.title}
                                                    </p>
                                                </Link>
                                            )
                                        }
                                    </li>
                                )
                            } )         
                        }
                    </ul>
                </nav>
            </div>

            {/* buttons */}
            <div className=' flex flex-row gap-5 items-center ' >
                
                {/* LOGIN */}
                {/* if we are login and we are showing cart */}
                {
                    user !== null && user?.accountType !== "Instructor" && (
                        <Link to={"/dashboard/cart"} className='relative'>
                            <div className='relative' >
                                <AiOutlineShoppingCart  className='text-richblack-200 h-6 w-6' />
                                {
                                    totalItems > 0 && (
                                        <span className=' absolute -right-3 top-2 bg-[#2C333F] rounded-full flex items-center justify-center px-2 py-1 text-xs font-semibold text-yellow-200' >
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </div>
                        </Link>
                    )
                }  

                {/* we are login and showing profile  */}
                {
                    token !== null && (
                        <ProfileDropdown/>
                    )
                }

                {/* NOT LOGIN */}

                {/* if we are not login and showing login button */}
                {
                    token === null && (
                        <Link to={"/login"} >
                            <button className='rounded-lg border py-2 px-3 border-richblack-700 bg-richblack-800 font-medium text-base text-richblack-100 ' >Log in</button>
                        </Link>
                    )
                }

                {/* if we are not login and showing SignUp button */}
                {
                    token === null && (
                        <Link to={"/signup"} >
                            <button className='rounded-lg border py-2 px-3 border-richblack-700 bg-richblack-800 font-medium text-base text-richblack-100 ' >Sign up</button>
                        </Link>
                    )
                }
            </div>

        </div>
    </div>
  )
}

export default Navbar;