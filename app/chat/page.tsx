'use client';

import { useState } from 'react';
import { PaperAirplaneIcon, MagnifyingGlassIcon, PhotoIcon, DocumentIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Implement message sending logic
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Chat Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center justify-between max-w-[90rem] mx-auto">
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="clIck Logo"
              width={32}
              height={32}
              priority
            />
            <h1 className="text-xl font-semibold">clIck</h1>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Left Panel - Chat Messages */}
        <div className="w-1/2 border-r border-gray-800 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Message history will go here */}
            <div className="text-center text-gray-500">
              What are you building today?
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-800 p-4">
            <div className="flex items-center space-x-2">
              {/* Action Buttons */}
              <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-full transition-colors">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-full transition-colors">
                <PhotoIcon className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-full transition-colors">
                <DocumentIcon className="h-5 w-5" />
              </button>

              {/* Message Input */}
              <div className="flex-1">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Build a mobile calculator app..."
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                />
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="p-2 text-blue-500 hover:text-blue-400 hover:bg-gray-800 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
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
                <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm text-gray-300">
                    {/* Generated code will go here */}
                    // Your generated code will appear here...
                  </code>
                </pre>
              </div>
            ) : (
              <div className="p-4">
                <div className="bg-gray-900 p-4 rounded-lg h-full">
                  {/* Preview iframe or component will go here */}
                  <div className="text-gray-500 text-center">
                    Preview will appear here...
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
    