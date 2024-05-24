import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart= ({ pieChartData }) => {
  const pieChartRef = useRef(null);

  useEffect(() => {
    if (!pieChartData) return;

    // Creating pie chart
    const pieChartCtx = pieChartRef.current.getContext('2d');
    new Chart(pieChartCtx, {
      type: 'pie',
      data: pieChartData,
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.parsed} Files`;
              }
            }
          }
        }
      }
    });

  }, [pieChartData]);

  return (
    <canvas ref={pieChartRef} width="300" height="300"></canvas>
  );
};

export default PieChart;
