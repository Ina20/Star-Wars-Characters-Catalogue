import React, { useState, useEffect } from 'react';
import Details from './Details.js'

const Character = ({ name, gender, birthYear, height, films }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = ({ films }) => {
    showDetails ? setShowDetails(false) : setShowDetails(true);
  }

  return (
    <div className="character">
      <div className="wrapper">
        <div className="box">
          <p>{name}</p>
        </div>
        <div className="box">
          <p>{gender}</p>
        </div>
        <div className="box">
          <p>{birthYear}</p>
        </div>
        <div className="box">
          <i className="fa fa-info fa-lg" onClick={toggleDetails}></i>
        </div>
      </div>
      {
        showDetails ? <Details height={height} films={films}/> : null
      }
    </div>
  )
}

export default Character;
