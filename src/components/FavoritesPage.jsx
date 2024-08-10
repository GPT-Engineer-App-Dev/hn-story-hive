import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import StoryList from './StoryList';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const fetchStoryById = async (id) => {
  const response = await fetch(`https://hn.algolia.com/api/v1/items/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch story');
  }
  return response.json();
};

const FavoritesPage = () => {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavoriteIds(favorites);
  }, []);

  const { data: favoriteStories, isLoading } = useQuery({
    queryKey: ['favoriteStories', favoriteIds],
    queryFn: () => Promise.all(favoriteIds.map(fetchStoryById)),
    enabled: favoriteIds.length > 0,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Favorite Stories</h2>
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Top Stories
        </Button>
      </div>
      {favoriteStories && favoriteStories.length > 0 ? (
        <StoryList stories={favoriteStories} isLoading={isLoading} />
      ) : (
        <p className="text-center text-gray-500">No favorite stories yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;