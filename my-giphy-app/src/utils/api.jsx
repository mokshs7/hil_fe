const API_KEY = import.meta.env.VITE_GIPHY_API_KEY

const BASE_URL = 'https://api.giphy.com/v1/gifs';

export const fetchTrendingGifs = async (page = 0) => {
  const response = await fetch(`${BASE_URL}/trending?api_key=${API_KEY}&offset=${page * 25}`);
  const json = await response.json();
  return json.data;
};

export const fetchGifsByTerm = async (term, page = 0) => {
    const response = await fetch(`${BASE_URL}/search?api_key=${API_KEY}&q=${term}&offset=${page * 25}`);
    const json = await response.json();
    return json.data;
  };