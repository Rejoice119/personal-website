'use client';

import React, { useEffect, useState } from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Loading from '@/components/ui/Loading';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  shortDesc: string;
  featured: boolean;
  technologies: string[];
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      setProjects(result.data || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects();
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-2">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button variant="primary">Add Project</Button>
        </Link>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} hover>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-900">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <Badge variant="success">Featured</Badge>
                  )}
                </div>
              </CardHeader>

              <CardBody>
                <p className="text-gray-600 text-sm mb-3">
                  {project.shortDesc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="primary">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="info">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </CardBody>

              <CardFooter>
                <div className="flex gap-2">
                  <Link href={`/admin/projects/${project.id}`}>
                    <Button variant="secondary" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No projects yet</p>
            <Link href="/admin/projects/new">
              <Button variant="primary">Create First Project</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
