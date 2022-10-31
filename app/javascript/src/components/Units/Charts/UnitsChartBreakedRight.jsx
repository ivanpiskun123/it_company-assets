import React from 'react';
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

const UnitsChartBreakedRight=({units})=>{

  const getBreakedRightCount=()=>{
    const count = units.filter(item => item.breaked_at).length;
    return [ units.length-count, count]
  }

  const dataBar = {
      labels: ["Рабочее", "Сломанное"],
      datasets: [
        {
          label: "Оборудование",
          barPercentage: 1,
          data: getBreakedRightCount(),
          backgroundColor: [
            "rgba(71,191,71,0.3)",
            "rgba(69,  69, 69,0.5)"
          ],
          borderWidth: 2,
          borderColor: [
            "rgba(71,191,71,1)",
            "rgba(69, 69,69, 1)"
          ]
        }
      ]
    }
    const barChartOptions =  {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }




  return (
    <MDBContainer>
      <Bar data={dataBar} options={barChartOptions} />
    </MDBContainer>
  )
}


export default UnitsChartBreakedRight;
