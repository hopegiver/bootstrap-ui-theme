# Bootstrap UI Theme — CLAUDE.md

## 프로젝트 개요

Bootstrap 5 기반으로 여러 UI 디자인 시스템의 룩앤필을 재현한 CSS/JS 테마 라이브러리.

- **HeroUI** — 파란색 팔레트, HeroUI v3 디자인 언어
- **shadcn/ui** — 회색 톤, shadcn/ui 스타일
- **NuxtUI v4** — NuxtUI v4 스타일

각 테마는 독립적으로 빌드되어 `dist/`에 `{theme}.css` + `{theme}.js` 한 쌍으로 출력된다.

## 디렉토리 구조

```
bootstrap-ui-theme/
├── src/
│   ├── heroui/          # HeroUI 테마 소스
│   │   ├── _variables.scss   # Bootstrap 변수 오버라이드 + 커스텀 변수
│   │   ├── _components.scss  # 커스텀 컴포넌트 스타일
│   │   ├── main.scss         # 진입점: variables → bootstrap → components
│   │   ├── main.js           # 진입점: Bootstrap JS + 다크모드 토글
│   │   └── index.html        # 개발 미리보기 페이지
│   ├── shadcn/          # shadcn/ui 테마 소스 (동일 구조)
│   └── nuxtui/          # NuxtUI v4 테마 소스 (동일 구조)
├── dist/                # 빌드 출력 (각 테마 .css + .js)
├── heroui.html          # 루트 레벨 미리보기 (dist/ 파일 참조, CDN 없음)
├── heroui-cdn.html      # CDN 버전 미리보기
├── vite.config.js       # 멀티 모드 Vite 설정
└── package.json
```

## 개발 명령어

```bash
npm run dev:heroui      # HeroUI 개발 서버
npm run dev:shadcn      # shadcn 개발 서버
npm run dev:nuxtui      # NuxtUI 개발 서버

npm run build:heroui      # HeroUI만 빌드
npm run build:shadcn      # shadcn만 빌드
npm run build:nuxtui      # NuxtUI만 빌드
npm run build             # 전체 빌드 (전 테마 순차)
```

## 기술 스택

- **Vite** — 번들러 (멀티 모드, `--mode {theme}` 방식)
- **Sass/SCSS** — 스타일 전처리기
- **Bootstrap 5** — 기반 프레임워크 (SCSS import 방식)
- **autoprefixer / postcss** — 벤더 프리픽스

## 테마 구현 원칙

- **Bootstrap 클래스 변경 금지** — 기존 Bootstrap 클래스명은 절대 변경하지 않는다. 테마는 오직 CSS 변수/속성 오버라이드(`_variables.scss`)만으로 구현한다.
- **신규 클래스는 Bootstrap 부재 시에만** — Bootstrap에 없는 컴포넌트에 한해서만 새로운 클래스를 `_components.scss`에 추가할 수 있다.
- **Bootstrap 전체 컴포넌트 구현 우선** — Bootstrap 5가 제공하는 모든 컴포넌트(Accordion, Alert, Badge, Breadcrumb, Button, Card, Carousel, Collapse, Dropdown, List group, Modal, Navbar, Offcanvas, Pagination, Placeholder, Popover, Progress, Scrollspy, Spinners, Toast, Tooltip 등)의 스타일을 빠짐없이 테마에 반영해야 한다.

## 아키텍처 규칙

- 각 테마의 SCSS 진입점 순서: `_variables.scss` → `bootstrap/scss/bootstrap` → `_components.scss`
- 테마 간 코드는 공유하지 않는다. 각 `src/{theme}/`은 독립적이다.
- 다크모드는 `data-theme="dark"` (html 속성) + `data-bs-theme="dark"` (Bootstrap) 병행 사용
- 다크 모드 상태는 `localStorage`에 `{theme}-theme` 키로 `"dark"` 값으로 저장. 라이트 모드(기본)로 돌아오면 키를 제거한다.

## 빌드 출력 규칙

- `vite.config.js`의 `emptyOutDir: false` — 빌드 시 `dist/` 전체 삭제 안 함, 덮어쓰기만
- 출력 파일명은 모드 이름과 동일 (`heroui.css`, `heroui.js` 등)

## 주의 사항

- SCSS deprecation 경고는 `silenceDeprecations` 옵션으로 억제 중 (`import`, `global-builtin`, `color-functions`, `if-function`)
- `dist/` 빌드 결과물의 `.js` 파일은 **IIFE 포맷**으로 출력된다. HTML에서 참조 시 `type="module"` 없이 일반 `<script src="...">` 로 사용해야 한다.
- 각 테마의 샘플 페이지는 `dist/{theme}.html`에 출력된다 (빌드 시 자동 생성)
