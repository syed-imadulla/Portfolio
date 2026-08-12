export function TransitionStrip({ slim = false }: { slim?: boolean }) {
  return (
    <section className={`transition-strip-wrap dark-mode ${slim ? 'slim' : ''}`}>
      
      {!slim && (
        <div className="transition-strip-content-centered">
          <div className="strip-centered-text">
            <span>BUILD</span> <span className="strip-separator">/</span> 
            <span>LEARN</span> <span className="strip-separator">/</span> 
            <span>EXPERIMENT</span> <span className="strip-separator">/</span> 
            <span>SHIP</span>
          </div>
        </div>
      )}
      
      <div className="torn-edge-bottom"></div>
    </section>
  );
}

export default TransitionStrip;
