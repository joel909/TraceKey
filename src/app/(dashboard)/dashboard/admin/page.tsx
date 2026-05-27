import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Frontend Dashboard",
  description: "Admin-facing dashboard for TraceKey.",
};

export default function AdminDashboardPage() {
  return (
    <main className="flex-1 p-6">
      <section className="rounded-3xl border border-dashed border-[#647FBC]/30 bg-white/60 p-10 shadow-sm backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#647FBC]/70">
          Admin frontend dashboard
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#647FBC]">
          Admin dashboard
        </h2>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          This is the admin workspace. Use it for operational controls,
          account oversight, or any internal metrics that should stay separate
          from the customer dashboard.
        </p>
      </section>
    </main>
  );
}
