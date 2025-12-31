'use client'
import TableComponent from "./ActivityTableComponents/Table"
import { useState, useEffect } from "react"
import {LogActivity}  from "@/lib/interfaces/deviceInfoInterface"
import DialogBox from "./ActivityTableComponents/DialogContent"
import PaginationHandlingComponent from "./ActivityTableComponents/PaginationHandleingComponent"
import {renderCollapsibleSection} from "./renderCollapsibleSection"
import {getPageNumbers} from "./ActivityTableComponents/getPageNumbers"
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
  // --- New: Helper function to toggle collapsible sections ---
  const toggleSection = (key: 'userAgent' | 'referrerUrl' | 'cookies') => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }
  // --- New: Helper function to render a collapsible section ---
  const setSelectedActivityToNull =  () =>{
    setSelectedActivity(null);
  }
  const currentPageData = getCurrentPageData()
  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(currentPage * itemsPerPage, calculatedTotalRecords)
  return(
    <div className="space-y-4">
      <TableComponent
        loading={loading}
        itemsPerPage={itemsPerPage}
        currentPageData={currentPageData}
        handleShowDetails={handleShowDetails}
      />

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {error}
        </div>
      )}

      <PaginationHandlingComponent
        loading={loading}
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
        totalPages={totalPages}
        calculatedTotalRecords={calculatedTotalRecords}
        getPageNumbers={getPageNumbers}
        handlePageChange={handlePageChange}
      />

      {/* --- Added: Modal (Dialog) --- */}
     <DialogBox
      selectedActivity={selectedActivity}
      setSelectedActivity={setSelectedActivityToNull}
      expandedSections={expandedSections}
      toggleSection={toggleSection}
      renderCollapsibleSection={renderCollapsibleSection}
     />
    </div>
  )
}       