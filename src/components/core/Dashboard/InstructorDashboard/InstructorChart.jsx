import React from 'react'
import { Chart, registrables } from 'chart.js'



const InstructorChart = () => {

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

    // create data for chart displaying income info

    // create options 

  return (
    <div>

    </div>
  )
}

export default InstructorChart;