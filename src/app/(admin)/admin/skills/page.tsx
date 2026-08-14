'use client';

import React, { useEffect, useState } from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Loading from '@/components/ui/Loading';
import Link from 'next/link';

interface Skill {
  id: string;
  name: string;
  level: string;
  category: string;
  createdAt: string;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/skills', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      setSkills(result.data || []);
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSkills();
    } catch (error) {
      console.error('Failed to delete skill:', error);
    }
  };

  if (isLoading) return <Loading />;

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Skills</h1>
          <p className="text-gray-600 mt-2">
            {skills.length} skill{skills.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/admin/skills/new">
          <Button variant="primary">Add Skill</Button>
        </Link>
      </div>

      {skills.length > 0 ? (
        <div className="space-y-6">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category}>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill) => (
                  <Card key={skill.id} hover>
                    <CardHeader>
                      <h3 className="text-lg font-bold text-gray-900">
                        {skill.name}
                      </h3>
                    </CardHeader>

                    <CardBody>
                      <Badge variant="success">{skill.level}</Badge>
                    </CardBody>

                    <CardFooter>
                      <div className="flex gap-2">
                        <Link href={`/admin/skills/${skill.id}`}>
                          <Button variant="secondary" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(skill.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No skills yet</p>
            <Link href="/admin/skills/new">
              <Button variant="primary">Create First Skill</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
