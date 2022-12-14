import React, {useState, useEffect, useContext} from 'react';
import { MDBCard, MDBCardFooter,
         MDBTypography,  MDBContainer, MDBRow,
         MDBCol,  MDBBtn , MDBCardHeader, MDBLink, MDBRating,
      MDBModal,  MDBJumbotron, MDBModalHeader, MDBModalBody, MDBModalFooter,
        MDBInput, MDBBadge, MDBSpinner } from "mdbreact";
import './bids.css';
import noAvatarImage from './../../images/noUser.png';
import UnitService from './../../API/UnitService'
import BidService from './../../API/BidService'
import {OpenedBidsContext} from "./../../context";

const BidItem =({bid, officeUnits, setFlagBids,flagBids,user_id})=>{


      const {openedBidsCount, setCurrentlyOpenedBidsCount} = useContext(OpenedBidsContext);
  const [modal, setModal] = useState(false)
  const [modalOffice, setModalOffice] = useState(false)
  const [modalNew, setModalNew] = useState(false)

  const [officeUnitId, setOfficeUnitId] = useState("")
  const [cost, setCost] = useState("")
  const [productUrl, setProductUrl] = useState("")

  const [unit, setUnit] = useState({})

    const getSpinnerColor=()=>{
      if(bid.unit_id){
        return "grey darken-1"
      }
      if(!bid.is_urgent){
        return "warning"
      }
      return "danger"
    }

    const cardColor = getSpinnerColor()


    const getColorOfGrade=()=>{
        switch(bid.user_grade){
            case 'Junior':
                return 'light';
            case 'Middle':
                return 'warning';
            case 'Senior':
                return 'secondary';
            default:
                return 'danger';
        }
    }

    const gradeColor = getColorOfGrade()

    const getRatingData = (rating)=>{
        let data = [
          { tooltip: '1' }, { tooltip: '2' }, { tooltip: '3' }, { tooltip: '4' }, { tooltip: '5' }]
        data[rating-1]['choosed'] = true;
        return data;
    }


    const showUnit = () =>{

      const fetchUnit = async () => {
        try {
          const response = await UnitService.getById(bid.unit_id)
          setUnit(response.data.data.data.attributes)
          toggleModal()

        } catch (e) {
          console.log(e);
      }
    }

    fetchUnit();
    }

    const addNewUnit = () => {
      const addUnit = async () => {
        try {
          let data={cost, product_url: productUrl ,
                    nomination_id: bid.nomination_id, user_id: bid.user_id,
                    bid_id: bid.id}
          const response = await UnitService.createNew(data)
          setCurrentlyOpenedBidsCount()
          setFlagBids(flagBids => !flagBids)
          toggleModalNew()
        }catch(e) {
          console.log(e)
        }
      }
      if(cost && productUrl)
          addUnit()
    }

    const addOfficeUnit = () => {
      const updateBid = async () => {
        try {
          let data={unit_id: officeUnitId, id: bid.id, user_id: bid.user_id}
          const response = await BidService.updateById(data)
          setCurrentlyOpenedBidsCount()
          setFlagBids(flagBids => !flagBids)
          toggleModalOffice()
        }catch(e) {
          console.log(e)
        }
      }
      if(officeUnitId)
          updateBid()
    }

    const toggleModal = ()=>{
      modal ?  setModal(false) : setModal(true)

    }

    const toggleModalOffice = ()=>{
      modalOffice ?  setModalOffice(false) : setModalOffice(true)
    }

    const toggleModalNew = ()=>{
      modalNew ?  setModalNew(false) : setModalNew(true)
    }


    const getModalColor=()=>{
      if(unit.breakdown_cause)
        return "#454545"
      else if(!unit.user_name)
        return "#7F6EDD"
      else return "rgba(71,191,71,0.9)";
    }


return (
  <>
  <MDBCol size="6"  >
        <MDBContainer>
        <MDBCard shadow='4' border='primary' className="square border border-4" background='white' style={{ width: "27rem", marginTop: "1rem", marginBottom: "1rem" }} >
          <MDBCardHeader>
              <MDBRow>
                  <MDBCol size="11">
                      ???????????? ???? <i><b>{bid.nomination_name}</b></i> {bid.is_urgent ? `| ????????????` : null} {bid.unit_id ? `| ??????????????` : null}
                  </MDBCol>
                  {bid.unit_id ?
                      <></>
                  :
                      <MDBCol size="1">
                          <div className={` spinner-grow text-${cardColor} `} />
                      </MDBCol>
                  }
              </MDBRow>
          </MDBCardHeader>
            <MDBRow className="ml-1 mt-2">
            <MDBCol size="4">
              <img
               src={
                 bid.user_avatar ?
                  `http://localhost:3000${bid.user_avatar}`
                 :
                  noAvatarImage
               }
                className="img-fluid " alt="" />
                {user_id ? null : <MDBRating tag="li" data={getRatingData(bid.user_rating)} />}

                <MDBBadge className='mx-2' color={gradeColor} light>
                    {bid.user_grade}
                </MDBBadge>

            </MDBCol>
            <MDBCol size="8" className="align-items-center justify-content-center">

                <i><b>{bid.user_position}</b></i>
                <br></br>
                {bid.user_name}
                <br></br>
                  ?????????????????????? ??????????: {
                    bid.advice_product_url ?
                    <a href={bid.advice_product_url} target="_blank">[Cc????????]</a> : "-"

                  }

            </MDBCol>
            </MDBRow>
            <hr className="mb-2 mt-2 mr-3 p-0 ml-3" />
            {!user_id || bid.unit_id  ?
              <>
              <MDBRow center style={{  textAlign: "center"}} className="mb-2" >

                  <MDBCol size="12">
                  <b>{bid.unit_id ? `??` : `???????????????? ??`}??????????????????????</b>
                  </MDBCol>

              <MDBRow>
              <br></br>
              <MDBCol size="12">
              {

                bid.unit_id ?
                  <>
                    ???????????? ??????????????: <br></br> <MDBBtn onClick={showUnit} color="grey darken-3">{bid.unit_name}</MDBBtn>
                  </>
                :
                  <>
                    <MDBBtn outline color="primary" onClick={toggleModalOffice}>???? ????????????????</MDBBtn>
                    <MDBBtn outline color="primary" onClick={toggleModalNew}>??????????</MDBBtn>
                  </>


              }
              </MDBCol>
              </MDBRow>

              </MDBRow>
              </>
              :
                null
            }


          <MDBCardFooter  className="text-center" >
              ?????????????? {bid.days_ago} ???????? ??????????  {bid.unit_id ? `| ?????????????? ${bid.closed_at_ago} ???????? ??????????` : null}
          </MDBCardFooter>
        </MDBCard>



      </MDBContainer>
    </MDBCol>


      <MDBModal isOpen={modal} toggle={toggleModal} centered>
      <MDBJumbotron className="m-0"  style={{padding: '0',
                            background:
                            `linear-gradient(to right, rgba(255,255,255,0.9),  ${getModalColor() } ) ,
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
                            ???????? ??????????????: {unit.breaked_at}
                            <br></br>
                            ??????????????: <i>{unit.breakdown_cause}</i>
                            <br></br>
                            </>
                          :
                          null
                        }

                    ????????: <b>{unit.cost}$</b>
                    <br></br>
                    ??????????: <a href={unit.product_url} target="_blank">[Cc????????]</a>
                       </div>
                  </>
              </MDBTypography>

               <hr className="mb-1 p-0 ml-3 mr-3" />

               <MDBRow className="ml-1" style={{ fontSize: 16 }}>
                  <MDBCol size="5" style={{ fontWeight: 'bold' }}>
                        ???????? ??????????????:
                        <br></br>
                        ???????? ????????????:
                        <br></br>
                        ?????????? ????????????:

                      <hr className="mb-1 mt-1 p-0 ml-3" />

                        ????????????????????????:
                        <br></br>
                        ??????????????????:
                        <br></br>
                  </MDBCol>
                  <MDBCol size="7">
                    {unit.created_date}
                    <br></br>
                    {unit.shelf_time} ????????
                    <br></br>
                    {unit.working_time} ????????
                    <hr className="mb-1 mt-1 p-0 " />

                    {unit.user_name || <i>(??????????????)</i>}
                    <br></br>
                    {unit.user_position || null}
                  </MDBCol>
               </MDBRow>
               <hr className="mb-2 p-0 " />
        </MDBCol>
      </MDBJumbotron>
      </MDBModal>

        <MDBModal isOpen={modalOffice} toggle={toggleModalOffice} centered>
          <MDBModalHeader>?????????? ???????????????? ???????????????????????? ?????? ???????????????????????? <b>{bid.user_name}</b></MDBModalHeader>
            <MDBModalBody>
            <div>

              <select className="browser-default custom-select" value={officeUnitId}
                onChange={e => setOfficeUnitId(e.target.value)} >
                <option disabled value="">???????????????? ?????????????? ????????????????????????</option>
                {officeUnits.map( (u) => (
                  <option key={u.id} value={u.id}>
                  {u.nomination_name}: ???????? {u.cost}$, ???????? ?????????????? {u.created_date}

                  </option>
                ))
                }
              </select>
            </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn outline color="primary" onClick={addOfficeUnit} >???????????????? ????????????????????????</MDBBtn>
          </MDBModalFooter>
        </MDBModal>


        <MDBModal isOpen={modalNew} toggle={toggleModalNew} centered>
          <MDBModalHeader>?????????????????????? ???????????? ???????????????????????? <i>"{bid.nomination_name}"</i> ?????? ???????????????????????? <b>{bid.user_name}</b></MDBModalHeader>
            <MDBModalBody>
            <MDBRow center>
                <MDBCol size="11" style={{padding: '0'}}>
                <MDBInput label="URL ????????????????????????" background size="sm" value={productUrl} onChange={e=>setProductUrl(e.target.value)}  />
                </MDBCol>
                <MDBCol size="5">
                <MDBInput label="?????????????????? ?????????????? ($)" type="number" value={cost} onChange={e=>setCost(e.target.value)} />
                </MDBCol>
            </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn outline color="primary" onClick={addNewUnit} >???????????????? ????????????????????????</MDBBtn>
          </MDBModalFooter>
        </MDBModal>


  </>
)

}

export default BidItem;
