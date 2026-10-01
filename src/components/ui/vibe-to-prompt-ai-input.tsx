import {
  useEffect,
  useId,
  useMemo,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import { ArrowUp, Search, Terminal } from 'lucide-react';

import { searchProducts, type SearchableProduct } from '@/lib/product-search';
import { cn } from '@/lib/utils';
import { Link, useRouter } from '@/core/i18n/navigation';

export interface VibeToPromptCopy {
  eyebrow: string;
  title: string;
  description: string;
  inputLabel: string;
  placeholder: string;
  noResults: string;
  viewAll: (count: number) => string;
}

export interface VibeSearchProduct extends SearchableProduct {
  slug: string;
  href: string;
}

const MAX_SUGGESTIONS = 8;

const defaultCopy: VibeToPromptCopy = {
  eyebrow: 'AI tool finder',
  title: 'Find the right AI tool.',
  description: 'Search every product in the directory by name.',
  inputLabel: 'Search AI tools',
  placeholder: 'Search by product name',
  noResults: 'No matching products',
  viewAll: (count) => `See all ${count} results`,
};

export function Component({
  copy = defaultCopy,
  products = [],
  onSearch,
}: {
  copy?: VibeToPromptCopy;
  products?: VibeSearchProduct[];
  /** Called on submit with the raw query ('' when the box is cleared). */
  onSearch?: (query: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [strips, setStrips] = useState<number[]>([]);
  const router = useRouter();
  const listboxId = useId();

  const matches = useMemo(
    () => (query.trim() ? searchProducts(products, query) : []),
    [products, query]
  );
  const suggestions = matches.slice(0, MAX_SUGGESTIONS);
  const showList = open && query.trim().length > 0;

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

  const submitQuery = () => {
    setOpen(false);
    setActiveIndex(-1);
    onSearch?.(query.trim());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const picked = suggestions[activeIndex];
    if (showList && picked) {
      setOpen(false);
      router.push(picked.href);
      return;
    }
    if (query.trim()) submitQuery();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
      return;
    }
    if (!suggestions.length) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => (index + 1) % suggestions.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) =>
        index <= 0 ? suggestions.length - 1 : index - 1
      );
    }
  };

  const optionId = (index: number) => `${listboxId}-option-${index}`;

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

        <div
          className={cn('vibe-prompt-input-shell', showList && 'is-open')}
        >
          <form onSubmit={handleSubmit} role="search">
            <div className="vibe-prompt-input-view">
              <Terminal className="vibe-prompt-input-icon" aria-hidden="true" />
              <label className="sr-only" htmlFor="vibe-prompt-input">
                {copy.inputLabel}
              </label>
              <input
                id="vibe-prompt-input"
                type="search"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={showList}
                aria-controls={listboxId}
                aria-activedescendant={
                  showList && activeIndex >= 0
                    ? optionId(activeIndex)
                    : undefined
                }
                value={query}
                onChange={(event) => {
                  const next = event.target.value;
                  setQuery(next);
                  setOpen(true);
                  setActiveIndex(-1);
                  if (!next.trim()) onSearch?.('');
                }}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                onKeyDown={handleKeyDown}
                placeholder={copy.placeholder}
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="submit"
                disabled={!query.trim()}
                aria-label={copy.inputLabel}
              >
                <ArrowUp className="size-5" aria-hidden="true" />
              </button>
            </div>
          </form>

          {showList && (
            <div className="vibe-prompt-results">
              <ul id={listboxId} role="listbox" aria-label={copy.inputLabel}>
                {suggestions.map((product, index) => (
                  <li
                    key={product.slug}
                    id={optionId(index)}
                    role="option"
                    aria-selected={index === activeIndex}
                  >
                    <Link
                      href={product.href}
                      tabIndex={-1}
                      className={cn(index === activeIndex && 'is-active')}
                      // Keep focus in the input so blur doesn't close the
                      // list before the click lands.
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => setOpen(false)}
                    >
                      <span className="vibe-prompt-result-name">
                        {product.name}
                      </span>
                      {product.categoryName && (
                        <span className="vibe-prompt-result-meta">
                          {product.categoryName}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
              {suggestions.length === 0 ? (
                <p className="vibe-prompt-results-empty">{copy.noResults}</p>
              ) : (
                <button
                  type="button"
                  className="vibe-prompt-results-all"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={submitQuery}
                >
                  <Search className="size-3.5" aria-hidden="true" />
                  {copy.viewAll(matches.length)}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
