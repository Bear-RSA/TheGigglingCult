/* Comedians page: A–Z letter nav, province + rising filters, alphabetical grid */
(() => {
  const { PROVINCES, COMEDIANS, bySlug } = window.TGC;
  const { qs, qsa, esc, provinceChips, renderComedianCard, chipGroup, swap, param, setParam, openComedian } = window.UI;

  const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const sorted = [...COMEDIANS].sort((a, b) => a.name.localeCompare(b.name));
  const firstLetter = (c) => c.name[0].toUpperCase();

  const state = {
    letter: LETTERS.includes((param('letter') || '').toUpperCase()) ? param('letter').toUpperCase() : 'all',
    province: PROVINCES[param('province')] ? param('province') : 'all',
    rising: param('rising') === '1',
  };

  /* comedians matching the province/rising filters (letter applied separately) */
  const base = () => sorted.filter((c) => (state.province === 'all' || c.province === state.province) && (!state.rising || c.upcoming));

  /* ---------- A–Z nav ---------- */
  const alphaNav = qs('#alpha-nav');
  const renderAlpha = () => {
    const available = new Set(base().map(firstLetter));
    alphaNav.innerHTML = `
      <button class="alpha-btn alpha-all" data-letter="all" aria-pressed="${state.letter === 'all'}">All</button>
      ${LETTERS.map((L) => `<button class="alpha-btn" data-letter="${L}" aria-pressed="${state.letter === L}" ${available.has(L) ? '' : 'disabled'} aria-label="Comedians starting with ${L}">${L}</button>`).join('')}`;
  };
  alphaNav.addEventListener('click', (e) => {
    const btn = e.target.closest('.alpha-btn');
    if (!btn || btn.disabled) return;
    state.letter = btn.dataset.letter;
    setParam('letter', state.letter);
    qsa('.alpha-btn', alphaNav).forEach((b) => b.setAttribute('aria-pressed', b === btn));
    renderGrid();
  });

  /* ---------- grid ---------- */
  const grid = qs('#comedian-grid');
  const renderGrid = () => {
    const list = base().filter((c) => state.letter === 'all' || firstLetter(c) === state.letter);
    const where = state.province === 'all' ? '' : ` in ${PROVINCES[state.province].name}`;
    const who = state.rising ? 'rising comic' : 'comedian';
    const start = state.letter === 'all' ? '' : ` starting with ${state.letter}`;
    qs('#filter-result').textContent = `${list.length} ${who}${list.length === 1 ? '' : 's'}${start}${where}`;
    swap(grid, list.length
      ? list.map((c, i) => renderComedianCard(c, i)).join('')
      : `<div class="empty" style="grid-column:1/-1"><b>Nobody. Not a soul.</b><span>Try another letter, or clear the province filter. They can't all be from Durban.</span></div>`);
  };

  /* ---------- filters ---------- */
  qs('#province-chips').innerHTML = provinceChips();
  const chips = chipGroup(qs('#province-chips'), (v) => {
    state.province = v; setParam('province', v);
    // If the current letter has no matches under the new filter, fall back to All.
    if (state.letter !== 'all' && !base().some((c) => firstLetter(c) === state.letter)) { state.letter = 'all'; setParam('letter', null); }
    renderAlpha(); renderGrid();
  });
  chips.set(state.province, false);

  const rising = qs('#rising-only');
  rising.checked = state.rising;
  rising.addEventListener('change', () => {
    state.rising = rising.checked; setParam('rising', state.rising ? '1' : null);
    if (state.letter !== 'all' && !base().some((c) => firstLetter(c) === state.letter)) { state.letter = 'all'; setParam('letter', null); }
    renderAlpha(); renderGrid();
  });

  renderAlpha();
  renderGrid();

  /* deep link: comedians.html?open=slug */
  const open = param('open');
  if (open && bySlug[open]) setTimeout(() => openComedian(open), 250);
})();
