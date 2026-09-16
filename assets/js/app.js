/* ==========================================================================
   The Giggling Cult — shared UI (nav, footer, cards, drawer, toast, helpers)
   ========================================================================== */

window.UI = (() => {
  const { PROVINCES, VENUES, EVENTS, TODAY, bySlug, upcomingFor, eventProvince, sameDay } = window.TGC;

  /* ---------- tiny helpers ---------- */
  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const DAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const fmt = {
    day: (d) => d.getDate(),
    mon: (d) => MONTHS[d.getMonth()],
    monLong: (d) => MONTHS_LONG[d.getMonth()],
    dow: (d) => DAYS[d.getDay()],
    dowLong: (d) => DAYS_LONG[d.getDay()],
    long: (d) => `${DAYS_LONG[d.getDay()]} ${d.getDate()} ${MONTHS_LONG[d.getMonth()]}`,
    short: (d) => `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`,
    relative: (d) => {
      const diff = Math.round((d - TODAY) / 86400000);
      if (diff === 0) return 'Tonight';
      if (diff === 1) return 'Tomorrow';
      if (diff === -1) return 'Yesterday';
      if (diff < 0) return `${-diff} days ago`;
      if (diff < 7) return DAYS_LONG[d.getDay()];
      return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
    },
    rand: (n) => `R${n}`,
    key: (d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
  };

  /* ---------- icons ---------- */
  const I = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.2 8.3L23 22h-6.6l-5.2-6.8L5.3 22H2.1l7.7-8.8L1.5 2h6.8l4.7 6.2L18.9 2zm-1.1 18h1.8L7.3 3.9H5.4L17.8 20z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 2c.3 2.4 1.7 3.9 4.1 4.1v3.4c-1.5 0-2.9-.5-4.1-1.3v6.4a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v3.5a2.5 2.5 0 1 0 1.6 2.3V2h3.4z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a2.9 2.9 0 0 0-2-2C19.2 4.7 12 4.7 12 4.7s-7.2 0-9 .5a2.9 2.9 0 0 0-2 2C.5 9 .5 12 .5 12s0 3 .5 4.8a2.9 2.9 0 0 0 2 2c1.8.5 9 .5 9 .5s7.2 0 9-.5a2.9 2.9 0 0 0 2-2c.5-1.8.5-4.8.5-4.8s0-3-.5-4.8zM9.7 15.1V8.9l6 3.1-6 3.1z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4.5 1.7-4.5 4.5V11H7v4h2.5v7h4v-7H17l.5-4H13.5V8.8c0-.5.2-.8.5-.8z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 8l9 6 9-6"/></svg>',
    ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9a2 2 0 0 0 0 6v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a2 2 0 0 0 0-6V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v3z"/><path d="M13 5v14" stroke-dasharray="2 3"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3l2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.5l-5.7 3 1.1-6.3L2.8 9.7l6.4-.9L12 3z"/></svg>',
    logo: '<svg class="brand-mark" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="13" stroke="currentColor" stroke-width="2.5"/><path d="M9.5 18c1.5 3.5 4 5 6.5 5s5-1.5 6.5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="11.5" cy="12" r="1.6" fill="currentColor"/><circle cx="20.5" cy="12" r="1.6" fill="currentColor"/></svg>',
  };

  const SOCIAL_URL = {
    instagram: (h) => `https://instagram.com/${h}`,
    x: (h) => `https://x.com/${h}`,
    tiktok: (h) => `https://tiktok.com/@${h}`,
    youtube: (h) => `https://youtube.com/${h}`,
    facebook: (h) => `https://facebook.com/${h}`,
  };
  const SOCIAL_LABEL = { instagram: 'Instagram', x: 'X', tiktok: 'TikTok', youtube: 'YouTube', facebook: 'Facebook' };

  /* ---------- avatars ---------- */
  const PALETTES = [
    ['#ffb08a', '#ff5d3a'], ['#ffe08a', '#f5a623'], ['#9be7ff', '#3aa0ff'], ['#c8ff9a', '#5ec93a'],
    ['#ffb3d9', '#ff4f9a'], ['#d9c2ff', '#8b5cf6'], ['#a6fff0', '#2dd4bf'], ['#ffd0a6', '#f97316'],
  ];
  const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
  // Photo: explicit `photo` field in data.js, else assets/img/comedians/<slug>.jpg.
  // If the file doesn't exist the <img> removes itself and the initials tile shows.
  const avatar = (c, cls = '') => {
    const [c1, c2] = PALETTES[hash(c.slug) % PALETTES.length];
    const src = c.photo || `assets/img/comedians/${c.slug}.jpg`;
    return `<span class="avatar ${cls}" style="--c1:${c1};--c2:${c2}" aria-hidden="true">${initials(c.name)}<img src="${esc(src)}" alt="" loading="lazy" decoding="async" onerror="this.remove()" onload="this.parentNode.classList.add('has-photo')"></span>`;
  };

  /* ---------- tag helpers ---------- */
  const provinceTag = (id) => `<span class="tag" data-province="${id}"><i class="dot"></i>${PROVINCES[id].short}</span>`;
  const TYPE_LABEL = { headline: 'Headline show', showcase: 'Showcase', openmic: 'Open mic', special: 'Special', festival: 'Festival', tour: 'Tour' };

  /* ---------- renderers ---------- */
  const renderSocials = (c) =>
    `<div class="socials">${Object.entries(c.socials).map(([k, h]) =>
      `<a class="social" href="${SOCIAL_URL[k](h)}" target="_blank" rel="noopener" aria-label="${esc(c.name)} on ${SOCIAL_LABEL[k]}" onclick="event.stopPropagation()">${I[k]}</a>`).join('')}</div>`;

  const renderEventCard = (e, i = 0) => {
    const v = VENUES[e.venue];
    const p = v.province;
    const isPast = e.date < TODAY;
    const isToday = sameDay(e.date, TODAY);
    return `
      <button class="card is-button event-card enter ${isPast ? 'is-past' : ''} ${isToday ? 'is-today' : ''}" style="--i:${i}" data-event="${e.id}">
        <div class="ec-top">
          <div class="event-date"><span class="d">${fmt.day(e.date)}</span><span class="m">${fmt.dow(e.date)} · ${fmt.mon(e.date)}</span></div>
          ${provinceTag(p)}
        </div>
        <h3>${esc(e.title)}</h3>
        <div class="event-meta">
          <span><strong>${esc(v.name)}</strong> · ${esc(v.area)}</span>
          <span>${e.time} · ${TYPE_LABEL[e.type]}</span>
        </div>
        <div class="event-lineup">${e.lineup.slice(0, 4).map((s) => `<span>${esc(bySlug[s].name)}</span>`).join('')}${e.lineup.length > 4 ? `<span>+${e.lineup.length - 4}</span>` : ''}</div>
        <div class="ec-foot">
          <span class="event-price">${e.soldOut ? '<span class="tag tag-soldout">Sold out</span>' : fmt.rand(e.price)}</span>
          <span class="small muted">Details ${I.arrow.replace('<svg', '<svg style="width:14px;height:14px;display:inline;vertical-align:-2px"')}</span>
        </div>
      </button>`;
  };

  const renderEventRow = (e, i = 0) => {
    const v = VENUES[e.venue];
    return `
      <button class="event-row enter" style="--i:${i}" data-event="${e.id}">
        <div class="event-date"><span class="d">${fmt.day(e.date)}</span><span class="m">${fmt.dow(e.date)}</span></div>
        <div>
          <h3>${esc(e.title)}</h3>
          <div class="event-meta">
            <span><strong>${esc(v.name)}</strong></span>
            <span>${e.time}</span>
            <span>${e.lineup.slice(0, 3).map((s) => esc(bySlug[s].name)).join(', ')}${e.lineup.length > 3 ? ` +${e.lineup.length - 3}` : ''}</span>
          </div>
        </div>
        <div class="er-right">
          ${provinceTag(v.province)}
          <span class="event-price">${e.soldOut ? '<span class="tag tag-soldout">Sold out</span>' : fmt.rand(e.price)}</span>
        </div>
      </button>`;
  };

  const renderMiniEvent = (e) => {
    const v = VENUES[e.venue];
    return `
      <button class="mini-event" data-event="${e.id}">
        <div class="event-date"><span class="d">${fmt.day(e.date)}</span><span class="m">${fmt.mon(e.date)}</span></div>
        <div>
          <div class="t">${esc(e.title)}</div>
          <div class="s">${esc(v.name)} · ${e.time}${e.soldOut ? ' · Sold out' : ''}</div>
        </div>
      </button>`;
  };

  const renderComedianCard = (c, i = 0) => {
    const shows = upcomingFor(c.slug).length;
    return `
      <button class="card is-button comedian-card enter" style="--i:${i}" data-comedian="${c.slug}">
        <div class="cc-top">
          ${avatar(c)}
          <div>
            <h3>${esc(c.name)}</h3>
            <div class="cc-sub">${provinceTag(c.province)}${c.upcoming ? '<span class="tag tag-rising">Rising</span>' : ''}</div>
          </div>
        </div>
        <p class="bio">${esc(c.bio)}</p>
        <div class="cc-foot">
          <span class="style-line">${shows ? `${shows} upcoming show${shows === 1 ? '' : 's'}` : 'Between gigs'}</span>
          ${renderSocials(c)}
        </div>
      </button>`;
  };

  const renderNewsCard = (n, i = 0, featured = false) => `
    <a class="card is-link news-card enter ${featured ? 'news-feature' : ''}" style="--i:${i}" href="news.html?article=${n.slug}">
      <div class="nc-meta"><span class="tag tag-accent">${esc(n.category)}</span><span>${fmt.short(n.date)}</span><span>·</span><span>${n.readTime} min read</span></div>
      <h3>${esc(n.title)}</h3>
      <p>${esc(n.excerpt)}</p>
      <span class="nc-foot">Read ${I.arrow}</span>
    </a>`;

  /* ---------- nav & footer ---------- */
  const NAV_LINKS = [
    ['index.html', 'Home'], ['events.html', 'Events'], ['comedians.html', 'Comedians'], ['news.html', 'News'],
  ];
  const currentPage = () => (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const mountChrome = () => {
    const page = currentPage();
    const navEl = qs('#site-nav');
    if (navEl) {
      navEl.className = 'nav';
      navEl.innerHTML = `
        <div class="container nav-inner">
          <a class="brand" href="index.html">${I.logo}<span>The Giggling Cult</span></a>
          <button class="nav-toggle icon-btn" aria-label="Menu" aria-expanded="false" aria-controls="nav-links">${I.menu}</button>
          <div class="nav-links" id="nav-links">
            ${NAV_LINKS.map(([href, label]) => `<a class="nav-link" href="${href}" ${page === href ? 'aria-current="page"' : ''}>${label}</a>`).join('')}
            <a class="btn btn-primary btn-sm nav-cta" href="join.html">Join the Cult</a>
          </div>
        </div>`;
      const toggle = qs('.nav-toggle', navEl);
      const links = qs('.nav-links', navEl);
      toggle.addEventListener('click', () => {
        const open = links.dataset.open !== 'true';
        links.dataset.open = open;
        toggle.setAttribute('aria-expanded', open);
      });
    }

    const footEl = qs('#site-footer');
    if (footEl) {
      footEl.className = 'footer';
      footEl.innerHTML = `
        <div class="container">
          <div class="footer-inner">
            <div>
              <a class="brand" href="index.html">${I.logo}<span>The Giggling Cult</span></a>
              <p>Every stand-up show in Mzansi, one calendar. Currently converting Gauteng, the Western Cape and KwaZulu-Natal. The rest of you: soon.</p>
            </div>
            <div><h4>Wander</h4><ul><li><a href="events.html">The calendar</a></li><li><a href="comedians.html">The congregation</a></li><li><a href="news.html">The goss</a></li></ul></div>
            <div><h4>Territories</h4><ul><li><a href="events.html?province=gp">Gauteng</a></li><li><a href="events.html?province=wc">Western Cape</a></li><li><a href="events.html?province=kzn">KwaZulu-Natal</a></li></ul></div>
            <div><h4>Enlist</h4><ul><li><a href="join.html?as=comedian">I'm funny (allegedly)</a></li><li><a href="join.html?as=audience">I just want to laugh</a></li><li><a href="mailto:hello@thegigglingcult.co.za">Talk to a human</a></li></ul></div>
          </div>
          <div class="footer-bottom"><span>© ${new Date().getFullYear()} The Giggling Cult · Made in South Africa</span><span>Powered by Mirai Stack</span></div>
        </div>`;
    }

    /* drawer + scrim + toast region */
    document.body.insertAdjacentHTML('beforeend', `
      <div class="scrim" id="scrim"></div>
      <aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <div class="drawer-head"><span class="eyebrow" id="drawer-kicker" style="margin:0"></span><button class="icon-btn" id="drawer-close" aria-label="Close">${I.close}</button></div>
        <div class="drawer-body" id="drawer-body"></div>
      </aside>
      <div class="toast-region" id="toasts"></div>`);
    qs('#scrim').addEventListener('click', drawer.close);
    qs('#drawer-close').addEventListener('click', drawer.close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') drawer.close(); });

    /* global delegation for comedian / event openers */
    document.addEventListener('click', (e) => {
      const c = e.target.closest('[data-comedian]');
      if (c) { openComedian(c.dataset.comedian); return; }
      const ev = e.target.closest('[data-event]');
      if (ev) { openEvent(ev.dataset.event); }
    });
  };

  /* ---------- drawer ---------- */
  let lastFocus = null;
  const drawer = {
    open(kicker, html) {
      lastFocus = document.activeElement;
      qs('#drawer-kicker').textContent = kicker;
      qs('#drawer-body').innerHTML = html;
      qs('#drawer').dataset.open = 'true';
      qs('#scrim').dataset.open = 'true';
      document.body.style.overflow = 'hidden';
      qs('#drawer').scrollTop = 0;
      qs('#drawer-close').focus({ preventScroll: true });
    },
    close() {
      const d = qs('#drawer');
      if (d.dataset.open !== 'true') return;
      d.dataset.open = 'false';
      qs('#scrim').dataset.open = 'false';
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    },
  };

  const openComedian = (slug) => {
    const c = bySlug[slug];
    if (!c) return;
    const shows = upcomingFor(slug);
    drawer.open('Comedian', `
      <div style="display:flex;gap:18px;align-items:center">
        ${avatar(c, 'avatar-lg')}
        <div>
          <h2 id="drawer-title">${esc(c.name)}</h2>
          <div class="cc-sub" style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap">${provinceTag(c.province)}<span class="tag">${esc(PROVINCES[c.province].city)}</span>${c.upcoming ? '<span class="tag tag-rising">Rising</span>' : ''}</div>
        </div>
      </div>
      <p class="lead">${esc(c.bio)}</p>
      <div class="drawer-section"><h4>Style</h4><p>${esc(c.style)}</p></div>
      <div class="drawer-section"><h4>Follow</h4>
        <div class="social-row">${Object.entries(c.socials).map(([k, h]) => `<a class="social-link" href="${SOCIAL_URL[k](h)}" target="_blank" rel="noopener">${I[k]}${SOCIAL_LABEL[k]}</a>`).join('')}</div>
      </div>
      <div class="drawer-section"><h4>Upcoming shows</h4>
        ${shows.length ? `<div class="lineup-list">${shows.map(renderMiniEvent).join('')}</div>` : '<p class="muted small">Nothing on the books. Probably “writing”.</p>'}
      </div>
      <a class="btn btn-ghost" href="events.html?view=comedian&comedian=${c.slug}">See their gigs on the calendar ${I.arrow}</a>
    `);
  };

  const openEvent = (id) => {
    const e = EVENTS.find((x) => x.id === id);
    if (!e) return;
    const v = VENUES[e.venue];
    drawer.open(TYPE_LABEL[e.type], `
      <div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">${provinceTag(v.province)}<span class="tag">${fmt.relative(e.date)}</span>${e.soldOut ? '<span class="tag tag-soldout">Sold out</span>' : ''}</div>
        <h2 id="drawer-title">${esc(e.title)}</h2>
      </div>
      ${e.blurb ? `<p class="lead">${esc(e.blurb)}</p>` : ''}
      <div class="drawer-section"><h4>When</h4><p><strong>${fmt.long(e.date)}</strong><br><span class="muted">Doors ${e.time}</span></p></div>
      <div class="drawer-section"><h4>Where</h4><p><strong>${esc(v.name)}</strong><br><span class="muted">${esc(v.area)} · ${PROVINCES[v.province].name}</span></p></div>
      <div class="drawer-section"><h4>Line-up</h4>
        <div class="lineup-list">${e.lineup.map((s) => { const c = bySlug[s]; return `<button class="lineup-item" data-comedian="${s}">${avatar(c)}<span class="name">${esc(c.name)}</span>${c.upcoming ? '<span class="tag tag-rising" style="margin-left:auto">Rising</span>' : ''}</button>`; }).join('')}</div>
      </div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
        ${e.soldOut ? `<button class="btn btn-ghost" disabled>Sold out</button>` : `<button class="btn btn-primary" id="drawer-ticket">${I.ticket}Tickets · ${fmt.rand(e.price)}</button>`}
        <span class="small muted">Ticket links arrive once the venues join the cult.</span>
      </div>
    `);
    const t = qs('#drawer-ticket');
    if (t) t.addEventListener('click', () => toast('Tickets coming soon. Practise your queueing.'));
  };

  /* ---------- toast ---------- */
  const toast = (msg) => {
    const region = qs('#toasts');
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `${I.check}<span>${esc(msg)}</span>`;
    region.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => { el.dataset.open = 'true'; }));
    setTimeout(() => {
      el.dataset.open = 'false';
      el.addEventListener('transitionend', () => el.remove(), { once: true });
    }, 2600);
  };

  /* ---------- segmented control ---------- */
  const segmented = (el, onChange) => {
    const ind = document.createElement('span');
    ind.className = 'seg-indicator';
    el.prepend(ind);
    const btns = qsa('.seg-btn', el);
    const move = (btn, instant = false) => {
      if (instant) ind.style.transition = 'none';
      ind.style.width = `${btn.offsetWidth}px`;
      ind.style.transform = `translateX(${btn.offsetLeft}px)`;
      if (instant) { ind.offsetHeight; ind.style.transition = ''; }
    };
    const set = (value, fire = true, instant = false) => {
      btns.forEach((b) => b.setAttribute('aria-pressed', b.dataset.value === value));
      const active = btns.find((b) => b.dataset.value === value) || btns[0];
      move(active, instant);
      if (fire) onChange(active.dataset.value);
    };
    btns.forEach((b) => b.addEventListener('click', () => set(b.dataset.value)));
    const remeasure = () => { const a = btns.find((b) => b.getAttribute('aria-pressed') === 'true'); if (a) move(a, true); };
    window.addEventListener('resize', remeasure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure); // widths shift once the display font lands
    const initial = btns.find((b) => b.getAttribute('aria-pressed') === 'true') || btns[0];
    set(initial.dataset.value, false, true);
    return { set };
  };

  /* ---------- chip group (single select) ---------- */
  const chipGroup = (el, onChange) => {
    const chips = qsa('.chip', el);
    const set = (value, fire = true) => {
      chips.forEach((c) => c.setAttribute('aria-pressed', c.dataset.value === value));
      if (fire) onChange(value);
    };
    chips.forEach((c) => c.addEventListener('click', () => set(c.dataset.value)));
    return { set };
  };

  const provinceChips = (allLabel = 'All provinces') => `
    <button class="chip" data-value="all" aria-pressed="true">${allLabel}</button>
    ${Object.values(PROVINCES).map((p) => `<button class="chip" data-value="${p.id}" data-province="${p.id}"><i class="dot"></i>${p.name}</button>`).join('')}`;

  /* swap content with a quick fade so re-renders never pop */
  const swap = (el, html) => {
    if (reducedMotion()) { el.innerHTML = html; return; }
    el.classList.add('is-switching');
    setTimeout(() => { el.innerHTML = html; el.classList.remove('is-switching'); }, 90);
  };

  const param = (k) => new URLSearchParams(location.search).get(k);
  const setParam = (k, v) => {
    const u = new URL(location.href);
    if (v == null || v === '' || v === 'all') u.searchParams.delete(k); else u.searchParams.set(k, v);
    history.replaceState(null, '', u);
  };

  document.addEventListener('DOMContentLoaded', mountChrome);

  return {
    qs, qsa, esc, fmt, I, avatar, initials, provinceTag, provinceChips, TYPE_LABEL,
    renderEventCard, renderEventRow, renderMiniEvent, renderComedianCard, renderNewsCard, renderSocials,
    drawer, openComedian, openEvent, toast, segmented, chipGroup, swap, param, setParam, reducedMotion,
  };
})();
