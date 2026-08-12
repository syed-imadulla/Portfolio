import { motion } from 'framer-motion';
import { 
  FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaDocker, 
  FaPython, FaJava, FaGitAlt, FaGithub, FaFigma 
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiExpress, SiJavascript, SiTypescript, 
  SiCplusplus, SiC, SiMysql, SiPostman, SiMongodb
} from 'react-icons/si';
import { GrOracle } from 'react-icons/gr';

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
          <div className="section-meta-label">[ 03 / STACK ]</div>
          <h2 className="section-heading" style={{ color: '#ffffff' }}>TECH <span style={{ color: 'var(--color-blue)' }}>STACK</span></h2>
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
              <div className="card-3d-tags">
                <span className="card-3d-tag"><FaReact color="#61DAFB" /> React.js</span>
                <span className="card-3d-tag"><SiTailwindcss color="#06B6D4" /> Tailwind CSS</span>
                <span className="card-3d-tag"><FaHtml5 color="#E34F26" /> HTML5</span>
                <span className="card-3d-tag"><FaCss3Alt color="#1572B6" /> CSS3</span>
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
              <div className="card-3d-tags">
                <span className="card-3d-tag"><FaNodeJs color="#339933" /> Node.js</span>
                <span className="card-3d-tag"><SiExpress color="#000000" /> Express.js</span>
                <span className="card-3d-tag"><FaDocker color="#2496ED" /> Docker</span>
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
              <div className="card-3d-tags">
                <span className="card-3d-tag"><SiJavascript color="#F7DF1E" /> JavaScript</span>
                <span className="card-3d-tag"><SiTypescript color="#3178C6" /> TypeScript</span>
                <span className="card-3d-tag"><FaPython color="#3776AB" /> Python</span>
                <span className="card-3d-tag"><FaJava color="#007396" /> Java</span>
                <span className="card-3d-tag"><SiCplusplus color="#00599C" /> C++</span>
                <span className="card-3d-tag"><SiC color="#A8B9CC" /> C</span>
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
              <div className="card-3d-tags">
                <span className="card-3d-tag"><SiMysql color="#4479A1" /> MySQL</span>
                <span className="card-3d-tag"><SiMongodb color="#47A248" /> MongoDB</span>
                <span className="card-3d-tag"><GrOracle color="#F80000" /> Oracle SQL</span>
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
              <div className="card-3d-tags">
                <span className="card-3d-tag"><FaGitAlt color="#F05032" /> Git</span>
                <span className="card-3d-tag"><FaGithub color="#181717" /> GitHub</span>
                <span className="card-3d-tag"><SiPostman color="#FF6C37" /> Postman</span>
                <span className="card-3d-tag"><FaFigma color="#F24E1E" /> Figma</span>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

export default TechStack;
