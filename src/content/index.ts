/**
 * CMS Content Index
 * Central export for all portfolio content
 */

import type {
    Project,
    Skill,
    SoftSkill,
    TechIcon,
    HeroTechItem,
    Artwork,
    BlogPost,
    Profile,
    NavItem,
} from './types';

// Import JSON data
import projectsData from './data/projects.json';
import skillsData from './data/skills.json';
import artworksData from './data/artworks.json';
import techStackData from './data/techStack.json';
import blogData from './data/blog.json';
import profileData from './data/profile.json';

// ============================================
// TYPED EXPORTS
// ============================================

// Handle TinaCMS items wrapper for collections
type ProjectsData = { items: Project[] } | Project[];
type BlogData = { items: BlogPost[] } | BlogPost[];
type ArtworkData = { items: Artwork[] } | Artwork[];

const extractItems = <T>(data: { items: T[] } | T[]): T[] => {
    if (Array.isArray(data)) return data;
    return data.items || [];
};

export const projects: Project[] = extractItems<Project>(projectsData as ProjectsData);

export const skills: Skill[] = skillsData.rpgSkills as Skill[];
export const softSkills: SoftSkill[] = skillsData.softSkills as SoftSkill[];

export const artworks: Artwork[] = extractItems<Artwork>(artworksData as ArtworkData);

export const techIcons: TechIcon[] = techStackData.techIcons as TechIcon[];
export const heroTechStack: HeroTechItem[] = techStackData.heroTechStack as HeroTechItem[];

export const blogPosts: BlogPost[] = extractItems<BlogPost>(blogData as BlogData);

export const profile: Profile = profileData as Profile;

// Navigation items from profile
export const navItems: NavItem[] = (profileData as Profile & { navItems?: NavItem[] }).navItems || [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects', expandable: true },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'artworks', label: 'Artworks' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
    { id: 'resume', label: 'Resume', download: true, href: '/resume.pdf' },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get a project by its ID
 */
export const getProjectById = (id: string): Project | undefined => {
    return projects.find((p) => p.id === id);
};

/**
 * Get projects filtered by rarity
 */
export const getProjectsByRarity = (rarity: Project['rarity']): Project[] => {
    return projects.filter((p) => p.rarity === rarity);
};

/**
 * Get a blog post by slug
 */
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
    return blogPosts.find((p) => p.slug === slug);
};

/**
 * Get published blog posts, sorted by date
 */
export const getPublishedPosts = (): BlogPost[] => {
    return blogPosts
        .filter((p) => p.published !== false)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

/**
 * Get artworks by category
 */
export const getArtworksByCategory = (category: string): Artwork[] => {
    return artworks.filter((a) => a.category === category);
};

/**
 * Get tech icons by category
 */
export const getTechByCategory = (category: string): TechIcon[] => {
    return techIcons.filter((t) => t.category === category);
};

/**
 * Get all unique tech categories
 */
export const getTechCategories = (): string[] => {
    return [...new Set(techIcons.map((t) => t.category))];
};

/**
 * Get skills by category
 */
export const getSkillsByCategory = (category: Skill['category']): Skill[] => {
    return skills.filter((s) => s.category === category);
};

// Re-export types for convenience
export type * from './types';
