(() => {
  let contactFocus;
  document.documentElement.style.setProperty('--design-bar', '0px');
  document.body.insertAdjacentHTML('beforeend', `<dialog id="contact-dialog" class="portfolio-contact" aria-labelledby="contact-title"><button class="modal-close" data-close-dialog aria-label="문의 안내 닫기">×</button><div class="portfolio-contact-copy"><span class="room-kicker">JOWOO PRODUCTION / CONTACT</span><h2 id="contact-title">다음 장면을<br>함께 만들어볼까요?</h2><p>AI 영상, 숏폼·릴스, 광고, 영화.<br>새로운 작업과 협업에 관한 이야기를 기다립니다.</p><div class="portfolio-contact-links"><a id="portfolio-email" href="mailto:jowoo.media@gmail.com"><span>EMAIL</span><strong>jowoo.media@gmail.com</strong><i aria-hidden="true">↗</i></a><a id="portfolio-instagram" href="https://www.instagram.com/jowoo_ai/" target="_blank" rel="noopener noreferrer"><span>INSTAGRAM</span><strong>@jowoo_ai</strong><i aria-hidden="true">↗</i></a></div></div></dialog>`);
  const contactDialog = document.getElementById('contact-dialog');
  document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => {
    contactFocus = button;
    contactDialog.showModal();
    document.body.classList.add('modal-open');
  }));
  document.addEventListener('click', event => {
    const close = event.target.closest('[data-close-dialog]');
    if (close) close.closest('dialog').close();
    if (event.target.matches('dialog')) {
      const box = event.target.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) event.target.close();
    }
  });
  document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open');
    if (dialog === contactDialog) contactFocus?.focus();
  }));
  document.querySelectorAll('[data-year]').forEach(item => item.textContent = new Date().getFullYear());
})();
