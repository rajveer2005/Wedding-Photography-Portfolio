import { useEffect, useState } from 'react';
import { getMedia, addMedia, updateMedia, deleteMedia } from '../api.js';
import AdminLogin from './AdminLogin.jsx';
const SECTIONS = { hero: 'Hero slideshow', portfolio: 'Portfolio', featured: 'Featured weddings', films: 'Films (videos)' };

// Admin panel at /admin — add, replace, rename and delete photos & videos.
export default function Admin() {
  const [authed, setAuthed] = useState(!!localStorage.getItem('osm_token'));
  const [items, setItems] = useState([]);
  const [section, setSection] = useState('portfolio');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [files, setFiles] = useState([]);
  const [msg, setMsg] = useState('');
  const load = () => getMedia().then(setItems).catch((e) => setMsg(e.message));
  useEffect(() => { if (authed) load(); }, [authed]);
  const run = async (fn, ok) => { try { await fn(); setMsg(ok); load(); } catch (e) { setMsg(e.message); if (/authorised/.test(e.message)) { localStorage.removeItem('osm_token'); setAuthed(false); } } };

  if (!authed) return <AdminLogin onDone={() => setAuthed(true)} />;

  const add = () => run(async () => {
    const f = new FormData(); f.append('section', section); f.append('title', title); if (url) f.append('url', url); files.forEach((x) => f.append('files', x));
    await addMedia(f); setTitle(''); setUrl(''); setFiles([]);
  }, 'Added ✓');

  return (
    <div className="admin">
      <div className="admin-bar"><h2>Website media</h2><div><a href="/">View site</a><button onClick={() => { localStorage.removeItem('osm_token'); setAuthed(false); }}>Log out</button></div></div>
      <div className="admin-add">
        <h3>Add photos / videos</h3>
        <select value={section} onChange={(e) => setSection(e.target.value)}>{Object.entries(SECTIONS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        <input placeholder="Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="file" multiple accept="image/*,video/*" onChange={(e) => setFiles([...e.target.files])} />
        <small className="hint">Videos: MP4 recommended (up to 200MB). Use the Films section for your wedding films.</small>
        <input placeholder="…or paste an image/video URL" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button className="btn btn-dark" onClick={add} disabled={!files.length && !url}>Add to website</button>
        <span className="msg">{msg}</span>
      </div>
      {Object.entries(SECTIONS).map(([k, label]) => (
        <div key={k} className="admin-sec">
          <h3>{label} <small>({items.filter((i) => i.section === k).length})</small></h3>
          <div className="admin-grid">
            {items.filter((i) => i.section === k).map((m) => (
              <div className="admin-item" key={m._id}>
                {m.type === 'video' ? <video src={m.url + '#t=2'} muted preload="metadata" /> : <img src={m.url} alt="" />}
                <input defaultValue={m.title} placeholder="Title" onBlur={(e) => e.target.value !== m.title && run(() => { const f = new FormData(); f.append('title', e.target.value); return updateMedia(m._id, f); }, 'Saved ✓')} />
                <div className="row">
                  <label className="mini">{m.type === 'video' ? 'Replace video' : 'Replace'}<input type="file" hidden accept="image/*,video/*" onChange={(e) => e.target.files[0] && run(() => { const f = new FormData(); f.append('file', e.target.files[0]); return updateMedia(m._id, f); }, 'Replaced ✓')} /></label>
                  <button className="mini" onClick={() => { const u = prompt('Paste a new image or video link (https://...)'); if (u) run(() => { const f = new FormData(); f.append('url', u); return updateMedia(m._id, f); }, 'Link updated ✓'); }}>Link</button>
                  <button className="mini danger" onClick={() => confirm('Delete this item?') && run(() => deleteMedia(m._id), 'Deleted ✓')}>Delete</button>
                </div>
              </div>))}
            {!items.some((i) => i.section === k) && <p className="empty">Empty — the site shows random online photos here until you add yours.</p>}
          </div>
        </div>))}
    </div>
  );
}
