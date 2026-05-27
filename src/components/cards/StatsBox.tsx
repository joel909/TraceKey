import { Card, CardContent } from "@/components/ui/card";

type StatsBoxProps = {
  label: string;
  value: number | string;
};

export default function StatsBox({ label, value }: StatsBoxProps) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-gray-200/60 shadow-sm">
      <CardContent className="p-6">
        <p className="text-sm font-medium text-[#647FBC]/70">{label}</p>
        <p className="mt-3 text-3xl font-bold tracking-tight text-[#647FBC]">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
