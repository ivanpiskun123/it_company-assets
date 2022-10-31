import React, {useState, useEffect} from 'react';
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import UnitService from './../../API/UnitService'
import ColorsForCharts from './../../styles/ColorsForCharts';
import BigLoader from "./../CustomUI/Loader/BigLoader"

const UnitBreaksCountChart=()=>{

  const [data, setData] = useState({})
  const [isChartLoading, setIsChartLoading] = useState(true)

  useEffect(()=>{

    const fetchData = async ()=>{
      try {
        const unitsRow = await UnitService.getAll();
        var units = unitsRow.data.data.data.map(obj=>({...obj.attributes}))
        const breakedUnits = units.filter(unit => unit.breaked_at )
        const tempResult = {}

        for(let { nomination_name } of breakedUnits)
          tempResult[nomination_name] = {
              nomination_name,
              count: tempResult[nomination_name] ? tempResult[nomination_name].count + 1 : 1
          }

        let result = Object.values(tempResult)
        const dataData = result.map( o => o.count )
        const dataLabels = result.map( o => o.nomination_name )

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

            setData(data)

      } catch (e) {
        console.log(e);
      } finally {
        setIsChartLoading(false);
      }
    }

    fetchData()
  },[])



  return (
    <>
    { isChartLoading ?
      <BigLoader />
      :

      <Pie data={data} options={{ responsive: true }} />
    }

    </>

  )
}

export default UnitBreaksCountChart;
