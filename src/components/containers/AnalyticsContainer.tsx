import { TabsContent } from "@radix-ui/react-tabs";
import { Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

export default function AnalyticsContainer() {
    return (
        <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-gray-200/60">
            <CardHeader>
                <CardTitle className="text-[#647FBC]">Analytics Dashboard</CardTitle>
                <CardDescription className="text-[#647FBC]/70">
                Detailed analytics and insights coming soon
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-64 text-[#647FBC]/50">
                    <div className="text-center">
                        <Activity className="h-12 w-12 mx-auto mb-4" />
                        <p>Advanced analytics features will be available soon</p>
                    </div>
                </div>
            </CardContent>
            </Card>
        </TabsContent>
        )
}