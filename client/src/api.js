// All calls to the Express/MongoDB backend live here.
const tok = () => localStorage.getItem('osm_token');
const auth = () => ({ Authorization: 'Bearer ' + tok() });
const json = async (r) => { const d = await r.json().catch(() => ({})); if (!r.ok) throw new Error(d.error || 'Request failed'); return d; };

export const getMedia = () => fetch('/api/media').then(json);
// Admin sign-in is 2 steps: login (email+password) -> a code is emailed to the owner -> verifyCode
export const login = (email, password) => fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }).then(json);
export const verifyCode = (challengeId, code) => fetch('/api/auth/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ challengeId, code }) }).then(json);
export const requestAccess = (name, email) => fetch('/api/auth/request-access', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email }) }).then(json);
export const addMedia = (form) => fetch('/api/media', { method: 'POST', headers: auth(), body: form }).then(json);
export const updateMedia = (id, form) => fetch('/api/media/' + id, { method: 'PUT', headers: auth(), body: form }).then(json);
export const deleteMedia = (id) => fetch('/api/media/' + id, { method: 'DELETE', headers: auth() }).then(json);
