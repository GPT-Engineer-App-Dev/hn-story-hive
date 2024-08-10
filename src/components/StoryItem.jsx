import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpCircle, ExternalLink } from 'lucide-react';

const StoryItem = ({ story }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{story.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ArrowUpCircle className="text-orange-500" />
            <span>{story.points} points</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(story.url, '_blank')}
          >
            Read More <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryItem;