import type { Metadata } from 'next';
import { NewsList } from '@/components/NewsList';
import { PageMedia } from '@/components/PageMedia';

export const metadata: Metadata = {
  title: 'News',
  description: 'The latest South African comedy news: announcements, venues, festivals and the comics to watch.',
};

export default function NewsPage() {
  return (
    <>
      <section className="page-head has-media">
        <PageMedia src="/img/neon.jpg" priority />
        <div className="container">
          <span className="eyebrow enter" style={{ '--i': 0 } as React.CSSProperties}>News</span>
          <h1 className="enter" style={{ '--i': 1 } as React.CSSProperties}>Hot off the mic.</h1>
          <p className="enter" style={{ '--i': 2 } as React.CSSProperties}>Announcements, venue drama, festival line-ups and who&apos;s selling out where. Roughly 40% more accurate than the group chat.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container"><NewsList /></div>
      </section>
    </>
  );
}
