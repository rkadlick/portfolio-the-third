import Blog from '@/components/blog/Blog';
import { client } from '@/lib/sanity';

export const revalidate = 3600; // adjust as you like


async function getPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      mainImage,
      title,
      slug,
      publishedAt,
      body,
      "author": author->{ name, image }
    }
  `);
}

export default async function BlogPage() {
  const posts = await getPosts();
  return <Blog posts={posts} />;
}