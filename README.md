# One Soul Media — MERN website

MongoDB + Express + React (Vite) + Node. Styled after houseontheclouds.com.

## Folder map (edit each part separately)
| What | Where |
|---|---|
| Database connection | `server/config/db.js` (+ `MONGO_URI` in `server/.env`) |
| Database model (fields) | `server/models/Media.js` |
| Starter data | `server/seed.js` |
| API / upload / replace / delete | `server/routes/media.js` |
| Admin login | `server/routes/auth.js` |
| Website pages (JS) | `client/src/components/*.jsx` |
| Styles (CSS, one file per area) | `client/src/styles/` (`base.css` has colors + premium background) |
| Contact details (phone, email, Instagram, hours) | `client/src/config/contact.js` |
| Contact page + WhatsApp icon | `client/src/components/ContactPage.jsx`, `WhatsAppButton.jsx` |
| Your photos & logo | `client/public/images/` |
| Uploaded photos/videos | `server/uploads/` |

## Run it
1. Install Node 18+ and MongoDB (or use a free MongoDB Atlas URI).
2. `npm run install-all`
3. Copy `server/.env.example` to `server/.env`. The example points to the local `OneSoul_Media` database; MongoDB creates it automatically when the app first writes data. If using Atlas, replace `MONGO_URI`. **Admin login: `admin@onesoulmedia.com` / `OneSoul@2026`** — change `ADMIN_EMAIL`, `ADMIN_PASSWORD` and `JWT_SECRET` in `server/.env` before going live.
4. (Recommended) Turn on email verification — see *Admin email verification* below.
5. `npm run seed` (loads starter content: your photos + 3 sample videos)
6. **`node start.js`** → starts backend and frontend together (installs packages on first run). Site at http://localhost:5173, admin at http://localhost:5173/admin. Press Ctrl+C to stop both. (`npm run dev` still works too.)

## Admin email verification
Admin access has two steps: **(1)** email + password, **(2)** a 6-digit code that is **emailed to `OWNER_EMAIL`** (your mail, set in `server/.env`). Nobody gets in unless you give them that code. Wrong codes lock after 5 tries; codes expire in 10 minutes. On the login screen, **"Need access? Send a request"** emails you the person's name and email.

To make the emails actually send (Gmail):
1. Google Account → Security → turn on 2-Step Verification → **App passwords** → create one.
2. In `server/.env` set `SMTP_USER=your@gmail.com` and `SMTP_PASS=<the 16-character app password>` (`OWNER_EMAIL` is where codes arrive).
3. Restart the server.

Until `SMTP_USER`/`SMTP_PASS` are filled in, codes are printed in the server terminal instead (fine for testing on your own computer, not for a live site).

## Admin panel (/admin)
Open it from the **Menu** dropdown (top-right) → *Admin login* (there is no admin link on the page itself). Sign in, enter the emailed code, then then **add** photos/videos (upload or paste a URL) to any section, **replace** a file, rename a title, or **delete**. Empty sections show an elegant One Soul Media placeholder (no random stock photos).

## Videos
The **Films** section shows 3 videos. Log in to `/admin` → *Films (videos)* → **Replace video** (upload an MP4) or **Link** (paste a video URL such as a Cloudinary/S3 link). The 3 starter films (3 min each, `client/public/videos/`) are slideshows made from your photos; swap them for your own wedding films.

If the database is empty or the server isn't running, the site shows built-in content from `client/src/config/defaultMedia.js` so it is never blank.

## Contact page
`/contact` shows your details and a quick enquiry form that sends via WhatsApp or email. The green WhatsApp icon (bottom-right on every page) opens this page. Change numbers/emails in `client/src/config/contact.js`.

## Go live
`npm run build` then `npm start` (Express serves the built site on port 5000). Host on Render/Railway + MongoDB Atlas. For permanent media storage on free hosts, point uploads to Cloudinary or S3 (the `url` field already accepts any https link).
