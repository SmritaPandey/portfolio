/**
 * CMS Content Types
 * All TypeScript interfaces for portfolio content
 */

// ============================================
// PROJECT TYPES
// ============================================

export type ProjectRarity = 'Legendary' | 'Epic' | 'Rare' | 'Mythic' | 'Common';

export interface ProjectStat {
    label: string;
    value: string;
}

export interface Project {
    id: string;
    title: string;
    tagline: string;
    description: string;
    tech: string[];
    impact: string[];
    accentColor: string;
    year: string;
    type: string;
    url: string;
    github?: string;
    screenshot?: string;
    stats?: ProjectStat[];
    rarity: ProjectRarity;
    rpgDescription: string;
}

// ============================================
// SKILL TYPES
// ============================================

export type SkillCategory = 'combat' | 'magic' | 'special';

export interface Skill {
    name: string;
    level: number;
    maxLevel: number;
    xp: number;
    maxXp: number;
    icon: string;
    category: SkillCategory;
    description: string;
}

export interface SoftSkill {
    name: string;
    icon: string;
    level: number;
    color: string;
}

// ============================================
// TECH STACK TYPES
// ============================================

export type TechIconSize = 'sm' | 'md' | 'lg';

export interface TechIcon {
    name: string;
    icon: string;
    size: TechIconSize;
    category: string;
}

export interface HeroTechItem {
    name: string;
    icon: string;
}

// ============================================
// ARTWORK TYPES
// ============================================

export interface Artwork {
    id: string;
    title: string;
    description: string;
    image: string;
    year: string;
    category: string;
    likes: number;
    views: string;
}

// ============================================
// BLOG TYPES
// ============================================

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content?: string;
    date: string;
    coverImage: string;
    tags: string[];
    readTime: string;
    author?: string;
    published?: boolean;
}

// ============================================
// PROFILE TYPES
// ============================================

export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
    label: string;
}

export interface StoryChapter {
    title: string;
    content: string;
}

export interface StoryContent {
    title: string;
    chapters: StoryChapter[];
    highlight: string;
    skills: string[];
}

export interface Profile {
    name: string;
    firstName: string;
    lastName: string;
    title: string;
    tagline: string;
    email: string;
    location: string;
    bio: string;
    avatar?: string;
    resume?: string;
    socials: SocialLink[];
    story: StoryContent;
}

// ============================================
// NAV TYPES
// ============================================

export interface NavItem {
    id: string;
    label: string;
    expandable?: boolean;
    download?: boolean;
    href?: string;
}
