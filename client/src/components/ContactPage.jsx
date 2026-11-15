import { useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { CONTACT as C } from '../config/contact.js';

// Full contact page at /contact: details + enquiry form that sends via WhatsApp or email.
export default function ContactPage() {
  const [f, setF] = useState({ name: '', date: '', venue: '', note: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const text = `${C.intro}\nName: ${f.name}\nWedding date: ${f.date}\nVenue / city: ${f.venue}\n${f.note}`;
  const rows = [
    ['Call', C.phone, 'tel:+' + C.whatsappNumber],
    ['WhatsApp', 'Chat with us', `https://wa.me/${C.whatsappNumber}?text=${encodeURIComponent(C.intro)}`],
    ['Email', C.email, 'mailto:' + C.email],
    ['Instagram', C.instagram, C.instagramUrl],
    ['Studio', C.city, null],
    ['Hours', C.hours, null]
  ];
  return (
    <>
      <Header solid />
      <main className="contact-page">
        <div className="wrap">
          <div className="head"><div className="eyebrow">Contact us</div><h2>Let's plan your wedding story.</h2><p>Share your date and venue — we usually reply within a day.</p></div>
          <div className="contact-grid">
            <div className="info">{rows.map(([k, v, href]) => {
              const inner = <><small>{k}</small><b>{v}</b></>;
              return href ? <a key={k} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="info-row">{inner}<i>→</i></a> : <div key={k} className="info-row">{inner}</div>;
            })}</div>
            <form className="enquiry" onSubmit={(e) => e.preventDefault()}>
              <h3>Quick enquiry</h3>
              <input placeholder="Your name" value={f.name} onChange={set('name')} />
              <input placeholder="Wedding date" value={f.date} onChange={set('date')} />
              <input placeholder="Venue / city" value={f.venue} onChange={set('venue')} />
              <textarea rows="4" placeholder="Anything else we should know?" value={f.note} onChange={set('note')} />
              <a className="btn btn-dark" target="_blank" rel="noreferrer" href={`https://wa.me/${C.whatsappNumber}?text=${encodeURIComponent(text)}`}>Send on WhatsApp</a>
              <a className="btn btn-line" href={`mailto:${C.email}?subject=${encodeURIComponent('Wedding enquiry')}&body=${encodeURIComponent(text)}`}>Send by email</a>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
