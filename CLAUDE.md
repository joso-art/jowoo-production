# 조우 프로덕션 홈페이지 인수인계

## 프로젝트와 실행

- 조우 프로덕션의 공개 영상 포트폴리오입니다. 두 사람이 함께하는 프로덕션 팀이며 AI 영상, 숏폼·릴스, 광고, 영화를 제작합니다.
- 공개 주소: https://jowoo-production.com/
- 이 사본의 기준: 2026-11-13 인계, 마지막 확인된 공개 버전 14, 원본 커밋 `5b932431e42423402ba4d667bb89c03a6cf8d0db`.
- 프레임워크, 패키지 설치, 빌드 과정이 없는 HTML/CSS/JavaScript 정적 사이트입니다. 데이터베이스나 비공개 환경 변수도 필요하지 않습니다.
- Node.js가 설치되어 있으면 이 폴더에서 `node preview.mjs`를 실행한 뒤 http://127.0.0.1:4173/ 에서 확인합니다.
- 공개할 파일은 `dist/` 전체입니다. 다른 호스팅 서비스로 옮길 때도 `dist/` 내부 파일과 상대 경로를 그대로 유지합니다.
- `reference/current-desktop.png`는 현재 디자인을 참고하기 위한 화면입니다.

## 주요 파일

| 파일 | 역할 |
| --- | --- |
| `dist/index.html` | 공개 홈페이지의 화면 구조와 초기 표시 값 |
| `dist/05-screening.html` | 같은 홈페이지의 별도 진입 주소. 현재 `index.html`과 내용이 같습니다. 공통 화면을 바꿀 때 함께 맞춥니다. |
| `dist/screening-data.js` | 작품명, 설명, 담당 작업, 영상·포스터 경로와 외부 채널 링크 |
| `dist/screening.css` | 메인 화면, 영상 목록, 반응형 배치, 상세 창의 스타일 |
| `dist/screening.js` | 영상 선택, 재생, 이동, 소리, 시간 표시와 상세 창 동작 |
| `dist/portfolio.js` | 연락처와 공통 창 열기·닫기 동작 |
| `dist/shared.css` | 공통 스타일 |
| `dist/assets/videos/` | 웹사이트용 영상 4개 |
| `dist/assets/posters/` | 영상 썸네일 4개 |
| `preview.mjs` | 패키지 설치 없이 실행하는 로컬 확인용 서버 |

`dist/01-cinematic.html`부터 `04-hybrid.html`, `design-studies.html` 및 관련 스타일은 예전 디자인 시안입니다. 현재 공개 첫 화면은 `dist/index.html`입니다.

## 작품 정보와 순서

네 작품 모두 담당 작업은 **기획 / 연출 / 제작 / 편집**입니다.

1. **어린이날** / OFFICIAL
   - 설명: 어린이날의 추억과 행복한 기억을 느낄 수 있습니다.
   - 영상: `assets/videos/video-03-final.mp4`
   - 썸네일: `assets/posters/video-03-final.jpg`
2. **어른이날** / RAW
   - 설명: 집단 환각,환청이 의심되는 악몽이자 망상입니다.
   - 영상: `assets/videos/video-03-raw.mp4`
   - 썸네일: `assets/posters/video-03-raw.jpg`
3. **몽권랜드** / OFFICIAL
   - 설명: 놀이동산의 설렘과 순수한 즐거움을 느낄 수 있습니다.
   - 영상: `assets/videos/video-04-official.mp4`
   - 썸네일: `assets/posters/video-04-official.jpg`
4. **몽권랜드 악몽** / RAW
   - 설명: 놀이동산이 닫힌 밤 혼자만 남아있는 악몽
   - 영상: `assets/videos/video-04-raw.mp4`
   - 썸네일: `assets/posters/video-04-raw.jpg`

영상 파일은 사이트에서 사용 중인 웹용 사본입니다. 별도의 편집 원본이나 프로젝트 파일은 이 묶음에 들어 있지 않습니다.

## 연락처와 채널

- 이메일: jowoo.media@gmail.com
- 팀 인스타그램: https://www.instagram.com/jowoo_ai/
- 몽권거래소 인스타그램: https://www.instagram.com/mong.g_official/
- 몽권거래소 유튜브: https://www.youtube.com/channel/UCcqSDMOp-_WCtb8fI_wtFGw
- 몽권거래소를 고발합니다 인스타그램: https://www.instagram.com/mong.g_raw.film/
- 몽권거래소를 고발합니다 유튜브: https://www.youtube.com/channel/UCK3ltx--BiCCpmHhEW1r16g

