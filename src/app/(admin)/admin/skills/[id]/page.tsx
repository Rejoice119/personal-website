'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card, { CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Loading from '@/components/ui/Loading';
import { useForm } from 'react-hook-form';
import { skillSchema, type SkillInput } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { SKILL_LEVELS, SKILL_CATEGORIES } from '@/lib/constants';

interface SkillEditPageProps {
  params: { id: string };
}

interface Skill extends SkillInput {
  id: string;
}

export default function EditSkillPage({ params }: SkillEditPageProps) {
  const router = useRouter();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillInput>({
    resolver: zodResolver(skillSchema),
  });

  useEffect(() => {
    fetchSkill();
  }, [params.id]);

  const fetchSkill = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/skills/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.data) {
        setSkill(result.data);
        reset({
          name: result.data.name,
          category: result.data.category,
          level: result.data.level,
          order: result.data.order,
        });
      }
    } catch (err) {
      setError('Failed to load skill');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: SkillInput) => {
    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/skills/${params.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update skill');
      }

      router.push('/admin/skills');
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
          <h1 className="text-3xl font-bold text-gray-900">Edit Skill</h1>
          <p className="text-gray-600 mt-2">Update skill details</p>
        </div>
        <Link href="/admin/skills">
          <Button variant="secondary">Cancel</Button>
        </Link>
      </div>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <Input
              label="Skill Name"
              placeholder="React"
              {...register('name')}
              error={errors.name?.message}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                {...register('category')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                {SKILL_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proficiency Level
              </label>
              <select
                {...register('level')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a level</option>
                {SKILL_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.level && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.level.message}
                </p>
              )}
            </div>

            <Input
              label="Display Order"
              type="number"
              placeholder="1"
              {...register('order', { valueAsNumber: true })}
              error={errors.order?.message}
            />

            <div className="flex gap-4 justify-end pt-4 border-t">
              <Link href="/admin/skills">
                <Button variant="secondary">Cancel</Button>
              </Link>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
              >
                Update Skill
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
