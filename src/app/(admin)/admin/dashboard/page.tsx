'use client';

import React, { useEffect, useState } from 'react';
import Card, { CardHeader, CardBody } from '@/components/ui/Card';
import Loading from '@/components/ui/Loading';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface DashboardStats {
  projects: number;
  skills: number;
  messages: number;
  testimonials: number;
  approvedTestimonials: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    skills: 0,
    messages: 0,
    testimonials: 0,
    approvedTestimonials: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('adminToken');

        // Fetch all data
        const [projectsRes, skillsRes, messagesRes, testimonialsRes] = await Promise.all([
          fetch('/api/projects', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('/api/skills', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('/api/messages', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('/api/testimonials', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const projects = await projectsRes.json();
        const skills = await skillsRes.json();
        const messages = await messagesRes.json();
        const testimonials = await testimonialsRes.json();

        setStats({
          projects: projects.data?.length || 0,
          skills: skills.data?.length || 0,
          messages: messages.data?.length || 0,
          testimonials: testimonials.data?.length || 0,
          approvedTestimonials:
            testimonials.data?.filter((t: any) => t.approved).length || 0,
        });

        // Get recent messages
        setRecentMessages(messages.data?.slice(0, 5) || []);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Total Projects</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.projects}</p>
            </div>
            <span className="text-3xl">🗂️</span>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Total Skills</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.skills}</p>
            </div>
            <span className="text-3xl">💡</span>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Messages</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.messages}</p>
            </div>
            <span className="text-3xl">💬</span>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Testimonials</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.approvedTestimonials}/{stats.testimonials}
              </p>
            </div>
            <span className="text-3xl">⭐</span>
          </div>
        </Card>
      </div>

      {/* Recent Messages */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Recent Messages</h2>
            <Link href="/admin/messages">
              <Button variant="secondary" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardBody>
          {recentMessages.length > 0 ? (
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{message.name}</p>
                      <p className="text-sm text-gray-600">{message.email}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        message.status === 'unread'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.status}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{message.subject}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No messages yet</p>
          )}
        </CardBody>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link href="/admin/projects?new=true">
              <Button variant="primary" className="w-full">
                Add Project
              </Button>
            </Link>
            <Link href="/admin/skills?new=true">
              <Button variant="primary" className="w-full">
                Add Skill
              </Button>
            </Link>
            <Link href="/admin/testimonials">
              <Button variant="primary" className="w-full">
                Review Testimonials
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="secondary" className="w-full">
                Settings
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
