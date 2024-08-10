import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background border-t mt-12 py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} HN Reader. Powered by{' '}
          <a href="https://github.com/HackerNews/API" className="underline" target="_blank" rel="noopener noreferrer">
            Hacker News API
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;