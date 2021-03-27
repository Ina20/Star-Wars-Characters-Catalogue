import React, { useState, useEffect } from 'react';

let filmData = [];

const Details = ({ height, films }) => {
  const [film, setFilm] = useState([]);

  async function requestFilms(film) {
    let res = await fetch(film);
    let data = await res.json();
    filmData = filmData.concat(data.title);
    setFilm(filmData);
    console.log("aaa");
    console.log(filmData);
  }

  useEffect(() => {
    filmData = [];
    films.map((film, i) => {
      requestFilms(film);
    })
  }, [])


  return (
    <div className="detailBox">
      <div className="detail-wrapper">
        <p>height</p>
        <p>{height}</p>
      </div>
      <div className="detail-wrapper">
        <p>Films</p>
      {
        filmData.map((film, i) => {
          return(
            <div className="film-list">
              <ul>
                <li>{film}</li>
              </ul>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default Details;
