import { CircleHelp } from 'lucide-react';

import { m } from '@/paraglide/messages.js';

export interface HomeFaqItem {
  question: string;
  answer: string;
}

const HOME_FAQ_KEYS = [
  'live',
  'different',
  'availability',
  'interaction',
  'account',
  'developer',
  'compare',
  'why',
] as const;

export function getHomeFaqItems(): HomeFaqItem[] {
  return HOME_FAQ_KEYS.map((key) => ({
    question: m[`catalog.home_faq.${key}.question`](),
    answer: m[`catalog.home_faq.${key}.answer`](),
  }));
}

export function AiHomeFaq() {
  const items = getHomeFaqItems();

  return (
    <section
      className="ai-index-shell ai-index-section ai-home-faq"
      id="faq"
      aria-labelledby="home-faq-title"
    >
      <div className="ai-index-section-head">
        <p className="ai-index-eyebrow">{m['catalog.home_faq.eyebrow']()}</p>
        <h2 id="home-faq-title" className="ai-index-section-title">
          {m['catalog.home_faq.title']()}
        </h2>
        <p className="ai-index-section-description">
          {m['catalog.home_faq.description']()}
        </p>
      </div>
      <div className="ai-home-faq-list">
        {items.map((item, index) => (
          <details key={item.question} open={index === 0}>
            <summary>
              <CircleHelp className="size-4" aria-hidden="true" />
              <span>{item.question}</span>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
