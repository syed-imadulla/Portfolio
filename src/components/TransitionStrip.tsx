export function TransitionStrip() {
  return (
    <section className="transition-strip-wrap dark-mode">
      <div className="torn-edge-top"></div>
      
      <div className="transition-strip-content">
        <div className="strip-system-label">
          [ SYSTEM / 01 ]
        </div>
        
        <div className="strip-marquee-container">
          <div className="strip-marquee-text">
            <span>BUILD</span> <span className="strip-separator">/</span> 
            <span>LEARN</span> <span className="strip-separator">/</span> 
            <span>EXPERIMENT</span> <span className="strip-separator">/</span> 
            <span>SHIP</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TransitionStrip;
