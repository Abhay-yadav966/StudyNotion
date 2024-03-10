import React from 'react'
import {getCatalogPageData} from '../services/operations/pageAndComponentData'
import {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import Footer from '../components/common/Footer';
import CourseSlider from '../components/core/CatalogPage/CourseSlider';
import Course_Card from '../components/core/CatalogPage/Course_Card';
import toast, { Toast } from 'react-hot-toast';


const Catalog = () => {

  // fatching category name from url
  const { catalogName } = useParams();

  // catalog data 
  const [catalogPageData, setCatalogPageData] = useState(null);
  
  // catagory id
  const [categoryId, setCategoryId] = useState(null);

  // array for new popular trending data
  const selectedHeading = [
    {
      id:1,
      name:"Most popular"
    },
    {
      id:2,
      name:"New",
    }
  ] 

  // state variable for selected heading
  const [ selected, setSelected ] = useState( selectedHeading[0].name );

  // this fn. will give category id on clicking category 
  const getCatalogId = async () => {
    try{
      const result = await apiConnector("GET", categories.CATEGORIES_API);

      if(result){
        // fetching category id 
        const categoryId = result?.data?.allCategories.filter((element) => element.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;

        // storing category id
        setCategoryId(categoryId);
      }
    }
    catch(error){
      console.log("Unable to fetch category id", error);
    }
  }

  // it will run when we will click on category
  useEffect( () => {
    getCatalogId();
  }, [catalogName] );


  // this fn will fetching catalog page details
  const getCatalogDetails = async (categoryId) => {
    try{
      const catalogPageDetails = await getCatalogPageData({categoryId});

      if( catalogPageDetails ){
        setCatalogPageData(catalogPageDetails);
      } 
    }
    catch(error){
      console.log("Unable to fetch Catalog page details", error);
    }
  }

  // it will run to get category page detail
  useEffect(() => {
    if(categoryId){
      getCatalogDetails(categoryId);
    }
  }, [categoryId]);

  return (
    <div>
        <div className='bg-richblack-800' >
          <div className='w-11/12 max-w-maxContent mx-auto py-20 flex flex-col gap-3' >
            <p className='font-normal text-base text-richblack-300' >Home / Catalog  / <span className='font-medium text-base text-yellow-50' >{catalogPageData?.selectedCategory?.name}</span></p>
            <h1 className='font-medium text-3xl text-richblack-5' >{catalogPageData?.selectedCategory?.name}</h1>
            <p className='font-normal text-base text-richblack-200' >{catalogPageData?.selectedCategory?.description}</p>
          </div>
        </div>

        <div className='w-11/12 max-w-maxContent mx-auto py-14' >
            <div>
              {/* section 1 */}
              {/* heading */}
              <h1 className='font-semibold text-4xl text-richblack-5 ' >Courses to get you started</h1>
              <div className=' flex border-b border-richblack-600 items-center pt-4 ' >
                {
                  selectedHeading?.map((element) => (
                      <p key={element.id} onClick={() => setSelected(element.name)} className={`${ selected == element.name ? " font-medium text-yellow-100 border-b border-yellow-100 " : " font-medium  text-richblack-200 " } text-sm cursor-pointer py-2 px-3 `} >{element?.name}</p>
                  ))
                }
              </div>
              {/* slider */}
              <div className='py-10' >
                <CourseSlider courses={catalogPageData?.selectedCategory?.course} />
              </div>
            </div>

            <div className='mt-5' >
              {/* section 2 */}
              {/* heading */}
              <h1 className='font-semibold text-4xl text-richblack-5' >Top courses in {catalogPageData?.selectedCategory?.name}</h1>
              {/* slider */}
              <div className='py-10' >
                <CourseSlider courses={catalogPageData?.differentCategory?.course} />
              </div>
            </div>

            <div className='flex flex-col gap-10 mt-20 ' >
              {/* section 3 */}
              {/* heading */}
              <h1 className='font-semibold text-4xl text-richblack-5' >Frequently Bought</h1>
              <div className='' >
                <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8' >
                  {
                    catalogPageData?.mostSellingCourses?.slice(0, 4).map((course, index) => (
                      <Course_Card course={course} slider={false} key={index} />
                    ))
                  }
                </div>
              </div>
            </div>
          
        </div>
        <Footer/>
    </div>
  ) 
}

export default Catalog;