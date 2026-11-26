(() => {
  let contactFocus;
  // 문의 접수: Web3Forms 접근 키(공개되어도 안전)를 넣으면 문의가 jowoo.media@gmail.com 으로 바로 도착합니다.
  // 키가 비어 있는 동안에는 작성한 내용이 메일 앱(mailto)으로 넘어갑니다.
  const FORM_KEY = 'd8c17df2-cc35-425d-abc9-726bad3d1f7b';
  const MAIL = 'jowoo.media@gmail.com';
  const CATEGORIES = ['영상 제작 의뢰', '광고 · 브랜디드', '숏폼 · 릴스', '영화 · 시나리오 협업', '기타 문의'];
  document.documentElement.style.setProperty('--design-bar', '0px');
  const chips = CATEGORIES.map((name, i) => `<label class="cf-chip"><input type="radio" name="category" value="${name}"${i === 0 ? ' checked' : ''}><span>${name}</span></label>`).join('');
  document.body.insertAdjacentHTML('beforeend', `<dialog id="contact-dialog" class="portfolio-contact" aria-labelledby="contact-title"><button class="modal-close" data-close-dialog aria-label="문의 창 닫기">×</button><div class="portfolio-contact-copy"><span class="room-kicker">JOWOO PRODUCTION / CONTACT</span><h2 id="contact-title">다음 장면을<br>함께 만들어볼까요?</h2><p>AI 영상, 숏폼·릴스, 광고, 영화.<br>문의 종류를 고르고 내용을 남겨 주세요. <span class="cf-nowrap">확인 후 회신드립니다.</span></p><form id="contact-form" class="contact-form" novalidate><fieldset class="cf-field"><legend>문의 종류</legend><div class="cf-chips">${chips}</div></fieldset><div class="cf-row"><label class="cf-field"><span>이름 / 회사</span><input name="name" type="text" maxlength="60" autocomplete="name" required aria-describedby="cf-error-name"><small class="cf-error" id="cf-error-name"></small></label><label class="cf-field"><span>회신 받을 이메일</span><input name="email" type="email" maxlength="120" autocomplete="email" inputmode="email" required aria-describedby="cf-error-email"><small class="cf-error" id="cf-error-email"></small></label></div><label class="cf-field"><span>희망 일정 · 예산 <em>(선택)</em></span><input name="budget" type="text" maxlength="120"></label><label class="cf-field"><span>문의 내용</span><textarea name="message" rows="5" maxlength="3000" placeholder="어떤 영상을 만들고 싶으신지 편하게 적어 주세요." required aria-describedby="cf-error-message"></textarea><small class="cf-error" id="cf-error-message"></small></label><input class="cf-trap" type="text" name="company_site" tabindex="-1" autocomplete="off" aria-hidden="true"><button class="cf-submit" type="submit"><span>문의 보내기</span><i aria-hidden="true">→</i></button></form><p class="cf-status" id="contact-status" role="status" aria-live="polite"></p><div class="contact-direct"><span>또는 직접 연락</span><a id="portfolio-email" href="mailto:${MAIL}">${MAIL}</a><a id="portfolio-instagram" href="https://www.instagram.com/jowoo_ai/" target="_blank" rel="noopener noreferrer">@jowoo_ai ↗</a></div></div></dialog>`);
  const contactDialog = document.getElementById('contact-dialog');
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('contact-status');
  const submitBtn = form.querySelector('.cf-submit');
  const setStatus = (text, kind) => { statusEl.textContent = text; statusEl.dataset.kind = kind || ''; };
  // 칸별 오류: 문제 있는 칸 아래에 이유를 적고, 다시 입력하면 지웁니다.
  const setFieldError = (field, text) => {
    document.getElementById('cf-error-' + field.name).textContent = text;
    if (text) field.setAttribute('aria-invalid', 'true'); else field.removeAttribute('aria-invalid');
  };
  const checkedFields = [form.elements.name, form.elements.email, form.elements.message];
  checkedFields.forEach(field => field.addEventListener('input', () => setFieldError(field, '')));
  // 전송 키가 없으면 메일 앱으로 넘어가므로, 버튼 이름도 그 동작에 맞춥니다.
  if (!FORM_KEY) submitBtn.querySelector('span').textContent = '메일 앱으로 보내기';
  const resetForm = () => { form.reset(); form.hidden = false; setStatus(''); submitBtn.disabled = false; checkedFields.forEach(field => setFieldError(field, '')); };
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const emailField = form.elements.email;
    const problems = [
      [form.elements.name, !data.name.trim() ? '이름이나 회사명을 적어 주세요.' : ''],
      [emailField, !data.email.trim() ? '회신 받을 이메일을 적어 주세요.' : !emailField.checkValidity() ? '이메일 주소 형식을 확인해 주세요. 예: name@example.com' : ''],
      [form.elements.message, !data.message.trim() ? '문의 내용을 적어 주세요.' : '']
    ];
    problems.forEach(([field, text]) => setFieldError(field, text));
    const firstProblem = problems.find(([, text]) => text);
    if (firstProblem) {
      setStatus('표시된 칸을 확인해 주세요.', 'error');
      firstProblem[0].focus();
      return;
    }
    if (data.company_site) { setStatus('문의가 전달되었습니다. 확인 후 회신드리겠습니다.', 'ok'); form.hidden = true; return; }
    const subject = `[조우 프로덕션 문의] ${data.category} - ${data.name.trim()}`;
    if (!FORM_KEY) {
      const body = `문의 종류: ${data.category}\n이름/회사: ${data.name.trim()}\n회신 이메일: ${data.email.trim()}\n희망 일정·예산: ${data.budget.trim() || '-'}\n\n${data.message.trim()}`;
      setStatus('메일 앱이 열립니다. 열리지 않으면 ' + MAIL + ' 로 보내 주세요.', 'ok');
      location.href = `mailto:${MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }
    submitBtn.disabled = true;
    setStatus('보내는 중입니다…', '');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: FORM_KEY, subject, from_name: '조우 프로덕션 홈페이지', name: data.name.trim(), email: data.email.trim(), category: data.category, budget: data.budget.trim(), message: data.message.trim() })
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.success) throw new Error(result.message || res.status);
      form.hidden = true;
      setStatus('문의가 전달되었습니다. 확인 후 회신드리겠습니다.', 'ok');
    } catch (error) {
      submitBtn.disabled = false;
      setStatus('전송에 실패했습니다. 잠시 뒤 다시 시도하거나 ' + MAIL + ' 로 보내 주세요.', 'error');
    }
  });
  document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => {
    contactFocus = button;
    if (!statusEl.textContent || statusEl.dataset.kind === 'ok') resetForm();
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
  // 휴대폰·브라우저의 '뒤로 가기'로 열린 창을 닫습니다.
  // 창이 열리면 방문 기록을 한 칸 만들고, 뒤로 가기를 누르면 사이트를 떠나는 대신 창만 닫힙니다.
  // 닫기 버튼·Esc·바깥 클릭으로 닫았을 때는 만들어 둔 기록 한 칸을 되돌려 놓습니다.
  const allDialogs = [...document.querySelectorAll('dialog')];
  let dialogHistoryEntry = false;
  const dialogWatcher = new MutationObserver(() => {
    const anyOpen = allDialogs.some(dialog => dialog.open);
    if (anyOpen && !dialogHistoryEntry) {
      history.pushState({jowooDialog: true}, '');
      dialogHistoryEntry = true;
    } else if (!anyOpen && dialogHistoryEntry) {
      dialogHistoryEntry = false;
      history.back();
    }
  });
  allDialogs.forEach(dialog => dialogWatcher.observe(dialog, {attributes: true, attributeFilter: ['open']}));
  window.addEventListener('popstate', () => {
    if (!dialogHistoryEntry) return;
    dialogHistoryEntry = false;
    allDialogs.forEach(dialog => { if (dialog.open) dialog.close(); });
  });
  document.querySelectorAll('[data-year]').forEach(item => item.textContent = new Date().getFullYear());
})();
