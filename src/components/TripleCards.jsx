import { BriefcaseMedical, Microscope, Stethoscope } from "lucide-react";

export default function TripleCards() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-teal-50 rounded-full text-[#2a9d8f] shrink-0">
              <BriefcaseMedical className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 text-base">Pengkajian Keperawatan Anak</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Asesmen menyeluruh: riwayat kesehatan, tumbuh kembang, pola hidup, hingga pemeriksaan fisik fungsional
              </p>
              <a href="#details" className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-[#2a9d8f] pt-1 transition">
                Details &rarr;
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-teal-50 rounded-full text-[#2a9d8f] shrink-0">
              <Microscope className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 text-base">Pengkajian Kesehatan Keluarga</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Informasi gizi, imunisasi, kebersihan, dan stimulasi tumbuh kembang anak
              </p>
              <a href="#details" className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-[#2a9d8f] pt-1 transition">
                Details &rarr;
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-teal-50 rounded-full text-[#2a9d8f] shrink-0">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 text-base">Konsultasi dengan Perawat</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Diskusikan kondisi si kecil dengan perawat profesional
              </p>
              <a href="#details" className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-[#2a9d8f] pt-1 transition">
                Details &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}