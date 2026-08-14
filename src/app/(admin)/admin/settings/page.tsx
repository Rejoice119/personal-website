'use client';

import React, { useEffect, useState } from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Loading from '@/components/ui/Loading';

interface SiteSettings {
  id: string;
  siteName: string;
  siteDescription: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  socialTwitter?: string;
  socialLinkedIn?: string;
  socialGithub?: string;
  socialInstagram?: string;
  resumeUrl?: string;
  primaryColor: string;
  secondaryColor: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const result = await response.json();
      setSettings(result.data);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    setIsSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Failed to save settings');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <Loading />;
  if (!settings) return <div>Failed to load settings</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-600 mt-2">Configure your portfolio site</p>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
        </CardHeader>

        <CardBody className="space-y-6">
          <Input
            label="Site Name"
            value={settings.siteName}
            onChange={(e) =>
              setSettings({ ...settings, siteName: e.target.value })
            }
          />

          <TextArea
            label="Site Description"
            value={settings.siteDescription}
            onChange={(e) =>
              setSettings({ ...settings, siteDescription: e.target.value })
            }
            rows={3}
          />

          <TextArea
            label="Bio"
            value={settings.bio}
            onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
            rows={4}
          />

          <Input
            label="Email"
            type="email"
            value={settings.email}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
          />

          <Input
            label="Phone"
            value={settings.phone || ''}
            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
          />

          <Input
            label="Location"
            value={settings.location || ''}
            onChange={(e) =>
              setSettings({ ...settings, location: e.target.value })
            }
          />
        </CardBody>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900">Social Media</h2>
        </CardHeader>

        <CardBody className="space-y-6">
          <Input
            label="Twitter URL"
            value={settings.socialTwitter || ''}
            onChange={(e) =>
              setSettings({ ...settings, socialTwitter: e.target.value })
            }
            placeholder="https://twitter.com/yourprofile"
          />

          <Input
            label="LinkedIn URL"
            value={settings.socialLinkedIn || ''}
            onChange={(e) =>
              setSettings({ ...settings, socialLinkedIn: e.target.value })
            }
            placeholder="https://linkedin.com/in/yourprofile"
          />

          <Input
            label="GitHub URL"
            value={settings.socialGithub || ''}
            onChange={(e) =>
              setSettings({ ...settings, socialGithub: e.target.value })
            }
            placeholder="https://github.com/yourprofile"
          />

          <Input
            label="Instagram URL"
            value={settings.socialInstagram || ''}
            onChange={(e) =>
              setSettings({ ...settings, socialInstagram: e.target.value })
            }
            placeholder="https://instagram.com/yourprofile"
          />

          <Input
            label="Resume URL"
            value={settings.resumeUrl || ''}
            onChange={(e) =>
              setSettings({ ...settings, resumeUrl: e.target.value })
            }
            placeholder="/resume.pdf"
          />
        </CardBody>
      </Card>

      {/* Theme */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900">Theme Colors</h2>
        </CardHeader>

        <CardBody className="space-y-6">
          <div className="flex gap-6">
            <div className="flex-1">
              <Input
                label="Primary Color"
                type="color"
                value={settings.primaryColor}
                onChange={(e) =>
                  setSettings({ ...settings, primaryColor: e.target.value })
                }
              />
            </div>
            <div className="flex-1">
              <Input
                label="Secondary Color"
                type="color"
                value={settings.secondaryColor}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    secondaryColor: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="lg"
          isLoading={isSaving}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