## 유지할 화면과 최근 요청

- 어두운 배경과 연두색 포인트의 영상 상영실 디자인입니다. 참고한 사이트는 https://americanhaiku.xyz/ 입니다.
- 왼쪽 위는 사용자가 직접 만든 로고 이미지(`dist/assets/logo-jowoo.svg`, 뷰파인더 + 빨간 REC 점 + 조우 + PRODUCTION 입력창)가 한글 `조우` 글자 자리에 들어가고, 그 옆에 한자 `遭遇`(17px, 회색 명조), 그 오른쪽에 PRODUCTION / FILM & VISUALS. 글씨(10px, 1200px 이하에서 숨김)를 둡니다. 한글 조우 텍스트와 ✳는 지웠습니다. 로고 이미지 높이: PC 58px / 1000px 이하 50px / 모바일 44px.
- 2026-11-13 레이아웃 정리: `screening.css` 맨 아래 블록이 기준입니다. 헤더·영상·재생줄·맨 아래 줄이 같은 3단 칸(좌 `--side` / 가운데 / 우 `--side`, 여백 `--pad`)을 씁니다. 메뉴와 영상은 화면 중앙, 재생바는 영상 칸 폭에 맞춥니다. 작은 라벨은 `--label`(10px)로 통일했습니다. 모바일은 영상을 가로 가득 쓰고 FORMAT·SOUND를 영상 아래 한 줄에 둡니다.
- 맨 아래 가운데 글씨(작품명 / 버전 / 조우 프로덕션)는 사용자 요청으로 지웠습니다. `#footer-note` 요소는 JavaScript가 쓰기 때문에 비운 채 숨겨 두었습니다.
- 메뉴는 **PROJECTS / ABOUT / LET'S TALK**입니다. 큰 화면에서 메뉴 본문은 22px입니다.
- 오른쪽에는 한국 시간과 FORMAT, 원본 비율, SOUND가 표시됩니다.
- 영상의 원본 화면 비율을 유지합니다. 사용자는 기존 영상을 세로로 크롭하지 않기를 요청했습니다.
- PC에서는 왼쪽 영상 목록, 모바일에서는 ‘영상 목록’ 버튼으로 여는 목록 창을 사용합니다.
- 선택된 작품의 OFFICIAL/RAW 아래 `project-version`은 숨겨 둔 상태입니다. 이 요소의 ID는 JavaScript에서 사용합니다.
- 왼쪽 아래 01/04 밑의 재생 상태는 11px, 작품 설명은 13px입니다. 작품 설명이 화면 안에 보이도록 왼쪽 영상 목록 자체가 스크롤됩니다.
- ALL PROJECTS 버튼은 PC에서 최소 너비 230px이며, 본문 14px / 보조 글씨 11px로 읽기 쉽게 키운 상태입니다.
- 재생·일시정지 아이콘은 SVG로 바꾸어 버튼의 정중앙에 맞췄습니다. `syncPlayback()`은 `is-playing` 클래스로 SVG 모양을 전환합니다.
- 작품 정보는 영상 목록, 선택 작품의 제목과 설명, PROJECTS 상세 카드에 반영됩니다.

## 재생바 수정 이력 — 중요

기존 공개 서버가 영상 부분 요청(Range)에 전체 파일 응답(HTTP 200)을 보내면서 Chrome의 `seekable` 범위가 0으로 남는 문제가 있었습니다. 이때 재생바를 눌러도 0초로 돌아갔습니다.

현재 `screening.js`의 `prepareVideo()`는 MP4를 `fetch()`한 다음 Blob으로 받고, `URL.createObjectURL()`로 만든 주소를 `video.src`에 넣습니다. 이 방식으로 재생 위치 이동이 정상 작동합니다. 영상 전환 시 이전 요청을 취소하고 Blob 주소를 해제하며, 늦게 끝난 요청이 다른 영상을 덮지 않도록 선택 버전을 검사합니다.

