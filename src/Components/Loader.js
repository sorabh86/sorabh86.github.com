import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext';

export default function Loader() {
    const {loading} = useAuth();

    useEffect(()=>{
      console.log(loading);
    }, [])

  return (
    <div className={loading?'loading':'loading d-none'}>
    <div className="inner-loading">
        <Spinner /> <span>Loading...</span>
    </div>
    </div>
  )
}
