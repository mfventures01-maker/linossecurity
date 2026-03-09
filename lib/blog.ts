import postsData from '@/data/posts.json';

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    readTime: string;
    content: string;
    image?: string;
}

export const getAllPosts = (): BlogPost[] => {
    return postsData.posts;
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
    return postsData.posts.find((p) => p.slug === slug);
};
