import React from 'react'
import ReactDOM from 'react-dom'
import App from './../src/App'


import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

document.addEventListener('DOMContentLoaded', () => {
      ReactDOM.render(
      <App/>,
        document.body.appendChild(document.createElement('div'))
      )
})
