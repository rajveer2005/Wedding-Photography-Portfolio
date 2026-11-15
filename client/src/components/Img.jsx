import { useState } from 'react';
// Elegant branded placeholder - shown when a section has no photo yet (no random stock photos).
export function Placeholder() {
  return <div className="ph"><img src="/images/logo.png" alt="" /><span>One Soul Media</span></div>;
}
export default function Img({ src, alt = '', ...rest }) {
  const [bad, setBad] = useState(false);
  if (!src || bad) return <Placeholder />;
  return <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} {...rest} />;
}
// Real items, or n placeholders when the section is empty.
export const withFallback = (items = [], n) =>
  items.length ? items : Array.from({ length: n }, (_, i) => ({ _id: 'ph' + i, type: 'image', url: '', title: '', caption: '' }));
