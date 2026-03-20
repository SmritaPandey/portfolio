---
description: How to update portfolio content via TinaCMS and deploy to smrita.me
---

## Method 1: TinaCMS Admin (Recommended)

```bash
# 1. Start TinaCMS dev server
cd ~/Documents/Projects/portfolio
npm run dev:tina
```

// turbo-all

2. Open **http://localhost:5173/admin** in your browser
3. Edit content (Blog Posts, Profile, Skills, etc.)
4. Click **"Save"** button (bottom-right) — changes write to JSON files

```bash
# 5. Build and deploy
npm run build
npx vercel --prod --yes
```

> **Why not just `git push`?** TinaCMS sometimes writes JSON that's byte-identical to git's version (same data, same formatting). In that case `git push` won't trigger a new Vercel build since there's no diff. The manual `npm run build && npx vercel --prod` approach always works because it deploys the fresh build directly.

## Method 2: Git Push (When Files Actually Changed)

```bash
# After TinaCMS save
git add -A
git status  # Check if changes show up
git commit -m "update content"
git push
# Vercel auto-deploys from GitHub
```

## Editing JSON Directly (No TinaCMS)

You can also edit the JSON files directly:
- `src/content/data/blog.json` — Blog posts
- `src/content/data/profile.json` — Name, bio, socials
- `src/content/data/projects.json` — Project cards
- `src/content/data/skills.json` — Skills list
- `src/content/data/techStack.json` — Tech stack icons
- `src/content/data/artworks.json` — Art gallery

Then build and deploy with Method 1 step 5, or commit+push with Method 2.
