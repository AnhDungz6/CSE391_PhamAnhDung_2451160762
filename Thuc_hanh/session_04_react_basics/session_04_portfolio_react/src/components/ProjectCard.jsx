// src/components/ProjectCard.jsx
function ProjectCard({ title, category, image, description, tags }) {
  return (
    <div className={`project-card ${category}`}>
      <div className="project-image-container">
        <img src={image} alt={title} className="project-img" />
        <div className="project-overlay">
          <span className="project-category-tag">{category}</span>
        </div>
      </div>
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <div className="project-tags">
          {tags && tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="project-footer">
          <a href="#contact" className="project-link">Learn More <span className="arrow">→</span></a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
