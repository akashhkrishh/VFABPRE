import React, { useEffect, useState } from 'react'
import Graph from '../../components/Graph'
import PieChart from '../../components/PieChart';
import { apiHelper } from '../../utils/apiHandler';
import toast from 'react-hot-toast';



const ReshareData = () => {
    

  const [reshareData, setData] = useState(null);

  useEffect( () => {
    async function fetchData() {
      // You can await here
      await apiHelper.get("/api/cloud/countresharefiles")
      .then((res) => {
        

       setData(res.data)
        console.log(res.data)
      
      }).catch((err) => {
        toast.error("Error for Fetching Data")
      })
      // ...
    }
   fetchData();
   
   
  }, []);

  

  

  
  

  

    const graphData = {
        labels: reshareData?.userData,
        datasets: [{
          label: 'Reshared Files',
          data:  reshareData?.arrData,
          borderColor: 'rgba(0, 102, 204, 1)',
          backgroundColor: 'rgba(0, 102, 204, 0.2)',
        }]
      };
   
  return (
    <section className='px-[100px]  overflow-auto transform transition-all  py-4 pb-8 h-[90vh] flex items-center justify-center'>
      <div className="w-full  bg-white rounded-lg flex justify-center items-center shadow-lg p-4 h-full">
        
        {
          reshareData !=null &&
          <Graph graphData={graphData} type={'line'} />
        } 
        
      
        
      </div></section>
  )
}

export default ReshareData