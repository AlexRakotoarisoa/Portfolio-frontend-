import React from 'react'
import './Statistique.css'
import Cards from '../Cards/Cards'
import Table from '../Table/Table'

const Statistique = () => {
  return (
    <div className='MainStatistique'>
      <div className='Statistique'>{/*****Display flex column */}
        <h1>Dashboard</h1>
        <Cards/>
        <Table/>
      </div>
    </div>
  )
}

export default Statistique
