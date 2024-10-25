import React from 'react'
import './CardService.css'

const CardService = (props) => {
  return (
    <div className='cardService1' >
      <div className='imageSS'style={{backgroundImage: `url(${props.image})`}}>
        <div className='containerService'>
          <div>
            <h2>{props.titre}</h2>
            </div>
          <div style={{fontSize:'15px'}}>
            <p>{props.description}</p>
          </div>
          <div style={{fontSize:'28px'}}>
          <p>{props.numero}</p>
          </div>
        </div>
        </div>
    </div>
  )
}

export default CardService
