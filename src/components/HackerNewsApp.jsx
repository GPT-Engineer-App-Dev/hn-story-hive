import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from './SearchBar';
import StoryList from './StoryList';
import Pagination from './Pagination';
import SortOptions from './SortOptions';

const fetchStories = async ({ page, sortBy }) => {
  let url = `https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=20&page=${page}`;
  
  if (sortBy && sortBy !== 'default') {
    url += `&${sortBy}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const HackerNewsApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('default');

  const { data, isLoading, error } = useQuery({
    queryKey: ['stories', page, sortBy],
    queryFn: () => fetchStories({ page, sortBy }),
  });

  const filteredStories = data?.hits.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      <StoryList stories={filteredStories} isLoading={isLoading} />
      <Pagination
        currentPage={page}
        totalPages={data?.nbPages || 0}
        setPage={setPage}
      />
    </div>
  );
};

export default HackerNewsApp;