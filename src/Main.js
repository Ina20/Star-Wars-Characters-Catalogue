import React, { useState, useEffect, useRef } from 'react';
import Results from './Results.js';

let list = [];
let characterData = [];
let filmArray = [];
let isSearchSet = false;

const Main = () => {
  const [characterPage, setCharacterPage] = useState('https://swapi.dev/api/people/?page=2');
  const [character, setCharacter] = useState([]);
  const [characterToShow, setCharacterToShow] = useState([]);
  const [films, setFilms] = useState([]);
  const [film, setFilm] = useState("");
  const [name, setName] = useState("");
  const limit = 5;
  const ref = useRef(10);
  const isFirstRun = useRef(true);
  //const isLoading = useRef(true);
  const [loading, setLoading] = useState('true');

  async function requestCharacters() {
    let res = await fetch('https://swapi.dev/api/people/?page=1');
    let data = await res.json();
    characterData = characterData.concat(data.results);
    setCharacter(characterData);
    list = characterData.slice(0, 10);
    setCharacterToShow(list);
    requestMoreCharacters();
    setLoading(false);
  }
  async function requestMoreCharacters() {
    if(characterPage){
      let res = await fetch(characterPage);
      let data = await res.json();
      characterData = characterData.concat(data.results);
      setCharacter(characterData);
      setCharacterPage(data.next);
    }
  }
  async function requestFilms() {
    let res = await fetch('https://swapi.dev/api/films/');
    let data = await res.json();
    setFilms(data.results);
  }
  async function requestFilmCharacters(filmCharacterPage) {
    let res = await fetch(filmCharacterPage);
    let data = await res.json();
    characterData = characterData.concat(data);
    setCharacter(characterData);
    list = characterData.slice(0, 10);
    setCharacterToShow(list);
    setLoading(false);
  }


  async function requestSearchCharacters(searchCharacterPage) {
    let res = await fetch(searchCharacterPage);
    let data = await res.json();
    characterData = characterData.concat(data.results);
    setCharacter(characterData);
    list = characterData.slice(0, 10);
    setCharacterToShow(list);
    //isLoading.current = false;
    console.log(data.next);
    if(data.next){
      requestSearchCharacters(data.next);
    }else if(data.next == null){
      setLoading(false);
    }

    console.log("loading after after: " + loading);
  }

  const loopWithSlice = (start, end) => {
    const slicedPosts = character.slice(start, end);
    list = list.concat(slicedPosts);
    setCharacterToShow(list);
  }

  useEffect(() => {
    //requestCharacters();
    requestFilms();
  }, [])

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    list = [];
    characterData = [];
    ref.current = 10;
    setCharacterPage('https://swapi.dev/api/people/?page=2');
    filmArray = film.split(',')
    filmArray.map((character) => {
      if(character == "All" || character.length == 0 ){
        setLoading(true);
        isSearchSet = false;
        requestCharacters();
      }else{
        setLoading(true);
        isSearchSet = true;
        requestFilmCharacters(character);
      }
    })
  }, [film, setFilm])

  useEffect(() => {
    console.log("loading before: " + loading);
    list = [];
    characterData = [];
    ref.current = 10;
    setCharacterPage('https://swapi.dev/api/people/?page=2');
    if(name){
      let searchUrl = 'https://swapi.dev/api/people/?search=' + name;
      setLoading(true);
      isSearchSet = true;
      requestSearchCharacters(searchUrl);
    }else {
      setLoading(true);
      isSearchSet = false;
      requestCharacters();
    }
    console.log("loading after: " + loading);
  }, [name, setName])

  const loadMore = () => {
    loopWithSlice(ref.current, ref.current + limit);
    ref.current += limit;
    if(!isSearchSet){
      requestMoreCharacters();
    }
  }

  return (
    <div className="main">
      <div className="search">
        <label htmlFor="film">
          Select a film
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
          <i className="fa fa-chevron-down"></i>
        </label>
        <form onSubmit={(e) => {
          e.preventDefault();
        }}>
          <label htmlFor="name">
            or search by name
            <input
              id="name"
              value={name}
              placeholder="Type name"
              onChange={(e) => setName(e.target.value)}
            />
            <span className="input-border"></span>
            <i className="fa fa-search fa-lg"></i>
          </label>
        </form>
      </div>
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
      {
        loading ? (
          <img src={require('./images/bb8.gif')} alt="loading" className="loading-icon"/>
        ) : (
          <div className="result-wrapper">
            <Results character={ characterToShow } />
            <button onClick={loadMore}>Load more</button>
          </div>
        )
      }

    </div>
  );
};

export default Main;
