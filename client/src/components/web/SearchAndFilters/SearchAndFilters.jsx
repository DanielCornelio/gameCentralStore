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
        <div className="filter-group">
          <label>Género:</label>
          <select
            value={filters.genre}
            onChange={(e) => updateFilter('genre', e.target.value)}
            className="filter-select"
          >
            <option value="">Todos los géneros</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Plataforma:</label>
          <select
            value={filters.platform}
            onChange={(e) => updateFilter('platform', e.target.value)}
            className="filter-select"
          >
            <option value="">Todas las plataformas</option>
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Ordenar por:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Nombre</option>
            <option value="price">Precio</option>
          </select>
        </div>
      </div>
    </div>
  );
};
