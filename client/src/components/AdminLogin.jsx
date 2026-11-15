import { useState } from 'react';
import { login, verifyCode, requestAccess } from '../api.js';

// Admin access: 1) email + password  2) 6-digit code that is emailed to the site owner.
// "Request access" lets someone ask the owner for permission by email.
export default function AdminLogin({ onDone }) {
  const [step, setStep] = useState('creds'); // creds | code | request
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [challenge, setChallenge] = useState(null);
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const run = async (fn) => { setBusy(true); setMsg(''); try { await fn(); } catch (e) { setMsg(e.message); } setBusy(false); };

  const submitCreds = (e) => { e.preventDefault(); run(async () => { const r = await login(email, pw); setChallenge(r); setStep('code'); setMsg(r.sent ? '' : 'Email is not set up on the server, so the code was printed in the server terminal.'); }); };
  const submitCode = (e) => { e.preventDefault(); run(async () => { const { token } = await verifyCode(challenge.challengeId, code); localStorage.setItem('osm_token', token); onDone(); }); };
  const submitRequest = (e) => { e.preventDefault(); run(async () => { await requestAccess(name, email); setMsg('Request sent. The site owner has been emailed and will contact you.'); }); };

  return (
    <div className="admin-login">
      {step === 'creds' && (
        <form onSubmit={submitCreds}>
          <img src="/images/logo.png" alt="" /><h2>Admin login</h2><p className="note">Step 1 of 2 — sign in</p>
          <input type="email" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} required />
          <button className="btn btn-dark" disabled={busy}>{busy ? 'Checking…' : 'Continue'}</button>
          <p className="note err">{msg}</p>
          <button type="button" className="alt" onClick={() => { setStep('request'); setMsg(''); }}>Need access? Send a request</button>
          <a href="/">← Back to site</a>
        </form>
      )}
      {step === 'code' && (
        <form onSubmit={submitCode}>
          <img src="/images/logo.png" alt="" /><h2>Verify access</h2>
          <p className="note">Step 2 of 2 — a 6-digit code was emailed to the site owner. Enter it to continue (valid 10 minutes).</p>
          <input inputMode="numeric" maxLength="6" placeholder="6-digit code" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} required />
          <button className="btn btn-dark" disabled={busy || code.length !== 6}>{busy ? 'Verifying…' : 'Verify & open admin'}</button>
          <p className="note err">{msg}</p>
          <button type="button" className="alt" onClick={() => { setStep('creds'); setCode(''); setMsg(''); }}>← Start again</button>
        </form>
      )}
      {step === 'request' && (
        <form onSubmit={submitRequest}>
          <img src="/images/logo.png" alt="" /><h2>Request access</h2><p className="note">The site owner receives an email and decides whether to give you access.</p>
          <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button className="btn btn-dark" disabled={busy}>{busy ? 'Sending…' : 'Send request'}</button>
          <p className="note err">{msg}</p>
          <button type="button" className="alt" onClick={() => { setStep('creds'); setMsg(''); }}>← Back to login</button>
        </form>
      )}
    </div>
  );
}
