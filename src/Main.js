import React, { useState, useEffect, useRef } from 'react';
import Results from './Results.js';

let list = [];
let characterData = [];

const Main = () => {
  const [characterPage, setCharacterPage] = useState('https://swapi.dev/api/people/?page=2');
  const [character, setCharacter] = useState([]);
  const [characterToShow, setCharacterToShow] = useState([]);
  const limit = 5;
  const ref = useRef(10);

  async function requestCharacters() {
    let res = await fetch('https://swapi.dev/api/people/');
    let data = await res.json();
    characterData = characterData.concat(data.results);
    setCharacter(characterData);
    list = characterData.slice(0, 10);
    setCharacterToShow(list);
    requestMoreCharacters();
  }
  async function requestMoreCharacters() {
    let res = await fetch(characterPage);
    let data = await res.json();
    characterData = characterData.concat(data.results);
    setCharacter(characterData);
    setCharacterPage(data.next);
  }

  const loopWithSlice = (start, end) => {
    console.log(characterToShow);
    const slicedPosts = character.slice(start, end);
    list = list.concat(slicedPosts);
    setCharacterToShow(list);
  }

  useEffect(() => {
    requestCharacters();
  }, [])

  const loadMore = () => {
    console.log("ref current " + ref.current);
    loopWithSlice(ref.current, ref.current + limit);
    ref.current += limit;
    requestMoreCharacters();
  }

  return (
    <div className="main">
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
