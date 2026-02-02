# Portfolio CMS - Content Management Guide

This guide explains how to manage content in your portfolio using TinaCMS.

## Quick Start

```bash
# Start development server with CMS
npm run dev:tina

# Access admin panel
open http://localhost:5174/admin/index.html
```

## Content Collections

### Profile
Edit your personal information, social links, navigation, and story content.

| Field | Description |
|-------|-------------|
| Name | Your display name (Smrita Pandey) |
| First Name | First name in caps for hero (SMRITA) |
| Last Name | Last name in caps for hero (PANDEY) |
| Title | Professional title (Full-Stack Developer & AI Engineer) |
| Tagline | Short bio/tagline |
| Email | Contact email |
| Location | City/Country |
| Bio | Extended bio text |
| Avatar | Profile image |
| Resume | Resume PDF path |
| Socials | GitHub, LinkedIn, Twitter, Email links |
| Nav Items | Navigation menu items with expandable/download flags |
| Story | "My Journey" section with chapters |

### Projects
Manage portfolio projects with RPG-style theming.

| Field | Description |
|-------|-------------|
| ID | Unique identifier (lowercase, no spaces) |
| Title | Project name |
| Tagline | Short description |
| Description | Full project description |
| Tech | Technologies used (list) |
| Impact | Impact statements (list) |
| Stats | Key metrics (label/value pairs) |
| Accent Color | Theme color (hex) |
| Year | Year completed |
| Type | Project type (e.g., "GovTech", "AI Lab") |
| URL | Live project link |
| GitHub | Repository link |
| Screenshot | Project image |
| Rarity | RPG rarity (Common → Mythic) |
| RPG Description | Flavored in-game style description |

**Current Projects:**
- SRCC OCR Digitization (Legendary) - 50K+ forms digitized
- QS-GRC Platform (Epic) - 90% compliance effort reduction
- Enkay Enviro CMS (Rare) - 1000+ projects managed
- Apna Agri Store (Rare) - 500+ farmers onboarded
- NeurQ AI Labs (Mythic) - 15+ AI models
- The NBATech Platform (Legendary) - 15K+ app installs

### Blog Posts
Manage blog content.

| Field | Description |
|-------|-------------|
| Slug | URL-friendly identifier |
| Title | Post title |
| Excerpt | Short preview text |
| Date | Publication date (YYYY-MM-DD) |
| Cover Image | Featured image |
| Tags | Categories (list) |
| Read Time | Estimated reading time |
| Author | Author name |
| Published | Visibility toggle |

### Skills
Configure RPG and soft skills displayed in the stats panel.

**RPG Skills:**
- Name, Level (0-100), Max Level, XP, Max XP
- Icon (emoji), Category (combat/magic/special)
- Description

**Current RPG Skills:**
- Full-Stack Development (⚔️ combat, 85/100)
- AI & Machine Learning (🔮 magic, 75/100)
- Cybersecurity (🛡️ special, 70/100)
- Cloud Architecture (☁️ magic, 78/100)
- Product Building (🏗️ combat, 82/100)
- Leadership (👑 special, 80/100)

**Soft Skills:**
- Name, Icon (emoji), Level (0-100), Color (hex)

**Current Soft Skills:**
- Problem Solving (💡, 92%)
- Leadership (🎯, 78%)
- Communication (💬, 85%)
- Collaboration (🤝, 88%)
- Adaptability (⚡, 94%)
- Quick Learning (📚, 90%)

### Artworks
Manage gallery items.

| Field | Description |
|-------|-------------|
| ID | Unique identifier |
| Title | Artwork title |
| Description | Artwork description |
| Image | Image path (in `/public/img/`) |
| Year | Creation year |
| Category | Art category |
| Likes/Views | Display stats |

### Tech Stack
Configure technology icons displayed on the site.

**Tech Icons:** Full list for the Tech Stack section
- Languages: Python, JavaScript, TypeScript, HTML5, CSS3
- Frontend: React, Next.js, Vite
- Backend: Node.js, FastAPI, Express
- Database: PostgreSQL, MongoDB, Redis, Firebase
- DevOps: Docker, Git, AWS, Azure, Vercel
- ML & Data: TensorFlow, PyTorch
- Tools: VS Code, Linux, Bash, Figma

**Hero Tech Stack:** Subset shown in the Hero section
- React, TypeScript, Node.js, Python, Docker, Git, TensorFlow, Figma, AWS, Azure

## File Locations

Content is stored in JSON files:
```
src/content/data/
├── projects.json    # All project cards
├── blog.json        # Blog posts
├── profile.json     # Profile, socials, nav, story
├── skills.json      # RPG & soft skills
├── artworks.json    # Gallery items
└── techStack.json   # Tech icons
```

## Data Structure Notes

TinaCMS collections use an `items` wrapper:
```json
{
    "items": [
        { "id": "project-1", ... },
        { "id": "project-2", ... }
    ]
}
```

The content index (`src/content/index.ts`) automatically unwraps this for use in components.

## Adding Images

1. Place images in `/public/img/`
2. Reference as `/img/filename.jpg` in TinaCMS
3. Images appear immediately after save

## Development Workflow

1. Start with `npm run dev:tina`
2. Edit content in admin panel
3. Changes save to JSON files automatically
4. Site hot-reloads with changes
5. Commit changes to Git

## Production Build

```bash
npm run build:tina
```

This generates the TinaCMS client and builds the site.

## Troubleshooting

**Admin not loading?**
- Ensure you're using `npm run dev:tina` (not `npm run dev`)
- Check console for errors

**Changes not appearing?**
- Hard refresh the browser (Cmd+Shift+R)
- Check if JSON file was saved

**Type errors after editing?**
- Run `npx tsc --noEmit` to check
- Ensure required fields are filled

**Navigation items not showing?**
- Check `profile.json` has `navItems` array
- Each item needs `id` and `label` at minimum
