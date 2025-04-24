'use client';

import { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, MagnifyingGlassIcon, PhotoIcon, DocumentIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import CodePreview from '../components/CodePreview';
import PreviewPanel from '../components/PreviewPanel';
import { MousePointer } from '@/components/mouse-pointer';
import { generateCode } from '../api/chat';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: prompt }]);

    try {
      const response = await generateCode(prompt);
      setGeneratedCode(response.code);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.explanation 
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, there was an error processing your request.' 
      }]);
    } finally {
      setIsLoading(false);
      setPrompt('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <header className="border-b border-gray-800/50 sticky top-0 z-50 backdrop-blur-md bg-black/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 p-2 -m-2 hover:opacity-80 transition-opacity rounded-md hover:bg-gray-800/50"
            aria-label="Return to home page"
          >
            <MousePointer className="h-6 w-6 text-white animate-float" />
            <span className="ml-2 text-sm text-gray-400">clIck</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <button
              className={`px-3 py-1 rounded-md text-sm ${
                activeTab === 'code' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('code')}
            >
              Code
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm ${
                activeTab === 'preview' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Chat Messages */}
        <div className="w-1/2 border-r border-gray-800 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex flex-col space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg break-words ${
                    message.role === 'user'
                      ? 'bg-gray-800 ml-auto max-w-[80%]'
                      : 'bg-gray-900 max-w-[80%]'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              ))}
              {isLoading && (
                <div className="p-4 rounded-lg bg-gray-900 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              {messages.length === 0 && !isLoading && (
                <div className="text-center text-gray-500">
                  What are you building today?
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-800 p-4">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              {/* Action Buttons */}
              <button 
                type="button"
                className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Search"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
              <button 
                type="button"
                className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Upload image"
              >
                <PhotoIcon className="h-5 w-5" />
              </button>
              <button 
                type="button"
                className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Upload file"
              >
                <DocumentIcon className="h-5 w-5" />
              </button>

              {/* Message Input */}
              <div className="flex-1">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Build a mobile calculator app..."
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                  disabled={isLoading}
                  aria-label="Enter your prompt"
                />
              </div>

              {/* Send Button */}
              <button
                type="submit"
                className="p-2 text-blue-500 hover:text-blue-400 hover:bg-gray-800 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={isLoading || !prompt.trim()}
                aria-label="Send message"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <PaperAirplaneIcon className="h-5 w-5" />
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Panel - Code and Preview */}
        <div className="w-1/2 flex flex-col">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'code'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Code
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'preview'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Preview
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            {activeTab === 'code' ? (
              <div className="p-4">
                <CodePreview code={generatedCode} />
              </div>
            ) : (
              <div className="p-4">
                <PreviewPanel />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
    