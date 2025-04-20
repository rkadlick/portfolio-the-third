import Image from "next/image";

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
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Hi, I'm Ryan</span>{' '}
                <span className="block text-[var(--primary)] xl:inline">
                  Full Stack Developer
                </span>
              </h1>
              <p className="mt-3 text-base text-[var(--muted)] sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                I'm passionate about building beautiful, user-friendly web applications
                using modern technologies. I specialize in React, TypeScript, and
                Node.js development.
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold">Skills</h2>
              <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="col-span-1 flex justify-center py-8 px-8 bg-[var(--card-bg)] rounded-xl shadow-sm hover:shadow transition-all duration-200"
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
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="relative h-64 w-full sm:h-72 md:h-96 lg:h-full">
          <Image
            src="/profile.jpg"
            alt="Profile"
            className="object-cover rounded-l-xl"
            fill
            priority
          />
        </div>
      </div>
    </div>
  );
}
