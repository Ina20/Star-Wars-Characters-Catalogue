import React from 'react';
import Character from './Character.js'

const Results = ({ character }) => {

  return (
    <div className="character-sheet">
      {!character.length ? (
        <p>No Characters Found</p>
      ) : (
        character.map((character, i) => {
          return (
            <Character
              key = {i}
              name = {character.name}
              gender = {character.gender}
              birthYear = {character.birth_year}
              height = {character.height}
              films = {character.films}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
