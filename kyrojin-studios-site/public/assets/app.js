(() => {
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false');
    }));
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add('visible'));

  const glow = document.querySelector('.cursor-glow');
  if (glow) document.addEventListener('pointermove', e => { glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px'; });

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
