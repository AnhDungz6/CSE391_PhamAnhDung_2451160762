// src/components/Skills.jsx
import { skills as defaultSkills } from '../data/skills';

function Skills({ skills = defaultSkills }) {
  // Categorize skills
  const frontendSkills = skills.filter((s) => s.category === 'frontend');
  const backendSkills = skills.filter((s) => s.category === 'backend');
  const otherSkills = skills.filter((s) => s.category !== 'frontend' && s.category !== 'backend');

  const renderSkillGroup = (title, groupSkills) => (
    <div className="skills-group">
      <h3 className="group-title">{title}</h3>
      <div className="skills-list">
        {groupSkills.map((skill) => (
          <div key={skill.name} className="skill-item">
            <div className="skill-info">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-level">{skill.level}%</span>
            </div>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">What I Know</span>
          <h2 className="section-title">Skills &amp; Expertise</h2>
        </div>

        <div className="skills-grid">
          {frontendSkills.length > 0 && renderSkillGroup('Frontend Development', frontendSkills)}
          {backendSkills.length > 0 && renderSkillGroup('Backend Development', backendSkills)}
          {otherSkills.length > 0 && renderSkillGroup('Design & Tools', otherSkills)}
        </div>
      </div>
    </section>
  );
}

export default Skills;
