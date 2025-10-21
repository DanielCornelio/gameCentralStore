import { useState, useMemo } from 'react';

export const useGameFilters = (games) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    platform: '',
    priceRange: [0, 100]
  });
  const [sortBy, setSortBy] = useState('name');

  const updateFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredGames = useMemo(() => {
    let filtered = games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = !filters.genre || game.genre === filters.genre;
      const matchesPlatform = !filters.platform || game.platform === filters.platform;
      const matchesPrice = game.price >= filters.priceRange[0] && game.price <= filters.priceRange[1];
      
      return matchesSearch && matchesGenre && matchesPlatform && matchesPrice;
    });

    // Crear una copia antes de ordenar para no mutar el array original
    let sorted = [...filtered];
    
    if (sortBy === 'name') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'price') {
      sorted.sort((a, b) => a.price - b.price);
    }

    return sorted;
  }, [games, searchTerm, filters, sortBy]);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    sortBy,
    setSortBy,
    filteredGames
  };
};