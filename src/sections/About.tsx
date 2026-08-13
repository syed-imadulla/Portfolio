import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="about" className="about-outer-wrap white-mode">
      <div className="section-container">
        <motion.div
          className="section-header-block-centered"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-meta-label">[ 02 / ABOUT ]</div>
          <h2 className="section-heading">ABOUT <span style={{ color: 'var(--color-blue)' }}>ME</span></h2>
          <div className="heading-underline"></div>
          <p className="section-subtitle">
            Building practical things<br className="desktop-break" />
            with code, curiosity and consistency.
          </p>
        </motion.div>

        <div className="about-editorial-grid">
          
          <motion.div 
            className="card-3d-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-3d-top" style={{'--extrusion-color': '#3b82f6'} as React.CSSProperties}></div>
            <div className="card-3d-right" style={{'--extrusion-color-dark': '#1d4ed8'} as React.CSSProperties}></div>
            <div className="card-3d-front" style={{'--surface-color': '#ffffff', '--text-color': '#000000'} as React.CSSProperties}>
              <h3 className="card-3d-title">WHO IS SYED IMADULLA?</h3>
              <div className="card-3d-body">
                <p>
                  I am Syed Imadulla, a Computer Science Engineering student and full-stack developer based in Karnataka, India, focused on building practical software and understanding how things work under the hood. I enjoy turning ideas into clean, responsive web applications while continuously improving my problem-solving and engineering skills.
                </p>
                <div className="about-sub-section">
                  <div className="about-sub-title">CURRENTLY FOCUSED ON</div>
                  <ul className="about-sub-list">
                    <li>Frontend & full-stack development</li>
                    <li>Data Structures & Algorithms</li>
                    <li>Problem solving & competitive coding</li>
                    <li>Building practical web applications</li>
                  </ul>
                </div>
              </div>
              <div className="card-3d-tags">
                <span className="card-3d-tag">[ FRONTEND ]</span>
                <span className="card-3d-tag">[ FULL-STACK ]</span>
                <span className="card-3d-tag">[ DSA ]</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="card-3d-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="card-3d-top" style={{'--extrusion-color': '#3b82f6'} as React.CSSProperties}></div>
            <div className="card-3d-right" style={{'--extrusion-color-dark': '#1d4ed8'} as React.CSSProperties}></div>
            <div className="card-3d-front" style={{'--surface-color': '#ffffff', '--text-color': '#000000'} as React.CSSProperties}>
              <h3 className="card-3d-title">WHAT I BUILD</h3>
              <div className="card-3d-body">
                <p>
                  I build practical web applications that combine thoughtful interfaces with reliable functionality. My work spans frontend development, full-stack systems, APIs, databases, and responsive user experiences. I also practice Data Structures and Algorithms in C++, focusing on problem solving, algorithmic thinking, and writing efficient solutions.
                </p>
                <div className="about-sub-section">
                  <div className="about-sub-title">HOW I APPROACH DEVELOPMENT</div>
                  <ul className="about-sub-list">
                    <li>Understand the problem first.</li>
                    <li>Build simple, useful solutions.</li>
                    <li>Practice DSA to strengthen problem-solving.</li>
                    <li>Keep interfaces clean and responsive.</li>
                    <li>Learn by building and improving.</li>
                  </ul>
                </div>
              </div>
              <div className="card-3d-tags">
                <span className="card-3d-tag">[ WEB APPS ]</span>
                <span className="card-3d-tag">[ FULL-STACK ]</span>
                <span className="card-3d-tag">[ RESPONSIVE UI ]</span>
                <span className="card-3d-tag">[ PROBLEM SOLVING ]</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <div className="about-bottom-transition">
        <div className="geometric-cut-line"></div>
      </div>
    </section>
  );
}

export default About;
