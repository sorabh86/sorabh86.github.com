import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext';

export default function Loader() {
    const {loading, len} = useAuth();

  return (
    <div className={(loading.length>0)?'loading p-5':'loading d-none'}>
        <div className="inner-loading d-flex flex-column">
            <img src='/logo-128x31.png' />
            <Spinner /> 
            <h4 className=''>Loading...</h4>
            <ul>
            {loading.map(function(load, index) {
                return <li key={index}>{load}</li>
            })}
            </ul>
        </div>
    </div>
  )
}
