import Img, { withFallback } from './Img.jsx';
export default function Featured({ items }) {
  const list = withFallback(items, 3);
  return (
    <section className="tinted" id="weddings">
      <div className="wrap">
        <div className="head"><div className="eyebrow">Featured</div><h2>Recent weddings</h2></div>
        <div className="cards">{list.map((m) => (
          <article className="card" key={m._id}>
            <div className="card-img"><Img src={m.url} alt={m.title} /></div>
            <div className="card-body"><small>{m.caption || 'Wedding story'}</small><h3>{m.title || 'Your wedding'}</h3><a href="/contact">Enquire →</a></div>
          </article>))}
        </div>
      </div>
    </section>
  );
}
