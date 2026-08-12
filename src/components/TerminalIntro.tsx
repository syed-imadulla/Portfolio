import { useEffect, useState } from 'react';

interface TerminalIntroProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  { text: 'loading imadulla.dev ... ', delay: 150 },
  { text: 'identity: SYED IMADULLA', delay: 180, highlight: true },
  { text: 'initializing interface...', delay: 150 },
  { text: 'boot_sequence: SUCCESS', delay: 180, success: true },
];

export function TerminalIntro({ onComplete }: TerminalIntroProps) {
  const [visibleLines, setVisibleLines] = useState<number>(-1);
  const [typedLines, setTypedLines] = useState<string[]>(Array(BOOT_LINES.length).fill(''));
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(onComplete, 350);
  };

  useEffect(() => {
    let active = true;
    const delay = (ms: number) =>
      new Promise<void>((res) => setTimeout(() => { if (active) res(); }, ms));

    const run = async () => {
      await delay(600); // Initial delay

      for (let li = 0; li < BOOT_LINES.length; li++) {
        if (!active) return;
        const { text } = BOOT_LINES[li];
        
        setVisibleLines(li);
        
        for (let ci = 1; ci <= text.length; ci++) {
          if (!active) return;
          setTypedLines((prev) => {
            const next = [...prev];
            next[li] = text.slice(0, ci);
            return next;
          });
          await delay(20);
        }
        
        setProgress(Math.round(((li + 1) / BOOT_LINES.length) * 100));
        await delay(160);
      }

      await delay(200);
      if (!active) return;
      setIsFading(true);
      await delay(300);
      if (active) onComplete();
    };

    run();
    return () => { active = false; };
  }, [onComplete]);

  const prompt = '[visitor@imadulla.dev ~]$';

  return (
    <div className={`ti-overlay${isFading ? ' ti-fade-out' : ''}`}>
      <div className="ti-scanlines" aria-hidden="true" />

      <div className="ti-box-window">
        <div className="ti-header">
          <div className="ti-dots">
            <span className="ti-dot ti-dot--red" onClick={handleSkip} title="Close / Skip" />
            <span className="ti-dot ti-dot--yellow" />
            <span className="ti-dot ti-dot--green" />
          </div>
          <div className="ti-header-title">📁 imadulla.dev — bash</div>
          <button className="ti-skip-btn" onClick={handleSkip}>[ SKIP ]</button>
        </div>

        <div className="ti-body">
          <div className="ti-lines-block">
            {BOOT_LINES.map((bl, i) =>
              i <= visibleLines ? (
                <div
                  key={i}
                  className={`ti-line${bl.highlight ? ' ti-line--highlight' : ''}${bl.success ? ' ti-line--success' : ''}`}
                >
                  <span className="ti-prompt">{prompt}</span>
                  <span className="ti-line-text">&nbsp;{typedLines[i]}</span>
                  {i === visibleLines && typedLines[i].length < bl.text.length && (
                    <span className="ti-cursor" />
                  )}
                </div>
              ) : null
            )}
            {visibleLines === BOOT_LINES.length - 1 && progress === 100 && (
                 <div className="ti-line">
                     <span className="ti-prompt">{prompt}</span>
                     <span className="ti-cursor" />
                 </div>
            )}
          </div>

          {progress > 0 && (
            <div className="ti-progress-wrap">
              <span className="ti-progress-label">
                {progress === 100 ? 'SYSTEM READY' : `LOADING ${progress}%`}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TerminalIntro;
