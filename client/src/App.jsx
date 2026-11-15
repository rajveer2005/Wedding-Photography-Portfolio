import { useEffect, useState, useCallback } from 'react';
import { getMedia } from './api.js';
import { DEFAULT_MEDIA } from './config/defaultMedia.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Studio from './components/Studio.jsx';
import Portfolio from './components/Portfolio.jsx';
import Featured from './components/Featured.jsx';
import Films from './components/Films.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Lightbox from './components/Lightbox.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import ContactPage from './components/ContactPage.jsx';
import Admin from './components/Admin.jsx';

export default function App() {
  const [media, setMedia] = useState([]);
  const [box, setBox] = useState(null);
  const reload = useCallback(() => getMedia().then((l) => setMedia(l.length ? l : DEFAULT_MEDIA)).catch(() => setMedia(DEFAULT_MEDIA)), []);
  useEffect(() => { reload(); }, [reload]);
  useEffect(() => { const k = (e) => e.key === 'Escape' && setBox(null); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, []);
  const path = window.location.pathname;
  if (path.startsWith('/admin')) return <Admin />;
  if (path.startsWith('/contact')) return <ContactPage />;
  const by = (s) => media.filter((m) => m.section === s);
  return (
    <>
      <Header />
      <Hero items={by('hero')} />
      <Studio />
      <Portfolio items={by('portfolio')} onOpen={setBox} />
      <Featured items={by('featured')} />
      <Films items={by('films')} onOpen={setBox} />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <Lightbox item={box} onClose={() => setBox(null)} />
    </>
  );
}
