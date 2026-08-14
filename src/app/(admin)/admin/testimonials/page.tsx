'use client';

import React, { useEffect, useState } from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Loading from '@/components/ui/Loading';

interface Testimonial {
  id: string;
  author: string;
  position?: string;
  company?: string;
  content: string;
  rating?: number;
  approved: boolean;
  featured: boolean;
  createdAt: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/testimonials', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      setTestimonials(result.data || []);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`/api/testimonials/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approved: true }),
      });
      fetchTestimonials();
    } catch (error) {
      console.error('Failed to approve testimonial:', error);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm('Are you sure you want to reject this testimonial?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTestimonials();
    } catch (error) {
      console.error('Failed to reject testimonial:', error);
    }
  };

  if (isLoading) return <Loading />;

  const filteredTestimonials = testimonials.filter((t) => {
    if (filter === 'approved') return t.approved;
    if (filter === 'pending') return !t.approved;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
        <p className="text-gray-600 mt-2">
          {testimonials.length} testimonial{testimonials.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(['all', 'approved', 'pending'] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      {filteredTestimonials.length > 0 ? (
        <div className="space-y-4">
          {filteredTestimonials.map((testimonial) => (
            <Card key={testimonial.id} hover>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {testimonial.author}
                    </h3>
                    {testimonial.position && (
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                    )}
                    {testimonial.company && (
                      <p className="text-sm text-gray-600">@ {testimonial.company}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {!testimonial.approved && (
                      <Badge variant="warning">Pending</Badge>
                    )}
                    {testimonial.approved && (
                      <Badge variant="success">Approved</Badge>
                    )}
                    {testimonial.featured && (
                      <Badge variant="info">Featured</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardBody>
                <p className="text-gray-700 italic mb-2">"{testimonial.content}"</p>
                {testimonial.rating && (
                  <div className="text-yellow-400">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                )}
              </CardBody>

              <CardFooter>
                {!testimonial.approved ? (
                  <div className="flex gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleApprove(testimonial.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleReject(testimonial.id)}
                    >
                      Reject
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleReject(testimonial.id)}
                  >
                    Remove
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-600">
              No {filter !== 'all' ? filter : ''} testimonials
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
