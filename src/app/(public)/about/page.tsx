import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export const metadata = {
  title: 'About Me | Portfolio',
  description: 'Learn more about me and my background',
};

export default function AboutPage() {
  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-blue-100">
            Full-stack developer with a passion for creating beautiful, functional web experiences
          </p>
        </div>
      </div>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Bio */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">My Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  I'm a passionate full-stack developer with 5+ years of experience building
                  web applications. I specialize in modern JavaScript frameworks and creating
                  scalable, user-friendly solutions.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing
                  to open-source projects, or sharing knowledge with the community.
                </p>
                <p>
                  I believe in continuous learning and staying updated with the latest trends
                  and best practices in web development.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <Card>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Years of Experience</p>
                    <p className="text-3xl font-bold text-gray-900">5+</p>
                  </div>
                  <span className="text-4xl">📅</span>
                </div>
              </Card>
              <Card>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Projects Completed</p>
                    <p className="text-3xl font-bold text-gray-900">25+</p>
                  </div>
                  <span className="text-4xl">✅</span>
                </div>
              </Card>
              <Card>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Happy Clients</p>
                    <p className="text-3xl font-bold text-gray-900">20+</p>
                  </div>
                  <span className="text-4xl">😊</span>
                </div>
              </Card>
            </div>
          </div>

          {/* Tech Stack */}
          <Card className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tech Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary">React</Badge>
                  <Badge variant="primary">Next.js</Badge>
                  <Badge variant="primary">TypeScript</Badge>
                  <Badge variant="primary">Tailwind CSS</Badge>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success">Node.js</Badge>
                  <Badge variant="success">Express</Badge>
                  <Badge variant="success">Python</Badge>
                  <Badge variant="success">REST APIs</Badge>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="warning">Git</Badge>
                  <Badge variant="warning">Docker</Badge>
                  <Badge variant="warning">AWS</Badge>
                  <Badge variant="warning">PostgreSQL</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Education & Certifications */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-900">Bachelor of Science in Computer Science</h3>
                <p className="text-gray-600 text-sm">University Name • 2019</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Full-Stack Web Development Bootcamp</h3>
                <p className="text-gray-600 text-sm">Bootcamp Name • 2020</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
