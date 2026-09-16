import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ComediansGrid } from '@/components/ComediansGrid';
import { PageMedia } from '@/components/PageMedia';

export const metadata: Metadata = {
  title: 'Comedians A–Z',
  description: 'Every South African stand-up comedian on The Giggling Cult, A to Z. Bios, provinces, social links and upcoming shows.',
};

export default function ComediansPage() {
  return (
    <>
      <section className="page-head has-media">
        <PageMedia src="/img/hero.jpg" priority />
        <div className="container">
          <span className="eyebrow enter" style={{ '--i': 0 } as React.CSSProperties}>Comedians</span>
          <h1 className="enter" style={{ '--i': 1 } as React.CSSProperties}>The congregation, A to Z.</h1>
          <p className="enter" style={{ '--i': 2 } as React.CSSProperties}>Every comic on the platform: the household names, the club regulars, and the newcomers we&apos;re betting on. Tap a letter to jump, tap a face for the full confession.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Suspense><ComediansGrid /></Suspense>
        </div>
      </section>
    </>
  );
}
