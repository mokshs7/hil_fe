import React from 'react';
import GifItem from './GifItem';

const SavedGifs = ({ gifs, savedGifs, onSave }) => {
  const savedGifItems = gifs.filter((gif) => savedGifs.includes(gif.id));

  return (
    <div className="gif-grid">
      {savedGifItems.map((gif) => (
        <GifItem
          key={gif.id}
          gif={gif}
          onSave={onSave}
          isSaved={true}
        />
      ))}
    </div>
  );
};

export default SavedGifs;