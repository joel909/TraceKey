import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function statCard({title,value,Icon}:{title: string, value: string, Icon: React.ElementType}) {
    return(
    <Card className="shadow-sm border border-gray-200/60 bg-white/70 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[#647FBC]">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-[#647FBC]" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-[#647FBC]">{value}</div>
      </CardContent>
    </Card>
    )
}