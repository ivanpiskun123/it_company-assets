import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from './../context';
import UserService from './../API/UserService';
import noAvatarImage from './../images/noUser.jpg'
import BigLoader from './../components/CustomUI/Loader/BigLoader';
import ColorsForCharts from './../styles/ColorsForCharts';

import './../styles/dataTable.css';
import './../styles/sticky.css';

import { Doughnut } from "react-chartjs-2";

import { MDBDataTable, MDBTypography, MDBContainer, MDBCol, MDBRow, MDBRating } from 'mdbreact';



const Users = ()=>{

  const {currentUserId} = useContext(AuthContext);
  const [usersData, setUsersData] = useState({});
  const [isUsersLoading, setIsUserLoading] = useState(true);
  const [bidsByUsersData, setBidsByUsersData] = useState({});

  const getRatingData = (rating)=>{
      let data = [
        { tooltip: '1' }, { tooltip: '2' }, { tooltip: '3' }, { tooltip: '4' }, { tooltip: '5' }]
      data[rating-1]['choosed'] = true;
      return data;
  }

  useEffect( ()=>{
      const fetchUsers = async () => {
        try {
          const response = await UserService.getAllShort();
          let bidsUsersDataRow = {labels: [], datasets: [ {data: []} ] }
          let data = {
            columns: [
              { label: 'Аватар', field: 'avatar', sort: 'asc',  width: 590 },
              { label: 'Полное имя  ', field: 'fullName', sort: 'asc', width: 400 },
              { label: 'Должность', field: 'position', sort: 'asc', width: 270 },
              { label: 'Время в компании', field: 'durationInCompany', sort: 'asc', width: 200 },
              { label: 'Рейтинг', field: 'rating', sort: 'asc', width: 100 },
              { label: 'Оборудование', field: 'unitCount', sort: 'asc', width: 150 },
              { label: 'Новых заявок', field: 'openedBids', sort: 'asc', width: 250 }
            ]
          }

          let rows = response.data.data.data.map( (u)=>{
              if(u.attributes.opened_bids_count)
              {
                bidsUsersDataRow.labels.push(`${u.attributes.first_name} ${u.attributes.second_name}-${u.attributes.opened_bids_count}`);
                bidsUsersDataRow.datasets[0].data.push(u.attributes.opened_bids_count);
              }

              return {avatar: <img   src={ u.attributes.avatar ? `http://localhost:3000${u.attributes.avatar}` : noAvatarImage }
                className=" z-depth-5 rounded userListImg"   alt="" /> ,
                fullName: `${u.attributes.second_name} ${u.attributes.first_name}`,
                position: u.attributes.position_name,
                durationInCompany: `${ Math.round(u.attributes.months_in_company/12*10)/10 } лет`,
                rating: <MDBRating tag="li" data={getRatingData(u.attributes.rating)} />,
                unitCount: u.attributes.units_count,
                openedBids: u.attributes.opened_bids_count
                  }
          })

          bidsUsersDataRow.datasets[0]["backgroundColor"] = ColorsForCharts.getColors(bidsUsersDataRow.labels.length);
          bidsUsersDataRow.datasets[0]["hoverBackgroundColor"] = bidsUsersDataRow.datasets[0]["backgroundColor"];
          setBidsByUsersData(bidsUsersDataRow);
          setUsersData({...data, rows });

        } catch (e) {
          console.log(e);
        } finally {
          setIsUserLoading(false);
        }
      }

     fetchUsers();

  }
  ,[] )


    return (
      <>

        <MDBTypography   tag='h1' blockquote bqColor='primary' className="mt-4 ml-3">
          <h1>Пользователи</h1>
        </MDBTypography>

        <div className="ml-2">

          {  isUsersLoading ?
            <MDBCol>
              <MDBRow className="d-flex align-items-center justify-content-center">
                <BigLoader />
              </MDBRow>
            </MDBCol>
          :
            <MDBRow>
          <MDBCol md="8">
            <MDBDataTable
            autoWidth
              fixed
              striped
              bordered
              data={usersData} />

              </MDBCol>

              <MDBCol md="4">

                <div className="sticky">
                <h3 className="text-center">Кол-во открытых заявок по пользователям</h3>
                  <Doughnut data={bidsByUsersData} options={{ responsive: true }} />
                </div>
                </MDBCol>

            </MDBRow>

           }

        </div>

      </>

    );


}



export default Users;
