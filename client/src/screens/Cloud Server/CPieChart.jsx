import React from 'react'
import Graph from '../../components/Graph'
import PieChart from '../../components/PieChart';


const CPieChart = () => {
    const pieChartData = {
        labels: ['manoj', 'merin', 'aazim', 'antony', 'akash','abdul','dhilip','shijo'],
        datasets: [{
            data: [4, 2,10,4, 8, 16, 8, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
        }],
      };
  return (
    <section className='px-[100px]  overflow-auto transform transition-all  py-4 pb-8 h-[90vh] flex items-center justify-center'>
      <div className="w-full  bg-white rounded-lg flex flex-col justify-center items-center shadow-lg p-4 h-full">
      <PieChart pieChartData={pieChartData} />
      </div></section>
  )
}

export default CPieChart