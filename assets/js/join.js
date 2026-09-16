/* Join page: comedian / audience toggle, validation, morphing submit */
(() => {
  const { qs, qsa, I, segmented, toast, param, setParam } = window.UI;

  const PERKS = {
    audience: [
      [I.mail, 'One email, every Monday', 'The week\'s shows in your province, with sold-out warnings before it\'s too late to say “I was going to go”.'],
      [I.star, 'New faces first', 'We flag the rising comics while tickets are still R90 and they still reply to DMs.'],
      [I.ticket, 'Presales, when we have them', 'Some venues give our list first dibs. We pass it straight on, no cover charge.'],
    ],
    comedian: [
      [I.mic, 'Your name on the A–Z', 'Bio, province, socials and every upcoming gig, on one page you can actually send to a booker.'],
      [I.pin, 'Your gigs on the calendar', 'Tell us where you\'re playing and it shows up for everyone browsing that province. Even the Tuesday ones.'],
      [I.star, 'The Rising list', 'Newer comics get a badge and a spot in our weekly “who to watch”. Bookers read it. So do other comics, jealously.'],
    ],
  };

  let role = ['audience', 'comedian'].includes(param('as')) ? param('as') : 'audience';

  const renderPerks = () => {
    qs('#perks').innerHTML = PERKS[role].map(([icon, title, body], i) => `
      <div class="perk enter" style="--i:${i}"><i>${icon}</i><div><b>${title}</b><span>${body}</span></div></div>`).join('');
  };

  const showRole = () => {
    qs('#form-audience').dataset.active = role === 'audience';
    qs('#form-comedian').dataset.active = role === 'comedian';
    qs('#form-success').dataset.active = 'false';
    setParam('as', role);
    renderPerks();
  };

  const seg = segmented(qs('#role-seg'), (v) => { role = v; showRole(); });
  seg.set(role, false, true);
  showRole();

  /* bio counter */
  const bio = qs('#c-bio');
  bio.addEventListener('input', () => { qs('#c-bio-count').textContent = bio.value.length; });

  /* ---------- validation + submit ---------- */
  const validate = (form) => {
    let ok = true;
    qsa('[required]', form).forEach((el) => {
      const valid = el.type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value) : el.value.trim() !== '';
      el.classList.toggle('is-invalid', !valid);
      if (!valid && ok) { el.focus(); ok = false; }
    });
    return ok;
  };

  const submit = (form, btn) => (e) => {
    e.preventDefault();
    if (!validate(form)) { toast('A couple of fields are still blank. Commit to the bit.'); return; }

    // Morph the button while we "send": blur the label, then swap it.
    btn.disabled = true;
    btn.classList.add('is-transitioning');
    const content = qs('.btn-content', btn);
    setTimeout(() => { content.textContent = 'Sending…'; btn.classList.remove('is-transitioning'); }, 200);

    const data = Object.fromEntries(new FormData(form).entries());
    data.role = role;
    data.at = new Date().toISOString();
    try {
      const key = 'tgc-signups';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push(data);
      localStorage.setItem(key, JSON.stringify(existing));
    } catch (_) { /* storage unavailable — demo only */ }

    setTimeout(() => {
      form.dataset.active = 'false';
      const success = qs('#form-success');
      qs('#success-title').textContent = role === 'comedian' ? `Welcome to the cult, ${data.name.trim()}.` : `You're in, ${data.name.trim()}.`;
      qs('#success-body').textContent = role === 'comedian'
        ? 'We\'ll review your profile and email you when it\'s on the A–Z. Start sending us your gigs in the meantime. All of them. Even the Tuesday ones.'
        : 'First sermon lands on Monday. Until then, the calendar is right there. Go book something.';
      success.dataset.active = 'true';
      toast(role === 'comedian' ? 'Application received. Don\'t call us.' : 'Subscribed. See you Monday.');
      form.reset();
      qs('#c-bio-count').textContent = '0';
      btn.disabled = false;
      content.textContent = role === 'comedian' ? 'Initiate me' : 'Join the flock';
    }, 700);
  };

  qs('#form-audience').addEventListener('submit', submit(qs('#form-audience'), qs('#a-submit')));
  qs('#form-comedian').addEventListener('submit', submit(qs('#form-comedian'), qs('#c-submit')));
  qsa('.input[required]').forEach((el) => el.addEventListener('input', () => el.classList.remove('is-invalid')));
  qs('#success-again').addEventListener('click', showRole);
})();
