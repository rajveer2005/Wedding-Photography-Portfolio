import Img, { withFallback } from './Img.jsx';
// Wedding films. Click a card to play it full-screen. Replace videos any time from /admin.
export default function Films({ items, onOpen }) {
  const list = withFallback(items, 3);
  return (
    <section id="films">
      <div className="wrap">
        <div className="head"><div className="eyebrow">Films</div><h2>Every wedding gets its own film.</h2><p>Story-led wedding films — press play to watch.</p></div>
        <div className="films">{list.map((m) => (
          <div className="film" key={m._id} onClick={() => m.url && onOpen(m)}>
            {m.type === 'video' ? <video src={m.url + '#t=2'} preload="metadata" muted playsInline /> : <Img src={m.url} alt={m.title} />}
            <div className="film-body"><span className="play">▶</span><h3>{m.title || 'Wedding film'}</h3><p>{m.caption}</p></div>
          </div>))}
        </div>
      </div>
    </section>
  );
}
