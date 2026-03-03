import { useState, useMemo, useEffect } from 'react';
import Navbar from './component/Navbar';
import HomePage from './pages/HomePage';
import CreateMusicPages from './pages/CreateMusicPages';
import EditMusicPage from './pages/EditMusicPage';
import MusicDetailPage from './pages/MusicDetailPage';
import MusicNotFound from './component/MusicNotFound';
import { Routes, Route } from 'react-router';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

function App() {
  const [songs, setSongs] = useState([]);

  // Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All'); // All, Favorites, Recommended
  const [genreFilter, setGenreFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('Newest');

  // Fetch songs from backend on mount
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(API_URL);
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };
    fetchSongs();
  }, []);

  // Derive unique genres and languages for the dropdowns
  const uniqueGenres = [...new Set(songs.map(s => s.genre).filter(Boolean))];
  const uniqueLanguages = [...new Set(songs.map(s => s.language).filter(Boolean))];

  // Apply auto-recommend logic based on rating
  const processSong = (song) => {
    return {
      ...song
    };
  };

  const addSong = async (newSong) => {
    try {
      const songToPost = processSong(newSong);
      const response = await axios.post(API_URL, songToPost);
      setSongs([response.data, ...songs]);
    } catch (error) {
      console.error('Error adding song:', error);
    }
  };

  const updateSong = async (id, updatedData) => {
    try {
      const songToUpdate = processSong(updatedData);
      const response = await axios.put(`${API_URL}/${id}`, songToUpdate);
      setSongs(songs.map(song => song._id === id ? response.data : song));
    } catch (error) {
      console.error('Error updating song:', error);
    }
  };

  const deleteSong = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setSongs(songs.filter(song => song._id !== id));
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  };

  const toggleFavorite = async (id) => {
    const songToToggle = songs.find(s => s._id === id);
    if (!songToToggle) return;

    try {
      const updatedSong = { ...songToToggle, isFavorite: !songToToggle.isFavorite };
      const response = await axios.put(`${API_URL}/${id}`, updatedSong);
      setSongs(songs.map(song => song._id === id ? response.data : song));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  // Filter and Sort Logic
  const filteredAndSortedSongs = useMemo(() => {
    return songs
      .filter(song => {
        // Tab filter
        // Tab filter
        if (activeTab === 'Recommended' && Number(song.rating) < 8) return false;
        if (activeTab === 'Favorites' && !song.isFavorite) return false;

        // Dropdown filters
        if (genreFilter && song.genre !== genreFilter) return false;
        if (languageFilter && song.language !== languageFilter) return false;

        // Search query (Title, Artist, Album)
        if (searchQuery) {
          const lowerQuery = searchQuery.toLowerCase();
          const matchesTitle = song.title?.toLowerCase().includes(lowerQuery);
          const matchesArtist = song.artist?.toLowerCase().includes(lowerQuery);
          const matchesAlbum = song.album?.toLowerCase().includes(lowerQuery);
          if (!matchesTitle && !matchesArtist && !matchesAlbum) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sort by Release Year
        const yearA = Number(a.releaseYear) || 0;
        const yearB = Number(b.releaseYear) || 0;
        return sortOrder === 'Newest' ? yearB - yearA : yearA - yearB;
      });
  }, [songs, activeTab, genreFilter, languageFilter, searchQuery, sortOrder]);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                songs={filteredAndSortedSongs}
                deleteSong={deleteSong}
                toggleFavorite={toggleFavorite}
                genreFilter={genreFilter}
                setGenreFilter={setGenreFilter}
                languageFilter={languageFilter}
                setLanguageFilter={setLanguageFilter}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                uniqueGenres={uniqueGenres}
                uniqueLanguages={uniqueLanguages}
                activeTab={activeTab}
              />
            }
          />
          <Route path="/create" element={<CreateMusicPages addSong={addSong} />} />
          <Route path="/edit/:id" element={<EditMusicPage songs={songs} updateSong={updateSong} />} />
          <Route path="/music/:id" element={<MusicDetailPage songs={songs} />} />
          <Route path="*" element={<MusicNotFound />} />
        </Routes>
      </main>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
