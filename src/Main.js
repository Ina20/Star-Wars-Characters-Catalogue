import React, { useState, useEffect, useRef } from 'react';
import Results from './Results.js';

let list = [];
let characterData = [];
let filmArray = [];
let isFilmSet = false;

const Main = () => {
  const [characterPage, setCharacterPage] = useState('https://swapi.dev/api/people/?page=2');
  const [character, setCharacter] = useState([]);
  const [characterToShow, setCharacterToShow] = useState([]);
  const [films, setFilms] = useState([]);
  const [film, setFilm] = useState("");
  const limit = 5;
  const ref = useRef(10);

  async function requestCharacters() {
    let res = await fetch('https://swapi.dev/api/people/?page=1');
    let data = await res.json();
    characterData = characterData.concat(data.results);
    setCharacter(characterData);
    list = characterData.slice(0, 10);
    setCharacterToShow(list);
    //setCharacterPage(data.next);
    requestMoreCharacters();
  }
  async function requestMoreCharacters() {
    let res = await fetch(characterPage);
    let data = await res.json();
    characterData = characterData.concat(data.results);
    setCharacter(characterData);
    setCharacterPage(data.next);
    console.log(characterData);
  }
  async function requestFilms() {
    let res = await fetch('https://swapi.dev/api/films/');
    let data = await res.json();
    setFilms(data.results);
  }
  async function requestFilmCharacters(filmCharacterPage) {
    let res = await fetch(filmCharacterPage);
    let data = await res.json();
    console.log(data);
    characterData = characterData.concat(data);
    setCharacter(characterData);
    list = characterData.slice(0, 10);
    setCharacterToShow(list);
    console.log('eee');
    console.log(characterData);
  }

  const loopWithSlice = (start, end) => {
    console.log(characterToShow);
    const slicedPosts = character.slice(start, end);
    list = list.concat(slicedPosts);
    setCharacterToShow(list);
  }

  const loadCharacters = () => {
    console.log({film})
  }

  useEffect(() => {
    //requestCharacters();
    requestFilms();
  }, [])

  useEffect(() => {
    console.log('dddddd');
    console.log(character);
    list = [];
    characterData = [];
    ref.current = 10;
    setCharacterPage('https://swapi.dev/api/people/?page=2');
    console.log('ccc');
    console.log(film.split(','));
    filmArray = film.split(',')
    filmArray.map((character) => {
      console.log('ddd');
      console.log(character);
      if(character == "All" || character.length == 0){
        isFilmSet = false;

        requestCharacters();
      }else{
        isFilmSet = true;
        requestFilmCharacters(character);
      }
    })
  }, [film, setFilm])

  const loadMore = () => {
    console.log("ref current " + ref.current);
    loopWithSlice(ref.current, ref.current + limit);
    console.log(isFilmSet);
    ref.current += limit;
    if(!isFilmSet){
      console.log("im here");
      console.log('page ' + characterPage);
      requestMoreCharacters();
    }
    console.log(isFilmSet);

  }

  return (
    <div className="main">
    <label htmlFor="film">
      Film
      <select
        id="film"
        value={film}
        onChange={(e) => setFilm(e.target.value)}
        onBlur={(e) => setFilm(e.target.value)}>
        <option>All</option>
          {films.map(film => (
            <option key={film.title} value={film.characters}>{film.title}</option>
          ))}
      </select>
    </label>
      <div className="list-header">
        <div className="box">
          <h2>Name</h2>
        </div>
        <div className="box">
          <h2>Gender</h2>
        </div>
        <div className="box">
          <h2>Birth Year</h2>
        </div>
        <div className="box"></div>
      </div>
      <Results character={ characterToShow } />
      <button onClick={loadMore}>Load more</button>
    </div>
  );
};

export default Main;
