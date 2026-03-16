import postsData from '@/data/blogPosts.json';

export interface BlogFAQ {
    question: string;
    answer: string;
}

export interface InternalLink {
    text: string;
    href: string;
}

export interface BlogPost {
    title: string;
    slug: string;
    metaTitle: string;
    metaDescription: string;
    focusKeyword: string;
    secondaryKeywords: string[];
    author: string;
    publishDate: string;
    coverImage: string;
    content: string;
    faq?: BlogFAQ[];
    internalLinks?: InternalLink[];
    schemaType: string;
}

export const getAllPosts = (): BlogPost[] => {
    return postsData.posts as BlogPost[];
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
    return (postsData.posts as BlogPost[]).find((p) => p.slug === slug);
};
