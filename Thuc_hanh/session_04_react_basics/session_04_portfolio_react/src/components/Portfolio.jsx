// src/components/Portfolio.jsx
import { useState } from 'react';
import { projects } from '../data/skills';
import ProjectCard from './ProjectCard';

function Portfolio() {
  const [items] = useState(projects);
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'web', 'mobile', 'design'];

  const filteredItems =
    filter === 'all' ? items : items.filter((item) => item.category === filter);

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">My Works</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))
          ) : (
            <p className="no-projects">No projects found in this category.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
