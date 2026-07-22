(() => {
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
  } else {
    items.forEach((item) => item.classList.add('is-visible'));
  }

  const toc = document.querySelector('.toc');
  const toggle = document.querySelector('.toc__toggle');
  toggle?.addEventListener('click', () => {
    const open = toc.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  toc?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    toc.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));

  const modal = document.querySelector('#image-modal');
  const modalImage = modal?.querySelector('img');
  document.querySelectorAll('.image-button').forEach((button) => {
    button.addEventListener('click', () => {
      if (!modal || !modalImage) return;
      modalImage.src = button.dataset.full || '';
      modalImage.alt = button.querySelector('img')?.alt || '資料画像';
      modal.showModal();
    });
  });
  modal?.querySelector('.modal__close')?.addEventListener('click', () => modal.close());
  modal?.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });
})();
