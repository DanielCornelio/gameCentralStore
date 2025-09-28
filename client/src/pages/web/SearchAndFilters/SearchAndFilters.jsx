
import React from 'react';
import './SearchAndFilters.scss';

export const SearchAndFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  filters, 
  updateFilter, 
  sortBy, 
  setSortBy,
  genres,
  platforms 
}) => {
  return (
    <div className="search-and-filters">
      <div className="search-section">
        <input
          type="text"
          placeholder="Buscar juegos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="filters-section">
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="name">Ordenar por nombre</option>
          <option value="price">Ordenar por precio</option>
        </select>
      </div>
    </div>
  );
};
EOF