'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card, { CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Loading from '@/components/ui/Loading';
import { useForm } from 'react-hook-form';
import { projectSchema, type ProjectInput } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';

interface ProjectEditPageProps {
  params: { id: string };
}

interface Project extends ProjectInput {
  id: string;
  technologies: string[];
}

export default function EditProjectPage({ params }: ProjectEditPageProps) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${params.id}`);
      const result = await response.json();
      if (result.data) {
        setProject(result.data);
        setTechnologies(result.data.technologies || []);
        reset({
          title: result.data.title,
          shortDesc: result.data.shortDesc,
          description: result.data.description,
          liveUrl: result.data.liveUrl,
          githubUrl: result.data.githubUrl,
          category: result.data.category,
          featured: result.data.featured,
        });
      }
    } catch (err) {
      setError('Failed to load project');
    } finally {
      setIsLoading(false);
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  const onSubmit = async (data: ProjectInput) => {
    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/projects/${params.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          technologies,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      router.push('/admin/projects');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
          <p className="text-gray-600 mt-2">Update project details</p>
        </div>
        <Link href="/admin/projects">
          <Button variant="secondary">Cancel</Button>
        </Link>
      </div>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <Input
              label="Project Title"
              placeholder="My Awesome Project"
              {...register('title')}
              error={errors.title?.message}
            />

            <Input
              label="Short Description"
              placeholder="A brief one-liner about the project"
              {...register('shortDesc')}
              error={errors.shortDesc?.message}
            />

            <TextArea
              label="Full Description"
              placeholder="Detailed description of the project..."
              rows={6}
              {...register('description')}
              error={errors.description?.message}
            />

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies
              </label>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === 'Enter' && (e.preventDefault(), addTechnology())
                  }
                  placeholder="React, Node.js, etc."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={addTechnology}
                >
                  Add
                </Button>
              </div>
              {technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="font-bold hover:text-blue-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <Input
              label="Live URL (Optional)"
              type="url"
              placeholder="https://myproject.com"
              {...register('liveUrl')}
              error={errors.liveUrl?.message}
            />

            <Input
              label="GitHub URL (Optional)"
              type="url"
              placeholder="https://github.com/user/project"
              {...register('githubUrl')}
              error={errors.githubUrl?.message}
            />

            <Input
              label="Category (Optional)"
              placeholder="Web App, Mobile, etc."
              {...register('category')}
              error={errors.category?.message}
            />

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('featured')}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Featured Project</span>
              </label>
            </div>

            <div className="flex gap-4 justify-end pt-4 border-t">
              <Link href="/admin/projects">
                <Button variant="secondary">Cancel</Button>
              </Link>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
              >
                Update Project
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
