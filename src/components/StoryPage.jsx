import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Clock, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import CommentTree from './CommentTree';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from './SkeletonLoader';

const fetchStory = async (id) => {
  const response = await fetch(`https://hn.algolia.com/api/v1/items/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch story');
  }
  return response.json();
};

const StoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: story, isLoading, error } = useQuery({
    queryKey: ['story', id],
    queryFn: () => fetchStory(id),
  });

  if (isLoading) return <SkeletonLoader count={1} />;
  if (error) return <div>Error loading story: {error.message}</div>;

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{story.title}</CardTitle>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {formatDistanceToNow(new Date(story.created_at))} ago
            </span>
            <span className="flex items-center">
              <MessageSquare className="mr-1 h-4 w-4" />
              {story.children.length} comments
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={() => window.open(story.url, '_blank')}
            className="mb-4"
          >
            Read Full Article <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <CommentTree comments={story.children} />
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryPage;