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
    <MDBNavbar  dark expand="md" className="justify-content-end">
      <MDBNavbarBrand>
        <strong style={{color: '#004D40', fontWeight: 'bold', fontStyle: 'italic'}}>
        Администратор
        </strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />

        <MDBNavbarNav style={{ fontSize: 20 }} right>
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                <MDBNavItem>
                    <MDBNavLink className="black-text" to="/bids_list" >
                    Заявки
                    </MDBNavLink>
                </MDBNavItem>
            </MDBCollapse>
          <MDBNavItem  >
            <MDBNavLink  className="black-text" to="/users_list" >Пользователи</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem >
            <MDBNavLink  className="black-text" to="/units_list">Оборудование</MDBNavLink>
          </MDBNavItem>

        </MDBNavbarNav>
        <MDBNavbarNav right>

        <a href="http://localhost:3000/admin/" target="_blank" rel="noopener" className="black-text ml-3 mt-2">
            <MDBIcon icon="cogs" size="2x" className=" mr-3" style={{ color: '#004D40'}} />
        </a>

        <MDBNavLink className="black-text ml-3" to="#!"onClick={signOut}>
          <MDBIcon icon="arrow-alt-circle-right" size="2x" className=" mr-3" style={{ color: '#004D40'}} />
        </MDBNavLink>

        </MDBNavbarNav>

    </MDBNavbar>

  </>
  )

}

export default AdminNavbar
