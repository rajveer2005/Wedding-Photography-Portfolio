// Shown automatically if the database is empty or the server is not running,
// so the website is never blank. Once you seed/add media in MongoDB, that takes over.
const I = (n) => `/images/${n}.jpg`;
const mk = (section, list) => list.map((x, i) => ({ _id: `d-${section}-${i}`, section, order: i, type: 'image', title: '', caption: '', ...x }));
export const DEFAULT_MEDIA = [
  ...mk('hero', ['portrait-purple', 'portrait-pillar'].map((n) => ({ url: I(n) }))),
  ...mk('portfolio', ['bw-2', 'bride-1', 'bw-1', 'bride-2', 'bw-3', 'portrait-purple', 'bw-4', 'bride-3', 'portrait-pillar', 'bw-6', 'bw-5', 'bw-7', 'bride-4', 'bw-8', 'bw-9', 'bride-5'].map((n) => ({ url: I(n) }))),
  ...mk('featured', [
    { url: I('bride-3'), title: 'Sonali', caption: 'Bride story · 2026' },
    { url: I('portrait-pillar'), title: 'Traditional portraits', caption: 'Pune' },
    { url: I('portrait-purple'), title: 'Sonali', caption: 'Portrait collection' }
  ]),
  ...mk('films', [1, 2, 3].map((n) => ({ type: 'video', url: `/videos/film-${n}.mp4`, title: `Wedding Film ${n}`, caption: 'Sample film · 3 min' })))
];
