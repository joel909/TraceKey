import { Button } from "@/components/ui/button"
import { LogActivity } from "@/lib/interfaces/deviceInfoInterface"
import { Monitor, Smartphone } from "lucide-react"
import { Table, TableBody, TableHead, TableRow, TableHeader, TableCell } from "../../ui/table"
interface TableComponentProps {
  loading: boolean;
  itemsPerPage: number;
  currentPageData: LogActivity[];
  handleShowDetails: (activity: LogActivity) => void;
}

export default function TableComponent({loading, itemsPerPage, currentPageData, handleShowDetails}: TableComponentProps) {
    return (
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
    )

}