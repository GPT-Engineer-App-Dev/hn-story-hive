import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpCircle, ExternalLink, MessageSquare, Clock, Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const StoryItem = ({ story }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(story.objectID));
  }, [story.objectID]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const updatedFavorites = favorites.filter(id => id !== story.objectID);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(story.objectID);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{story.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <ArrowUpCircle className="text-orange-500 h-4 w-4" />
              <span className="text-sm">{story.points} points</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="text-blue-500 h-4 w-4" />
              <span className="text-sm">{story.num_comments} comments</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="text-gray-500 h-4 w-4" />
              <span className="text-sm">{formatDistanceToNow(new Date(story.created_at))} ago</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFavorite}
            >
              <Star className={`h-4 w-4 ${isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-500'}`} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(story.url, '_blank')}
            >
              Read More <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryItem;