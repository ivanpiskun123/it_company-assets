import React from 'react';
import { MDBNavLink,
        MDBIcon, MDBRow, MDBCol,
        MDBCard, MDBCardBody, MDBCardHeader, MDBCardFooter
        } from "mdbreact";
import {AuthContext} from "./../../../context";
import noAvatarImage from './../../../images/noUser.png'

const UserCurrentCard = ( {currentUserShort} )=>{


  return (
    <MDBCard  >
      <MDBCardBody >
      <MDBCardHeader >
      <div className="black-text " style={{ textAlign: "center", fontWeight: 'bold' }}>
        {currentUserShort.position_name}
        </div>
      </MDBCardHeader>
      <MDBCardBody className="border border-light">
          <MDBRow center style={{  textAlign: "center"}}>
              <div style={{fontSize: 17, textDecorationLine: 'underline'}}>
                { currentUserShort.is_admin ? "Aдминистратор" : "Пользователь" }
                  </div>
          </MDBRow>
        <MDBRow className="mt-2">

            <MDBCol size="6"  >
              <img
               src={
                 currentUserShort.avatar ?
                  `http://localhost:3000${currentUserShort.avatar}`
                 :
                  noAvatarImage
               }
                className="img-fluid rounded" alt="" />
            </MDBCol>
            <MDBCol size="6" className="d-flex align-items-center justify-content-center" >

                <div style={{ fontStyle: 'italic',
                     textAlign: "center", fontSize: 13 }}>
                  {currentUserShort.first_name}
                  {"\n"}
                  {currentUserShort.second_name}
                </div>
            </MDBCol>

          </MDBRow>
          </MDBCardBody>

      </MDBCardBody>
      </MDBCard>
  )
}

export default UserCurrentCard;
