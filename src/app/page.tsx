import Link from 'next/link';
import { prisma } from '@/lib/db';
import Button from '@/components/ui/Button';
import Card, { CardBody } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export const revalidate = 60; // ISR: revalidate every 60 seconds

async function getFeaturedProjects() {
  try {
    return await prisma.project.findMany({
      where: { featured: true },
      take: 3,
      orderBy: { order: 'asc' },
    });
  } catch {
    return [];
  }
}

async function getSkills() {
  try {
    return await prisma.skill.findMany({
      take: 6,
      orderBy: { order: 'asc' },
    });
  } catch {
    return [];
  }
}

async function getApprovedTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { approved: true, featured: true },
      take: 2,
      orderBy: { order: 'asc' },
    });
  } catch {
    return [];
  }
}

export default async function Home() {
  const [projects, skills, testimonials] = await Promise.all([
    getFeaturedProjects(),
    getSkills(),
    getApprovedTestimonials(),
  ]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Full-stack developer passionate about creating beautiful, functional web experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects">
              <Button size="lg" variant="primary">
                View My Work
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Featured Projects</h2>
              <p className="text-gray-600 mt-4">
                A selection of my recent work and accomplishments
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {projects.map((project) => (
                <Card key={project.id} hover>
                  <div className="h-48 bg-gray-200 rounded mb-4" />
                  <CardBody>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {project.shortDesc}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="primary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Link href={`/projects/${project.id}`}>
                      <Button variant="secondary" size="sm" className="w-full">
                        View Project
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link href="/projects">
                <Button variant="primary">
                  View All Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Skills & Expertise</h2>
              <p className="text-gray-600 mt-4">
                Technologies and tools I work with
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <Card key={skill.id} hover>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                      <p className="text-sm text-gray-600">{skill.category}</p>
                    </div>
                    <Badge variant="success">{skill.level}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What People Say</h2>
              <p className="text-gray-600 mt-4">
                Testimonials from clients and colleagues
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                          {testimonial.position && (
                            <p className="text-sm text-gray-600">{testimonial.position}</p>
                          )}
                          {testimonial.company && (
                            <p className="text-sm text-gray-600">@ {testimonial.company}</p>
                          )}
                        </div>
                        {testimonial.rating && (
                          <div className="flex">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <span key={i} className="text-yellow-400">★</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-gray-700 italic">"{testimonial.content}"</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start a Project?
          </h2>
          <p className="text-blue-100 mb-8">
            Let's work together to bring your ideas to life
          </p>
          <Link href="/contact">
            <Button size="lg" variant="primary">
              Get In Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
