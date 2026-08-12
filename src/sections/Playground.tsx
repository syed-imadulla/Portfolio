import { motion } from 'framer-motion';
import { StickManGame } from '../components/StickManGame';

export function Playground() {
  return (
    <section id="playground" className="playground-outer-wrap dark-mode">
      <div className="section-container">
        
        <motion.div
          className="section-header-block-centered"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="section-meta-label">[ 05 / PLAYGROUND ]</div>
          <h2 className="section-heading" style={{ color: '#ffffff' }}>PLAY<span style={{ color: 'var(--color-blue)' }}>GROUND</span></h2>
          <div className="heading-underline" />
          
          <div className="section-subtitle">Take a break. Build your score.</div>
          
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          className="game-hint-line"
        >
          Land perfectly in the red zone for <strong>DOUBLE SCORE</strong>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="game-wrapper"
        >
          <StickManGame />
        </motion.div>

      </div>
    </section>
  );
}
