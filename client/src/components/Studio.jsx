import Img from './Img.jsx';
export default function Studio() {
  return (
    <section className="studio" id="studio">
      <div className="wrap two-col">
        <div className="frame"><Img src="/images/portrait-pillar.jpg" alt="Traditional bridal portrait" /></div>
        <div>
          <div className="eyebrow">The Studio</div>
          <h2>We don't just document days — we hold on to feelings.</h2>
          <p className="lead">“Somewhere between the vows and the last dance, there's a moment only your wedding has. We spend all day chasing it.”</p>
          <p className="muted">One Soul Media is a Pune-based collective of photographers, filmmakers and editors working weddings across Maharashtra and beyond.</p>
          <div className="stats"><div><b>180+</b><span>Weddings</span></div><div><b>9</b><span>Cities</span></div><div><b>5</b><span>Years</span></div></div>
        </div>
      </div>
    </section>
  );
}
