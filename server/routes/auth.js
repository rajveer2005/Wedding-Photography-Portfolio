// Admin access = email + password, THEN a 6-digit code that is emailed to the site owner (OWNER_EMAIL).
// Someone who wants access can also send a request; the owner gets an email and decides.
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendMail } = require('../config/mailer');

const challenges = new Map(); // challengeId -> { hash, exp, tries }
const hits = new Map();       // "key:ip" -> [timestamps]
const sha = (s) => crypto.createHash('sha256').update(String(s)).digest('hex');
const owner = () => process.env.OWNER_EMAIL || process.env.ADMIN_EMAIL;
const limited = (key, max, windowMs) => {
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (list.length >= max) return true;
  list.push(now); hits.set(key, list); return false;
};

// Step 1 - check email + password, email a code to the owner
router.post('/login', async (req, res) => {
  if (limited('login:' + req.ip, 10, 15 * 60 * 1000)) return res.status(429).json({ error: 'Too many attempts. Try again later.' });
  const { email = '', password = '' } = req.body;
  if (email.trim().toLowerCase() !== process.env.ADMIN_EMAIL.toLowerCase() || password !== process.env.ADMIN_PASSWORD)
    return res.status(401).json({ error: 'Wrong email or password' });
  const code = String(crypto.randomInt(100000, 1000000));
  const challengeId = crypto.randomBytes(16).toString('hex');
  challenges.set(challengeId, { hash: sha(code), exp: Date.now() + 10 * 60 * 1000, tries: 0 });
  const sent = await sendMail({
    to: owner(),
    subject: 'One Soul Media - admin verification code',
    text: `Someone is signing in to the admin panel (IP ${req.ip}).\n\nVerification code: ${code}\n\nIt works for 10 minutes. Only share it with someone you want to give access to. If this was not you, change ADMIN_PASSWORD in server/.env.`
  });
  res.json({ challengeId, sent });
});

// Step 2 - enter the code from the owner's email to receive the access token
router.post('/verify', (req, res) => {
  const { challengeId, code = '' } = req.body;
  const c = challenges.get(challengeId);
  if (!c || c.exp < Date.now()) return res.status(400).json({ error: 'Code expired. Please sign in again.' });
  if (++c.tries > 5) { challenges.delete(challengeId); return res.status(429).json({ error: 'Too many wrong codes. Sign in again.' }); }
  if (sha(String(code).trim()) !== c.hash) return res.status(401).json({ error: 'Wrong code' });
  challenges.delete(challengeId);
  res.json({ token: jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '7d' }) });
});

// Optional - a visitor asks for access; the owner receives an email (nothing is granted automatically)
router.post('/request-access', async (req, res) => {
  if (limited('req:' + req.ip, 3, 60 * 60 * 1000)) return res.status(429).json({ error: 'Too many requests. Try again later.' });
  const name = String(req.body.name || '').slice(0, 80).trim();
  const email = String(req.body.email || '').slice(0, 120).trim();
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'Enter your name and a valid email' });
  const sent = await sendMail({ to: owner(), subject: 'One Soul Media - admin access request', text: `${name} (${email}) asked for admin access to your website.\n\nIf you want to allow it, share the admin login with them and, when they sign in, the verification code that arrives in this inbox.` });
  res.json({ ok: true, sent });
});

module.exports = router;
