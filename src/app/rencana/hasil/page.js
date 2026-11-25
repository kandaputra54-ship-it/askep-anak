import RencanaResult from "@/components/rencana/RencanaResult";

export const metadata = {
  title: "Hasil Rencana Keperawatan - Askep Anak",
  description: "Pratinjau dokumen, cetak PDF, dan kirim WhatsApp Rencana Keperawatan Askep Anak",
};

export default function RencanaHasilPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 print:bg-white print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto">
        <RencanaResult />
      </div>
    </main>
  );
}