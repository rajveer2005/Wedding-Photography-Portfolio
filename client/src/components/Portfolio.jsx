import Img, { withFallback } from './Img.jsx';
export default function Portfolio({ items, onOpen }) {
  const list = withFallback(items, 8);
  return (
    <section id="portfolio">
      <div className="wrap">
        <div className="head"><div className="eyebrow">Portfolio</div><h2>Moments, unposed.</h2><p>Click any frame for a closer look.</p></div>
        <div className="masonry">{list.map((m) => (
          <figure key={m._id} onClick={() => m.url && onOpen(m)}>
            {m.type === 'video' ? <video src={m.url + '#t=1'} preload="metadata" muted playsInline /> : <Img src={m.url} alt={m.title} />}
            {m.title && <figcaption>{m.title}</figcaption>}
          </figure>))}
        </div>
      </div>
    </section>
  );
}
