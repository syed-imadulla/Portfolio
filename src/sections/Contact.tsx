import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

// ── Configure your contact details here ─────────────────────────────────────
const CONTACT = {
  email: 'imadulla.s45@gmail.com', // updated email
  github: 'https://github.com/syed-imadulla',
  linkedin: 'https://www.linkedin.com/in/syed-imadulla', // ← update if needed
};

export function Contact() {
  return (
    <section id="contact" className="contact-outer-wrap white-mode">
      <div className="section-container">

        {/* ── Header ── */}
        <motion.div
          className="section-header-block-centered contact-header-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="section-meta-label" style={{ color: 'var(--color-blue)' }}>[ 06 / CONTACT ]</div>
          <h2 className="section-heading" style={{ color: '#0f172a' }}>
            LET'S BUILD<br />
            <span style={{ color: 'var(--color-blue)' }}>SOMETHING</span>
          </h2>
          <div className="heading-underline" />
          <p className="section-subtitle">
            Have an idea, a project, or just want to connect?
          </p>
        </motion.div>

        {/* ── Contact Card — uses same card-3d system as Projects ── */}
        <motion.div
          className="card-3d-wrapper contact-card-wrapper"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
        >
          <div className="card-3d-top" style={{ '--extrusion-color': '#3b82f6' } as React.CSSProperties} />
          <div className="card-3d-right" style={{ '--extrusion-color-dark': '#1d4ed8' } as React.CSSProperties} />

          <div className="card-3d-front contact-card-front">

            {/* Left: message */}
            <div className="contact-card-left">
              <h3 className="contact-card-heading">LET'S CONNECT</h3>
              <hr className="contact-card-divider" />
              <p className="contact-card-body">
                I'm always open to interesting projects, collaborations,
                and opportunities to build useful things.
              </p>
            </div>

            {/* Right: actions */}
            <div className="contact-card-right">
              <a
                href={`mailto:${CONTACT.email}`}
                className="btn-primary"
                aria-label="Email me"
              >
                EMAIL ME <FaEnvelope size={13} style={{ marginLeft: '10px' }} />
              </a>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                aria-label="GitHub profile"
              >
                GITHUB <FaGithub size={14} style={{ marginLeft: '10px' }} />
              </a>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                aria-label="LinkedIn profile"
              >
                LINKEDIN <FaLinkedin size={14} style={{ marginLeft: '10px' }} />
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
