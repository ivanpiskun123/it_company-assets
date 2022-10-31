import React from 'react';
import { Polar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import ColorsForCharts from './../../../styles/ColorsForCharts';

const BidsChartNomianations=({bids})=>{


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

  const dataPolar = {
        datasets: [
          {
            data: dataData,
            backgroundColor: ColorsForCharts.getColors(dataData.length),
            label: "My dataset" // for legend
          }
        ],
        labels: dataLabels
      }


  return (
    <>
        <Polar data={dataPolar} options={{ responsive: true }} />
    </>

  )
}

export default BidsChartNomianations;
