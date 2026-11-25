import Link from "next/link";
import { ArrowLeft, ListChecks } from "lucide-react";
import RencanaForm from "@/components/rencana/RencanaForm";

export const metadata = {
  title: "Rencana Keperawatan - Askep Anak",
  description: "Formulir Rencana Keperawatan (Intervensi Independen & Interdependen) Asuhan Keperawatan Anak",
};

export default function RencanaPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Top Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Alur Askep
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            <ListChecks className="w-3.5 h-3.5" />
            Bagian C • Rencana Keperawatan
          </span>
        </div>

        <RencanaForm />
      </div>
    </main>
  );
}