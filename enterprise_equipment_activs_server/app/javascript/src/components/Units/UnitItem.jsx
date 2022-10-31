import React, {useState} from 'react';
import { MDBJumbotron,MDBTypography, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBIcon } from "mdbreact";
import './UnitItem.css';
import noAvatarImage from './../../images/noUser.jpg';


const UnitItem =({unit})=>{

const getCardColor=()=>{
  if(unit.breakdown_cause)
    return "#454545"
  else if(!unit.user_name)
    return "#7F6EDD"
  else return "rgba(71,191,71,0.9)";
}

return (
  <>
  <MDBCol size="6"  >
    <MDBJumbotron  style={{padding: '0',
                          background:
                          `linear-gradient(to right, rgba(255,255,255,0.9),  ${getCardColor() } ) ,
                           url(http://localhost:3000${unit.nomination_avatar})` ,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover'}}>
      <MDBCol className=" py-0 px-0">

            <MDBTypography   tag='h1' blockquote  className="mt-4 ml-3">
              <>
                  <h3 style={{ color: "black" }}>{unit.nomination_name}</h3>
                    <div style={{ fontSize: 15 }} >
                      {unit.breaked_at ?
                        <>
                          Дата поломки: {unit.breaked_at}
                          <br></br>
                          Причина: <i>{unit.breakdown_cause}</i>
                          <br></br>
                          </>
                        :
                        null
                      }

                  Цена: <b>{unit.cost}$</b>
                  <br></br>
                  Товар: <a href={unit.product_url} target="_blank">[Ccылка]</a>
                     </div>
                </>
            </MDBTypography>

             <hr className="mb-1 p-0 ml-3 mr-3" />

             <MDBRow className="ml-1" style={{ fontSize: 16 }}>
                <MDBCol size="5" style={{ fontWeight: 'bold' }}>
                      Дата покупки:
                      <br></br>
                      Срок службы:
                      <br></br>
                      Время работы:

                    <hr className="mb-1 mt-1 p-0 ml-3" />

                      Пользователь:
                      <br></br>
                      Должность:
                      <br></br>

                </MDBCol>

                <MDBCol size="7">
                  {unit.created_date}
                  <br></br>
                  {unit.shelf_time} года
                  <br></br>
                  {unit.working_time} года
                  <hr className="mb-1 mt-1 p-0 " />

                  {unit.user_name || <i>(Офисное)</i>}
                  <br></br>
                  {unit.user_position || null}
                </MDBCol>
             </MDBRow>
             <hr className="mb-0 mt-1 p-0 " />

      </MDBCol>
    </MDBJumbotron>
  </MDBCol>
  </>
)

}

export default UnitItem;
