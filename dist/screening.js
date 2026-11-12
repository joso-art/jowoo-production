(() => {
  const films = window.JOU_SCREENING_PROJECTS;
  if (!Array.isArray(films) || !films.length) return;
  const get = id => document.getElementById(id);
  const video = get('screen-video');
  const poster = get('screen-poster');
  const seek = get('seek');
  const viewer = get('viewer');
  const indexDialog = get('index-dialog');
  const teamDialog = get('team-dialog');
  const filmListDialog = get('film-list-dialog');
  let selected = 0;
  let elapsed = 0;
  let wantsPlayback = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  let playing = false;
  let soundOn = false;
  let loading = false;
  let failed = false;
  let changingSource = false;
  let selectionVersion = 0;
  let playRequest = 0;
  let pendingSeek = null;
  let sourceRequest = null;
  let sourceObjectUrl = null;
  let lastFrame = -1;
  let lastDialogFocus;
  const two = value => String(Math.floor(value)).padStart(2, '0');
  const clock = seconds => `${two(seconds / 60)}:${two(seconds % 60)}`;
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, character => `&#${character.charCodeAt(0)};`);
  const film = () => films[selected];
  const fps = () => Math.round(film().fps || 24);
  const timecode = seconds => `00:${clock(seconds)}:${two((seconds % 1) * fps())}`;
  const duration = () => Number.isFinite(video.duration) && video.duration > 0 ? video.duration : film().duration;
  const currentVideoMatches = () => sourceObjectUrl && video.currentSrc === sourceObjectUrl;

  function updateClock() {
    get('local-clock').textContent = new Intl.DateTimeFormat('en-GB', {timeZone:'Asia/Seoul', hour:'2-digit', minute:'2-digit', second:'2-digit', hourCycle:'h23'}).format(new Date());
  }
  updateClock();
  setInterval(updateClock, 1000);
  get('project-total').textContent = two(films.length);

  function syncPlayback() {
    get('play-symbol').classList.toggle('is-playing', wantsPlayback);
    get('toggle-play').setAttribute('aria-label', wantsPlayback ? '영상 일시정지' : '영상 재생');
    get('playback-status').textContent = failed ? 'UNAVAILABLE' : loading ? 'LOADING' : playing ? 'PLAYING' : 'PAUSED';
    viewer.dataset.playing = String(playing);
  }

  function syncSound() {
    get('toggle-sound').disabled = !film().video;
    get('toggle-sound').innerHTML = film().video ? `SOUND<br>${soundOn ? 'ON' : 'OFF'}` : 'NO<br>AUDIO';
    get('toggle-sound').setAttribute('aria-label', film().video ? (soundOn ? '소리 끄기' : '소리 켜기') : '이 작업물에는 음성이 없습니다');
    video.muted = !soundOn;
  }

  function renderProgress(force = false) {
    const total = duration();
    const frame = Math.floor(elapsed * fps());
    if (!force && frame === lastFrame) return;
    lastFrame = frame;
    const progress = Math.max(0, Math.min(1, elapsed / total));
    seek.value = String(Math.round(progress * 1000));
    seek.style.setProperty('--progress', `${progress * 100}%`);
    seek.setAttribute('aria-valuetext', `${Math.floor(elapsed)}초 / ${Math.round(total)}초`);
    get('elapsed-time').textContent = clock(elapsed);
    get('total-time').textContent = clock(total);
    get('screen-timecode').textContent = timecode(elapsed);
  }

  async function startVideo() {
    wantsPlayback = true;
    failed = false;
    if (!video.getAttribute('src')) {
      if (!sourceRequest) prepareVideo(film(), selectionVersion);
      loading = true;
      syncPlayback();
      return;
    }
    const version = selectionVersion;
    const request = ++playRequest;
    wantsPlayback = true;
    loading = true;
    syncPlayback();
    try {
      await video.play();
      if (version !== selectionVersion || request !== playRequest) return;
      playing = !video.paused;
      wantsPlayback = playing;
    } catch {
      if (version !== selectionVersion || request !== playRequest) return;
      playing = false;
      wantsPlayback = false;
    }
    loading = false;
    syncPlayback();
  }

  async function prepareVideo(current, version) {
    const controller = new AbortController();
    sourceRequest = controller;
    loading = true;
    syncPlayback();
    try {
      // A complete local Blob remains seekable when the host ignores HTTP Range requests.
      const response = await fetch(current.video, {signal: controller.signal});
      if (!response.ok) throw new Error(`Video request failed: ${response.status}`);
      const media = await response.blob();
      if (controller.signal.aborted || version !== selectionVersion) return;
      sourceObjectUrl = URL.createObjectURL(media);
      video.src = sourceObjectUrl;
      video.load();
      get('media-note').textContent = current.description || '조우 프로덕션 작업 영상';
      get('footer-note').textContent = `${current.title} / ${current.label} / 조우 프로덕션`;
      loading = wantsPlayback;
      if (wantsPlayback) startVideo();
      else syncPlayback();
    } catch (error) {
      if (controller.signal.aborted || version !== selectionVersion) return;
      loading = false;
      failed = true;
      wantsPlayback = false;
      syncPlayback();
      get('media-note').textContent = '영상에 연결할 수 없습니다';
      get('footer-note').textContent = '영상을 불러오지 못했습니다. 재생 버튼을 눌러 다시 시도해 주세요.';
    } finally {
      if (sourceRequest === controller) sourceRequest = null;
    }
  }

  function loadFilm(index) {
    const shouldPlay = wantsPlayback;
    selectionVersion++;
    playRequest++;
    changingSource = true;
    video.pause();
    video.removeAttribute('src');
    video.load();
    sourceRequest?.abort();
    sourceRequest = null;
    if (sourceObjectUrl) URL.revokeObjectURL(sourceObjectUrl);
    sourceObjectUrl = null;
    selected = (index + films.length) % films.length;
    elapsed = 0;
    lastFrame = -1;
    pendingSeek = null;
    playing = false;
    failed = false;
    loading = false;
    wantsPlayback = shouldPlay;
    const current = film();
    const number = two(selected + 1);
    poster.src = current.poster;
    poster.alt = current.alt;
    poster.style.transform = 'none';
    viewer.dataset.media = current.video ? 'video' : 'poster';
    viewer.style.setProperty('--media-aspect', String(current.aspect || 4 / 3));
    get('project-number').textContent = number;
    get('project-kind').textContent = current.kind;
    get('project-version').textContent = current.label;
    get('current-title').textContent = current.title;
    get('seek-caption').textContent = `${current.title} / ${current.kind}`;
    get('media-note').textContent = current.description || '조우 프로덕션 작업 영상';
    get('footer-note').textContent = `${current.title} / ${current.label} / 조우 프로덕션`;
    get('original-frame-label').textContent = current.aspectLabel || '원본';
    video.hidden = !current.video;
    video.poster = current.poster;
    syncSound();
    if (current.video) {
      prepareVideo(current, selectionVersion);
    } else {
      changingSource = false;
      wantsPlayback = false;
    }
    document.querySelectorAll('[data-scene]').forEach(button => button.setAttribute('aria-current', String(Number(button.dataset.scene) === selected)));
    renderProgress(true);
    syncPlayback();
  }

  function togglePlay() {
    if (!film().video) return;
    if (wantsPlayback) {
      playRequest++;
      wantsPlayback = false;
      playing = false;
      loading = false;
      video.pause();
      syncPlayback();
    } else startVideo();
  }

  function moveTo(seconds) {
    elapsed = Math.max(0, Math.min(duration() - 0.01, seconds));
    if (video.readyState >= 1) video.currentTime = elapsed;
    else pendingSeek = elapsed;
    renderProgress(true);
  }

  get('toggle-play').addEventListener('click', togglePlay);
  get('toggle-sound').addEventListener('click', () => { soundOn = !soundOn; syncSound(); });
  get('back-five').addEventListener('click', () => moveTo(elapsed - 5));
  get('forward-five').addEventListener('click', () => moveTo(elapsed + 5));
  get('previous-project').addEventListener('click', () => loadFilm(selected - 1));
  get('next-project').addEventListener('click', () => loadFilm(selected + 1));
  seek.addEventListener('input', () => moveTo(Number(seek.value) / 1000 * duration()));

  video.addEventListener('loadedmetadata', () => {
    if (!currentVideoMatches()) return;
    changingSource = false;
    if (video.videoWidth && video.videoHeight) viewer.style.setProperty('--media-aspect', String(video.videoWidth / video.videoHeight));
    if (pendingSeek !== null) { video.currentTime = pendingSeek; pendingSeek = null; }
    renderProgress(true);
  });
  video.addEventListener('playing', () => {
    if (!currentVideoMatches()) return;
    loading = false;
    playing = !video.paused;
    syncPlayback();
  });
  video.addEventListener('pause', () => {
    if (changingSource) return;
    playing = false;
    wantsPlayback = false;
    loading = false;
    syncPlayback();
  });
  video.addEventListener('waiting', () => { if (wantsPlayback) { loading = true; syncPlayback(); } });
  video.addEventListener('error', () => {
    if (!film().video || !video.getAttribute('src')) return;
    wantsPlayback = false;
    playing = false;
    loading = false;
    failed = true;
    syncPlayback();
    get('media-note').textContent = '영상에 연결할 수 없습니다';
    get('footer-note').textContent = '영상에 연결할 수 없습니다. 잠시 후 다시 재생해 주세요.';
  });

  get('room-project-list').innerHTML = films.map((item, index) => `<article class="room-project-card"><button class="room-project" data-scene="${index}" aria-label="${escapeHTML(item.title)} ${escapeHTML(item.label)} 재생"><span class="room-project-image"><img src="${escapeHTML(item.poster)}" alt="${escapeHTML(item.alt)}" width="964" height="720"><span>${two(index + 1)} / ${escapeHTML(item.kind)}</span></span><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.label)} · ${clock(item.duration)} <span>↗</span></small></button>${item.description ? `<p class="room-project-description">${escapeHTML(item.description)}</p>` : ''}${item.roles?.length ? `<p class="room-project-credits"><span>조우 프로덕션</span>${escapeHTML(item.roles.join(' / '))}</p>` : ''}</article>`).join('');

  const filmListMarkup = films.map((item, index) => `<button class="film-list-item" data-scene="${index}" aria-label="${two(index + 1)}번 ${escapeHTML(item.title)} ${escapeHTML(item.label)} 재생"><span class="film-list-index">${two(index + 1)}</span><span class="film-list-copy"><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.kind)} · ${clock(item.duration)}</small></span><span class="film-list-arrow" aria-hidden="true">↗</span></button>`).join('');
  document.querySelectorAll('[data-film-list]').forEach(list => list.innerHTML = filmListMarkup);

  const channelList = get('room-channel-list');
  if (channelList) {
    (window.JOU_WORK_CHANNELS || []).forEach(project => {
      const section = document.createElement('section');
      section.className = 'room-channel';
      const title = document.createElement('h3');
      title.textContent = project.title;
      section.append(title);
      const links = document.createElement('div');
      links.className = 'room-channel-links';
      project.links.forEach(item => {
        const link = document.createElement('a');
        link.href = item.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', `${project.title} ${item.label} 새 창으로 열기`);
        const label = document.createElement('span');
        label.textContent = item.label;
        const arrow = document.createElement('span');
        arrow.textContent = '↗';
        arrow.setAttribute('aria-hidden', 'true');
        link.append(label, arrow);
        links.append(link);
      });
      section.append(links);
      channelList.append(section);
    });
  }

  function openDialog(dialog) {
    lastDialogFocus = document.activeElement;
    dialog.showModal();
    document.body.classList.add('modal-open');
  }
  get('open-index').addEventListener('click', () => openDialog(indexDialog));
  get('all-work').addEventListener('click', () => openDialog(indexDialog));
  get('open-team').addEventListener('click', () => openDialog(teamDialog));
  get('open-film-list')?.addEventListener('click', () => openDialog(filmListDialog));
  get('team-contact').addEventListener('click', () => {
    teamDialog.close();
    document.querySelector('[data-contact]').click();
  });
  document.querySelectorAll('[data-scene]').forEach(button => button.addEventListener('click', () => {
    loadFilm(Number(button.dataset.scene));
    if (indexDialog.open) indexDialog.close();
    if (filmListDialog?.open) filmListDialog.close();
  }));
  [indexDialog, teamDialog, filmListDialog].filter(Boolean).forEach(dialog => dialog.addEventListener('close', () => lastDialogFocus?.focus()));
  document.addEventListener('keydown', event => {
    if (event.target.closest('button,input,dialog,a') || document.querySelector('dialog[open]')) return;
    if (event.code === 'Space') { event.preventDefault(); togglePlay(); }
    if (event.code === 'ArrowLeft') { event.preventDefault(); moveTo(elapsed - 5); }
    if (event.code === 'ArrowRight') { event.preventDefault(); moveTo(elapsed + 5); }
  });
  const bar = document.querySelector('.design-switcher');
  if (bar) new ResizeObserver(() => document.documentElement.style.setProperty('--design-bar', `${bar.getBoundingClientRect().height}px`)).observe(bar);
  else document.documentElement.style.setProperty('--design-bar', '0px');
  function tick() {
    if (video.readyState >= 1 && pendingSeek === null) elapsed = video.currentTime;
    renderProgress();
    requestAnimationFrame(tick);
  }
  loadFilm(0);
  viewer.dataset.ratio = 'original';
  requestAnimationFrame(tick);
})();
