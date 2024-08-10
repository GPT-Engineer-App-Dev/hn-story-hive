import React, { useState, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import SearchBar from './SearchBar';
import StoryList from './StoryList';
import SortOptions from './SortOptions';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const fetchStories = async ({ page, sortBy }) => {
  let url = `https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=20&page=${page}`;
  
  if (sortBy && sortBy !== 'default') {
    url += `&${sortBy}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch stories');
  }
  return response.json();
};

const HackerNewsApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('default');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ['stories', page, sortBy, debouncedSearchTerm],
    queryFn: () => fetchStories({ page, sortBy }),
    keepPreviousData: true,
    retry: 3,
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to fetch stories. Please try again.",
        variant: "destructive",
      });
    },
  });

  const loadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const filteredStories = data?.hits.filter((story) =>
    story.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  ) || [];

  const handleRetry = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500 mb-4">Error: Failed to fetch stories</p>
        <Button onClick={handleRetry}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      <StoryList stories={filteredStories} isLoading={isLoading} />
      {(isFetching || isLoading) && (
        <div className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      {!isLoading && filteredStories.length > 0 && (
        <div className="flex justify-center">
          <Button onClick={loadMore} disabled={isFetching}>
            {isFetching ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default HackerNewsApp;