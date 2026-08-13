import { useEffect, useRef, useState } from 'react';

const FRAMES = {
  initialLoad: [
    'wave/wave1.webp', 'wave/wave2.webp', 'wave/wave3.webp', 'wave/wave2.webp', 'wave/wave1.webp',
    'wave/wave2.webp', 'wave/wave3.webp', 'wave/wave2.webp', 'wave/wave1.webp',
    'wave/wave2.webp', 'wave/wave3.webp', 'wave/wave2.webp', 'wave/wave1.webp', 
    'wave/wave2.webp', 'wave/wave3.webp', 'wave/wave2.webp', 'wave/wave1.webp',
    'wave/wave2.webp', 'wave/wave3.webp', 'wave/wave2.webp', 'wave/wave1.webp',
    'wave/wave2.webp', 'wave/wave3.webp'
  ],
  scrollDown: [
    'return/return1.webp', 'return/return2.webp', 'return/return3.webp', 'return/return4.webp',
    'look/look00.webp', 'look/look01.webp',
    'work/type1.webp', 'work/type2.webp', 'work/type3.webp', 'work/type4.webp'
  ],
  typingLoop: [
    'work/type1.webp', 'work/type2.webp', 'work/type3.webp', 'work/type4.webp'
  ],
  scrollUp: [
    'work/type4.webp', 'work/type3.webp', 'work/type2.webp', 'work/type1.webp',
    'look/look01.webp', 'look/look00.webp',
    'return/return4.webp', 'return/return3.webp', 'return/return2.webp', 'return/return1.webp',
    'wave/wave3.webp', 'wave/wave2.webp', 'wave/wave1.webp', 'wave/wave2.webp', 'wave/wave3.webp', 'wave/wave2.webp', 'wave/wave1.webp',
    'wave/wave2.webp', 'wave/wave3.webp', 'wave/wave2.webp', 'wave/wave1.webp'
  ],
  reducedMotion: 'wave/wave3.webp'
};

const FRAME_DURATION = 120; // 120ms per frame as requested
const SCROLL_THRESHOLD = 40; // 40px scroll threshold

type AnimationState = 
  | 'INITIAL_WAVE' 
  | 'REST_WAVE3' 
  | 'SCROLL_DOWN_TRANSITION' 
  | 'WORK_LOOP' 
  | 'SCROLL_UP_TRANSITION' 
  | 'REST_WAVE1';

type TargetMode = 'WAVE' | 'WORK';

