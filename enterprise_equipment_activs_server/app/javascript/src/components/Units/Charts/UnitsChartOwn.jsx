import React from 'react';
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

const UnitsChartOwn=({units})=>{

  const getOwnCount=()=>{
    const count = units.filter(item => item.user_name).length;
    return [count, units.length-count]
  }

  const dataBar = {
      labels: ["Индивидуальное", "Офисное"],
      datasets: [
        {
          label: "Оборудование",
          barPercentage: 1,
          data: getOwnCount(),
          backgroundColor: [
            "rgba(71,191,71,0.3)",
            "rgba(127,  110, 221,0.5)"
          ],
          borderWidth: 2,
          borderColor: [
            "rgba(71,191,71,1)",
            "rgba(127,  110, 221, 1)"
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

export default UnitsChartOwn;
