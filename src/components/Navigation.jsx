import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Star } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-background border-b mb-6">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">HN Reader</h1>
        <div className="space-x-2">
          <Button
            variant={location.pathname === '/' ? 'default' : 'outline'}
            asChild
          >
            <Link to="/" aria-label="Home">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
          </Button>
          <Button
            variant={location.pathname === '/favorites' ? 'default' : 'outline'}
            asChild
          >
            <Link to="/favorites" aria-label="Favorites">
              <Star className="h-4 w-4 mr-2" />
              Favorites
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;