/* SUBSTACK FEED */

(async () => {
  const list = document.getElementById('writingList');
  if (!list) return;

  const FEED_URL  = 'https://bylinnea.substack.com/feed';
  const PROXY_URL = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(FEED_URL);
  const FALLBACK_URL = 'https://bylinnea.substack.com';

  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));

  const stripHtml = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html || '';
    return div.textContent || div.innerText || '';
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  try {
    const res = await fetch(PROXY_URL);
    if (!res.ok) throw new Error('Feed request failed: ' + res.status);

    const data = await res.json();
    if (data.status !== 'ok' || !Array.isArray(data.items) || data.items.length === 0) {
      throw new Error('No posts in feed response');
    }

    const posts = data.items.slice(0, 3);

    list.innerHTML = posts.map((post) => {
      const title   = escapeHtml(post.title || 'Untitled');
      const link    = escapeHtml(post.link || FALLBACK_URL);
      const date    = escapeHtml(formatDate(post.pubDate));
      const excerpt = escapeHtml(stripHtml(post.description).slice(0, 140).trim());

      return `
        <a class="writing-post" href="${link}" target="_blank" rel="noopener">
          <div class="writing-post-main">
            <span class="writing-post-title">${title}</span>
            <span class="writing-post-excerpt">${excerpt}${excerpt.length >= 140 ? '…' : ''}</span>
          </div>
          <span class="writing-post-date">${date}</span>
        </a>`;
    }).join('');
  } catch (err) {
    list.innerHTML = `<p class="writing-status writing-status--error">
      Couldn't load recent posts right now. See them directly on
      <a href="${FALLBACK_URL}" target="_blank" rel="noopener">Substack</a>.
    </p>`;
  }
})();
