import { useEffect, useState } from 'react';
import { withFallback } from './Img.jsx';
// Full-screen auto-changing slideshow (photos come from the MongoDB "hero" section).
export default function Hero({ items }) {
  const slides = withFallback(items, 1);
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % slides.length), 5000); return () => clearInterval(t); }, [slides.length]);
  return (
    <section className="hero" id="top">
      {slides.map((s, k) => <div key={s._id} className={'hero-slide' + (k === i ? ' active' : '') + (s.url ? '' : ' empty')} style={s.url ? { backgroundImage: `url(${s.url})` } : undefined} />)}
      <div className="hero-content">
        <div className="eyebrow light">Pune · Wedding Photography & Films</div>
        <h1>Every wedding has <em>a soul</em>, we turn it into one cinema.</h1>
        <p>Candid, fine-art and cinematic coverage for weddings across India.</p>
        <div className="hero-actions"><a href="/contact" className="btn btn-solid">Enquire for your date</a><a href="#portfolio" className="btn btn-ghost">View portfolio</a></div>
      </div>
      {slides.length > 1 && <div className="hero-dots">{slides.map((s, k) => <button key={s._id} className={k === i ? 'active' : ''} onClick={() => setI(k)} aria-label={'Slide ' + (k + 1)} />)}</div>}
    </section>
  );
}
