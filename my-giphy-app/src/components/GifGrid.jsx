import React from 'react';
import GifItem from './GifItem';
import '../styles/GifGrid.css';

const GifGrid = ({ gifs, onSave, savedGifs }) => {
  return (
    <>
      <h2 className="gif-grid-heading">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill='#00CCFF'>
          <path d="M384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-82.7L342.6 374.6c-12.5 12.5-32.8 12.5-45.3 0L192 269.3 54.6 406.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160c12.5-12.5 32.8-12.5 45.3 0L320 306.7 466.7 160 384 160z"/>
        </svg>
        Trending Now
      </h2>
      <div className="gif-grid">
        {gifs.map((gif) => (
          <GifItem
            key={gif.id}
            gif={gif}
            onSave={onSave}
            isSaved={savedGifs.includes(gif.id)}
          />
        ))}
      </div>
    </>
  );
};

export default GifGrid;