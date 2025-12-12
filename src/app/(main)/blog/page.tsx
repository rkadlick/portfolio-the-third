import Blog from '@/components/blog/Blog';
import { client } from '@/lib/sanity';

export const revalidate = 3600; // adjust as you like

const INCLUDE_TEST_POSTS = process.env.NEXT_PUBLIC_SHOW_TEST_POSTS === 'true';

async function getPosts() {
  return client.fetch(`
    *[_type == "post" && ($includeTest == true || isTest != true)] 
    | order(publishedAt desc) {
      _id,
      mainImage,
      title,
      slug,
      publishedAt,
      isTest,
      body,
      "author": author->{ name, image }
    }
  `, { includeTest: INCLUDE_TEST_POSTS });
}

export default async function BlogPage() {
  const posts = await getPosts();
  return <Blog posts={posts} />;
}