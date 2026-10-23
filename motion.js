/* Lightweight interactions. Project data and labels stay in content.js. */
(() => {
  const p = window.PORTFOLIO;
  const view = window.PORTFOLIO_VIEW;
  if (!p || !view) return;
  const { projects, esc } = view;
  const u = p.ui;
  const root = document.documentElement;
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const themeMedia = matchMedia('(prefers-color-scheme: dark)');
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const store = (key, value) => { try { localStorage.setItem(key, value); } catch (_) { /* Optional persistence. */ } };
  let quiet = root.dataset.motion === 'reduced';
  $('#quietMotion').checked = quiet;
  $('#themeSelect').value = root.dataset.theme || 'system';
  const updateThemeColor = () => {
    const dark = root.dataset.theme === 'dark' || (!root.dataset.theme && themeMedia.matches);
    $('meta[name="theme-color"]').content = dark ? '#211c26' : '#fff8fb';
  };
  $('#themeSelect').addEventListener('change', e => {
    if (e.target.value === 'system') delete root.dataset.theme;
    else root.dataset.theme = e.target.value;
    store('portfolio-theme', e.target.value);
    updateThemeColor();
  });
  themeMedia.addEventListener('change', updateThemeColor);
  updateThemeColor();
  $('#quietMotion').addEventListener('change', e => {
    quiet = e.target.checked;
    if (quiet) root.dataset.motion = 'reduced';
    else delete root.dataset.motion;
    store('portfolio-quiet', String(quiet));
  });
  const preferences = $('.preferences');
  document.addEventListener('click', e => {
    if (!preferences.contains(e.target)) preferences.open = false;
  });
  preferences.addEventListener('keydown', e => {
    if (e.key === 'Escape') { preferences.open = false; preferences.querySelector('summary').focus(); }
  });
  if (!quiet && !media.matches) $$('.heroCopy, .fieldIndex').forEach(el => el.classList.add('enter'));
  const onScroll = () => {
    $('.top').classList.toggle('scrolled', scrollY > 12);
    const active = ['work', 'approach'].filter(id => document.getElementById(id).getBoundingClientRect().top <= innerHeight * .3).pop();
    $$('.nav a[href^="#"]').forEach(link => {
      if (link.hash === '#' + active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  let filter = 'all';
  const search = $('#projectSearch');
  const cards = $$('.project');
  const normalize = text => text.normalize('NFKC').toLocaleLowerCase();
  const haystacks = new Map(projects.map(item => [item.id, normalize(JSON.stringify(item))]));
  const applyFilters = () => {
    const terms = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    let visible = 0;
    cards.forEach(card => {
      const match = (filter === 'all' || card.dataset.category === filter) && terms.every(term => haystacks.get(card.id).includes(term));
      card.hidden = !match;
      if (match) visible++;
    });
    $$('[data-filter]').forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.filter === filter)));
    $('#resultCount').textContent = u.resultTemplate.replace('{count}', visible).replace('{total}', cards.length);
    $('#emptyState').hidden = visible !== 0;
    $('#resetFilters').hidden = filter === 'all' && !search.value;
    $('#clearSearch').hidden = !search.value;
    $('.cases').hidden = !p.featured.some(item => !document.getElementById(item.id).hidden);
    $('.compactGrid').hidden = !p.compact.some(item => !document.getElementById(item.id).hidden);
  };
  const resetFilters = () => { filter = 'all'; search.value = ''; applyFilters(); };
  $$('[data-filter]').forEach(btn => btn.addEventListener('click', () => { filter = btn.dataset.filter; applyFilters(); }));
  search.addEventListener('input', applyFilters);
  $('#clearSearch').addEventListener('click', () => { search.value = ''; applyFilters(); search.focus(); });
  $('#resetFilters').addEventListener('click', resetFilters);
  $('[data-reset]').addEventListener('click', () => { resetFilters(); search.focus(); });
  applyFilters();
  // A project anchor always reveals its destination, even after filtering.
  const revealHash = (focus = false) => {
    const id = location.hash.slice(1);
    const target = projects.some(item => item.id === id) && document.getElementById(id);
    if (!target) return;
    if (target.hidden) resetFilters();
    target.scrollIntoView({ behavior: quiet || media.matches ? 'instant' : 'smooth', block: 'start' });
    if (focus) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  };
  window.addEventListener('hashchange', () => revealHash(true));
  $$('.projectPaths a').forEach(link => link.addEventListener('click', () => {
    const target = document.getElementById(link.hash.slice(1));
    if (target?.hidden) resetFilters();
    // Clicking the already-current hash does not emit hashchange.
    if (location.hash === link.hash) revealHash(true);
  }));
  if (location.hash) requestAnimationFrame(() => revealHash());

  const evidenceDialog = $('#evidenceDialog');
  const evidenceSelect = $('#evidenceSelect');
  const renderEvidence = () => {
    const selected = evidenceSelect.value;
    $('#evidenceGroups').innerHTML = projects.filter(item => selected === 'all' || item.id === selected).map(item => `<section class="evidenceGroup" aria-labelledby="source-${esc(item.id)}"><h3 id="source-${esc(item.id)}">${esc(item.title)}</h3><p>${esc(item.summary)}</p><ul class="evidenceList">${item.evidence.map(e => `<li><a href="${esc(e.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(`${e.code}：${e.text}，${u.evidenceOpen}`)}"><code>${esc(e.code)}</code><span>${esc(e.text)}</span><span aria-hidden="true">↗</span></a></li>`).join('')}</ul></section>`).join('');
  };
  evidenceSelect.addEventListener('change', renderEvidence);
  let dialogTrigger;
  $$('dialog').forEach(dialog => {
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => dialogTrigger?.focus({ preventScroll: true }));
    // Close only a pointer gesture entirely on the backdrop; dragging text outside stays open.
    let backdropStart = false;
    const outside = e => { const r = dialog.getBoundingClientRect(); return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom; };
    dialog.addEventListener('pointerdown', e => { backdropStart = outside(e); });
    dialog.addEventListener('click', e => { if (backdropStart && outside(e)) dialog.close(); backdropStart = false; });
  });
  $$('[data-evidence]').forEach(btn => btn.addEventListener('click', () => {
    preferences.open = false;
    dialogTrigger = btn;
    evidenceSelect.value = btn.dataset.evidence;
    renderEvidence();
    evidenceDialog.showModal();
    evidenceDialog.scrollTop = 0;
    evidenceDialog.querySelector('[data-close]').focus({ preventScroll: true });
  }));
  let toastTimer;
  const toast = message => {
    clearTimeout(toastTimer);
    $('#toast').textContent = message;
    $('#toast').classList.add('visible');
    toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 2600);
  };
  const shareUrl = id => {
    // Offline copies share the public website instead of a local file path.
    const base = location.protocol === 'file:' ? new URL('https://qiyuanhuakai.github.io/portfolio-pages/') : new URL(location.href);
    base.search = '';
    base.hash = id === 'page' ? '' : id;
    return base.href;
  };
  $$('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
    const url = shareUrl(btn.dataset.copy);
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(url);
      toast(btn.dataset.copy === 'page' ? u.pageCopied : u.copied);
    } catch (_) {
      dialogTrigger = btn;
      $('#manualLink').value = url;
      $('#copyDialog').showModal();
      $('#manualLink').focus();
      $('#manualLink').select();
    }
  }));
  // Printing always includes every project, independent of the current filter.
  let printHidden;
  window.addEventListener('beforeprint', () => {
    printHidden = $$('.project, .cases, .compactGrid').map(el => [el, el.hidden]);
    printHidden.forEach(([el]) => { el.hidden = false; });
  });
  window.addEventListener('afterprint', () => { printHidden?.forEach(([el, hidden]) => { el.hidden = hidden; }); printHidden = undefined; });
  $('#printPage').addEventListener('click', () => window.print());
  window.addEventListener('resize', onScroll, { passive: true });
})();
