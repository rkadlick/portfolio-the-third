import ParticleBackground from "@/components/ParticleBackground";
import HolographicImage from "@/components/HolographicImage";

const skills = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'GraphQL', icon: '◈' },
]

export default function HomePage() {
  return (
    <>
    <ParticleBackground />
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex items-center">
        <div className="relative z-10 w-full lg:w-[60%] pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto px-8 py-12 sm:mt-12 sm:px-10 sm:py-16 md:mt-16 lg:mt-20 lg:px-12 lg:py-20 xl:mt-28 bg-[var(--card-bg)]/40 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Hi, I&apos;m Ryan</span>{' '}
                <span className="block text-[var(--primary)] xl:inline">
                  Full Stack Developer
                </span>
              </h1>
              <p className="mt-3 text-base text-[var(--muted)] sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                I&apos;m passionate about building beautiful, user-friendly web applications
                using modern technologies. I specialize in React, TypeScript, and
                Node.js development.
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold">Skills</h2>
              <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="col-span-1 flex justify-center py-4 px-4"
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{skill.icon}</div>
                      <div className="text-sm font-medium">
                        {skill.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
        
        <div className="hidden lg:block lg:w-[40%] lg:pl-12">
          <div className="relative w-full max-w-md mx-auto">
            <HolographicImage
              src="/profilePictureBackground.png"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
