import React from 'react';
import '../styles/GifItem.css';

const GifItem = ({ gif, onSave, isSaved }) => {
  return (
    <div className="gif-item">
      <img src={gif.images.fixed_height.url} alt={gif.title} />
      <button
        className={`save-button ${isSaved ? 'saved' : ''}`}
        onClick={() => onSave(gif.id)}
      >
        {isSaved ? 'Unsave' : 'Save'}
      </button>
    </div>
  );
};

export default GifItem;