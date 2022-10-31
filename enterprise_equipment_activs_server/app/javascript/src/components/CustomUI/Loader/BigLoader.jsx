import React from 'react';

import {  MDBContainer, MDBRow,
          MDBCol, MDBSpinner, MDBBtn,
          MDBInput }  from "mdbreact";
import {Spinner} from 'react-bootstrap';

const BigLoader = ()=>{

  return (
    <>

      <Spinner animation="border" variant="primary" />

    </>
  )

}

export default BigLoader;
