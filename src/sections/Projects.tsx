import { projects } from '../data/projects';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export function Projects() {
  const featuredProject = projects.find(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="projects-outer-wrap white-mode">
      <div className="section-container">
        <motion.div
          className="section-header-block-centered"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-meta-label">[ 04 / PROJECTS ]</div>
          <h2 className="section-heading">SELECTED <span style={{ color: 'var(--color-blue)' }}>WORK</span></h2>
          <div className="heading-underline"></div>
          <p className="section-subtitle">
            Projects I've built to solve real problems.
          </p>
        </motion.div>

        <div className="projects-grid">
          {featuredProject && (
            <motion.div 
              className="card-3d-wrapper featured-project-layout"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="card-3d-top"></div>
              <div className="card-3d-right"></div>
              <div className="card-3d-front featured-front">
                <div className="featured-left">
                  <div className="project-card-header">
                    <div className="project-number">{featuredProject.number} / FEATURED</div>
                  </div>
                  <h3 className="project-title">{featuredProject.title}</h3>
                  <div className="project-subtitle">{featuredProject.subtitle}</div>
                  
                  <hr className="project-divider" />

                  <p className="project-description">{featuredProject.description}</p>
                  
                  <div className="project-tech-tags">
                    {featuredProject.technologies.map(tech => (
                      <span key={tech} className="tech-tag-compact">[ {tech} ]</span>
                    ))}
                  </div>

                  <div className="project-card-actions" style={{ marginTop: 'auto' }}>
                    {featuredProject.live && (
                      <a href={featuredProject.live} target="_blank" rel="noopener noreferrer" className="btn-primary" aria-label={`View live demo for ${featuredProject.title}`}>
                        LIVE DEMO <FaExternalLinkAlt size={12} style={{ marginLeft: '8px' }} aria-hidden="true" />
                      </a>
                    )}
                    {featuredProject.github && (
                      <a href={featuredProject.github} target="_blank" rel="noopener noreferrer" className="btn-primary" aria-label={`View GitHub repository for ${featuredProject.title}`}>
                        GITHUB <FaGithub size={14} style={{ marginLeft: '8px' }} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="featured-divider-vertical"></div>

                <div className="featured-right">
                  {featuredProject.architectureDetails && Object.entries(featuredProject.architectureDetails).map(([key, value]) => (
                    <div key={key} className="arch-spec-block">
                      <div className="arch-spec-label">{key}</div>
                      <div className="arch-spec-value">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
              </motion.div>
          )}

          {otherProjects.map((project, index) => (
            <motion.div 
              key={project.id} 
              className="card-3d-wrapper"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="card-3d-top"></div>
              <div className="card-3d-right"></div>
              <div className="card-3d-front">
                <div className="project-card-header">
                  <div className="project-number">{project.number} / PROJECT</div>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <div className="project-subtitle">{project.subtitle}</div>
                
                <hr className="project-divider" />
                
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech-tags">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-tag-compact">[ {tech} ]</span>
                  ))}
                </div>

                <div className="project-card-actions" style={{ marginTop: 'auto' }}>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary" aria-label={`View live demo for ${project.title}`}>
                      LIVE <FaExternalLinkAlt size={12} style={{ marginLeft: '8px' }} aria-hidden="true" />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary" aria-label={`View GitHub repository for ${project.title}`}>
                      GITHUB <FaGithub size={14} style={{ marginLeft: '8px' }} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
