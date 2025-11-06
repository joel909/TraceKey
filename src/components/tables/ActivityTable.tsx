'use client'

import { useState, useEffect } from "react"
import { 
  Monitor, 
  Smartphone, 
  ChevronLeft, 
  ChevronRight, 
  Loader2,
  ChevronDown, // Added
  ChevronUp    // Added
} from "lucide-react"
import { Table, TableBody, TableHead, TableRow, TableHeader, TableCell } from "../ui/table"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../ui/dialog" // Added Dialog components
import {LogActivity}  from "@/lib/interfaces/deviceInfoInterface"

interface ActivityTableProps {
  data: LogActivity[];
  totalRecords?: number;
  onFetchPage?: (page: number) => Promise<LogActivity[]>;  // Function to fetch data for a specific page
}

export default function ActivityTable({ 
  data,
  totalRecords,
  onFetchPage
}: ActivityTableProps) {
  
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [allPagesData, setAllPagesData] = useState<{[key: number]: LogActivity[]}>({})
  const [error, setError] = useState<string | null>(null)
  
  // --- State for Modal ---
  const [selectedActivity, setSelectedActivity] = useState<LogActivity | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  
  const itemsPerPage = 10
  const calculatedTotalRecords = totalRecords || data.length
  const totalPages = Math.ceil(calculatedTotalRecords / itemsPerPage)
  
  // Initialize data properly - just store the first page
  useEffect(() => {
    const pagesData: {[key: number]: LogActivity[]} = {}
    pagesData[1] = data.slice(0, itemsPerPage)
    setAllPagesData(pagesData)
  }, [data, itemsPerPage])
  
  // Get current page data
  const getCurrentPageData = () => {
    return allPagesData[currentPage] || []
  }
  
  // Fetch page data from API
  const fetchPageData = async (page: number) => {
    setLoading(true)
    setError(null)
    console.log(`Fetching data for page ${page}...`)
    
    try {
      // Use the provided fetch function or fallback to empty array
      const pageData = onFetchPage ? await onFetchPage(page) : []
      
      setAllPagesData(prev => ({
        ...prev,
        [page]: pageData
      }))
      
    } catch (error) {
      console.error("Error fetching data:", error)
      setError("Failed to fetch data. Please try again.")
    } finally {
      setLoading(false)
    }
  }
  
  const handlePageChange = async (page: number) => {
    if (page >= 1 && page <= totalPages && !loading) {
      setCurrentPage(page)
      
      // If page data doesn't exist and it's not page 1, fetch it
      if (page !== 1 && (!allPagesData[page] || allPagesData[page].length === 0)) {
        await fetchPageData(page)
      }
      // Optional: Add loading animation even if data exists
      else if (page !== 1 && allPagesData[page]) {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 500))
        setLoading(false)
      }
    }
  }
  
  const handleShowDetails = (activity: LogActivity) => {
    setSelectedActivity(activity);
    setExpandedSections({}); // Reset expanded sections when opening new modal
  }

  const getPageNumbers = () => {
    // ... (no changes in this function) ...
    const pages = []
    const showPages = 5
    
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2))
    const endPage = Math.min(totalPages, startPage + showPages - 1)
    
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1)
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    
    return pages
  }

  // --- New: Helper function to toggle collapsible sections ---
  const toggleSection = (key: 'userAgent' | 'referrerUrl' | 'cookies') => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }

  // --- New: Helper function to render a collapsible section ---
  const renderCollapsibleSection = (
    label: string, 
    content: string, 
    key: 'userAgent' | 'referrerUrl' | 'cookies'
  ) => {
    const isExpanded = !!expandedSections[key];
    return (
      <div className="space-y-2">
        <Button
          variant="ghost"
          className="flex items-center justify-between w-full px-2 py-1 text-left text-sm font-semibold text-[#647FBC] hover:bg-gray-100"
          onClick={() => toggleSection(key)}
        >
          <span>{label}</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isExpanded && (
          <div className="p-3 border rounded-md bg-gray-50/80 text-sm text-gray-700 break-words whitespace-pre-wrap max-h-48 overflow-y-auto font-mono">
            {content}
          </div>
        )}
      </div>
    );
  }

  const currentPageData = getCurrentPageData()
  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(currentPage * itemsPerPage, calculatedTotalRecords)

  return(
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200/60">
            <TableHead className="text-[#647FBC] font-semibold py-4 px-6">IP Address</TableHead>
            <TableHead className="text-[#647FBC] font-semibold py-4 px-6">Time</TableHead>
            <TableHead className="text-[#647FBC] font-semibold py-4 px-6">Device</TableHead>
            <TableHead className="text-[#647FBC] font-semibold py-4 px-6">Region</TableHead>
            <TableHead className="text-[#647FBC] font-semibold py-4 px-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: itemsPerPage }, (_, i) => (
              <TableRow key={i} className="border-b border-gray-100/60 animate-pulse">
                <TableCell className="py-4 px-6">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
                </TableCell>
              </TableRow>
            ))
          ) : currentPageData.length > 0 ? (
            currentPageData.map((activity, index) => (
              <TableRow 
                key={`${activity.ip}-${index}`}
                className={`border-b border-gray-100/60 hover:bg-gray-50/50 transition-colors ${
                  index % 2 === 0 ? 'bg-transparent' : 'bg-gray-50/30'
                }`}
              >
                <TableCell className="font-medium text-[#647FBC] py-4 px-6">{activity.ip}</TableCell>
                <TableCell className="text-[#647FBC] py-4 px-6">{activity.time}</TableCell>
                <TableCell className="flex items-center gap-2 text-[#647FBC] py-4 px-6">
                  {activity.device === "Desktop" ? 
                    <Monitor className="h-4 w-4 text-[#647FBC]" /> : 
                    <Smartphone className="h-4 w-4 text-[#647FBC]" />
                  }
                  {activity.device}
                </TableCell>
                <TableCell className="text-[#647FBC] py-4 px-6">{activity.region}</TableCell>
                <TableCell className="py-4 px-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShowDetails(activity)} // This now opens the modal
                    className="text-[#647FBC] border-[#647FBC] hover:bg-[#647FBC] hover:text-white transition-colors"
                  >
                    Show More Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            // ... (no changes in "No data" row apart from colSpan) ...
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-[#647FBC]">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {error}
        </div>
      )}

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
          
          {getPageNumbers().map((pageNum) => (
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

      <div className="flex justify-center text-sm text-[#647FBC]">
        Page {currentPage} of {totalPages}
      </div>

      {/* --- Added: Modal (Dialog) --- */}
      <Dialog 
        open={selectedActivity !== null} 
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedActivity(null); // Close modal on overlay click or Esc
          }
        }}
      >
        <DialogContent className="sm:max-w-[650px] bg-[#FAFDD6] text-gray-800">
          {selectedActivity && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-[#647FBC]">
                  Activity Details
                </DialogTitle>
                <DialogDescription className="text-gray-500 pt-1">
                  Detailed information for IP: 
                  <span className="font-medium text-[#647FBC] pl-1">{selectedActivity.ip}</span>
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-5 py-4 max-h-[60vh] overflow-y-auto px-1 pr-3">
                
                {/* --- Modal Content --- */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#647FBC]">Interaction ID</label>
                  <p className="p-3 border rounded-md bg-gray-50/80 text-sm text-gray-700 break-words font-mono">
                    {selectedActivity.interactionID}
                  </p>
                </div>

                {/* Additional Device Info */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#647FBC]">Additional Device Info</label>
                  <p className="p-3 border rounded-md bg-gray-50/80 text-sm text-gray-700 break-words font-mono">
                    {selectedActivity.additionalDeviceInfo || "Not available"}
                  </p>
                </div>
                
                {renderCollapsibleSection("User Agent", selectedActivity.userAgent, 'userAgent')}
                {renderCollapsibleSection("Referrer URL", selectedActivity.referrerUrl, 'referrerUrl')}
                {renderCollapsibleSection("Cookies", selectedActivity.cookies, 'cookies')}

              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button 
                    type="button" 
                    variant="outline"
                    className="text-[#647FBC] border-[#647FBC] hover:bg-[#647FBC] hover:text-white transition-colors"
                  >
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}       