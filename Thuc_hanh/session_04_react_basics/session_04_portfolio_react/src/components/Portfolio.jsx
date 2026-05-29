// src/components/Portfolio.jsx
import { useState } from 'react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

function Portfolio() {
    // State for projects
    const [items] = useState(projects);
    const [filter, setFilter] = useState('all');

    const categories = ['all', 'web', 'mobile', 'design'];

    return (
        <section id="portfolio" className="portfolio-section">
            <div className="container">
                <h2 className="text-center mb-5">My Portfolio</h2>

                {/* Filter Buttons */}
                <div className="filter-buttons">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`filter-btn ${filter === category ? 'active' : ''}`}
                            onClick={() => setFilter(category)}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Render list from state */}
                <div className="portfolio-grid">
                    {items.map(project => (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            category={project.category}
                            image={project.image}
                            description={project.description}
                            tags={project.tags}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Portfolio;