export function DeveloperAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State refs for animation loop
  const stateRef = useRef<{
    currentAnimState: AnimationState;
    targetMode: TargetMode;
    frameIndex: number;
    lastTime: number;
    accumulatedTime: number;
    firstFrameReady: boolean;
    waveFramesReady: boolean;
    allFramesReady: boolean;
  }>({
    currentAnimState: 'INITIAL_WAVE',
    targetMode: 'WAVE',
    frameIndex: 0,
    lastTime: 0,
    accumulatedTime: 0,
    firstFrameReady: false,
    waveFramesReady: false,
    allFramesReady: false
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  
  // Cache for preloaded images
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());

  // Scroll tracking refs
  const scrollRef = useRef({
    lastY: 0,
    accumulatedDelta: 0
  });

  // Preload images
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMediaChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    const loadImages = (paths: string[]): Promise<void> => {
      return new Promise((resolve) => {
        if (paths.length === 0) return resolve();
        
        let loaded = 0;
        paths.forEach(path => {
          if (imageCacheRef.current.has(path)) {
            loaded++;
            if (loaded === paths.length) resolve();
            return;
          }
          
          const img = new Image();
          img.src = `/illustrations/developer/${path}`;
          img.onload = () => {
            imageCacheRef.current.set(path, img);
            loaded++;
            if (loaded === paths.length) resolve();
          };
          img.onerror = () => {
            loaded++;
            if (loaded === paths.length) resolve();
          };
        });
      });
    };

    const initPreload = async () => {
      // 1. Priority 1: Load first frame immediately
      await loadImages(['wave/wave1.webp']);
      stateRef.current.firstFrameReady = true;

      // 2. Priority 2: Load the rest of the wave frames
      await loadImages(['wave/wave2.webp', 'wave/wave3.webp']);
      stateRef.current.waveFramesReady = true;

      // 3. Priority 3+: Load everything else progressively in the background
      const loadRest = async () => {
        const allOtherFrames = Array.from(new Set([
          ...FRAMES.scrollDown,
          ...FRAMES.typingLoop,
          ...FRAMES.scrollUp,
          FRAMES.reducedMotion
        ])).filter(path => !path.startsWith('wave/')); // filter out already loaded

        // Load returns first
        const returns = allOtherFrames.filter(p => p.includes('return'));
        await loadImages(returns);
        
        // Then looks
        const looks = allOtherFrames.filter(p => p.includes('look'));
        await loadImages(looks);

        // Then work/type
        const work = allOtherFrames.filter(p => p.includes('work'));
        await loadImages(work);
        
        stateRef.current.allFramesReady = true;
      };

      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => loadRest());
      } else {
        setTimeout(loadRest, 500);
      }
    };

    initPreload();

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Animation Loop
  useEffect(() => {
    let animationFrameId: number;
    let observer: IntersectionObserver;

    const drawFrame = (imagePath: string) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;
      
      const img = imageCacheRef.current.get(imagePath);
      if (img && img.complete && img.naturalWidth !== 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;
        
        ctx.drawImage(img, x, y, w, h);
      }
    };

    let isVisible = true;
    let resizeObserver: ResizeObserver;

    // Handle high-DPI canvas sizing
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const targetWidth = Math.round(rect.width * dpr);
      const targetHeight = Math.round(rect.height * dpr);
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // The loop will redraw in the next frame
      }
    };

    if (canvasRef.current) {
      updateCanvasSize();
      resizeObserver = new ResizeObserver(() => updateCanvasSize());
      resizeObserver.observe(canvasRef.current);
      observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible) {
          stateRef.current.lastTime = performance.now();
        }
      });
      observer.observe(canvasRef.current);
    }

    const loop = (timestamp: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      const s = stateRef.current;

      // Progressive loading fallbacks
      if (!s.firstFrameReady) {
        // Do nothing until first frame is ready
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      if (prefersReducedMotion) {
        if (s.waveFramesReady) {
          drawFrame(FRAMES.reducedMotion);
        } else {
          drawFrame('wave/wave1.webp'); // Static fallback while loading
        }
        return; 
      }

      if (!s.lastTime) s.lastTime = timestamp;
      const deltaTime = timestamp - s.lastTime;
      s.lastTime = timestamp;
      
      // Prevent massive jumps
      if (deltaTime > 1000) {
          s.accumulatedTime = 0;
      } else {
          s.accumulatedTime += deltaTime;
      }

      // Check if we need to advance frame
      if (s.accumulatedTime >= FRAME_DURATION) {
        s.accumulatedTime -= FRAME_DURATION;
        if (s.accumulatedTime >= FRAME_DURATION) {
          s.accumulatedTime = 0;
        }

        // If wave frames aren't fully loaded, hold on the first frame statically
        if (!s.waveFramesReady && s.currentAnimState === 'INITIAL_WAVE') {
          drawFrame('wave/wave1.webp');
          animationFrameId = requestAnimationFrame(loop);
          return;
        }

        let currentSequence: string[];
        
        switch (s.currentAnimState) {
          case 'INITIAL_WAVE':
            currentSequence = FRAMES.initialLoad;
            drawFrame(currentSequence[s.frameIndex]);
            s.frameIndex++;
            if (s.frameIndex >= currentSequence.length) {
              s.currentAnimState = 'REST_WAVE3';
              s.frameIndex = 0;
            }
            break;
            
          case 'REST_WAVE3':
            drawFrame(FRAMES.initialLoad[FRAMES.initialLoad.length - 1]); // wave3
            if (s.targetMode === 'WORK' && s.allFramesReady) {
              s.currentAnimState = 'SCROLL_DOWN_TRANSITION';
              s.frameIndex = 0;
            }
            break;
            
          case 'SCROLL_DOWN_TRANSITION':
            currentSequence = FRAMES.scrollDown;
            drawFrame(currentSequence[s.frameIndex]);
            s.frameIndex++;
            if (s.frameIndex >= currentSequence.length) {
              s.currentAnimState = s.targetMode === 'WORK' ? 'WORK_LOOP' : 'SCROLL_UP_TRANSITION';
              s.frameIndex = 0;
            }
            break;
            
          case 'WORK_LOOP':
            currentSequence = FRAMES.typingLoop;
            drawFrame(currentSequence[s.frameIndex]);
            s.frameIndex++;
            if (s.frameIndex >= currentSequence.length) {
              s.frameIndex = 0;
            }
            if (s.targetMode === 'WAVE') {
              s.currentAnimState = 'SCROLL_UP_TRANSITION';
              s.frameIndex = 0;
            }
            break;
            
          case 'SCROLL_UP_TRANSITION':
            currentSequence = FRAMES.scrollUp;
            drawFrame(currentSequence[s.frameIndex]);
            s.frameIndex++;
            if (s.frameIndex >= currentSequence.length) {
              s.currentAnimState = s.targetMode === 'WAVE' ? 'REST_WAVE1' : 'SCROLL_DOWN_TRANSITION';
              s.frameIndex = 0;
            }
            break;
            
          case 'REST_WAVE1':
            drawFrame(FRAMES.scrollUp[FRAMES.scrollUp.length - 1]); // wave1
            if (s.targetMode === 'WORK' && s.allFramesReady) {
              s.currentAnimState = 'SCROLL_DOWN_TRANSITION';
              s.frameIndex = 0;
            }
            break;
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (observer) observer.disconnect();
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [prefersReducedMotion]);

  // Scroll handler
  useEffect(() => {
    scrollRef.current.lastY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const delta = currentY - scrollRef.current.lastY;
          scrollRef.current.lastY = currentY;

          if (Math.abs(delta) > 0) {
            if (Math.sign(delta) !== Math.sign(scrollRef.current.accumulatedDelta)) {
              scrollRef.current.accumulatedDelta = 0;
            }
            
            scrollRef.current.accumulatedDelta += delta;

            if (scrollRef.current.accumulatedDelta > SCROLL_THRESHOLD) {
              stateRef.current.targetMode = 'WORK';
              scrollRef.current.accumulatedDelta = 0;
            } else if (scrollRef.current.accumulatedDelta < -SCROLL_THRESHOLD) {
              stateRef.current.targetMode = 'WAVE';
              scrollRef.current.accumulatedDelta = 0;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="developer-animation-canvas"
      style={{
        display: 'block'
      }}
      aria-label="Syed Imadulla developer illustration"
      role="img"
    />
  );
}

export default DeveloperAnimation;
