import React, {useEffect, useState} from 'react'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, LineController, LineElement
 } from "chart.js/auto";
import { Line } from 'react-chartjs-2'

ChartJS.register(BarElement, LinearScale, CategoryScale, PointElement, LineController, LineElement);




function BarChart() {

  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetch(`/api/orders/dash/`)
      .then((response) => response.json())
      .then((data) => setOrder(data))
      .catch((error) => error);
  }, []);


 const months = order.map(item => item.month?.substring(0,7));
 const totalPrices = order.map(item => item.total_price)
 

  return (
    <div className='md:w-[60%] w-full'>
      <p className='py-10 text-2xl text-slate-600'>Statistics of total paid in months</p>
      <Line
        data={{
            
            labels: months,
            datasets: [{
                label: 'totalPrice',
                data: totalPrices,
                backgroundColor:[
                    'rgb(106, 90, 205)',
                ],
                borderColor: ['rgb(106, 90, 205)'],
                borderWidth: 2,
                tension: 0.6
            }],
            options: {
                scales: {
                  y: {
                    beginAtOne: true
                  }
                }
              }
        }}
        />
    </div>
  )
}

export default BarChart