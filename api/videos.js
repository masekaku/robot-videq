// api/videos.js
// Proxy endpoint for Doodstream API

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

  try {
    // Gunakan fetch bawaan jika ada, kalau tidak, import node-fetch
    let fetchFn = globalThis.fetch;
    if (!fetchFn) {
      const mod = await import('node-fetch');
      fetchFn = mod.default;
    }

    const apiKey = process.env.DOOD_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'DOOD_API_KEY not set in environment' });
    }

    const rawPage = Number(req.query.page ?? 1);
    const rawPer = Number(req.query.per_page ?? 10);
    const page = Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1;
    const per_page =
      Number.isFinite(rawPer) && rawPer > 0 && rawPer <= 100
        ? Math.floor(rawPer)
        : 10;

    const doodURL = `https://doodapi.com/api/file/list?key=${encodeURIComponent(apiKey)}&page=${page}&per_page=${per_page}`;
    const response = await fetchFn(doodURL, { method: 'GET' });

    if (!response.ok) {
      let bodyText = null;
      try {
        bodyText = await response.text();
      } catch (_) {}
      return res.status(response.status).json({
        error: 'Doodstream API error',
        status: response.status,
        statusText: response.statusText,
        body: bodyText,
      });
    }

    const data = await response.json();

    // Normalisasi struktur respons
    const files = data?.result?.files || data?.files || [];
    const total_pages = data?.result?.total_pages ?? data?.total_pages ?? null;

    return res.status(200).json({ files, total_pages, raw: data });
  } catch (error) {
    console.error('API proxy error:', error);
    return res
      .status(500)
      .json({ error: error?.message || 'Unknown error' });
  }
}