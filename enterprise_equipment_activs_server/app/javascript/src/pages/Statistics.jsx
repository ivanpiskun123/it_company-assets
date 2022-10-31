import React, {useState, useEffect} from 'react'
import LineChart from './../components/Statistics/LineChart';
import UnitBidsCountChart from './../components/Statistics/UnitBidsCountChart';
import UnitBreaksCountChart from './../components/Statistics/UnitBreaksCountChart';
import { MDBContainer, MDBTypography, MDBRow, MDBCol } from "mdbreact";
import BidService from './../API/BidService'
import UnitService from './../API/UnitService'

const Statistics = ()=>{

  return (
      <>
      <MDBTypography   tag='h1' blockquote bqColor='elegant-color' className="mt-4 ml-3">
        <h1>Статистика</h1>
      </MDBTypography>
      <MDBRow className="ml-1">
        <MDBCol size="12" className="text-center">
            <MDBTypography tag='h2'>
              Распределение заявок по пользователям
            </MDBTypography>
                <LineChart  />

        </MDBCol>

        <MDBCol size="6" className="text-center mt-5">
          <MDBTypography tag='h3'>
            Распределение оборудования под кол-ву заявок
          </MDBTypography>
          <UnitBidsCountChart />
        </MDBCol>

        <MDBCol size="6" className="text-center mt-5">
          <MDBTypography tag='h3'>
            Распределение оборудования под кол-ву поломок
          </MDBTypography>
            <UnitBreaksCountChart />
        </MDBCol>

      </MDBRow>

      </>
  )

}
export default Statistics;
