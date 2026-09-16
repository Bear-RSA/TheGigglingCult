/* Home page: hero stats, week summary, coming-up grid, news preview */
(() => {
  const { TODAY, PROVINCES, VENUES, EVENTS, COMEDIANS, NEWS, WEEK_SUMMARY, startOfWeek, endOfWeek, endOfMonth, eventsBetween, eventProvince } = window.TGC;
  const { qs, esc, fmt, renderEventCard, renderNewsCard, renderMiniEvent, segmented, chipGroup, provinceChips, swap, setParam } = window.UI;

  const weekStart = startOfWeek();
  const weekEnd = endOfWeek();
  const thisWeek = eventsBetween(weekStart, weekEnd);
  const upcoming = EVENTS.filter((e) => e.date >= TODAY);

  /* ---------- hero stats ---------- */
  const weekAhead = thisWeek.filter((e) => e.date >= TODAY);
  qs('#hero-stats').innerHTML = `
    <div class="stat"><b>${weekAhead.length}</b><span>shows before Sunday</span></div>
    <div class="stat"><b>${upcoming.length}</b><span>shows on the books</span></div>
    <div class="stat"><b>${COMEDIANS.length}</b><span>comics in the congregation</span></div>
    <div class="stat"><b>${Object.keys(PROVINCES).length}</b><span>provinces converted (so far)</span></div>`;

  /* ---------- marquee (duplicated for seamless loop) ---------- */
  const items = upcoming.slice(0, 12).map((e) => `<span><b>${esc(e.title)}</b> · ${fmt.relative(e.date)} · ${esc(VENUES[e.venue].name)}</span>`).join('');
  qs('#marquee').innerHTML = items + items;

  /* ---------- week summary ---------- */
  qs('#week-range').textContent = `${fmt.dow(weekStart)} ${fmt.day(weekStart)} – ${fmt.dow(weekEnd)} ${fmt.day(weekEnd)} ${fmt.monLong(weekEnd)}`;
  const counts = { gp: 0, wc: 0, kzn: 0 };
  thisWeek.forEach((e) => { counts[eventProvince(e)]++; });
  const venueCounts = {};
  thisWeek.forEach((e) => { venueCounts[e.venue] = (venueCounts[e.venue] || 0) + 1; });
  const busiest = Object.entries(venueCounts).sort((a, b) => b[1] - a[1])[0];
  const headliners = thisWeek.filter((e) => e.type === 'headline' || e.type === 'tour').length;
  const comicsOnStage = new Set(thisWeek.flatMap((e) => e.lineup)).size;
  const soldOut = thisWeek.filter((e) => e.soldOut).length;
  const total = thisWeek.length || 1;

  qs('#week-panel').innerHTML = `
    <div class="week-editorial enter" style="--i:0">
      <span class="eyebrow" style="margin:0">From the pulpit</span>
      <h3>${esc(WEEK_SUMMARY.headline)}</h3>
      <p>${esc(WEEK_SUMMARY.body)}</p>
      <div class="week-picks">
        <span class="filter-label" style="margin-bottom:4px">Go to these. Seriously.</span>
        ${WEEK_SUMMARY.picks.map((id) => EVENTS.find((e) => e.id === id)).filter(Boolean).map(renderMiniEvent).join('')}
      </div>
    </div>
    <div class="week-stats">
      <div class="week-stat is-wide enter" style="--i:1">
        <b>${thisWeek.length}</b><span>shows this week across ${Object.keys(counts).filter((k) => counts[k]).length} provinces. Pick a lane.</span>
        <div class="bar">${Object.keys(counts).map((k) => `<i data-province="${k}" style="width:${(counts[k] / total) * 100}%"></i>`).join('')}</div>
        <div class="legend">${Object.keys(counts).map((k) => `<span><i style="background:${PROVINCES[k].color}"></i>${PROVINCES[k].short} ${counts[k]}</span>`).join('')}</div>
      </div>
      <div class="week-stat enter" style="--i:2"><b>${comicsOnStage}</b><span>comics risking it all</span></div>
      <div class="week-stat enter" style="--i:3"><b>${headliners}</b><span>headliners, name on the poster</span></div>
      <div class="week-stat enter" style="--i:4"><b>${soldOut}</b><span>gone already. Should've moved faster.</span></div>
      <div class="week-stat enter" style="--i:5"><b style="font-size:20px;line-height:1.2">${busiest ? esc(VENUES[busiest[0]].name) : '—'}</b><span>hardest-working room · ${busiest ? busiest[1] : 0} shows</span></div>
    </div>`;

  /* ---------- coming up ---------- */
  let range = 'week';
  let province = 'all';
  const render = () => {
    const to = range === 'week' ? weekEnd : endOfMonth();
    let list = eventsBetween(TODAY, to, province === 'all' ? null : province);
    // If the week is nearly over, "this week" would look empty — pad to the next 7 days.
    if (range === 'week' && list.length < 3) {
      const plus7 = new Date(TODAY); plus7.setDate(plus7.getDate() + 7);
      list = eventsBetween(TODAY, plus7, province === 'all' ? null : province);
    }
    const shown = list.slice(0, 6);
    const label = province === 'all' ? 'all provinces' : PROVINCES[province].name;
    qs('#home-result').textContent = `${list.length} show${list.length === 1 ? '' : 's'} · ${label}`;
    qs('#see-all').href = `events.html${province === 'all' ? '' : `?province=${province}`}`;
    swap(qs('#coming-up'), shown.length
      ? shown.map((e, i) => renderEventCard(e, i)).join('')
      : `<div class="empty" style="grid-column:1/-1"><b>Tumbleweeds.</b><span>No ${label} shows in this range. The full calendar is less depressing.</span></div>`);
  };

  qs('#home-provinces').innerHTML = provinceChips('All');
  chipGroup(qs('#home-provinces'), (v) => { province = v; render(); });
  segmented(qs('#range-seg'), (v) => { range = v; render(); });
  render();

  /* ---------- news ---------- */
  qs('#home-news').innerHTML = NEWS.slice(0, 3).map((n, i) => renderNewsCard(n, i)).join('');
})();
