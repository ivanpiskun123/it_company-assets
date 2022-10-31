import React, {useState, useEffect} from 'react';
import BidItem from './BidItem'
import { MDBRow, MDBCol, MDBFormInline, MDBIcon, MDBContainer} from "mdbreact";
import UnitService from './../../API/UnitService'

const BidsList =( {bids, setFlagBids, flagBids,user_id} )=>{

  const [officeUnits,setOfficeUnits] = useState([])

  useEffect(()=>{
    const fetchOfficeUnits = async () => {
      try {
        const response = await UnitService.getAll();
        let rawUnits = response.data.data.data.map(obj=>({...obj.attributes}))
        let officeUnits = rawUnits.filter( (u) => !u.user_name && !u.breaked_at )
        console.log(officeUnits )
        setOfficeUnits(officeUnits)
      } catch (e) {
        console.log(e);
    }
  }

   fetchOfficeUnits();
  },[])



  if(!bids.length) {
    return (
      <>
      <MDBRow className="d-flex align-items-center justify-content-center">
      <h2 style={{textAlign: 'center'}}>
                Заявок не найдено
            </h2>
                </MDBRow>
      </>
    )
  }

  return (
    <>

    <MDBRow>
    {bids.map( bid => (
        <BidItem user_id={user_id} key={bid.id} bid={bid} officeUnits={officeUnits} setFlagBids={setFlagBids} flagBids={flagBids}/>
      ))
    }
      </MDBRow>

    </>
  )

}

export default BidsList;
