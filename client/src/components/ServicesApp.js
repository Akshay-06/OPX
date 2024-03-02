import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import '../css/ServicesApp.css'

const ServicesApp = () => {



  return (
    <div className='fetch-services-container'>
        <h1>Services</h1>
        <button className='buttons' >Add Service</button>
      <table id="customers">
  <tr>
    <th>Service ID</th>
    <th>Service Name</th>
    <th>Service Fee</th>
    <th>Edit</th>
    <th>Delete</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td><i className='fa fa-edit'></i></td>
    <td><i className='fa fa-trash-alt'></i></td>
  </tr>
  <tr>
    <td>Berglunds snabbköp</td>
    <td>Christina Berglund</td>
    <td>Sweden</td><td>Germany</td><td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td><td>Germany</td><td>Germany</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td><td>Germany</td><td>Germany</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td><td>Germany</td><td>Germany</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Königlich Essen</td>
    <td>Philip Cramer</td><td>Germany</td><td>Germany</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td><td>Germany</td><td>Germany</td>
    <td>Canada</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td><td>Germany</td><td>Germany</td>
  </tr>
  <tr>
    <td>North/South</td>
    <td>Simon Crowther</td>
    <td>UK</td><td>Germany</td><td>Germany</td>
  </tr>
  <tr>
    <td>Paris spécialités</td>
    <td>Marie Bertrand</td><td>Germany</td><td>Germany</td>
    <td>France</td>
  </tr>
</table>
      
    </div>
  )
}
export default (ServicesApp);
