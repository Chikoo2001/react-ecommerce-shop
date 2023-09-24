import React from 'react'
import './Spinner.css';

const Spinner = () => {
  return (
    <div className='col-span-full flex justify-center items-center'>
        <div className="custom-loader"></div>
    </div>
  )
}

export default Spinner;