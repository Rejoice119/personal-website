'use client';

import React, { useEffect, useState } from 'react';
import Card, { CardHeader, CardBody } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  reply?: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      setMessages(result.data || []);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`/api/messages/${messageId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'read' }),
      });
      fetchMessages();
    } catch (error) {
      console.error('Failed to update message:', error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
        <p className="text-gray-600 mt-2">
          {messages.length} message{messages.length !== 1 ? 's' : ''}
        </p>
      </div>

      {messages.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedMessage?.id === msg.id
                      ? 'bg-blue-50 border-2 border-blue-600'
                      : 'bg-white border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {msg.name}
                    </h3>
                    <Badge
                      variant={
                        msg.status === 'unread'
                          ? 'primary'
                          : msg.status === 'replied'
                            ? 'success'
                            : 'info'
                      }
                    >
                      {msg.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{msg.subject}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Message Details */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedMessage.subject}
                      </h2>
                      <p className="text-gray-600 mt-1">From: {selectedMessage.name}</p>
                      <p className="text-sm text-gray-500">{selectedMessage.email}</p>
                    </div>
                    {selectedMessage.status === 'unread' && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleMarkAsRead(selectedMessage.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </CardHeader>

                <CardBody className="space-y-6">
                  {/* Original Message */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Message</p>
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>

                  {/* Reply Section */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Reply
                    </p>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply here..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                    />
                    <Button className="mt-4" isLoading={false}>
                      Send Reply
                    </Button>
                  </div>

                  {/* Metadata */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                </CardBody>
              </Card>
            ) : (
              <Card>
                <div className="text-center py-12">
                  <p className="text-gray-600">
                    Select a message to view details
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-600">No messages yet</p>
          </div>
        </Card>
      )}
    </div>
  );
}
