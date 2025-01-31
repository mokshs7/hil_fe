import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import GifGrid from './components/GifGrid';
import Loading from './components/Loading';
import { fetchTrendingGifs, fetchGifsByTerm } from './utils/api';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import SavedGifs from './components/SavedGifs'; 


function App() {
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [savedGifs, setSavedGifs] = useState(() => {
    const saved = localStorage.getItem('savedGifs');
    return saved ? JSON.parse(saved) : [];
  });
  const [page, setPage] = useState(0);
  const [triggerSearch, setTriggerSearch] = useState(false);
  
  useEffect(() => {
    const loadGifs = async () => {
      setIsLoading(true);
      const newGifs = searchTerm
        ? await fetchGifsByTerm(searchTerm, page)
        : await fetchTrendingGifs(page);
      setGifs((prevGifs) => (page === 0 ? newGifs : [...prevGifs, ...newGifs]));
      setIsLoading(false);
    };

    loadGifs();
  }, [triggerSearch, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 && 
        !isLoading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  useEffect(() => {
    localStorage.setItem('savedGifs', JSON.stringify(savedGifs));
  }, [savedGifs]);

  const handleSaveGif = (id) => {
    setSavedGifs((prevSavedGifs) =>
      prevSavedGifs.includes(id)
        ? prevSavedGifs.filter((savedId) => savedId !== id)
        : [...prevSavedGifs, id]
    );
  };

  const handleSearch = () => {
    setPage(0); 
    setGifs([]); 
    setTriggerSearch((prev) => !prev); 
  };

  return (
    <Router>
      <div className="App">
        <main className="App-main">
          <Routes>
            <Route exact path="/" element={
              <>
                <header className="App-header">
                  <div className="search-bar-container">
                    <SearchBar setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
                  </div>
                  <Link to="/saved" className="saved-icon">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" width="50" height="50" 
                    viewBox="0 0 24 24" fill='red'>
                    <path d="M19.5 10c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-6.527 4.593c-1.108 1.086-2.275 2.219-3.473 3.407-6.43-6.381-12-11.147-12-15.808 0-4.005 3.098-6.192 6.281-6.192 2.197 0 4.434 1.042 5.719 3.248 1.279-2.195 3.521-3.238 5.726-3.238 3.177 0 6.274 2.171 6.274 6.182 0 .746-.156 1.496-.423 2.253-.527-.427-1.124-.768-1.769-1.014.122-.425.192-.839.192-1.239 0-2.873-2.216-4.182-4.274-4.182-3.257 0-4.976 3.475-5.726 5.021-.747-1.54-2.484-5.03-5.72-5.031-2.315-.001-4.28 1.516-4.28 4.192 0 3.442 4.742 7.85 10 13l2.109-2.064c.376.557.839 1.048 1.364 1.465z"/>
                  </svg>
                  Saved
                  </Link>
                </header>
                <GifGrid gifs={gifs} onSave={handleSaveGif} savedGifs={savedGifs} />
                {isLoading && <Loading />}
              </>
            } />
            <Route path="/saved" element={
              <>

                  <Link to="/" className="home-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="50" height="50"> 
                    <path fill="#00CCFF" d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                  </svg>
                  Home
                  </Link>
                  <h2 className="saved-heading">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" width="32" height="32" 
                    viewBox="0 0 24 24" fill='#00CCFF'>
                    <path d="M19.5 10c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-6.527 4.593c-1.108 1.086-2.275 2.219-3.473 3.407-6.43-6.381-12-11.147-12-15.808 0-4.005 3.098-6.192 6.281-6.192 2.197 0 4.434 1.042 5.719 3.248 1.279-2.195 3.521-3.238 5.726-3.238 3.177 0 6.274 2.171 6.274 6.182 0 .746-.156 1.496-.423 2.253-.527-.427-1.124-.768-1.769-1.014.122-.425.192-.839.192-1.239 0-2.873-2.216-4.182-4.274-4.182-3.257 0-4.976 3.475-5.726 5.021-.747-1.54-2.484-5.03-5.72-5.031-2.315-.001-4.28 1.516-4.28 4.192 0 3.442 4.742 7.85 10 13l2.109-2.064c.376.557.839 1.048 1.364 1.465z"/>
                  </svg>
                    Saved Gifs
                  </h2>
                <SavedGifs gifs={gifs} savedGifs={savedGifs} onSave={handleSaveGif} />
              </>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;