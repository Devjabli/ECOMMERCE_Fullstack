import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  DoughnutController,
  ArcElement,
} from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, PointElement, DoughnutController, ArcElement);

function DoughnutChart() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetch(`/api/orders/`)
      .then((response) => response.json())
      .then((data) => setOrder(data))
      .catch((error) => error);
  }, []);
  return (
    <div className="md:w-[30%] flex justify-center ">
      <div>
        <p className="py-10 text-2xl text-slate-600 w-">
          Statistics of sells
        </p>
        <Doughnut
          data={{
            labels: ["Red", "Blue", "Yellow"],
            datasets: [
              {
                label: "My First Dataset",
                data: [order.length, 50, 100],
                backgroundColor: [
                  "rgb(255, 99, 132)",
                  "rgb(54, 162, 235)",
                  "rgb(255, 205, 86)",
                ],
                borderColor: ["rgb(106, 90, 205)"],
                borderWidth: 2,
                tension: 0.6,
              },
            ],
            options: {
              scales: {
                y: {
                  beginAtOne: true,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default DoughnutChart;