재생바와 재생 코드를 바꿀 때 이 처리를 보존합니다. 새 호스팅에서 직접 MP4 주소를 쓰도록 바꾸려면 실제 공개 서버의 Range 응답과 재생 위치 이동을 검증합니다. 로컬 서버 `preview.mjs`는 Range를 지원하지만, 기존 공개 서버와 동작이 다릅니다.

## 게시와 도메인

- 도메인 `jowoo-production.com`은 사용자가 가비아에서 구매했고, 현재 사이트에 연결되어 있습니다. 이 파일 묶음을 받는 데 도메인 이전이나 재구매는 필요하지 않습니다.
- 2026-11-13부터 공개 사이트는 GitHub `joso-art/jowoo-production`의 main 브랜치를 Cloudflare Pages(프로젝트 jowoo-production, 출력 폴더 `dist`)가 자동 배포합니다. main에 push하면 1~2분 뒤 반영됩니다. 임시 주소: https://jowoo-production.pages.dev. 도메인은 가비아 네임서버를 Cloudflare(frida/ian.ns.cloudflare.com)로 바꿨습니다.
- (예전) 공개 사이트는 Sites로 배포되어 있었습니다. 로컬 파일 수정과 공개 사이트 반영은 별개이며, 게시 작업이 필요합니다.
- 이 사본에는 기존 배포용 Git 저장소, Git 인증 정보, 로그인 정보, `.openai/hosting.json`을 포함하지 않았습니다. 이 사본만으로 기존 사이트의 배포 권한이 넘어가지는 않습니다.
- 기존 Sites 경로로 계속 게시한다면 수정된 `dist/` 파일을 원본 프로젝트에 반영하여 기존 게시 절차를 사용합니다.
- 다른 호스팅에서 관리한다면 그 서비스에 `dist/`를 게시하고 기존 도메인을 연결합니다. 연결값은 선택한 서비스에서 안내한 실제 값으로 설정합니다.
- 가비아의 도메인 등록과 기존 사이트는 이번 인계 작업에서 변경하지 않았습니다.

## 검색·공유·오류 화면 (2026-11-13 추가)

- `dist/404.html`: 없는 주소로 들어왔을 때 보이는 안내 화면입니다. 이 파일이 있어야 Cloudflare Pages가 잘못된 주소에 첫 화면 대신 404를 돌려줍니다.
- `dist/robots.txt`, `dist/sitemap.xml`: 검색엔진용입니다. 예전 시안과 `05-screening.html`은 검색에서 제외했습니다. 새 페이지를 만들면 sitemap에 추가합니다.
- `index.html` head에 공유 미리보기 태그(og/twitter)와 회사 정보(JSON-LD)가 있습니다. 연락처나 채널이 바뀌면 같이 고칩니다.
- 구글 서치 콘솔: 2026-11-13 `https://jowoo-production.com/`(URL 접두어) 등록, HTML 태그로 소유권 확인, sitemap.xml 제출 완료. `google-site-verification` meta 태그는 지우지 않습니다.
- 네이버 서치어드바이저: 2026-11-13 사용자가 직접 사이트 등록·소유확인 완료(자동 조작이 막힌 사이트). 인증 코드(`naver-site-verification`)는 2026-11-13 `index.html`·`05-screening.html` head에 넣었습니다. 지우지 않습니다.

## 수정 확인

- HTML 초기 표시 값과 `screening-data.js`의 실제 데이터가 일치하는지 확인합니다.
- `node --check dist/screening.js`, `node --check dist/screening-data.js`, `node --check dist/portfolio.js`로 수정한 JavaScript의 구문을 확인할 수 있습니다.
- 바꾼 CSS나 JavaScript의 `?v=` 값을 갱신하여 캐시가 남지 않도록 합니다. 현재 CSS는 `v=20`, 플레이어 JS는 `v=14`, 작품 데이터는 `v=14`입니다.
- PC와 모바일 크기에서 제목, 설명, 연락처, 목록과 버튼이 겹치지 않는지 확인합니다.
- 플레이어를 변경했다면 네 영상 전환, 재생·일시정지, 여러 위치로 이동, 소리 전환을 실제 화면에서 확인합니다.
- 사용자는 PC Chrome에서 열어둔 이전 화면이 남았던 적이 있습니다. 공개 반영 후 Ctrl + Shift + R로 새로고침하도록 안내하면 됩니다.
- 사용자는 간단한 한국어 설명을 선호합니다. 검증한 결과를 명확하게 전달합니다.
