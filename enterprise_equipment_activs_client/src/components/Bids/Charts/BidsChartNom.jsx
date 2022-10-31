import React from 'react';
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import ColorsForCharts from './../../../styles/ColorsForCharts';

const BidsChartNom=({bids})=>{


  const getData = ()=>{
    let openedBids = bids.filter(bid => !bid.unit_id )

    var tempResult = {}

    for(let { nomination_name } of openedBids)
      tempResult[nomination_name] = {
          nomination_name,
          count: tempResult[nomination_name] ? tempResult[nomination_name].count + 1 : 1
      }

      return Object.values(tempResult)

  }

  const dataData = getData().map( o => o.count )
  const dataLabels = getData().map( o => o.nomination_name )


const data = {
      labels: dataLabels,
      datasets: [
        {
          data:  dataData,
          backgroundColor: ColorsForCharts.getColors(dataData.length),
          hoverBackgroundColor: ColorsForCharts.getColors(dataData.length)
        }
      ]
    }



  return (
    <>
      <Pie data={data} options={{ responsive: true }} />
    </>

  )
}

export default BidsChartNom;
