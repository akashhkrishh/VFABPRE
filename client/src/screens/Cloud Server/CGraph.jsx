import React, { useEffect, useState } from 'react'
import Graph from '../../components/Graph'
import PieChart from '../../components/PieChart';
import { apiHelper } from '../../utils/apiHandler';
import toast from 'react-hot-toast';



const CGraph = () => {
    

  const [ownerList, setOwnerList] = useState(null);
  const [count, setCount] = useState(null);
  useEffect( () => {
    async function fetchData() {
      // You can await here
      await apiHelper.get("/api/cloud/allowners")
      .then((res) => {
        

        setOwnerList(res.data.map(entry => entry.name))
        
      
      }).catch((err) => {
        toast.error("Error for Fetching Data")
      })
      await apiHelper.get("/api/cloud/countfiles")
      .then((res) => {
        
        setCount(res.data)
        
      
      }).catch((err) => {
        toast.error("Error for Fetching Data")
      })
      // ...
    }
   fetchData();
   
   
  }, []);

  

  

  
  

  

    const graphData = {
        labels: ownerList,
        datasets: [{
          label: 'Uploaded Files',
          data: count,
          borderColor: 'rgba(0, 102, 204, 1)',
          backgroundColor: 'rgba(0, 102, 204, 1)',
        }]
      };
      const pieChartData = {
        labels: ownerList,
        datasets: [{
          data: count,
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
      <div className="w-full  bg-white rounded-lg flex justify-center items-center shadow-lg p-4 h-full">
        <div className="w-3/5  ">
        {
          count !=null &&
          <Graph graphData={graphData} type={'bar'} />
        } 
        
        </div>
        <div className="w-2/5">

        {count !=null && <PieChart pieChartData={pieChartData} /> }
        </div>
      </div></section>
  )
}

export default CGraph