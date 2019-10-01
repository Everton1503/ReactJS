import React from 'react'
import AddMonths from './AddMonths'
import Months from './Months'
import Header from '../../elements/Header'

const Home = () => {
    return (
      <div className='container'>
          <AddMonths />
          <Months />
      </div>
      
    )
  }

  export default Home