import React from 'react';

const SearchAndFilter = ({ searchQuery, setSearchQuery, selectedRegion, setSelectedRegion, regions }) => {
  return (
    <div className="search-and-filter-container my-4 flex justify-between">
      <input
        type="text"
        className="search-input"
        placeholder="Search destinations..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="filter-by-region-text mb-2">Filter by Region:</div>
      <select
        className="region-dropdown"
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}>
        <option value="">All Regions</option>
        {regions.map(region => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>
    </div>
  );
};

export default SearchAndFilter;
