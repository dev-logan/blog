#!/bin/bash

set -e

cd /Users/jeongho/Documents/development/blog

git add content/

if git diff --cached --quiet; then
  echo "변경된 글이 없습니다."
  exit 0
fi

# date 없는 파일 검증
MISSING_DATE=()
while IFS= read -r file; do
  if [ -f "$file" ]; then
    if ! grep -q "^date:" "$file"; then
      MISSING_DATE+=("$file")
    fi
  fi
done < <(git diff --cached --name-only --diff-filter=AM | grep "content/posts/")

if [ ${#MISSING_DATE[@]} -gt 0 ]; then
  echo "❌ date가 없는 글이 있습니다:"
  for f in "${MISSING_DATE[@]}"; do
    echo "   - $f"
  done
  echo "배포를 중단합니다."
  git restore --staged content/
  exit 1
fi

ADDED=$(git diff --cached --name-only --diff-filter=A | grep "content/posts/" | sed 's|content/posts/||' | sed 's/\.[^.]*$//' | tr '\n' ', ' | sed 's/, $//' || true)
MODIFIED=$(git diff --cached --name-only --diff-filter=M | grep "content/posts/" | sed 's|content/posts/||' | sed 's/\.[^.]*$//' | tr '\n' ', ' | sed 's/, $//' || true)
REMOVED=$(git diff --cached --name-only --diff-filter=D | grep "content/posts/" | sed 's|content/posts/||' | sed 's/\.[^.]*$//' | tr '\n' ', ' | sed 's/, $//' || true)
SITE=$(git diff --cached --name-only | grep "content/site.md" || true)

PARTS=()
[ -n "$ADDED" ] && PARTS+=("post: $ADDED")
[ -n "$MODIFIED" ] && PARTS+=("update: $MODIFIED")
[ -n "$REMOVED" ] && PARTS+=("remove: $REMOVED")
[ -n "$SITE" ] && PARTS+=("config: site 설정 변경")

if [ ${#PARTS[@]} -eq 0 ]; then
  MSG="content: update"
else
  MSG=$(IFS=' / '; echo "${PARTS[*]}")
fi

git commit -m "$MSG"
git push

echo "✅ 배포 완료: $MSG"
