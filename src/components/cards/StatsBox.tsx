import { Card, CardContent } from "@/components/ui/card";

type StatsBoxProps = {
  label: string;
  value: number | string;
  loading?: boolean;
};

export default function StatsBox({ label, value, loading = false }: StatsBoxProps) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-gray-200/60 shadow-sm">
      <CardContent className="p-6">
        {loading ? (
          <div className="space-y-3">
            <div className="h-4 w-32 rounded bg-gray-200 animate-pulse" />
            <div className="h-10 w-24 rounded bg-gray-300 animate-pulse" />
          </div>
        ) : (
          <>
            <p className="text-sm font-medium text-[#647FBC]/70">{label}</p>
            <p className="mt-3 text-3xl font-bold tracking-tight text-[#647FBC]">
              {value}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
