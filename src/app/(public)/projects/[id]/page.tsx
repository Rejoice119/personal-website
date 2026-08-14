import React from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { prisma } from '@/lib/db';

interface ProjectPageProps {
  params: { id: string };
}

export const revalidate = 60; // ISR - revalidate every 60 seconds

async function getProject(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });
    return project;
  } catch (error) {
    console.error('Failed to fetch project:', error);
    return null;
  }
}

async function getRelatedProjects(projectId: string, limit = 3) {
  try {
    const projects = await prisma.project.findMany({
      where: {
        id: { not: projectId },
        featured: true,
      },
      take: limit,
      orderBy: { order: 'asc' },
    });
    return projects;
  } catch (error) {
    console.error('Failed to fetch related projects:', error);
    return [];
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.id);
  const relatedProjects = await getRelatedProjects(params.id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The project you're looking for doesn't exist.
          </p>
          <Link href="/projects">
            <Button variant="primary">Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/projects" className="text-blue-100 hover:text-white mb-4 inline-block">
            ← Back to Projects
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-blue-100">{project.shortDesc}</p>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Project Description */}
          <Card>
            <div className="prose prose-sm max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Project Overview
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap">
                {project.description}
              </p>
            </div>
          </Card>

          {/* Technologies */}
          {technologies.length > 0 && (
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech: string) => (
                  <Badge key={tech} variant="primary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Links */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              View Project
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="primary" size="lg" className="w-full">
                    Visit Live Site →
                  </Button>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="secondary" size="lg" className="w-full">
                    View on GitHub →
                  </Button>
                </a>
              )}
            </div>
          </Card>

          {/* Project Metadata */}
          <Card>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Status
                </h3>
                <p className="mt-2 text-lg font-medium text-gray-900">
                  Completed
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Type
                </h3>
                <p className="mt-2 text-lg font-medium text-gray-900">
                  {project.category || 'Web Application'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Year
                </h3>
                <p className="mt-2 text-lg font-medium text-gray-900">
                  {new Date(project.createdAt).getFullYear()}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              More Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((relProject) => (
                <Link key={relProject.id} href={`/projects/${relProject.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-bold text-gray-900">
                          {relProject.title}
                        </h3>
                        {relProject.featured && (
                          <Badge variant="success">Featured</Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">
                        {relProject.shortDesc}
                      </p>
                      {Array.isArray(relProject.technologies) &&
                        relProject.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-2">
                            {relProject.technologies
                              .slice(0, 3)
                              .map((tech: string) => (
                                <span
                                  key={tech}
                                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                          </div>
                        )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
