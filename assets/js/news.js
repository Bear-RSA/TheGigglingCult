/* News page: topic-filtered listing, or a single article via ?article=slug */
(() => {
  const { NEWS } = window.TGC;
  const { qs, esc, fmt, I, renderNewsCard, chipGroup, swap, param, setParam } = window.UI;

  const slug = param('article');
  const article = NEWS.find((n) => n.slug === slug);

  if (article) {
    qs('#news-list').hidden = true;
    qs('#news-article').hidden = false;
    document.title = `${article.title} — The Giggling Cult`;
    qs('#article-body').innerHTML = `
      <a class="btn btn-soft btn-sm enter" style="--i:0" href="news.html">${I.left} All news</a>
      <div class="nc-meta enter" style="--i:1;display:flex;gap:10px;align-items:center;margin-top:28px;font-size:13px;color:var(--text-3)">
        <span class="tag tag-accent">${esc(article.category)}</span><span>${fmt.long(article.date)}</span><span>·</span><span>${article.readTime} min read</span>
      </div>
      <h1 class="enter" style="--i:2">${esc(article.title)}</h1>
      <p class="body enter" style="--i:3;font-size:20px;color:var(--text)">${esc(article.excerpt)}</p>
      <p class="body enter" style="--i:4">${esc(article.body)}</p>`;
    qs('#article-more').innerHTML = NEWS.filter((n) => n !== article).slice(0, 3).map((n, i) => renderNewsCard(n, i)).join('');
    return;
  }

  /* ---------- listing ---------- */
  const topics = [...new Set(NEWS.map((n) => n.category))];
  qs('#topic-chips').innerHTML = `
    <button class="chip" data-value="all" aria-pressed="true">All</button>
    ${topics.map((t) => `<button class="chip" data-value="${esc(t)}">${esc(t)}</button>`).join('')}`;

  let topic = 'all';
  const render = () => {
    const list = NEWS.filter((n) => topic === 'all' || n.category === topic);
    qs('#filter-result').textContent = `${list.length} article${list.length === 1 ? '' : 's'}${topic === 'all' ? '' : ` · ${topic}`}`;
    swap(qs('#news-grid'), list.map((n, i) => renderNewsCard(n, i, i === 0 && topic === 'all')).join(''));
  };
  chipGroup(qs('#topic-chips'), (v) => { topic = v; render(); });
  render();
})();
