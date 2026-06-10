export default async function handler(req, res) {
  const ua = (req.headers['user-agent'] || '').toLowerCase();
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();

  const botUAs = [
    'facebookexternalhit', 'facebot', 'facebookbot',
    'adsbot', 'googlebot', 'bingbot', 'twitterbot',
    'linkedinbot', 'slackbot', 'whatsapp', 'telegrambot',
    'crawler', 'spider', 'headless', 'phantom', 'python',
    'curl', 'wget', 'java/', 'apache-httpclient'
  ];

  const metaIPs = [
    '66.220.', '69.63.', '69.171.', '173.252.',
    '31.13.', '157.240.', '179.60.', '204.15.'
  ];

  const isBot = botUAs.some(b => ua.includes(b));
  const isMeta = metaIPs.some(r => ip.startsWith(r));

  if (isBot || isMeta) {
    res.writeHead(302, { Location: 'https://grupojogadorcaro.com.br/quem-e-jota' });
    res.end();
    return;
  }

  // ── Calendário de links por dia ──────────────────────────────
  const START_DATE = new Date('2026-05-19T00:00:00-03:00'); // Dia 1 = 19/05

  const linksPorDia = {
    1: [
      'https://chat.whatsapp.com/DtenhMMyN6yElF2vnMLUxk', // 701
      'https://chat.whatsapp.com/E3uhzD0U3jg9JipOWYV5Sw', // 702
      'https://chat.whatsapp.com/Krd0FzZ9GmH2Nq8K9BEfR7', // 703
      'https://chat.whatsapp.com/EAogaedZmUQ5X7C9uFh6V2', // 704
    ],
    2: [
      'https://chat.whatsapp.com/Bm1AKvgOTyF6FggW6KA4zm', // 706
      'https://chat.whatsapp.com/E1awsmxrlN08VhBo8z6LCC', // 707
      'https://chat.whatsapp.com/GfIVpqIRib31PtJuplyfxm', // 708
      'https://chat.whatsapp.com/JKCG8Ms1VXi1wDi5gheaBv', // 709
    ],
    3: [
      'https://chat.whatsapp.com/HX8Eh87WZ7h6cwMqnsNQmm', // 714
      'https://chat.whatsapp.com/FQH4sVDKle6DRxM8qHTHV5', // 716
      'https://chat.whatsapp.com/CwG5TOn5CDOHnT2DxwrHz2', // 710
      'https://chat.whatsapp.com/KtIxWO1CV3E6uXgwX3QrEW', // 705
    ],
  };
  // ─────────────────────────────────────────────────────────────

  const now = new Date();
  const diffMs = now - START_DATE;
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;

  // Cicla entre dia 1, 2, 3, 1, 2, 3...
  const totalDias = Object.keys(linksPorDia).length;
  const diaAtual = ((diffDias - 1) % totalDias) + 1;
  const links = linksPorDia[diaAtual];

  const link = links[Math.floor(Math.random() * links.length)];

  res.writeHead(302, { Location: link });
  res.end();
}
