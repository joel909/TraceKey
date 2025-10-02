import { Tabs } from "@/components/ui/tabs"
import ManageProjectHeading from "../tabs/ManageProjectsOptionsTabs"
export default function TabContainer({ children,tabs }: { children: React.ReactNode,tabs: string[]  }) {
    return (
        <Tabs defaultValue="overview" className="space-y-6">
            {/* Tab Headers */}
            <ManageProjectHeading tabs={tabs} />
            {children}
        </Tabs>
    )
}