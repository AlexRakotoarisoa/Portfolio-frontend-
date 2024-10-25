import React from 'react'
import './BtnProfil.css'
import {UilUser} from '@iconscout/react-unicons'

const BtnProfil = ({setExpanded}) => {
  return (
    <div className='ProfilBtn' onClick={() => setExpanded(false)}>
      <UilUser/>
    </div>
  )
}

export default BtnProfil
