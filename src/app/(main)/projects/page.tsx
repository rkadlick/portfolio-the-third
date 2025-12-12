import Projects from '@/components/Projects';
import ErrorState from '@/components/common/ErrorState';
import { client } from '@/lib/sanity';

export const revalidate = 3600; // optional ISR

async function getProjects() {
  return client.fetch(`
    *[_type == "project"]{
      _id, title, slug, description, image, liveLink, githubLink, isFeatured, order,
      "tags": tags[]->{ _id, name }
    } | order(isFeatured desc, order asc)
  `);
}

export default async function ProjectsPage() {
  try {
    const projects = await getProjects();
    return <Projects projects={projects} />;
  } catch (err) {
    console.error('Projects fetch failed', err);
    return <ErrorState title="Unable to load projects" message="Please refresh or try again later." />;
  }
}