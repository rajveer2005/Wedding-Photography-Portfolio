export default function Lightbox({ item, onClose }) {
  if (!item) return null;
  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lb-close">CLOSE ✕</button>
      {item.type === 'video' ? <video src={item.url} controls autoPlay onClick={(e) => e.stopPropagation()} /> : <img src={item.url} alt="" onClick={(e) => e.stopPropagation()} />}
    </div>
  );
}
