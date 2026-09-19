import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUp, CheckCircle2, Sparkles, Terminal } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { cn } from '@/lib/utils';

export interface VibeToPromptCopy {
  eyebrow: string;
  title: string;
  description: string;
  inputLabel: string;
  placeholder: string;
  generating: string;
  reset: string;
  keywordLabel: string;
  baseTags: string[];
}

const defaultCopy: VibeToPromptCopy = {
  eyebrow: 'Vibe-to-prompt channel search',
  title: 'Find the next live AI channel.',
  description:
    'Describe the kind of show you want to watch. The directory turns it into a few useful signals.',
  inputLabel: 'Describe the live AI show you want to find',
  placeholder: 'Try: a 24/7 space show steered by chat',
  generating: 'Structuring your channel search...',
  reset: 'Reset',
  keywordLabel: 'Keywords',
  baseTags: [
    'Format: Chat-directed',
    'Context: Live channel',
    'Signal: Audience-led',
    'Rhythm: 24/7',
  ],
};

export function Component({ copy = defaultCopy }: { copy?: VibeToPromptCopy }) {
  const [inputValue, setInputValue] = useState('');
  const [appState, setAppState] = useState<
    'idle' | 'generating' | 'structured'
  >('idle');
  const [tags, setTags] = useState<string[]>([]);
  const [strips, setStrips] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const transformTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  const titleParts = (() => {
    const breakMarker = ' live while you watch';
    const breakAt = copy.title.toLowerCase().indexOf(breakMarker);
    if (breakAt !== -1) {
      return [
        copy.title.slice(0, breakAt).trim(),
        copy.title.slice(breakAt).trim(),
      ];
    }

    const colonAt = Math.max(copy.title.indexOf(':'), copy.title.indexOf('：'));
    if (colonAt !== -1) {
      return [
        copy.title.slice(0, colonAt + 1).trim(),
        copy.title.slice(colonAt + 1).trim(),
      ];
    }

    const commaAt = copy.title.indexOf(',');
    return commaAt === -1
      ? [copy.title]
      : [copy.title.slice(0, commaAt + 1), copy.title.slice(commaAt + 1).trim()];
  })();

  useEffect(() => {
    return () => {
      if (transformTimerRef.current) {
        clearTimeout(transformTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const calculateStrips = () => {
      const stripWidth = 80;
      const numberOfStrips = Math.ceil(window.innerWidth / stripWidth) + 1;
      setStrips(Array.from({ length: numberOfStrips }, (_, index) => index));
    };

    let resizeFrame = 0;
    const handleResize = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(calculateStrips);
    };

    calculateStrips();
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTransform = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!inputValue.trim() || appState !== 'idle') return;

    setAppState('generating');
    transformTimerRef.current = setTimeout(() => {
      const generatedTags = [...copy.baseTags];
      const keywords = inputValue
        .split(/\s+/)
        .filter((word) => word.length > 4)
        .slice(0, 2);

      if (keywords.length > 0) {
        generatedTags.push(`${copy.keywordLabel}: ${keywords.join(', ')}`);
      }

      setTags(generatedTags);
      setAppState('structured');
      transformTimerRef.current = null;
    }, 1800);
  };

  const handleReset = () => {
    setAppState('idle');
    setInputValue('');
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <section
      className="vibe-prompt-hero"
      aria-labelledby="vibe-prompt-hero-title"
    >
      <div className="vibe-prompt-hero-background" aria-hidden="true">
        <div className="vibe-prompt-hero-noise" />
        <div className="vibe-prompt-hero-strips">
          {strips.map((index) => (
            <span key={index} />
          ))}
        </div>
      </div>

      <div className="ai-index-shell vibe-prompt-hero-inner">
        <div className="vibe-prompt-hero-copy">
          <p className="ai-index-eyebrow">{copy.eyebrow}</p>
          <h1 id="vibe-prompt-hero-title">
            {titleParts.map((part, index) => (
              <span key={`${part}-${index}`}>{part}</span>
            ))}
          </h1>
          <p>{copy.description}</p>
        </div>

        <motion.div
          layout={!reduceMotion}
          className={cn(
            'vibe-prompt-input-shell',
            appState === 'generating' && 'is-generating',
            appState === 'structured' && 'is-structured'
          )}
        >
          <form onSubmit={handleTransform}>
            <AnimatePresence mode="wait" initial={false}>
              {appState === 'idle' && (
                <motion.div
                  key="input-view"
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
                  transition={
                    reduceMotion ? { duration: 0 } : { duration: 0.2 }
                  }
                  className="vibe-prompt-input-view"
                >
                  <Terminal
                    className="vibe-prompt-input-icon"
                    aria-hidden="true"
                  />
                  <label className="sr-only" htmlFor="vibe-prompt-input">
                    {copy.inputLabel}
                  </label>
                  <input
                    ref={inputRef}
                    id="vibe-prompt-input"
                    type="text"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    placeholder={copy.placeholder}
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    aria-label={copy.inputLabel}
                  >
                    <ArrowUp className="size-5" aria-hidden="true" />
                  </button>
                </motion.div>
              )}

              {appState === 'generating' && (
                <motion.div
                  key="generating-view"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={
                    reduceMotion ? { duration: 0 } : { duration: 0.2 }
                  }
                  className="vibe-prompt-generating-view"
                  role="status"
                  aria-live="polite"
                >
                  <Sparkles className="size-5" aria-hidden="true" />
                  <span>{copy.generating}</span>
                </motion.div>
              )}

              {appState === 'structured' && (
                <motion.div
                  key="structured-view"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="vibe-prompt-structured-view"
                >
                  <div className="vibe-prompt-tags">
                    {tags.map((tag, index) => (
                      <motion.span
                        key={tag}
                        initial={
                          reduceMotion ? false : { opacity: 0, scale: 0.9 }
                        }
                        animate={{ opacity: 1, scale: 1 }}
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { delay: index * 0.08 }
                        }
                      >
                        <CheckCircle2 className="size-3.5" aria-hidden="true" />
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <motion.button
                    type="button"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { delay: tags.length * 0.08 }
                    }
                    onClick={handleReset}
                  >
                    {copy.reset}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
