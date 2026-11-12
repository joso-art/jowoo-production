const projects = [
  { title: 'BEYOND THE FRAME', category: 'AI 영상', image: 'orbit.svg', number: '01', text: 'AI 영상이 들어갈 포트폴리오 화면 예시입니다. 실제 작업 영상, 프로젝트 설명, 제작 크레딧으로 교체할 수 있습니다.' },
  { title: 'A DIFFERENT FORM', category: '광고', image: 'form.svg', number: '02', text: '광고 작업을 소개하는 화면 예시입니다. 브랜드의 이야기와 조우의 제작 과정을 함께 담을 수 있습니다.' },
  { title: 'MAKE IT MOVE', category: '숏폼 · 릴스', image: 'pulse.svg', number: '03', text: '숏폼·릴스 포트폴리오 화면 예시입니다. 세로형 영상과 짧은 프로젝트 소개를 넣을 수 있습니다.' }
];
const activeStyle = document.body.dataset.style;
const styleNames = [['cinematic', '01 어두운 시네마틱', '01-cinematic.html'], ['minimal', '02 밝은 미니멀', '02-minimal.html'], ['bold', '03 컬러 & 타이포', '03-bold.html'], ['hybrid', '01 + 03 혼합 시안', '04-hybrid.html'], ['screening', '05 스크리닝 룸', '05-screening.html']];
document.querySelectorAll('[data-design-switcher]').forEach(host => {
  host.innerHTML = `<a class="switch-home" href="design-studies.html" aria-label="디자인 시안 비교로 돌아가기">시안 비교 <span>↗</span></a><nav aria-label="디자인 시안 선택">${styleNames.map(([key, name, link]) => `<a href="${link}" ${activeStyle === key ? 'aria-current="page"' : ''}>${name}</a>`).join('')}</nav>`;
});
document.querySelectorAll('[data-projects]').forEach(host => {
  host.innerHTML = projects.map((project, index) => `<button class="project" data-project="${index}" data-category="${project.category}"><span class="project-picture"><img src="assets/${project.image}" alt="${project.category} 포트폴리오용 그래픽 예시" loading="lazy" width="1200" height="1000"><span class="project-open" aria-hidden="true">↗</span><span class="sample-tag">DESIGN SAMPLE</span></span><span class="project-caption"><span><small>${project.category}</small><strong>${project.title}</strong></span><span class="project-number">${project.number}</span></span></button>`).join('');
});
if (activeStyle && !document.querySelector('#project-dialog')) {
  document.body.insertAdjacentHTML('beforeend', `<dialog id="project-dialog" aria-labelledby="project-title"><button class="modal-close" data-close-dialog aria-label="프로젝트 닫기">×</button><img src="assets/orbit.svg" alt="그래픽 예시"><div class="modal-copy"><span class="modal-kicker" data-modal-category></span><h2 id="project-title" data-modal-title></h2><p data-modal-text></p></div></dialog><dialog id="contact-dialog" aria-labelledby="contact-title"><button class="modal-close" data-close-dialog aria-label="문의 안내 닫기">×</button><div class="modal-copy"><span class="modal-kicker">LET’S MAKE SOMETHING TOGETHER</span><h2 id="contact-title">새로운 조우를 기다립니다.</h2><p>AI 영상, 숏폼·릴스, 광고, 영화.<br>함께 만들고 싶은 장면이 있다면 이야기해 주세요.</p><p class="sample-note">디자인 시안입니다. 실제 문의 이메일이나 SNS가 등록되면 이곳에서 바로 연결됩니다.</p></div></dialog>`);
}
const dialog = document.querySelector('#project-dialog');
let lastFocus;
function openProject(index) {
  if (!dialog) return;
  const project = projects[index];
  dialog.querySelector('img').src = `assets/${project.image}`;
  dialog.querySelector('img').alt = `${project.category} 그래픽 예시`;
  dialog.querySelector('[data-modal-title]').textContent = project.title;
  dialog.querySelector('[data-modal-category]').textContent = `${project.category} / 디자인 시안`;
  dialog.querySelector('[data-modal-text]').textContent = project.text;
  lastFocus = document.activeElement;
  dialog.showModal();
  document.body.classList.add('modal-open');
}
document.addEventListener('click', event => {
  const project = event.target.closest('[data-project]');
  if (project) openProject(Number(project.dataset.project));
  const close = event.target.closest('[data-close-dialog]');
  if (close) close.closest('dialog').close();
  if (event.target.matches('dialog')) {
    const rect = event.target.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.target.close();
  }
});
document.querySelectorAll('dialog').forEach(item => item.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  lastFocus?.focus();
}));
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelectorAll('[data-project]').forEach(item => item.hidden = filter !== 'all' && !item.dataset.category.includes(filter));
}));
document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => {
  lastFocus = button;
  document.querySelector('#contact-dialog').showModal();
  document.body.classList.add('modal-open');
}));
document.querySelectorAll('[data-year]').forEach(item => item.textContent = new Date().getFullYear());
