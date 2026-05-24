# 정호의 글상자

글을 쓰고 공유하는 개인 블로그입니다.

🔗 https://jeongho.me

## 기술 스택

- **Next.js 16** — App Router 기반 React 프레임워크
- **MDX** — Markdown + JSX로 글 작성
- **Tailwind CSS v4** — 유틸리티 퍼스트 CSS
- **rehype-pretty-code + shiki** — 코드 블록 하이라이팅
- **next-themes** — 다크모드
- **Giscus** — GitHub Discussions 기반 댓글

## 로컬 실행

```bash
npm install
npm run dev
```

## 글 작성

`content/posts/` 폴더에 `.md` 또는 `.mdx` 파일을 추가합니다.

```markdown
---
date: "2026-05-25"
tags: ["태그"]
---

본문 내용...
```

- 파일명이 URL과 제목으로 사용됩니다
- `date`는 필수입니다 (글 정렬 기준)
- `tags`는 선택사항입니다
