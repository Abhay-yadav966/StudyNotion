import React from 'react'
import { useState } from 'react';
import { Chart, registerables } from 'chart.js'
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

    const [ currChart, setCurrChart ] = useState("students");

    // func to generate random colors
    const getRandomColors = (numColors) => {
        const colors = [];
        for( let i = 0; i < numColors; i++ ){
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
            colors.push(color);
        }
        return colors;
    }

    // create data for chart displaying student info

    const chartDataForStudents = {
      labels: courses?.map((course) => course?.courseName ),
      datasets: [
        {
          data: courses?.map((course) => course?.totalStudentsEnrolled ),
          backgroundColor: getRandomColors(courses?.length),
        }
      ]
    }

    // create data for chart displaying income info

    const chartDataForIncome = {
      labels : courses?.map((course) => course?.courseName),
      datasets:[
        {
          data: courses?.map((course) => course?.totalAmountGenerated),
          backgroundColor: getRandomColors(courses?.length),
        }
      ]
    }

    // create options 
    const options ={

    };

  return (
    <div className="w-full h-full flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6" >
      <p className="text-lg font-bold text-richblack-5" >Visualise</p>
      <div  className="space-x-4 font-semibold" >

         {/* Button to switch to the "students" chart */}
        <button
          type='button'
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${ currChart === "students" ? "bg-richblack-700 text-yellow-50" : "text-yellow-400" }`}
        >
          Student
        </button>

        {/* Button to switch to the "income" chart */}
        <button
          type='button'
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${ currChart === "income" ? "bg-richblack-700 text-yellow-50" : "text-yellow-400" }`}
        >
          Income
        </button>
      </div>

      <div className="relative mx-auto aspect-square h-[550px] w-full flex justify-center " >
        <Pie data={ currChart === "students" ? chartDataForStudents : chartDataForIncome }
             options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart;