import React, {useState, useEffect} from 'react';
import UnitService from './../API/UnitService';
import UserService from './../API/UserService'
import BigLoader from './../components/CustomUI/Loader/BigLoader';

import { MDBDataTable, MDBTypography, MDBContainer, MDBCol, MDBRow, MDBRating } from 'mdbreact';
import './../styles/sticky.css';
import './../styles/layout.css';
import ColorsForCharts from './../styles/ColorsForCharts';
import noAvatarImage from './../images/noUser.jpg'
import UnitsList from './../components/Units/UnitsList';
import UnitsFilter from './../components/Units/UnitsFilter';
import UnitsChartOwn from './../components/Units/Charts/UnitsChartOwn';
import UnitsChartBreakedRight from './../components/Units/Charts/UnitsChartBreakedRight';
import {useUnits} from "./../hooks/useUnits";


const Units = (props)=> {

  console.log("UNITS")
  console.log(props.match.params.id)

  const user_id = props.match.params.id;

  const [units, setUnits] = useState([]);
  const [isUnitsLoading, setIsUnitsLoading] = useState(true);
  const [filter, setFilter] = useState({sort: '', query: ''})
  const sortedAndSearchedUnits = useUnits(units, filter.sort, filter.query);
  const [flagUnits, setFlagUnits] = useState(true)

  const fetchUnits = async () => {
    try {
      const response = await UnitService.getAll(user_id);
      setUnits(response.data.data.data.map(obj=>({...obj.attributes})))
    } catch (e) {
      console.log(e);
    } finally {
      setIsUnitsLoading(false);
    }
  }


  useEffect( ()=>{
    if(props.match.params.id){

    }else{

    }

   fetchUnits();
  }
  ,[] )

  return (
    <>
    <MDBTypography   tag='h1' blockquote bqColor='primary' className="mt-4 ml-3 mb-4">
      <h1>{user_id ? 'Моё о' : 'О' }борудование</h1>
    </MDBTypography>

    <div className="ml-2">

      {  isUnitsLoading ?
        <MDBCol>
          <MDBRow className="d-flex align-items-center justify-content-center">
            <BigLoader />
          </MDBRow>
        </MDBCol>
      :
        <MDBRow>
      <MDBCol md="9">
            <MDBContainer>
                      <MDBRow>
                        <UnitsFilter user_id={user_id} filter={filter} setFilter={setFilter} setFlagUnits={setFlagUnits} flagUnits={flagUnits} />
                        <UnitsList units={sortedAndSearchedUnits}  />
                      </MDBRow>
            </MDBContainer>
          </MDBCol>

          <MDBCol md="3">

            <div className="sticky">
            {user_id ?
              null
              :
                <>
              <h3 className="text-center mb-2">Офисное / Индивидуальное оборудование</h3>
              <UnitsChartOwn units={units} />
                </>
            }

              <h3 className="text-center mt-5">Рабочее / Сломанное оборудование</h3>
              <UnitsChartBreakedRight units={units} />
            </div>
            </MDBCol>

        </MDBRow>

       }



    </div>
    </>
  )

}

export default Units
