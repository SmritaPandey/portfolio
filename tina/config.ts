import { defineConfig } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch =
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    'main';

export default defineConfig({
    branch,

    // Get this from tina.io - not needed for local development
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
    token: process.env.TINA_TOKEN || '',

    build: {
        outputFolder: 'admin',
        publicFolder: 'public',
    },
    media: {
        tina: {
            mediaRoot: 'img',
            publicFolder: 'public',
        },
    },
    // See docs on schema: https://tina.io/docs/schema/
    schema: {
        collections: [
            // Projects Collection
            {
                name: 'project',
                label: 'Projects',
                path: 'src/content/data',
                format: 'json',
                match: {
                    include: 'projects',
                },
                fields: [
                    {
                        type: 'object',
                        name: 'items',
                        label: 'Projects',
                        list: true,
                        ui: {
                            itemProps: (item) => ({
                                label: item?.title || 'New Project',
                            }),
                        },
                        fields: [
                            { type: 'string', name: 'id', label: 'ID', required: true },
                            { type: 'string', name: 'title', label: 'Title', required: true },
                            { type: 'string', name: 'tagline', label: 'Tagline', required: true },
                            { type: 'string', name: 'description', label: 'Description', required: true, ui: { component: 'textarea' } },
                            { type: 'string', name: 'tech', label: 'Technologies', list: true },
                            { type: 'string', name: 'impact', label: 'Impact Statements', list: true },
                            { type: 'string', name: 'accentColor', label: 'Accent Color' },
                            { type: 'string', name: 'year', label: 'Year' },
                            { type: 'string', name: 'type', label: 'Type' },
                            { type: 'string', name: 'url', label: 'URL' },
                            { type: 'string', name: 'github', label: 'GitHub URL' },
                            { type: 'image', name: 'screenshot', label: 'Screenshot' },
                            {
                                type: 'string',
                                name: 'rarity',
                                label: 'Rarity',
                                options: ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic'],
                            },
                            { type: 'string', name: 'rpgDescription', label: 'RPG Description', ui: { component: 'textarea' } },
                            {
                                type: 'object',
                                name: 'stats',
                                label: 'Stats',
                                list: true,
                                fields: [
                                    { type: 'string', name: 'label', label: 'Label' },
                                    { type: 'string', name: 'value', label: 'Value' },
                                ],
                            },
                        ],
                    },
                ],
            },

            // Blog Posts Collection
            {
                name: 'blog',
                label: 'Blog Posts',
                path: 'src/content/data',
                format: 'json',
                match: {
                    include: 'blog',
                },
                fields: [
                    {
                        type: 'object',
                        name: 'items',
                        label: 'Blog Posts',
                        list: true,
                        ui: {
                            itemProps: (item) => ({
                                label: item?.title || 'New Post',
                            }),
                        },
                        fields: [
                            { type: 'string', name: 'slug', label: 'Slug', required: true },
                            { type: 'string', name: 'title', label: 'Title', required: true },
                            { type: 'string', name: 'excerpt', label: 'Excerpt', ui: { component: 'textarea' } },
                            { type: 'string', name: 'date', label: 'Date' },
                            { type: 'image', name: 'coverImage', label: 'Cover Image' },
                            { type: 'string', name: 'tags', label: 'Tags', list: true },
                            { type: 'string', name: 'readTime', label: 'Read Time' },
                            { type: 'string', name: 'author', label: 'Author' },
                            { type: 'boolean', name: 'published', label: 'Published' },
                        ],
                    },
                ],
            },

            // Profile Collection
            {
                name: 'profile',
                label: 'Profile',
                path: 'src/content/data',
                format: 'json',
                match: {
                    include: 'profile',
                },
                ui: {
                    allowedActions: {
                        create: false,
                        delete: false,
                    },
                },
                fields: [
                    { type: 'string', name: 'name', label: 'Name', required: true },
                    { type: 'string', name: 'title', label: 'Title' },
                    { type: 'string', name: 'tagline', label: 'Tagline' },
                    { type: 'string', name: 'email', label: 'Email' },
                    { type: 'string', name: 'location', label: 'Location' },
                    { type: 'image', name: 'avatar', label: 'Avatar' },
                    {
                        type: 'object',
                        name: 'social',
                        label: 'Social Links',
                        fields: [
                            { type: 'string', name: 'github', label: 'GitHub' },
                            { type: 'string', name: 'linkedin', label: 'LinkedIn' },
                            { type: 'string', name: 'twitter', label: 'Twitter' },
                            { type: 'string', name: 'instagram', label: 'Instagram' },
                            { type: 'string', name: 'website', label: 'Website' },
                        ],
                    },
                    {
                        type: 'object',
                        name: 'navItems',
                        label: 'Navigation Items',
                        list: true,
                        ui: {
                            itemProps: (item) => ({
                                label: item?.label || 'New Nav Item',
                            }),
                        },
                        fields: [
                            { type: 'string', name: 'id', label: 'ID', required: true },
                            { type: 'string', name: 'label', label: 'Label', required: true },
                            { type: 'boolean', name: 'expandable', label: 'Expandable (has submenu)' },
                            { type: 'boolean', name: 'download', label: 'Download Link' },
                            { type: 'string', name: 'href', label: 'Link URL (optional)' },
                        ],
                    },
                    {
                        type: 'object',
                        name: 'story',
                        label: 'Story',
                        fields: [
                            { type: 'string', name: 'title', label: 'Title' },
                            {
                                type: 'object',
                                name: 'chapters',
                                label: 'Chapters',
                                list: true,
                                fields: [
                                    { type: 'string', name: 'title', label: 'Chapter Title' },
                                    { type: 'string', name: 'content', label: 'Content', ui: { component: 'textarea' } },
                                ],
                            },
                            { type: 'string', name: 'highlight', label: 'Highlight' },
                            { type: 'string', name: 'skills', label: 'Skills', list: true },
                        ],
                    },
                ],
            },

            // Skills Collection
            {
                name: 'skills',
                label: 'Skills',
                path: 'src/content/data',
                format: 'json',
                match: {
                    include: 'skills',
                },
                ui: {
                    allowedActions: {
                        create: false,
                        delete: false,
                    },
                },
                fields: [
                    {
                        type: 'object',
                        name: 'rpgSkills',
                        label: 'RPG Skills',
                        list: true,
                        fields: [
                            { type: 'string', name: 'name', label: 'Name' },
                            { type: 'number', name: 'level', label: 'Level' },
                            { type: 'number', name: 'maxLevel', label: 'Max Level' },
                            { type: 'number', name: 'xp', label: 'XP' },
                            { type: 'number', name: 'maxXp', label: 'Max XP' },
                            { type: 'string', name: 'icon', label: 'Icon (emoji)' },
                            { type: 'string', name: 'category', label: 'Category', options: ['combat', 'magic', 'special'] },
                            { type: 'string', name: 'description', label: 'Description' },
                        ],
                    },
                    {
                        type: 'object',
                        name: 'softSkills',
                        label: 'Soft Skills',
                        list: true,
                        fields: [
                            { type: 'string', name: 'name', label: 'Name' },
                            { type: 'string', name: 'icon', label: 'Icon (emoji)' },
                            { type: 'number', name: 'level', label: 'Level' },
                            { type: 'string', name: 'color', label: 'Color (hex)' },
                        ],
                    },
                ],
            },

            // Artworks Collection
            {
                name: 'artworks',
                label: 'Artworks',
                path: 'src/content/data',
                format: 'json',
                match: {
                    include: 'artworks',
                },
                fields: [
                    {
                        type: 'object',
                        name: 'items',
                        label: 'Artworks',
                        list: true,
                        ui: {
                            itemProps: (item) => ({
                                label: item?.title || 'New Artwork',
                            }),
                        },
                        fields: [
                            { type: 'string', name: 'id', label: 'ID', required: true },
                            { type: 'string', name: 'title', label: 'Title', required: true },
                            { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
                            { type: 'image', name: 'image', label: 'Image' },
                            { type: 'string', name: 'year', label: 'Year' },
                            { type: 'string', name: 'category', label: 'Category' },
                            { type: 'number', name: 'likes', label: 'Likes' },
                            { type: 'string', name: 'views', label: 'Views' },
                        ],
                    },
                ],
            },

            // Tech Stack Collection
            {
                name: 'techStack',
                label: 'Tech Stack',
                path: 'src/content/data',
                format: 'json',
                match: {
                    include: 'techStack',
                },
                ui: {
                    allowedActions: {
                        create: false,
                        delete: false,
                    },
                },
                fields: [
                    {
                        type: 'object',
                        name: 'techIcons',
                        label: 'Tech Icons',
                        list: true,
                        fields: [
                            { type: 'string', name: 'name', label: 'Name' },
                            { type: 'string', name: 'icon', label: 'Icon (skillicons.dev ID)' },
                            { type: 'string', name: 'size', label: 'Size', options: ['sm', 'md', 'lg'] },
                            { type: 'string', name: 'category', label: 'Category' },
                        ],
                    },
                    {
                        type: 'object',
                        name: 'heroTechStack',
                        label: 'Hero Tech Stack',
                        list: true,
                        fields: [
                            { type: 'string', name: 'name', label: 'Name' },
                            { type: 'string', name: 'icon', label: 'Icon (skillicons.dev ID)' },
                        ],
                    },
                ],
            },
        ],
    },
});
