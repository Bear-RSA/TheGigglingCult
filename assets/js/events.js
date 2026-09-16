/* Events page: calendar / list / by-comedian views with a province filter */
(() => {
  const { TODAY, PROVINCES, VENUES, EVENTS, COMEDIANS, bySlug, eventProvince, sameDay, upcomingFor } = window.TGC;
  const { qs, qsa, esc, fmt, I, avatar, provinceTag, provinceChips, renderEventRow, renderEventCard, segmented, chipGroup, swap, param, setParam, reducedMotion } = window.UI;

  /* ---------- state ---------- */
  const state = {
    view: ['calendar', 'list', 'comedian'].includes(param('view')) ? param('view') : 'calendar',
    province: PROVINCES[param('province')] ? param('province') : 'all',
    month: new Date(TODAY.getFullYear(), TODAY.getMonth(), 1),
    selected: new Date(TODAY),
    comedian: bySlug[param('comedian')] ? param('comedian') : null,
    search: '',
    letter: 'all',
  };

  const filtered = () => EVENTS.filter((e) => state.province === 'all' || eventProvince(e) === state.province);
  const provinceLabel = () => (state.province === 'all' ? 'all provinces' : PROVINCES[state.province].name);
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

  /* ---------- date grouping (shared by list + comedian views) ---------- */
  const groupByDate = (list, cardRenderer = renderEventRow) => {
    const groups = new Map();
    list.forEach((e) => { const k = fmt.key(e.date); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(e); });
    let i = 0;
    return [...groups.values()].map((evs) => `
      <div class="date-group">
        <div class="date-group-title">${fmt.long(evs[0].date)} <span class="muted">${fmt.relative(evs[0].date)}</span></div>
        <div class="stack">${evs.map((e) => cardRenderer(e, i++)).join('')}</div>
      </div>`).join('');
  };

  /* ---------- calendar ---------- */
  const calGrid = qs('#cal-grid');
  const calSide = qs('#cal-side');

  const eventsOn = (d) => filtered().filter((e) => sameDay(e.date, d));

  const renderCalendar = () => {
    const y = state.month.getFullYear();
    const m = state.month.getMonth();
    qs('#cal-title').textContent = `${fmt.monLong(state.month)} ${y}`;

    const first = new Date(y, m, 1);
    const lead = (first.getDay() + 6) % 7; // Monday-based
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const cells = [];
    for (let i = lead; i > 0; i--) cells.push({ d: new Date(y, m, 1 - i), other: true });
    for (let i = 1; i <= daysInMonth; i++) cells.push({ d: new Date(y, m, i), other: false });
    while (cells.length % 7) cells.push({ d: new Date(y, m + 1, cells.length - lead - daysInMonth + 1), other: true });

    calGrid.innerHTML = cells.map(({ d, other }) => {
      const evs = other ? [] : eventsOn(d);
      const provs = [...new Set(evs.map(eventProvince))];
      const cls = ['cal-day', other && 'is-other', d < TODAY && 'is-past', sameDay(d, TODAY) && 'is-today'].filter(Boolean).join(' ');
      const pressed = !other && sameDay(d, state.selected);
      return `<button class="${cls}" role="gridcell" ${other ? 'disabled tabindex="-1"' : ''} aria-pressed="${pressed}" aria-label="${fmt.long(d)}${evs.length ? `, ${plural(evs.length, 'show')}` : ''}" data-date="${d.toISOString()}">
        <span class="n">${d.getDate()}</span>
        <span class="cal-dots">${provs.map((p) => `<i data-province="${p}"></i>`).join('')}</span>
      </button>`;
    }).join('');

    const monthCount = filtered().filter((e) => e.date.getFullYear() === y && e.date.getMonth() === m).length;
    qs('#filter-result').textContent = `${plural(monthCount, 'show')} in ${fmt.monLong(state.month)} · ${provinceLabel()}`;
  };

  const renderSide = () => {
    const evs = eventsOn(state.selected);
    const isCurrentMonth = state.selected.getMonth() === state.month.getMonth() && state.selected.getFullYear() === state.month.getFullYear();
    if (!isCurrentMonth) {
      swap(calSide, `<div class="empty"><b>Pick a day, any day</b><span>The ones with dots have shows. Start there.</span></div>`);
      return;
    }
    swap(calSide, `
      <div class="cal-side-title">${fmt.long(state.selected)} <span class="muted">· ${fmt.relative(state.selected)}</span></div>
      ${evs.length
        ? evs.map((e, i) => renderEventCard(e, i)).join('')
        : `<div class="empty"><b>Dead night.</b><span>${state.province === 'all' ? 'Even comedians need sleep. Try another date.' : `Nothing in ${PROVINCES[state.province].name}. Try another province, or another date.`}</span></div>`}
    `);
  };

  const switchMonth = (delta) => {
    state.month = new Date(state.month.getFullYear(), state.month.getMonth() + delta, 1);
    // Land the selection on the first day with shows in the new month (or the 1st).
    const firstWithShows = filtered().find((e) => e.date.getFullYear() === state.month.getFullYear() && e.date.getMonth() === state.month.getMonth());
    state.selected = firstWithShows ? new Date(firstWithShows.date) : new Date(state.month);
    if (reducedMotion()) { renderCalendar(); renderSide(); return; }
    calGrid.classList.add('is-switching');
    setTimeout(() => { renderCalendar(); calGrid.classList.remove('is-switching'); renderSide(); }, 120);
  };

  qs('#cal-prev').innerHTML = I.left;
  qs('#cal-next').innerHTML = I.right;
  qs('#cal-prev').addEventListener('click', () => switchMonth(-1));
  qs('#cal-next').addEventListener('click', () => switchMonth(1));
  qs('#cal-today').addEventListener('click', () => {
    state.month = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
    state.selected = new Date(TODAY);
    renderCalendar(); renderSide();
  });
  calGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.cal-day');
    if (!btn || btn.disabled) return;
    state.selected = new Date(btn.dataset.date);
    qsa('.cal-day', calGrid).forEach((b) => b.setAttribute('aria-pressed', b === btn));
    renderSide();
  });
  // Arrow-key navigation across the grid — instant, no animation.
  calGrid.addEventListener('keydown', (e) => {
    const map = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (!(e.key in map)) return;
    const days = qsa('.cal-day:not([disabled])', calGrid);
    const idx = days.indexOf(document.activeElement);
    if (idx < 0) return;
    const next = days[idx + map[e.key]];
    if (next) { e.preventDefault(); next.focus(); }
  });

  /* ---------- list ---------- */
  const renderList = () => {
    const list = filtered().filter((e) => e.date >= TODAY);
    qs('#filter-result').textContent = `${plural(list.length, 'upcoming show')} · ${provinceLabel()}`;
    swap(qs('#view-list'), list.length
      ? groupByDate(list)
      : `<div class="empty"><b>Nothing on the books</b><span>No shows listed for ${provinceLabel()} yet. Give it a minute.</span></div>`);
  };

  /* ---------- by comedian ---------- */
  const pickerItems = qs('#picker-items');
  const pickerResults = qs('#picker-results');

  const comediansWithShows = () => COMEDIANS
    .map((c) => ({ c, shows: upcomingFor(c.slug).filter((e) => state.province === 'all' || eventProvince(e) === state.province) }))
    .filter(({ shows }) => shows.length);

  const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const pickerAlpha = qs('#picker-alpha');
  const renderPickerAlpha = (all) => {
    const available = new Set(all.map(({ c }) => c.name[0].toUpperCase()));
    if (state.letter !== 'all' && !available.has(state.letter)) state.letter = 'all';
    pickerAlpha.innerHTML = `
      <button class="alpha-btn alpha-all" data-letter="all" aria-pressed="${state.letter === 'all'}">All</button>
      ${LETTERS.map((L) => `<button class="alpha-btn" data-letter="${L}" aria-pressed="${state.letter === L}" ${available.has(L) ? '' : 'disabled'} aria-label="Comedians starting with ${L}">${L}</button>`).join('')}`;
  };
  pickerAlpha.addEventListener('click', (e) => {
    const btn = e.target.closest('.alpha-btn');
    if (!btn || btn.disabled) return;
    state.letter = btn.dataset.letter;
    qsa('.alpha-btn', pickerAlpha).forEach((b) => b.setAttribute('aria-pressed', b === btn));
    renderPicker();
  });

  const renderPicker = () => {
    const all = comediansWithShows();
    renderPickerAlpha(all);
    const q = state.search.trim().toLowerCase();
    let list = q ? all.filter(({ c }) => c.name.toLowerCase().includes(q)) : all;
    if (state.letter !== 'all') list = list.filter(({ c }) => c.name[0].toUpperCase() === state.letter);
    pickerItems.innerHTML = list.length
      ? list.map(({ c, shows }) => `
        <button class="picker-item" data-pick="${c.slug}" aria-pressed="${state.comedian === c.slug}">
          ${avatar(c)}<span class="name">${esc(c.name)}</span><span class="count">${shows.length}</span>
        </button>`).join('')
      : `<div class="picker-empty">${q ? `Nobody called “${esc(state.search)}”. Yet.` : `No one under ${state.letter} with a show booked.`}</div>`;
    qs('#filter-result').textContent = `${plural(all.length, 'comedian')} with upcoming shows · ${provinceLabel()}`;
  };

  const renderPickerResults = () => {
    if (!state.comedian) {
      swap(pickerResults, `<div class="empty" style="min-height:280px;justify-content:center"><b>Pick your poison</b><span>Choose a name on the left to see every show they're on.</span></div>`);
      return;
    }
    const c = bySlug[state.comedian];
    const shows = upcomingFor(c.slug).filter((e) => state.province === 'all' || eventProvince(e) === state.province);
    swap(pickerResults, `
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:22px;flex-wrap:wrap">
        ${avatar(c, 'avatar-lg')}
        <div style="flex:1;min-width:200px">
          <h2 style="font-size:28px">${esc(c.name)}</h2>
          <div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap">${provinceTag(c.province)}${c.upcoming ? '<span class="tag tag-rising">Rising</span>' : ''}<span class="tag">${plural(shows.length, 'show')}</span></div>
        </div>
        <button class="btn btn-ghost btn-sm" data-comedian="${c.slug}">Profile ${I.arrow}</button>
      </div>
      ${shows.length ? groupByDate(shows) : `<div class="empty"><b>Not in ${provinceLabel()} this time</b><span>Try another province. They travel, mostly.</span></div>`}
    `);
  };

  pickerItems.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-pick]');
    if (!btn) return;
    state.comedian = btn.dataset.pick;
    setParam('comedian', state.comedian);
    qsa('.picker-item', pickerItems).forEach((b) => b.setAttribute('aria-pressed', b === btn));
    renderPickerResults();
  });
  qs('#picker-search').addEventListener('input', (e) => { state.search = e.target.value; renderPicker(); });

  /* ---------- view switching ---------- */
  const HINTS = {
    calendar: 'Dots mark shows by province. Colours, because reading is hard.',
    list: 'Soonest first. Panic accordingly.',
    comedian: 'Only comics with shows on the books. The rest are “writing”.',
  };
  const showView = () => {
    ['calendar', 'list', 'comedian'].forEach((v) => { qs(`#view-${v}`).hidden = v !== state.view; });
    qs('#view-hint').textContent = HINTS[state.view];
    setParam('view', state.view === 'calendar' ? null : state.view);
    render();
  };
  const render = () => {
    if (state.view === 'calendar') { renderCalendar(); renderSide(); }
    else if (state.view === 'list') renderList();
    else { renderPicker(); renderPickerResults(); }
  };

  /* ---------- init ---------- */
  qs('#province-chips').innerHTML = provinceChips();
  const chips = chipGroup(qs('#province-chips'), (v) => { state.province = v; setParam('province', v); render(); });
  chips.set(state.province, false);
  const seg = segmented(qs('#view-seg'), (v) => { state.view = v; showView(); });
  seg.set(state.view, false, true);
  showView();
})();
