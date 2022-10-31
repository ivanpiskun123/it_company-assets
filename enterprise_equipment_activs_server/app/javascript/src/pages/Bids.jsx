import React, {useState, useEffect, useContext} from 'react';
import BidService from './../API/BidService';
import BigLoader from './../components/CustomUI/Loader/BigLoader';

import { MDBDataTable, MDBTypography, MDBContainer, MDBCol, MDBRow, MDBRating } from 'mdbreact';
import './../styles/sticky.css';
import './../styles/layout.css';
import ColorsForCharts from './../styles/ColorsForCharts';
import noAvatarImage from './../images/noUser.jpg'

import BidsList from './../components/Bids/BidsList';
import BidsFilter from './../components/Bids/BidsFilter';
import BidsChartStatus from './../components/Bids/Charts/BidsChartStatus';
import BidsChartNom from './../components/Bids/Charts/BidsChartNom';
import {AuthContext} from "./../context";

import {useBids} from "./../hooks/useBids";


const Bids = (props) => {

  const {flagBids, setFlagBids, currentUserId} = useContext(AuthContext);

  const user_id = props.match.params.id;

  const [bids, setBids] = useState([]);
  const [isBidsLoading, setIsBidsLoading] = useState(true);
  const [filter, setFilter] = useState({sort: '', query: ''})
  const sortedAndSearchedBids = useBids(bids, filter.sort, filter.query);

  const fetchUnits = async () => {
    try {
      setIsBidsLoading(true);
      const response = await BidService.getAll(user_id);
      setBids(response.data.data.data.map(obj=>({...obj.attributes})))
      console.log(response.data.data.data)
    } catch (e) {
      console.log(e);
    } finally {
      setIsBidsLoading(false);
    }
  }


  useEffect( ()=>{
   fetchUnits();
  }
  ,[] )

  useEffect( ()=>{
   fetchUnits();
  }
  ,[flagBids])

  return (
        <>
        <MDBTypography   tag='h1' blockquote bqColor='danger' className="mt-4 ml-3 mb-4">
          <h1>{user_id ? `Мои з` : `З`}аявки</h1>
        </MDBTypography>

        <div className="ml-2">

          {  isBidsLoading ?
            <MDBCol>
              <MDBRow className="d-flex align-items-center justify-content-center">
                <BigLoader />
              </MDBRow>
            </MDBCol>
          :
            <MDBRow>
          <MDBCol md="8">
                <MDBContainer>
                          <MDBRow>
                            <BidsFilter filter={filter} setFilter={setFilter} />
                            <BidsList user_id={user_id} bids={sortedAndSearchedBids} setFlagBids={setFlagBids} flagBids={flagBids} />
                          </MDBRow>
                </MDBContainer>
              </MDBCol>

              <MDBCol md="4">

                <div className="sticky">
                    <h4 className="text-center mb-2">Открытые срочные / открытые несрочные заявки</h4>
                    <BidsChartStatus bids={bids} />
                    <h3 className="text-center mt-5">Оборудование открытых заявок</h3>
                    <BidsChartNom bids={bids} />
                </div>
                </MDBCol>

            </MDBRow>

           }

        </div>
        </>
    );

}

export default Bids;
