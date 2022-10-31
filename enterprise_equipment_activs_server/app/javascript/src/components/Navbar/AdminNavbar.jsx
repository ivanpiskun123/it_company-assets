import React, { Component, useState, useContext, useEffect} from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem,
        MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
        MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,
        MDBIcon }
                                          from "mdbreact";
import { BrowserRouter, Link} from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import {AuthContext, OpenedBidsContext} from "./../../context";
import BidService from './../../API/BidService';

import {Badge} from 'react-bootstrap'


const AdminNavbar = ({signOut, isAdmin}) => {

  const {flagBids} = useContext(AuthContext);

  const {isAuth} = useContext(AuthContext);
  const {openedBidsCount, setCurrentlyOpenedBidsCount} = useContext(OpenedBidsContext);

  const [isOpen, setIsOpen] = useState(false);
  const [activeID, setActiveID] = useState(0);

  const toggleCollapse = () => {
      setIsOpen(!isOpen);
    }

    useEffect(()=>{
      setCurrentlyOpenedBidsCount()
    },[flagBids])

  if(!isAdmin || !isAuth) return (<></>)

  return (
    <>
    <MDBNavbar color="elegant-color-dark"  dark expand="md" className="justify-content-end">
      <MDBNavbarBrand>
        <strong className="white-text" style={{fontWeight: 'bold', fontStyle: 'italic'}}>
        Администратор
        </strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />

        <MDBNavbarNav style={{ fontSize: 20 }} right>
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                <MDBNavItem>
                    <MDBNavLink className="white-text" to="/bids_list" >
                    Заявки
                    <Badge bg={ openedBidsCount ? "danger" : "success"} className="ml-2" >{openedBidsCount}</Badge>
                    </MDBNavLink>
                </MDBNavItem>
            </MDBCollapse>
          <MDBNavItem  >
            <MDBNavLink  to="/users_list" >Пользователи</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem >
            <MDBNavLink to="/units_list">Оборудование</MDBNavLink>
          </MDBNavItem>

        </MDBNavbarNav>
        <MDBNavbarNav right>

        <MDBNavLink className="blue-grey-text ml-3" to="/statistics" >
            <MDBIcon icon="chart-bar" size="2x" className="blue-grey-text mr-3" />
        </MDBNavLink>


        <MDBNavLink className="white-text ml-3" to="/admin">
          <MDBIcon icon="cogs" size="2x" className="white-text mr-3" />
        </MDBNavLink>

        <MDBNavLink className="white-text ml-3" to="#!"onClick={signOut}>
          <MDBIcon icon="arrow-alt-circle-right" size="2x" className="white-text mr-3" />
        </MDBNavLink>



        </MDBNavbarNav>

    </MDBNavbar>

  </>
  )

}

export default AdminNavbar
