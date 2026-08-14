'use client';

import React, { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Loading from '@/components/ui/Loading';
import { useForm } from 'react-hook-form';
import { testimonialSchema, type TestimonialInput } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';

interface Testimonial {
  id: string;
  author: string;
  position?: string;
  company?: string;
  content: string;
  rating?: number;
  imageUrl?: string;
  websiteUrl?: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestimonialInput>({
    resolver: zodResolver(testimonialSchema),
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      const result = await response.json();
      setTestimonials(result.data || []);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: TestimonialInput) => {
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit testimonial');
      }

      setSubmitMessage(
        '✅ Thank you for your testimonial! It will be published after approval.'
      );
      reset();
      // Refresh testimonials
      fetchTestimonials();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Failed to submit testimonial'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Testimonials</h1>
          <p className="text-blue-100">
            What people are saying about working with me
          </p>
        </div>
      </div>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Testimonials List */}
          {!isLoading && testimonials.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Featured Reviews
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id}>
                    <div className="flex gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {testimonial.author}
                        </h3>
                        {testimonial.position && (
                          <p className="text-sm text-gray-600">
                            {testimonial.position}
                          </p>
                        )}
                        {testimonial.company && (
                          <p className="text-sm text-gray-600">
                            @ {testimonial.company}
                          </p>
                        )}
                      </div>
                      {testimonial.rating && (
                        <div className="text-yellow-400 text-sm">
                          {Array.from({ length: testimonial.rating }).map(
                            (_, i) => (
                              <span key={i}>★</span>
                            )
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700 italic">
                      "{testimonial.content}"
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Submission Form */}
          <div className="max-w-2xl mx-auto">
            <Card>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Leave a Testimonial
                </h2>
                <p className="text-gray-600">
                  Share your experience working with me
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {submitMessage && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    {submitMessage}
                  </div>
                )}
                {submitError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    type="text"
                    placeholder="John Doe"
                    {...register('author')}
                    error={errors.author?.message}
                  />

                  <Input
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    {...register('email')}
                    error={errors.email?.message}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Position (Optional)"
                    type="text"
                    placeholder="Senior Developer"
                    {...register('position')}
                    error={errors.position?.message}
                  />

                  <Input
                    label="Company (Optional)"
                    type="text"
                    placeholder="Your Company"
                    {...register('company')}
                    error={errors.company?.message}
                  />
                </div>

                <TextArea
                  label="Your Testimonial"
                  placeholder="Share your experience working with me..."
                  rows={5}
                  {...register('content')}
                  error={errors.content?.message}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating (Optional)
                    </label>
                    <select
                      {...register('rating', { valueAsNumber: true })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a rating</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>

                  <Input
                    label="Website URL (Optional)"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    {...register('websiteUrl')}
                    error={errors.websiteUrl?.message}
                  />
                </div>

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  size="lg"
                  className="w-full"
                >
                  Submit Testimonial
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Your testimonial will be reviewed and published after approval
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
