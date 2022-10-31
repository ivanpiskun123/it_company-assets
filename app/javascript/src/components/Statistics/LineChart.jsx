import React, {useState, useEffect} from 'react'
import { Bar } from "react-chartjs-2";
import { MDBContainer, MDBTypography, MDBRow, MDBCol } from "mdbreact";
import UserService from './../../API/UserService'
import ColorsForCharts from './../../styles/ColorsForCharts';
import BigLoader from "./../CustomUI/Loader/BigLoader"

const LineChart = () => {

  const [dataBar, setDataBar] = useState({})
    const [dataOptions, setDataOptions] = useState({})
  const [isChartLoading,setIsChartLoading] = useState(true)

  useEffect(()=>{
        
    const fetchData = async ()=>{
      try {
        const users = await UserService.getAllShort();
        let bidsUsersDataRow = {labels: [], data: [], backgroundColor: [], borderColor: []  }

        users.data.data.data.map( (u)=>{
          bidsUsersDataRow.labels.push(`${u.attributes.position_name}: ${u.attributes.first_name} ${u.attributes.second_name}`);
          bidsUsersDataRow.data.push(u.attributes.bids_count);
        });

        bidsUsersDataRow.["backgroundColor"] = ColorsForCharts.getColors(bidsUsersDataRow.labels.length);
        bidsUsersDataRow.["borderColor"] = Array(bidsUsersDataRow.labels.length).fill("rgba(0, 0, 0, 1)")

        const dataBar = {
              labels: bidsUsersDataRow.labels,
              datasets: [
                {
                  label: "Кол-во заявок за все время",
                  data: bidsUsersDataRow.data ,
                  backgroundColor: bidsUsersDataRow.backgroundColor,
                  borderWidth: 2,
                  borderColor: bidsUsersDataRow.borderColor
                }
              ]
            }
            setDataBar(dataBar)

            const  barChartOptions =  {
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

              setDataOptions(barChartOptions)

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
      <MDBContainer className="m-0 p-0">
        <Bar data={dataBar} options={dataOptions} height="350" />
        </MDBContainer>
    }
    </>

  )

}

export default LineChart;
