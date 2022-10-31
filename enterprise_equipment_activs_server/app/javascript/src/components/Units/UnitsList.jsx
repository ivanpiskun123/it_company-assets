import React, {useState} from 'react';
import UnitItem from './UnitItem'
import { MDBRow, MDBCol, MDBFormInline, MDBIcon, MDBContainer} from "mdbreact";


const UnitsList =( {units} )=>{

  if(!units.length) {
    return (
      <>
      <MDBRow className="d-flex align-items-center justify-content-center">
      <h2 style={{textAlign: 'center'}}>
                Оборудование не найдено
            </h2>
                </MDBRow>
      </>
    )
  }

  return (
    <>

    <MDBRow>
    {units.map( unit => (
        <UnitItem key={unit.id} unit={unit} />
      ))
    }
      </MDBRow>

    </>
  )

}

export default UnitsList;
