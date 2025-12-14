import {  ChevronLeft,ChevronRight,Loader2 } from "lucide-react"
import { Button } from "../../ui/button"
interface PaginationHandlingComponentProps {
  loading: boolean;
  currentPage: number;
  startIndex: number;
  endIndex: number;
  totalPages: number;
  calculatedTotalRecords: number;
  getPageNumbers : (currentPage: number, totalPages: number) => number[];
  handlePageChange: (page: number) => void;
}
export default function PaginationHandlingComponent({
  loading,
  startIndex,
  endIndex,
  currentPage,
  totalPages,
  calculatedTotalRecords,
  getPageNumbers,
  handlePageChange
}: PaginationHandlingComponentProps) {
    return(
        <div className="flex items-center justify-between px-2">
         {/* ... (no changes in pagination controls) ... */}
        <div className="text-sm text-[#647FBC]">
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading page {currentPage}...
            </div>
          ) : (
            `Showing ${startIndex} to ${endIndex} of ${calculatedTotalRecords} results`
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="flex items-center gap-1 text-[#647FBC] border-[#647FBC] hover:bg-[#647FBC] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          {getPageNumbers(currentPage, totalPages).map((pageNum) => (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(pageNum)}
              disabled={loading}
              className={
                currentPage === pageNum 
                  ? "bg-[#647FBC] text-white hover:bg-[#647FBC]/90" 
                  : "text-[#647FBC] border-[#647FBC] hover:bg-[#647FBC] hover:text-white disabled:opacity-50"
              }
            >
              {loading && currentPage === pageNum ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                pageNum
              )}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="flex items-center gap-1 text-[#647FBC] border-[#647FBC] hover:bg-[#647FBC] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    )
}