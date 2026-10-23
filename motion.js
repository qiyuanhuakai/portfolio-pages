/* Lightweight interactions. Project data and labels stay in content.js. */
(() => {
  const p = window.PORTFOLIO;
  const view = window.PORTFOLIO_VIEW;
  if (!p || !view) return;
  const { projects, esc, icon } = view;
  const u = p.ui;
  const root = document.documentElement;
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const themeMedia = matchMedia('(prefers-color-scheme: dark)');
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const store = (key, value) => { try { localStorage.setItem(key, value); } catch (_) { /* Optional persistence. */ } };
  let quiet = root.dataset.motion === 'reduced';
  const motionAllowed = () => !quiet && !media.matches;
  const ease = 'cubic-bezier(.22,.7,.3,1)';
  const activeAnimations = new Set();
  const animationSlots = new WeakMap();
  const animateUI = (element, frames, options = {}, slot = 'motion') => {
    if (!motionAllowed() || !element?.animate) return null;
    let slots = animationSlots.get(element);
    if (!slots) { slots = new Map(); animationSlots.set(element, slots); }
    slots.get(slot)?.cancel();
    const animation = element.animate(frames, { duration: 650, easing: ease, fill: 'backwards', ...options });
    slots.set(slot, animation);
    activeAnimations.add(animation);
    const clean = () => { activeAnimations.delete(animation); if (slots.get(slot) === animation) slots.delete(slot); };
    animation.finished.then(clean, clean);
    return animation;
  };
  const revealElement = (element, animate = true) => {
    if (!element?.classList.contains('motion-pending')) return;
    element.classList.remove('motion-pending');
    element.classList.add('is-revealed');
    if (animate) animateUI(element, [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { delay: Number(element.dataset.motionDelay || 0) });
    revealObserver?.unobserve(element);
  };
  let revealObserver;
  const revealTargets = $$('.fieldIndex, .signal>div, .sectionHead, .workTools, .project, .principle, .aiNote, .footerActions, .foot');
  const syncMotionState = (initial = false) => {
    const allowed = motionAllowed();
    root.classList.toggle('motion-enabled', allowed);
    if (!allowed) activeAnimations.forEach(animation => animation.cancel());
    else if (!initial) revealTargets.forEach(element => {
      if (element.getBoundingClientRect().top < innerHeight) revealElement(element, false);
    });
  };
  $('#quietMotion').checked = quiet;
  const themeInputs = $$('input[name="portfolio-theme"]');
  themeInputs.forEach(input => { input.checked = input.value === (root.dataset.theme || 'system'); });
  const updateThemeColor = () => {
    const dark = root.dataset.theme === 'dark' || (!root.dataset.theme && themeMedia.matches);
    $('meta[name="theme-color"]').content = dark ? '#211c26' : '#fff8fb';
  };
  themeInputs.forEach(input => input.addEventListener('change', e => {
    if (e.target.value === 'system') delete root.dataset.theme;
    else root.dataset.theme = e.target.value;
    store('portfolio-theme', e.target.value);
    updateThemeColor();
  }));
  themeMedia.addEventListener('change', updateThemeColor);
  updateThemeColor();
  $('#quietMotion').addEventListener('change', e => {
    quiet = e.target.checked;
    if (quiet) root.dataset.motion = 'reduced';
    else delete root.dataset.motion;
    store('portfolio-quiet', String(quiet));
    syncMotionState();
  });
  media.addEventListener('change', () => syncMotionState());
  const preferences = $('.preferences');
  document.addEventListener('click', e => {
    if (!preferences.contains(e.target)) preferences.open = false;
  });
  preferences.addEventListener('keydown', e => {
    if (e.key === 'Escape') { preferences.open = false; preferences.querySelector('summary').focus(); }
  });
  preferences.addEventListener('toggle', () => {
    if (preferences.open) animateUI($('.preferencesPanel'), [{ opacity: 0, transform: 'translateY(-6px) scale(.98)' }, { opacity: 1, transform: 'none' }], { duration: 260 }, 'popover');
  });
  const nav = $('.nav');
  const navItems = $$('.nav a, .nav button');
  let navPointerTarget;
  let navFocusTarget;
  const updateNavHighlight = () => {
    const target = navPointerTarget || navFocusTarget || nav.querySelector('[aria-current]');
    nav.style.setProperty('--nav-opacity', target ? '1' : '0');
    if (!target) return;
    nav.style.setProperty('--nav-x', `${target.offsetLeft - 4}px`);
    nav.style.setProperty('--nav-width', `${target.offsetWidth}px`);
  };
  navItems.forEach(item => item.addEventListener('pointerenter', () => { navPointerTarget = item; updateNavHighlight(); }));
  nav.addEventListener('pointerleave', () => { navPointerTarget = undefined; updateNavHighlight(); });
  nav.addEventListener('focusin', e => { navFocusTarget = e.target.closest('a, button'); updateNavHighlight(); });
  nav.addEventListener('focusout', e => { if (!nav.contains(e.relatedTarget)) { navFocusTarget = undefined; updateNavHighlight(); } });
  const onScroll = () => {
    $('.top').classList.toggle('scrolled', scrollY > 12);
    $('.top').style.setProperty('--reading-progress', String(Math.min(1, Math.max(0, scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)))));
    const active = ['work', 'approach'].filter(id => document.getElementById(id).getBoundingClientRect().top <= innerHeight * .3).pop();
    $$('.nav a[href^="#"]').forEach(link => {
      if (link.hash === '#' + active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    updateNavHighlight();
  };
  let scrollFrame;
  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => { scrollFrame = undefined; onScroll(); });
  }, { passive: true });
  onScroll();

  let filter = 'all';
  const search = $('#projectSearch');
  const cards = $$('.project');
  const normalize = text => text.normalize('NFKC').toLocaleLowerCase();
  const haystacks = new Map(projects.map(item => [item.id, normalize(JSON.stringify(item))]));
  let filtersInitialized = false;
  const applyFilters = () => {
    const previous = filtersInitialized && motionAllowed() ? new Map(cards.filter(card => !card.hidden).map(card => [card.id, card.getBoundingClientRect()])) : null;
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
    if (previous) cards.filter(card => !card.hidden).forEach((card, index) => {
      const next = card.getBoundingClientRect();
      if (next.top > innerHeight + 60 || next.bottom < 0) return;
      revealElement(card, false);
      const old = previous.get(card.id);
      if (!old || old.top > innerHeight || old.bottom < 0) animateUI(card, [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 450, delay: (index % 3) * 45 });
      else if (Math.abs(old.top - next.top) > 2 || Math.abs(old.left - next.left) > 2) {
        const shiftX = Math.max(-28, Math.min(28, old.left - next.left));
        const shiftY = Math.max(-28, Math.min(28, old.top - next.top));
        animateUI(card, [{ transform: `translate(${shiftX}px, ${shiftY}px)` }, { transform: 'none' }], { duration: 450 });
      }
    });
    filtersInitialized = true;
    onScroll();
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
    revealElement(target, false);
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
    $('#evidenceGroups').innerHTML = projects.filter(item => selected === 'all' || item.id === selected).map(item => `<section class="evidenceGroup" aria-labelledby="source-${esc(item.id)}"><h3 id="source-${esc(item.id)}">${esc(item.title)}</h3><p>${esc(item.summary)}</p><ul class="evidenceList">${item.evidence.map(e => `<li><a href="${esc(e.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(`${e.code}：${e.text}，${u.evidenceOpen}`)}"><code>${esc(e.code)}</code><span>${esc(e.text)}</span>${icon('external')}</a></li>`).join('')}</ul></section>`).join('');
    if (evidenceDialog.open) $$('.evidenceGroup').forEach((group, index) => animateUI(group, [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 350, delay: index * 35 }));
  };
  evidenceSelect.addEventListener('change', renderEvidence);
  let dialogTrigger;
  const closeDialog = dialog => {
    if (dialog.dataset.closing) return;
    const animation = animateUI(dialog, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(8px) scale(.99)' }], { duration: 150, fill: 'forwards' }, 'dialog');
    if (!animation) { dialog.close(); return; }
    dialog.dataset.closing = 'true';
    const finish = () => { dialog.close(); delete dialog.dataset.closing; animation.cancel(); };
    animation.finished.then(finish, finish);
  };
  $$('dialog').forEach(dialog => {
    dialog.querySelector('[data-close]').addEventListener('click', () => closeDialog(dialog));
    dialog.addEventListener('cancel', e => { e.preventDefault(); closeDialog(dialog); });
    dialog.addEventListener('close', () => dialogTrigger?.focus({ preventScroll: true }));
    // Close only a pointer gesture entirely on the backdrop; dragging text outside stays open.
    let backdropStart = false;
    const outside = e => { const r = dialog.getBoundingClientRect(); return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom; };
    dialog.addEventListener('pointerdown', e => { backdropStart = outside(e); });
    dialog.addEventListener('click', e => { if (backdropStart && outside(e)) closeDialog(dialog); backdropStart = false; });
  });
  $$('[data-evidence]').forEach(btn => btn.addEventListener('click', () => {
    preferences.open = false;
    dialogTrigger = btn;
    evidenceSelect.value = btn.dataset.evidence;
    renderEvidence();
    evidenceDialog.showModal();
    evidenceDialog.querySelector('.dialogScroll').scrollTop = 0;
    evidenceDialog.querySelector('[data-close]').focus({ preventScroll: true });
    animateUI(evidenceDialog, [{ opacity: 0, transform: 'translateY(12px) scale(.985)' }, { opacity: 1, transform: 'none' }], { duration: 360 }, 'dialog');
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
      animateUI($('#copyDialog'), [{ opacity: 0, transform: 'translateY(10px) scale(.985)' }, { opacity: 1, transform: 'none' }], { duration: 300 }, 'dialog');
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

  // Reveal once, then leave the text still. Decorative loops run only in view.
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting && !entry.target.hidden) revealElement(entry.target); });
    }, { threshold: .04, rootMargin: '0px 0px -4% 0px' });
    revealTargets.forEach(element => { element.classList.add('motion-pending'); revealObserver.observe(element); });
    $$('.signal>div, .principle').forEach((element, index) => { element.dataset.motionDelay = String((index % 4) * 65); });
    const ambientObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('ambient-visible', entry.isIntersecting));
    }, { threshold: .02 });
    ambientObserver.observe($('.fieldIndex'));
  }
  syncMotionState(true);
  if (!location.hash) $$('.heroCopy>*').forEach((element, index) => animateUI(element, [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 800, delay: index * 85 }, 'hero'));
  const updateVisibility = () => root.classList.toggle('page-paused', document.hidden);
  document.addEventListener('visibilitychange', updateVisibility);
  updateVisibility();
})();
