import Img from './Img.jsx';
import { CONTACT as C } from '../config/contact.js';
// Short contact teaser on the home page; the full page lives at /contact.
export default function Contact() {
  return (
    <section id="contact">
      <div className="wrap two-col">
        <div className="frame"><Img src="/images/portrait-purple.jpg" alt="Bride portrait" /></div>
        <div>
          <div className="eyebrow">Get in touch</div>
          <h2>Let's talk about your date.</h2>
          <p className="muted">Tell us the date and venue and we'll reply with availability and a package that fits.</p>
          <div className="contact-links">
            <a href={'tel:+' + C.whatsappNumber}>Call us <span>{C.phone}</span></a>
            <a href={'mailto:' + C.email}>Email us <span>{C.email}</span></a>
            <a href={C.instagramUrl} target="_blank" rel="noreferrer">Instagram <span>{C.instagram}</span></a>
          </div>
          <a href="/contact" className="btn btn-dark" style={{ marginTop: 28 }}>Open contact page</a>
        </div>
      </div>
    </section>
  );
}
