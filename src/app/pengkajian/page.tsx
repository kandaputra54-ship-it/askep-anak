import PengkajianWizard from '@/components/PengkajianWizard';

export default function PengkajianPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 print:bg-white print:py-0">
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="text-center space-y-1 print:hidden">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Pengkajian Askep Anak
          </h1>
          <p className="text-sm text-gray-500">
            Progres tersimpan otomatis · Siap cetak PDF atau kirim WhatsApp
          </p>
        </header>

        <PengkajianWizard />
      </div>
    </main>
  );
}