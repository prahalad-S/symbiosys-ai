import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ResourceGrid from './components/ResourceGrid';
import Modal from './components/Modal';
import { database } from './data/database';

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  const [activeCategory, setActiveCategory] = useState('frameworks-agents');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
  };

  const closeModal = () => {
    setSelectedResource(null);
  };

  return (
    <div className="app-container">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      <main className="main-layout">
        <Sidebar 
          database={database}
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
        />
        <section className="content" id="content-area">
          <ResourceGrid 
            database={database}
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onResourceClick={handleResourceClick}
          />
        </section>
      </main>
      <Modal 
        resource={selectedResource} 
        onClose={closeModal} 
        database={database}
      />
    </div>
  );
}

export default App;
