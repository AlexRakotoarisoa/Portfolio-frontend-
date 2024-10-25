import React from 'react'
import './MainDash.css'
import Cards from '../Cards/Cards'
import Table from '../Table/Table'

const MainDash = () => {
  return (
    <div className='MainPrincipale'>
      <div className='MainDash'>{/*****Display flex column */}
        <h1>Dashboard</h1>
        <Cards/>
        <Table/>
      </div>
      <div>Bonjour</div>
    </div>
  )
}

export default MainDash
