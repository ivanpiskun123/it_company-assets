import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import UserNavbar from "./components/Navbar/UserNavbar";
import AdminNavbar from "./components/Navbar/AdminNavbar";
import {AuthContext, OpenedBidsContext} from "./context";
import AuthService from './API/AuthService'
import BidService from './API/BidService'
import UserService from './API/UserService'
import './styles/layout.css';

import {  MDBContainer, MDBRow, MDBCol
        } from "mdbreact";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [flagBids, setFlagBids] = useState(true)

    const [openedBidsCount, setOpenedBidsCount] = useState(null);

    useEffect( ()=> {

      if(localStorage.getItem('auth'))
      {
        fetchUser()
        setCurrentlyOpenedBidsCount()
        setIsAuth(true)
        
      }
    }
    ,[])

    useEffect( ()=> {
      if(isAuth  )
      {
        setCurrentlyOpenedBidsCount()
      }
    }
    ,[isAuth])

    const fetchUser = () => {
      const fetchCurrentUserId = async () => {
        try {
          const response = await UserService.getCurrentUserShort();
          localStorage.setItem("user_id", response.data.data.id);
          setCurrentUserId(response.data.data.id)
        } catch (e) {
          console.log(e);
        }
      }
      fetchCurrentUserId()
    }


    const setCurrentlyOpenedBidsCount = () => {
      const fetchOpenedBidsCount = async () => {
        try {
          const response = await BidService.getOpenedBidsCount();
          setOpenedBidsCount(response.data.opened_count)
        } catch (e) {
          console.log(e)
      }
    }
      fetchOpenedBidsCount();
    }

    const signOut = () => {
      const logoutUser = async () => {
        try {
          const response = await AuthService.logout();
           setIsAuth(false);
           localStorage.removeItem('token');
           localStorage.removeItem('auth');
        } catch (e) {
          console.log(e);
        }
      }
      logoutUser();
    }


    return (
      <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            currentUserId,
            setCurrentUserId,
            flagBids,
            setFlagBids
        }}>
        <OpenedBidsContext.Provider value= {{ setCurrentlyOpenedBidsCount, openedBidsCount }} >
          <BrowserRouter>

          { isAuth ?
            <>
            <AdminNavbar signOut={signOut} isAdmin={isAdmin} />
              <MDBContainer fluid className="m-0 p-0">
                 <MDBRow>
                    <MDBCol size="2">
                        <UserNavbar signOut={signOut} setIsAdmin={setIsAdmin}/>
                   </MDBCol>
                   <MDBCol size="10">
                      <AppRouter/>
                     </MDBCol>
                  </MDBRow>
              </MDBContainer>
              </>
            :
            <AppRouter/>
          }

        </BrowserRouter>
        </OpenedBidsContext.Provider>
      </AuthContext.Provider>
    )
}

export default App;
