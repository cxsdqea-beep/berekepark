async function fetchYapxAlbum(albumId) {
  // Let's test fetching album details or API endpoints
  const urls = [
    `https://yapx.ru/album/${albumId}`,
    `https://yapx.ru/api/album/${albumId}`,
    `https://yapx.ru/ajax/album/${albumId}`,
    `https://yapx.ru/ajax/viewing/images?album_id=${albumId}&offset=10&count=20`,
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'X-Requested-With': 'XMLHttpRequest',
          'Referer': `https://yapx.ru/album/${albumId}`
        }
      });
      console.log(`URL: ${url} -> status: ${res.status}, type: ${res.headers.get('content-type')}`);
      const text = await res.text();
      console.log(`Length: ${text.length}, preview: ${text.slice(0, 200).replace(/\n/g, ' ')}`);
    } catch (e) {
      console.error(e.message);
    }
  }
}

fetchYapxAlbum('ePvSU');
