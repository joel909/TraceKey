import { Monitor, Smartphone } from "lucide-react"
import { Table,TableBody,TableHead,TableRow,TableHeader,TableCell } from "../ui/table"
export default function ActivityTable({ data }: { data: Array<{ip: string, time: string, visits: number, device: string, region: string}> }) {
    return(
        <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200/60">
                    <TableHead className="text-[#647FBC] font-semibold py-4 px-6">IP Address</TableHead>
                    <TableHead className="text-[#647FBC] font-semibold py-4 px-6">Time</TableHead>
                    <TableHead className="text-[#647FBC] font-semibold py-4 px-6">Visits</TableHead>
                    <TableHead className="text-[#647FBC] font-semibold py-4 px-6">Device</TableHead>
                    <TableHead className="text-[#647FBC] font-semibold py-4 px-6">Region</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((activity, index) => (
                    <TableRow 
                      key={activity.ip} 
                      className={`border-b border-gray-100/60 hover:bg-gray-50/50 transition-colors ${
                        index % 2 === 0 ? 'bg-transparent' : 'bg-gray-50/30'
                      }`}
                    >
                      <TableCell className="font-medium text-[#647FBC] py-4 px-6">{activity.ip}</TableCell>
                      <TableCell className="text-[#647FBC] py-4 px-6">{activity.time}</TableCell>
                      <TableCell className="text-[#647FBC] py-4 px-6">{activity.visits}</TableCell>
                      <TableCell className="flex items-center gap-2 text-[#647FBC] py-4 px-6">
                        {activity.device === "Desktop" ? 
                          <Monitor className="h-4 w-4 text-[#647FBC]" /> : 
                          <Smartphone className="h-4 w-4 text-[#647FBC]" />
                        }
                        {activity.device}
                      </TableCell>
                      <TableCell className="text-[#647FBC] py-4 px-6">{activity.region}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
    )
}