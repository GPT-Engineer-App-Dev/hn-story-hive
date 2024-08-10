import React from 'react';
import HackerNewsApp from '../components/HackerNewsApp';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Hacker News Top 100</h1>
        <HackerNewsApp />
      </div>
    </div>
  );
};

export default Index;