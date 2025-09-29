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

    if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    }

    return filtered;
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
