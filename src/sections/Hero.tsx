import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { DeveloperAnimation } from '../components/DeveloperAnimation/DeveloperAnimation';

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 700);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const [startAnimation, setStartAnimation] = useState(false);
  const W = dimensions.width;
  const H = dimensions.height;

  useEffect(() => {
    if (W > 0 && H > 0) {
      const timer = setTimeout(() => {
        setStartAnimation(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [W, H]);

  const inset = isMobile ? 16 : 24;

  const dx_topLeft = W ? (W / 2 - 18) - inset : 0;
  const dy_topLeft = H ? (H / 2 - 18) - inset : 0;
  const dx_topRight = W ? -W / 2 + inset + 18 : 0;
  const dy_topRight = H ? (H / 2 - 18) - inset : 0;
  const dx_bottomLeft = W ? (W / 2 - 18) - inset : 0;
  const dy_bottomLeft = H ? -H / 2 + inset + 18 : 0;
  const dx_bottomRight = W ? -W / 2 + inset + 18 : 0;
  const dy_bottomRight = H ? -H / 2 + inset + 18 : 0;

  const bracketTransition = {
    duration: 1.25,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  const topLeftVariants = { hidden: { x: dx_topLeft, y: dy_topLeft, opacity: 0 }, visible: { x: 0, y: 0, opacity: 1 } };
  const topRightVariants = { hidden: { x: dx_topRight, y: dy_topRight, opacity: 0 }, visible: { x: 0, y: 0, opacity: 1 } };
  const bottomLeftVariants = { hidden: { x: dx_bottomLeft, y: dy_bottomLeft, opacity: 0 }, visible: { x: 0, y: 0, opacity: 1 } };
  const bottomRightVariants = { hidden: { x: dx_bottomRight, y: dy_bottomRight, opacity: 0 }, visible: { x: 0, y: 0, opacity: 1 } };

  const contentMaskVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.25,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.08,
        delayChildren: 0.55
      }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } }
  };

  return (
    <section id="hero" className="section-hero white-mode">
      <div className="hero-first-fold">
        <div className="hero-top-section" ref={containerRef}>
          <motion.div className="hero-corner-mark top-left" variants={topLeftVariants} initial="hidden" animate={startAnimation ? "visible" : "hidden"} transition={bracketTransition} aria-hidden="true" />
          <motion.div className="hero-corner-mark top-right" variants={topRightVariants} initial="hidden" animate={startAnimation ? "visible" : "hidden"} transition={bracketTransition} aria-hidden="true" />
          <motion.div className="hero-corner-mark bottom-left" variants={bottomLeftVariants} initial="hidden" animate={startAnimation ? "visible" : "hidden"} transition={bracketTransition} aria-hidden="true" />
          <motion.div className="hero-corner-mark bottom-right" variants={bottomRightVariants} initial="hidden" animate={startAnimation ? "visible" : "hidden"} transition={bracketTransition} aria-hidden="true" />

          <motion.div className="hero-content" variants={contentMaskVariants} initial="hidden" animate={startAnimation ? "visible" : "hidden"}>
            {/* Technical Micro-labels */}
            <motion.div className="micro-label left-label" variants={textItemVariants} aria-hidden="true">[ 01 / HOME ]</motion.div>
            <motion.div className="micro-label right-label" variants={textItemVariants} aria-hidden="true">● ACTV</motion.div>

            <div className="hero-grid">
              <div className="hero-text-column">
                <motion.div className="hero-greeting" variants={textItemVariants}>HELLO, I'M</motion.div>
                <motion.h1 className="hero-title" variants={textItemVariants}>SYED IMADULLA</motion.h1>
                
                <div className="hero-role-wrapper">
                  <motion.h2 className="hero-role" variants={textItemVariants}>FULL-STACK DEVELOPER</motion.h2>
                </div>

                <motion.p className="hero-description" variants={textItemVariants}>
                  I build full-stack web applications that solve real problems,<br className="desktop-break" />
                  from polished interfaces to APIs, databases and deployment.
                </motion.p>
                
                <motion.div className="hero-actions" variants={textItemVariants}>
                  <a href="#projects" className="btn-primary" aria-label="Explore my projects and work">EXPLORE MY WORK</a>
                  <a href="#contact" className="btn-secondary" aria-label="Get in touch">
                    GET IN TOUCH
                    <svg className="btn-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </a>
                </motion.div>
              </div>

              <div className="hero-illustration-column">
                <motion.div className="hero-animation-slot" variants={textItemVariants}>
                  <DeveloperAnimation />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
