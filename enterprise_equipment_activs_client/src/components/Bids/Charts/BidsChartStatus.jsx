import React from 'react';
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

const BidsChartStatus=({bids})=>{

  const getData=()=>{
    const count_urgent = bids.filter(item => item.is_urgent && (!item.unit_id) ).length;
    const countOpened = bids.filter(item =>  (!item.unit_id) ).length;
    return [count_urgent, countOpened - count_urgent]
  }

  const dataBar = {
      labels: ["Срочные", "Несрочные"],
      datasets: [
        {
          label: "Открытые заявки",
          barPercentage: 1,
          data: getData(),
          backgroundColor: [
            "rgba(156,39,176,0.3)",
            "rgba(239,  83, 80,0.5)"
          ],
          borderWidth: 2,
          borderColor: [
            "rgba(156,39,176,1)",
            "rgba(239,  83, 80, 1)"
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

export default BidsChartStatus;
