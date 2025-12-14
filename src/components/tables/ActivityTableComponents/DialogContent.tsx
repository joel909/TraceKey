
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../../ui/dialog" // Added Dialog components
import { LogActivity } from "@/lib/interfaces/deviceInfoInterface"
import { Button } from "../../ui/button"
import { JSX } from "react";
interface DialogBoxProps {
    selectedActivity: LogActivity | null;
    setSelectedActivity: () => void;
    expandedSections : Record<string, boolean>,
    toggleSection : (key: 'userAgent' | 'referrerUrl' | 'cookies') => void,
    renderCollapsibleSection : (label: string,content: string,key: 'userAgent' | 'referrerUrl' | 'cookies', expandedSections : Record<string, boolean>, toggleSection : (key: 'userAgent' | 'referrerUrl' | 'cookies') => void) => JSX.Element;
}
export default function DialogBox({selectedActivity, setSelectedActivity,renderCollapsibleSection,expandedSections,toggleSection}: DialogBoxProps) {
    return(
        <Dialog 
        open={selectedActivity !== null} 
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedActivity(); // Close modal on overlay click or Esc
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
                
                {renderCollapsibleSection("User Agent", selectedActivity.userAgent, 'userAgent', expandedSections, toggleSection)}
                {renderCollapsibleSection("Referrer URL", selectedActivity.referrerUrl, 'referrerUrl', expandedSections, toggleSection)}
                {renderCollapsibleSection("Cookies", selectedActivity.cookies, 'cookies', expandedSections, toggleSection)}

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
    )
}