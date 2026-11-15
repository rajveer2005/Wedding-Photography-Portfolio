import { useEffect, useRef, useState } from 'react';
const items = [['Studio', '/#studio'], ['Portfolio', '/#portfolio'], ['Weddings', '/#weddings'], ['Films', '/#films'], ['Contact us', '/contact']];
// Top bar with a dropdown menu in the right corner (includes the Admin login option).
export default function Header({ solid: forceSolid = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  useEffect(() => {
    const sc = () => setScrolled(window.scrollY > 40);
    const away = (e) => box.current && !box.current.contains(e.target) && setOpen(false);
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('scroll', sc); document.addEventListener('mousedown', away); document.addEventListener('keydown', esc);
    return () => { window.removeEventListener('scroll', sc); document.removeEventListener('mousedown', away); document.removeEventListener('keydown', esc); };
  }, []);
  return (
    <header className={'site-header' + (scrolled || forceSolid ? ' solid' : '')}>
      <div className="wrap nav-inner">
        <a href="/" className="brand"><img src="/images/logo.png" alt="One Soul Media logo" /><span>One Soul Media<small>Every wedding has a soul</small></span></a>
        <div className="nav-right">
          <a href="/contact" className="nav-cta">Enquire</a>
          <div className="dd" ref={box}>
            <button className={'dd-btn' + (open ? ' open' : '')} onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="true">
              <span>Menu</span>
              <svg viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
            </button>
            <div className={'dd-panel' + (open ? ' open' : '')} role="menu">
              {items.map(([t, href], i) => (
                <a key={t} href={href} role="menuitem" onClick={() => setOpen(false)}><em>{String(i + 1).padStart(2, '0')}</em>{t}<i>→</i></a>
              ))}
              <div className="dd-sep" />
              <a href="/admin" role="menuitem" className="dd-admin" onClick={() => setOpen(false)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 9V7a5 5 0 00-10 0v2H5v12h14V9h-2zM9 7a3 3 0 016 0v2H9V7z" /></svg>Admin login<i>→</i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
