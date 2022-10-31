import React, {useState} from 'react';
import { MDBRow, MDBCol, MDBFormInline, MDBIcon,
        MDBBtn, MDBModal,  MDBModalHeader, MDBModalBody, MDBModalFooter,
          MDBInput} from "mdbreact";
import UnitService from './../../API/UnitService'
import UserService from './../../API/UserService'
import NominationService from './../../API/NominationService'

const UnitsFilter=({filter, setFilter, setFlagUnits,flagUnits, user_id})=>{

  const [modal, setModal] = useState(false)

  const [cost, setCost] = useState("")
  const [productUrl, setProductUrl] = useState("")
  const [nominationId, setNominationId] = useState("")
  const [userId, setUserId] = useState("")

  const [nominations, setNominations] = useState([])
  const [users, setUsers] = useState([])

  const toggleModal = ()=>{

    const fetchUserAndNominations = async () => {
      try {
        const response_users = await UserService.getAllShort()
        const response_nominations = await NominationService.getAll()
        setUsers(response_users.data.data.data.map(obj=>({...obj.attributes})))
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
        fetchUserAndNominations()
    }
  }

  const addNewUnit = () => {
    const addUnit = async () => {
      try {
        let data={cost, product_url: productUrl ,
                  nomination_id: nominationId, user_id: userId}
        const response = await UnitService.createNew(data)
        setFlagUnits(flagUnits => !flagUnits)
        setModal(false)
        setCost("")
        setProductUrl("")
        setNominationId("")
        setUserId("")
      }catch(e) {
        console.log(e)
      }
    }
    if(cost && productUrl)
        addUnit()
  }

  return (
    <>
      <MDBCol size="4">
        <div className="ml-2">
          Сортировка:
          <select className="browser-default custom-select"
              value={filter.sort} onChange={ e => setFilter({...filter, sort: e.target.value}) } >
            <option disabled>Выберите сортировку</option>
            <option value="created_at">По дате покупки</option>
            <option value="user_name">Сначала офисное</option>
            <option value="breaked_at">Сначала сломанное</option>
          </select>
        </div>
      </MDBCol>
      <MDBCol size="4">
          <MDBFormInline className="md-form">
          <MDBIcon icon="search" />
          <input className="form-control form-control-sm ml-3 w-75"
          type="text" placeholder="Поиск" aria-label="Search"
          value={filter.query}
          onChange={e => setFilter({...filter, query: e.target.value })}
          />
        </MDBFormInline>
      </MDBCol>
      <MDBCol size="2" />
      <MDBCol size="2">
      {user_id ?
        null
        :
        <MDBBtn outline color="success" onClick={toggleModal}>Новое</MDBBtn>
      }

      </MDBCol>

        <MDBModal isOpen={modal} toggle={toggleModal} centered>
          <MDBModalHeader>Регистрация нового оборудования</MDBModalHeader>
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
                <MDBCol size="9" className="mt-2 mb-2">
                <select className="browser-default custom-select" value={userId}
                  onChange={e => setUserId(e.target.value)} >
                  <option disabled value="">Выберите пользователя</option>
                    <option key="0" value="0">Офисное</option>
                  {users.map( (u) => (
                    <option key={u.id} value={u.id}>
                    {u.position_name}: {u.first_name} {u.second_name}
                    </option>
                  ))
                  }
                </select>
                </MDBCol>
                <MDBCol size="8" style={{padding: '0'}}>
                <MDBInput label="URL оборудования" background size="sm" value={productUrl} onChange={e=>setProductUrl(e.target.value)}  />
                </MDBCol>
                <MDBCol size="8">
                <MDBInput label="Стоимость покупки ($)" type="number" value={cost} onChange={e=>setCost(e.target.value)} />
                </MDBCol>
            </MDBRow>
            </form>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn outline color="success" onClick={addNewUnit} >Добавить оборудование</MDBBtn>
          </MDBModalFooter>
        </MDBModal>


    </>
  )

}

export default UnitsFilter;
