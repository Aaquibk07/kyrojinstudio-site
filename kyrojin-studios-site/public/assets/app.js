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
  const heroMark = document.querySelector('.hero-mark img');
  const heroAura = document.querySelector('.hero-aura');
  let raf = 0;
  if (!reduceMotion) {
    document.addEventListener('pointermove', e => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (glow) {
          glow.style.left = e.clientX + 'px';
          glow.style.top = e.clientY + 'px';
        }
        if (heroMark && window.innerWidth > 900) {
          const dx = (e.clientX / window.innerWidth - .5) * 7;
          const dy = (e.clientY / window.innerHeight - .5) * 5;
          heroMark.style.setProperty('--px', dx.toFixed(2));
          heroMark.style.setProperty('--py', dy.toFixed(2));
        }
        if (heroAura && window.innerWidth > 900) {
          const x = Math.round((e.clientX / window.innerWidth) * 100);
          const y = Math.round((e.clientY / window.innerHeight) * 100);
          heroAura.style.background = `radial-gradient(circle at ${65 + x*.14}% ${30 + y*.12}%,rgba(55,217,244,.10),transparent 23%),radial-gradient(circle at ${72 + x*.08}% ${35 + y*.08}%,rgba(136,135,255,.065),transparent 36%)`;
        }
        raf = 0;
      });
    }, { passive:true });
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
