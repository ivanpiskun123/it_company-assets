import React, { Component, useState, useContext, useEffect } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem,
        MDBNavLink, MDBCollapse,
        MDBIcon,MDBNav, MDBRow, MDBCol, MDBContainer,MDBHamburgerToggler,
        MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBBtn,
        MDBFormInline, MDBModal,  MDBModalHeader, MDBModalBody, MDBModalFooter,
          MDBInput
        } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import {AuthContext} from "./../../context";
import UserCurrentCard from './../CustomUI/UserCards/UserCurrentCard'
import {useFetching} from "./../../hooks/useFetching";
import UserService from "./../../API/UserService";
import NominationService from "./../../API/NominationService";
import BidService from "./../../API/BidService";

const UserNavbar = ({ signOut, setIsAdmin }) => {
  const {isAuth, setIsAuth, currentUserId, setCurrentUserId, flagBids, setFlagBids} = useContext(AuthContext);

  const [collapse1, setCollapse1] = useState(false)
  const [collapse2, setCollapse2] = useState(false)

  const [nominations, setNominations] = useState([])
  const [isUrgent, setIsUrgent] = useState(false)
  const [nominationId, setNominationId] = useState("")
  const [advice, setAdvice] = useState("")


    const [modal, setModal] = useState(false)

  const [currentUserShort, setCurrentUserShort] = useState({})


  const [fetchUserShort, isUserLoading, userError] = useFetching( async ()=> {
    const response = await UserService.getCurrentUserShort();
    setIsAdmin(response.data.data.is_admin);
    setCurrentUserShort(response.data.data);
    setCurrentUserId(response.data.data.id);
  } )

  const toggleModal = ()=>{

    const fetchNominations = async () => {
      try {
        const response_nominations = await NominationService.getAll()
        setNominations(response_nominations.data.data.data.map(obj=>({...obj.attributes})))
        setModal(true)
      }catch(e) {
        console.log(e)
      }
    }

    if(modal){
      setModal(false)
    }
    else {
        fetchNominations()
    }

  }

  const changeUrgent = ()=>{
    if(isUrgent)
      setIsUrgent(false)
    else
      setIsUrgent(true)
  }

    const addNewBid = () => {
      const addBid = async () => {
        try {
          let data={user_id: currentUserId, advice, isUrgent, nominationId}
          const response = await BidService.createNew(data)
          console.log(response)
          setFlagBids(flagBids => !flagBids)
          setModal(false)
          setAdvice("")
          setNominationId("")
        }catch(e) {
          console.log(e)
        }
      }
      if(nominationId)
          addBid()
    }

  useEffect( ()=>{
    if(isAuth){
      fetchUserShort();
    }
  }
  ,[isAuth])




  if(!isAuth) return (<></>)

  return (
                <>
                      <MDBNav color="elegant-color-dark" className="flex-column ">

                      <UserCurrentCard currentUserShort={currentUserShort} />

                      <MDBNavbar color="elegant-color-dark" dark>

                            <MDBNavLink to={`/units_list/`+currentUserId} >
                                    <MDBNavbarBrand style={{ fontSize: 18 }}>
                                      Моё оборудование
                                    </MDBNavbarBrand>
                              </MDBNavLink>

                                <MDBNavLink to={`/bids_list/`+currentUserId} >
                                        <MDBNavbarBrand style={{ fontSize: 18 }}>
                                          Мои заявки
                                        </MDBNavbarBrand>
                                  </MDBNavLink>

                                  <MDBHamburgerToggler color="#4285F4" id="hamburger2" onClick={()=>setCollapse2(!collapse2)} />
                                    <MDBCollapse isOpen={collapse2} navbar>
                                      <MDBNavbarNav className="ml-5">
                                      <MDBNavItem >

                                          <MDBBtn  gradient="blue"  size="sm" onClick={toggleModal} >
                                                <MDBNavLink to="#" className="mr-4 ml-4" >Новая</MDBNavLink>
                                          </MDBBtn>
                                            </MDBNavItem >
                                        <MDBNavItem>
                                          <MDBNavLink to={`/bids_list/`+currentUserId} >Все заявки</MDBNavLink>
                                        </MDBNavItem>
                                      </MDBNavbarNav>
                                    </MDBCollapse>

                          </MDBNavbar>

                        <MDBNavLink className="white-text ml-3" to="" onClick={signOut} >
                          <MDBIcon icon="arrow-alt-circle-right" className="white-text mr-3" />
                          Выйти
                        </MDBNavLink>
                      </MDBNav>

                      <MDBModal isOpen={modal} toggle={toggleModal} centered>
                        <MDBModalHeader>Создание новой заявки {nominationId ?
                          <b> на "{nominations.find(e => e.id == nominationId).name}" </b>
                          :
                          null
                        }
                        </MDBModalHeader>
                          <MDBModalBody>
                          <form>
                          <MDBRow center>
                              <MDBCol size="9" className="mt-2 mb-3">
                              <select className="browser-default custom-select" value={nominationId}
                                onChange={e => setNominationId(e.target.value)} >
                                <option disabled value="">Выберите наименование</option>
                                {nominations.map( (n) => (
                                  <option key={n.id} value={n.id}>
                                  {n.name}
                                  </option>
                                ))
                                }
                              </select>
                              </MDBCol>

                                <MDBCol size="9" >
                                <MDBInput label="URL желаемого оборудования" background size="sm" value={advice} onChange={e=>setAdvice(e.target.value)}  />
                                </MDBCol>

                                  <MDBCol size="4" >
                                      <div className="custom-control custom-checkbox" onClick={changeUrgent}>
                                       <input type="checkbox" className="custom-control-input" checked={isUrgent}
                                         onChange={e=>setIsUrgent(e.target.checked) } />
                                       <label className="custom-control-label" >Срочно</label>
                                     </div>
                                  </MDBCol>

                          </MDBRow>
                          </form>
                          </MDBModalBody>
                          <MDBModalFooter>
                          { isUrgent ?
                              <MDBBtn outline color="danger" onClick={addNewBid} >Создать заявку</MDBBtn>
                            :
                            <MDBBtn outline color="primary" onClick={addNewBid} >Создать заявку</MDBBtn>
                          }

                        </MDBModalFooter>
                      </MDBModal>
                      </>

    );

}

export default UserNavbar;
