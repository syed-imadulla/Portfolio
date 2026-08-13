import { useEffect, useRef, useState } from 'react';

const FRAMES = {
  initialLoad: [
    'wave/wave1.png', 'wave/wave2.png', 'wave/wave3.png', 'wave/wave2.png', 'wave/wave1.png',
    'wave/wave2.png', 'wave/wave3.png', 'wave/wave2.png', 'wave/wave1.png',
    'wave/wave2.png', 'wave/wave3.png', 'wave/wave2.png', 'wave/wave1.png', 
    'wave/wave2.png', 'wave/wave3.png'
  ],
  scrollDown: [
    'return/return1.png', 'return/return2.png', 'return/return3.png', 'return/return4.png',
    'look/look00.png', 'look/look01.png',
    'work/type1.png', 'work/type2.png', 'work/type3.png', 'work/type4.png'
  ],
  typingLoop: [
    'work/type1.png', 'work/type2.png', 'work/type3.png', 'work/type4.png'
  ],
  scrollUp: [
    'work/type4.png', 'work/type3.png', 'work/type2.png', 'work/type1.png',
    'look/look01.png', 'look/look00.png',
    'return/return4.png', 'return/return3.png', 'return/return2.png', 'return/return1.png',
    'wave/wave3.png', 'wave/wave2.png', 'wave/wave1.png', 'wave/wave2.png', 'wave/wave3.png', 'wave/wave2.png', 'wave/wave1.png',
    'wave/wave2.png', 'wave/wave3.png', 'wave/wave2.png', 'wave/wave1.png'
  ],
  reducedMotion: 'wave/wave3.png'
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
    imagesLoaded: boolean;
  }>({
    currentAnimState: 'INITIAL_WAVE',
    targetMode: 'WAVE',
    frameIndex: 0,
    lastTime: 0,
    accumulatedTime: 0,
    imagesLoaded: false
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
    
    // Add event listener (fallback for older browsers not strictly needed, but addEventListener is standard now)
    mediaQuery.addEventListener('change', handleMediaChange);

    const allPaths = new Set([
      ...FRAMES.initialLoad,
      ...FRAMES.scrollDown,
      ...FRAMES.typingLoop,
      ...FRAMES.scrollUp,
      FRAMES.reducedMotion
    ]);

    let loadedCount = 0;
    allPaths.forEach(path => {
      const img = new Image();
      img.src = `/illustrations/developer/${path}`;
      img.onload = () => {
        loadedCount++;
        imageCacheRef.current.set(path, img);
        if (loadedCount === allPaths.size) {
          stateRef.current.imagesLoaded = true;
        }
      };
      // In case of error, just count it so it doesn't block the rest
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === allPaths.size) {
          stateRef.current.imagesLoaded = true;
        }
      };
    });

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
        // Assuming we want to contain it, though illustrations should be square already
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

    // Use IntersectionObserver to stop animating when out of view
    if (canvasRef.current) {
      updateCanvasSize();
      resizeObserver = new ResizeObserver(() => updateCanvasSize());
      resizeObserver.observe(canvasRef.current);
      observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible) {
          // Reset last time when coming back into view to prevent time jumps
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

      if (prefersReducedMotion) {
        if (stateRef.current.imagesLoaded) {
          drawFrame(FRAMES.reducedMotion);
        }
        return; // Don't request next frame, static.
      }

      const s = stateRef.current;
      if (!s.lastTime) s.lastTime = timestamp;
      const deltaTime = timestamp - s.lastTime;
      s.lastTime = timestamp;
      
      // Prevent massive jumps if tab is backgrounded
      if (deltaTime > 1000) {
          s.accumulatedTime = 0;
      } else {
          s.accumulatedTime += deltaTime;
      }

      // Check if we need to advance frame
      if (s.accumulatedTime >= FRAME_DURATION && s.imagesLoaded) {
        // Prevent huge build-up, just take one frame duration
        s.accumulatedTime -= FRAME_DURATION;
        if (s.accumulatedTime >= FRAME_DURATION) {
          s.accumulatedTime = 0;
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
            if (s.targetMode === 'WORK') {
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
            if (s.targetMode === 'WORK') {
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
    // Only capture initial Y if we can
    scrollRef.current.lastY = window.scrollY;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const delta = currentY - scrollRef.current.lastY;
          scrollRef.current.lastY = currentY;

          // Only care if delta is significant to avoid tiny jumps
          if (Math.abs(delta) > 0) {
            // Reset accumulator if scrolling changed direction
            if (Math.sign(delta) !== Math.sign(scrollRef.current.accumulatedDelta)) {
              scrollRef.current.accumulatedDelta = 0;
            }
            
            scrollRef.current.accumulatedDelta += delta;

            if (scrollRef.current.accumulatedDelta > SCROLL_THRESHOLD) {
              // Scrolled down meaningfully
              stateRef.current.targetMode = 'WORK';
              scrollRef.current.accumulatedDelta = 0;
            } else if (scrollRef.current.accumulatedDelta < -SCROLL_THRESHOLD) {
              // Scrolled up meaningfully
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
      aria-label="Developer illustration animation"
      role="img"
    />
  );
}

export default DeveloperAnimation;
