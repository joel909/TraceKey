import { TabsList, TabsTrigger } from "../ui/tabs";

export default function ManageProjectHeading({tabs}: {tabs: string[]}) {
    return (
        <TabsList className="bg-white/70 border border-gray-200/60">
            {tabs.map((tab) => (
                <TabsTrigger key={tab} value={tab.toLowerCase()} className="data-[state=active]:bg-[#647FBC] data-[state=active]:text-white">
                    {tab}
                </TabsTrigger>
            ))
            }
            {/* <TabsTrigger value="overview" className="data-[state=active]:bg-[#647FBC] data-[state=active]:text-white">
                Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#647FBC] data-[state=active]:text-white">
                Analytics
            </TabsTrigger> */}
        </TabsList>
    )
}