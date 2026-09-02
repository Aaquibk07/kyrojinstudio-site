(() => {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded','false');
    }));
  }

  // Premium line-by-line hero entrance without changing the HTML source text.
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle && !heroTitle.dataset.motionReady) {
    const segments = [];
    let current = [];
    [...heroTitle.childNodes].forEach(node => {
      if (node.nodeName === 'BR') {
        segments.push(current);
        current = [];
      } else current.push(node.cloneNode(true));
    });
    if (current.length) segments.push(current);
    heroTitle.textContent = '';
    segments.forEach(nodes => {
      const line = document.createElement('span');
      line.className = 'motion-line';
      const inner = document.createElement('span');
      nodes.forEach(n => inner.appendChild(n));
      line.appendChild(inner);
      heroTitle.appendChild(line);
    });
    heroTitle.dataset.motionReady = '1';
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -4% 0px' });
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add('visible'));

  const glow = document.querySelector('.cursor-glow');
  if (!reduceMotion && glow) {
    let targetX = window.innerWidth * .5;
    let targetY = window.innerHeight * .45;
    let x = targetX, y = targetY;
    let running = true;

    const renderGlow = () => {
      if (!running) return;
      x += (targetX - x) * .18;
      y += (targetY - y) * .18;
      glow.style.left = x + 'px';
      glow.style.top = y + 'px';
      requestAnimationFrame(renderGlow);
    };

    document.addEventListener('pointermove', e => {
      targetX = e.clientX;
      targetY = e.clientY;
      glow.style.opacity = '.96';
    }, { passive:true });
    document.addEventListener('pointerleave', () => { glow.style.opacity = '.28'; });
    document.addEventListener('pointerenter', () => { glow.style.opacity = '.96'; });
    renderGlow();
  }

  const toast = document.querySelector('.toast');
  const showToast = () => {
    if (!toast) return;
    toast.classList.add('show');
    clearTimeout(window.__kyroToast);
    window.__kyroToast = setTimeout(() => toast.classList.remove('show'), 5200);
  };
  document.querySelectorAll('[data-store="google"]').forEach(b => b.addEventListener('click', showToast));
  toast?.querySelector('button')?.addEventListener('click', () => toast.classList.remove('show'));
})();
