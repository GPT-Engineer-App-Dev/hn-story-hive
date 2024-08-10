import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Comment = ({ comment }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="text-sm mb-2" dangerouslySetInnerHTML={{ __html: comment.text }} />
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>by {comment.author}</span>
          {comment.children.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Hide Replies
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Show {comment.children.length} Replies
                </>
              )}
            </Button>
          )}
        </div>
        {expanded && comment.children.length > 0 && (
          <div className="mt-4 ml-4">
            <CommentTree comments={comment.children} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const CommentTree = ({ comments }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentTree;