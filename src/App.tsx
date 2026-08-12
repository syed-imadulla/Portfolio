import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { TerminalIntro } from './components/TerminalIntro';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { TechStack } from './sections/TechStack';
import { Projects } from './sections/Projects';
import { Playground } from './sections/Playground';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { TransitionStrip } from './components/TransitionStrip';
import { BackToTopButton } from './components/BackToTopButton';
import './styles/variables.css';
import './styles/globals.css';
import './styles/components.css';
import './styles/sections.css';

export function App() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Lock scrolling while the intro is active
    if (!introComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [introComplete]);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <div className="app-wrapper">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="torn-edge-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.1 0.05" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {!introComplete && (
        <TerminalIntro onComplete={handleIntroComplete} />
      )}

      {introComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}
        >
          <Header />
          <main>
            <Hero />
            <TransitionStrip />
            <About />
            <TechStack />
            <Projects />
            <Playground />
            <TransitionStrip slim={true} />
            <Contact />
          </main>
          <BackToTopButton />
          <Footer />
        </motion.div>
      )}
    </div>
  );
}

export default App;
