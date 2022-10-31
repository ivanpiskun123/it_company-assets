import React, {useState} from 'react';
import { MDBRow, MDBCol, MDBFormInline, MDBIcon } from "mdbreact";

const BidsFilter=({filter, setFilter})=>{

  return (
    <>
      <MDBCol size="4">
        <div className="ml-2">
          Сортировка:
          <select className="browser-default custom-select"
              value={filter.sort} onChange={ e => setFilter({...filter, sort: e.target.value}) } >
            <option disabled>Выберите сортировку</option>
            <option value="created_at">По дате создания</option>
            <option value="opened">Сначала открытые</option>
            <option value="urgent_unit_id">Открытые срочные</option>
            <option value="closed">Сначала закрытые</option>
          </select>
        </div>
      </MDBCol>
      <MDBCol size="3" />

      <MDBCol size="5">
          <MDBFormInline className="md-form">
          <MDBIcon icon="search" />
          <input className="form-control form-control-sm ml-3 w-75"
          type="text" placeholder="Поиск" aria-label="Search"
          value={filter.query}
          onChange={e => setFilter({...filter, query: e.target.value })}
          />
        </MDBFormInline>
      </MDBCol>
    </>
  )

}

export default BidsFilter;
