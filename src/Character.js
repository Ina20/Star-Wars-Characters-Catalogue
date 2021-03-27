import React, { useState } from 'react';

const Character = ({ name, gender, birthYear, height }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
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
        showDetails ? <Details /> : null
      }
    </div>
  )
}

const Details = () => (
  <div className="detailBox">
    <p>aaa</p>
    <p>aaa</p>
  </div>
)

export default Character;
