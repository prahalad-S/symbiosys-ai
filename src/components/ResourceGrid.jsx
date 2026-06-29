import React from 'react';
import ResourceCard from './ResourceCard';

function ResourceGrid({ database, activeCategory, searchQuery, setSearchQuery, onResourceClick }) {
  
  // Aggregate items depending on category
  let data = database[activeCategory];
  if (!data) {
    if (activeCategory === 'all') {
      data = {
        title: "All Resources",
        sectionTitle: "All Resources",
        items: []
      };
      for (const key in database) {
        data.items.push(...(database[key]?.items || []));
      }
    } else {
      data = {
        title: "Resources",
        sectionTitle: "Resources",
        items: []
      };
    }
  }

  // Filter based on search query
  let filteredItems = [];
  const query = searchQuery.toLowerCase().trim();
  
  if (query === '') {
    filteredItems = data.items;
  } else {
    // Search across all items regardless of category
    const allItems = [];
    for (const key in database) {
      allItems.push(...(database[key]?.items || []));
    }
    filteredItems = allItems.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }

  const displayTitle = query === '' ? data.title : "Search Results";
  const displaySectionTitle = query === '' ? data.sectionTitle : `Results for "${query}"`;

  return (
    <>
      <header className="page-header">
        <h1 className="page-title">{displayTitle}</h1>
        <p className="page-subtitle">{filteredItems.length} resources</p>
        
        <div className="search-container">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search resources…" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{displaySectionTitle}</h2>
        <p style={{ color: 'var(--text-muted)' }}>{filteredItems.length} resources</p>
      </div>

      <div className="resources-grid">
        {filteredItems.map((item, index) => (
          <ResourceCard 
            key={`${item.name}-${index}`} 
            item={item} 
            onClick={onResourceClick} 
          />
        ))}
      </div>
    </>
  );
}

export default ResourceGrid;
