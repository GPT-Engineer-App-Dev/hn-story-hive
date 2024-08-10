import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, setPage }) => {
  return (
    <div className="flex justify-center items-center space-x-4">
      <Button
        variant="outline"
        onClick={() => setPage(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
      >
        <ChevronLeft className="h-4 w-4 mr-2" /> Previous
      </Button>
      <span className="text-sm font-medium">
        Page {currentPage + 1} of {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={() => setPage(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage === totalPages - 1}
      >
        Next <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default Pagination;