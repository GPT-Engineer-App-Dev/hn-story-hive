import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpCircle, ExternalLink, MessageSquare, Clock, Star, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate } from 'react-router-dom';

const StoryItem = ({ story }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

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

  const shareStory = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        url: story.url,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(story.url).then(() => {
        alert('Link copied to clipboard!');
      }).catch(console.error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{story.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
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
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFavorite}
                >
                  <Star className={`h-4 w-4 ${isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-500'}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={shareStory}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Share story
              </TooltipContent>
            </Tooltip>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(story.url, '_blank')}
            >
              Read More <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        {story.comment_text && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <h4 className="font-semibold mb-2">Top Comment:</h4>
            <p className="text-sm">{story.comment_text.slice(0, 200)}...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StoryItem;