import { CONTACT as C } from '../config/contact.js';
export default function Footer() {
  return (
    <footer><div className="wrap foot">
      <span>© 2026 {C.brand}, {C.city.split(',')[0]}.</span>
      <span><a href={'tel:+' + C.whatsappNumber}>{C.phone}</a> · <a href={'mailto:' + C.email}>{C.email}</a></span>
    </div></footer>
  );
}
