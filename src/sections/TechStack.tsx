import { motion } from 'framer-motion';

export function TechStack() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="tech-stack" className="tech-stack-outer-wrap dark-mode">
      <div className="section-container">
        <motion.div
          className="section-header-block-centered"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading" style={{ color: '#ffffff' }}>TECH STACK</h2>
          <p className="section-subtitle" style={{ color: '#94a3b8' }}>
            Tools and technologies I use to build.
          </p>
          <div className="heading-underline"></div>
        </motion.div>

        <motion.div
          className="stack-matrix-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          
          <motion.div variants={itemVariants} className="card-3d-wrapper">
            <div className="card-3d-top" style={{'--extrusion-color': '#facc15'} as React.CSSProperties}></div>
            <div className="card-3d-right" style={{'--extrusion-color-dark': '#ca8a04'} as React.CSSProperties}></div>
            <div className="card-3d-front" style={{'--surface-color': '#f4f9ff', '--text-color': '#000000'} as React.CSSProperties}>
              <h3 className="card-3d-title">
                <span className="card-category-number">01 / FRONTEND</span>
                FRONTEND
              </h3>
              <div className="card-3d-body" style={{ flexGrow: 1 }}></div>
              <div className="card-3d-tags">
                <span className="card-3d-tag">React.js</span>
                <span className="card-3d-tag">Tailwind CSS</span>
                <span className="card-3d-tag">HTML5</span>
                <span className="card-3d-tag">CSS3</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="card-3d-wrapper">
            <div className="card-3d-top" style={{'--extrusion-color': '#e2e8f0'} as React.CSSProperties}></div>
            <div className="card-3d-right" style={{'--extrusion-color-dark': '#94a3b8'} as React.CSSProperties}></div>
            <div className="card-3d-front" style={{'--surface-color': '#f4f9ff', '--text-color': '#000000'} as React.CSSProperties}>
              <h3 className="card-3d-title">
                <span className="card-category-number">02 / BACKEND & CLOUD</span>
                BACKEND & CLOUD
              </h3>
              <div className="card-3d-body" style={{ flexGrow: 1 }}></div>
              <div className="card-3d-tags">
                <span className="card-3d-tag">Node.js</span>
                <span className="card-3d-tag">Express.js</span>
                <span className="card-3d-tag">Docker</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="card-3d-wrapper">
            <div className="card-3d-top" style={{'--extrusion-color': '#fb923c'} as React.CSSProperties}></div>
            <div className="card-3d-right" style={{'--extrusion-color-dark': '#c2410c'} as React.CSSProperties}></div>
            <div className="card-3d-front" style={{'--surface-color': '#f4f9ff', '--text-color': '#000000'} as React.CSSProperties}>
              <h3 className="card-3d-title">
                <span className="card-category-number">03 / LANGUAGES</span>
                LANGUAGES
              </h3>
              <div className="card-3d-body" style={{ flexGrow: 1 }}></div>
              <div className="card-3d-tags">
                <span className="card-3d-tag">JavaScript</span>
                <span className="card-3d-tag">TypeScript</span>
                <span className="card-3d-tag">Python</span>
                <span className="card-3d-tag">Java</span>
                <span className="card-3d-tag">C++</span>
                <span className="card-3d-tag">C</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="card-3d-wrapper">
            <div className="card-3d-top" style={{'--extrusion-color': '#22d3ee'} as React.CSSProperties}></div>
            <div className="card-3d-right" style={{'--extrusion-color-dark': '#0891b2'} as React.CSSProperties}></div>
            <div className="card-3d-front" style={{'--surface-color': '#f4f9ff', '--text-color': '#000000'} as React.CSSProperties}>
              <h3 className="card-3d-title">
                <span className="card-category-number">04 / DATABASE</span>
                DATABASE
              </h3>
              <div className="card-3d-body" style={{ flexGrow: 1 }}></div>
              <div className="card-3d-tags">
                <span className="card-3d-tag">MySQL</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="card-3d-wrapper">
            <div className="card-3d-top" style={{'--extrusion-color': '#22d3ee'} as React.CSSProperties}></div>
            <div className="card-3d-right" style={{'--extrusion-color-dark': '#0891b2'} as React.CSSProperties}></div>
            <div className="card-3d-front" style={{'--surface-color': '#f4f9ff', '--text-color': '#000000'} as React.CSSProperties}>
              <h3 className="card-3d-title">
                <span className="card-category-number">05 / TOOLS</span>
                TOOLS
              </h3>
              <div className="card-3d-body" style={{ flexGrow: 1 }}></div>
              <div className="card-3d-tags">
                <span className="card-3d-tag">Git</span>
                <span className="card-3d-tag">GitHub</span>
                <span className="card-3d-tag">Postman</span>
                <span className="card-3d-tag">Figma</span>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

export default TechStack;
