import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function RecentActivityCard({children}: {children?: React.ReactNode}) {
    return(
        <Card className="shadow-sm border border-gray-200/60 bg-white/70 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-200/50">
              <CardTitle className="text-xl font-bold text-[#647FBC]">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {children}
            </CardContent>
        </Card>
    )
}