import { client } from '../../lib/sanity'
import { Project } from '../../types'
import ProjectCard from './ProjectCard'

async function getProjects() {
  return client.fetch(`
    *[_type == "project"] {
      _id,
      title,
      slug,
      description,
      image,
      liveLink,
      githubLink,
      isFeatured,
      order,
      "tags": tags[]->{ _id, name }
    } | order(isFeatured desc, order asc)
  `)
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  const featuredProjects = projects.filter((p: Project) => p.isFeatured)
  const regularProjects = projects.filter((p: Project) => !p.isFeatured)

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      {featuredProjects.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-8 mb-16">
            {featuredProjects.map((project: Project) => (
              <ProjectCard key={project._id} project={project} isFeatured={true} />
            ))}
          </div>
        </>
      )}
      
      <h2 className="text-2xl font-bold mb-8">Other Projects</h2>
      <div className="grid grid-cols-1 gap-4">
        {regularProjects.map((project: Project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  )
} 