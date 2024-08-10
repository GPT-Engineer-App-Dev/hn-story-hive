import React from 'react';
import StoryItem from './StoryItem';
import SkeletonLoader from './SkeletonLoader';

const StoryList = ({ stories, isLoading }) => {
  if (isLoading) {
    return <SkeletonLoader count={10} />;
  }

  return (
    <div className="space-y-4">
      {stories?.map((story) => (
        <StoryItem key={story.objectID} story={story} />
      ))}
    </div>
  );
};

export default StoryList;