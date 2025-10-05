"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { FileX, ArrowLeft, Flag } from "lucide-react"

export default  function ErrorCard({error,messageLine1,messageLine2,reason,projectId,callback}: {error:string,messageLine1:string,messageLine2:string,reason:string,projectId:string,callback?:()=>void})   {
    const [isReporting, setIsReporting] = useState(false);
    const handleReturnToProjects = () => {
        window.location.href = '/projects';
    }
    const handleReport = async () => {
        setIsReporting(true);
        //call the callbak function here after its created
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto">
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/60 w-full">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <FileX className="h-8 w-8 text-gray-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-[#647FBC] mb-2">
                {/* Project Resource Not Found */}
                {error}
              </CardTitle>
              <CardDescription className="text-[#647FBC]/70">
                {/* This project might not exist */}
                {messageLine1}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="space-y-3">
                <p className="text-[#647FBC] text-lg">
                  {/* The project you're looking for could not be found in our system. */}
                    {messageLine2}
                </p>
                <p className="text-[#647FBC]/70">
                  {/* This might be due to the project being deleted, moved, or you may not have access permissions. If this seems incorrect, please report this issue. */}
                    {reason}
                </p>
              </div>
              
              <Alert className="border-blue-200 bg-blue-50/50 text-left">
                <FileX className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Requested Project ID:</strong> <code className="bg-blue-100 px-2 py-1 rounded text-sm font-mono">{projectId}</code>
                </AlertDescription>
              </Alert>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={handleReturnToProjects}
                  className="border-[#647FBC]/20 text-[#647FBC] hover:bg-[#647FBC]/10"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Button>
                <Button
                  onClick={handleReport}
                  disabled={isReporting}
                  className="bg-[#647FBC] hover:bg-[#5a6fb0] text-white"
                >
                  {isReporting ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Reporting...
                    </>
                  ) : (
                    <>
                      <Flag className="mr-2 h-4 w-4" />
                      Report Here
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

    )
}