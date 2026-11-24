import { Brain, Baby, Microscope, Syringe } from "lucide-react";

export default function ServicesGrid() {
  return (
    <section id="layanan" className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="inline-block border border-[#2a9d8f] text-[#2a9d8f] text-xs font-semibold px-4 py-1 rounded-full mb-3">
          Services
        </span>

        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
          Layanan Asuhan Keperawatan
        </h2>
        <p className="text-xs text-gray-500 tracking-wider uppercase mb-12">
          Layanan Kami
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-teal-50/40 p-8 rounded-2xl flex flex-col items-center text-center space-y-4 hover:shadow-md transition">
            <div className="p-3 bg-teal-100/50 rounded-full text-[#2a9d8f]">
              <Brain className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Pengkajian Keperawatan</h3>
            <p className="text-xs text-gray-500 leading-relaxed flex-1">
              Data biografi, riwayat kesehatan anak & keluarga, pola hidup, hingga pemeriksaan fisik fungsional
            </p>
            <a href="#details" className="text-xs font-semibold text-gray-800 hover:text-[#2a9d8f] transition flex items-center gap-1">
              Details &rarr;
            </a>
          </div>

          <div className="bg-teal-50/40 p-8 rounded-2xl flex flex-col items-center text-center space-y-4 hover:shadow-md transition">
            <div className="p-3 bg-teal-100/50 rounded-full text-[#2a9d8f]">
              <Baby className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Diagnosa Keperawatan</h3>
            <p className="text-xs text-gray-500 leading-relaxed flex-1">
              Identifikasi masalah dan penentuan prioritas asuhan berdasarkan hasil pengkajian
            </p>
            <a href="#details" className="text-xs font-semibold text-gray-800 hover:text-[#2a9d8f] transition flex items-center gap-1">
              Details &rarr;
            </a>
          </div>

          <div className="bg-teal-50/40 p-8 rounded-2xl flex flex-col items-center text-center space-y-4 hover:shadow-md transition">
            <div className="p-3 bg-teal-100/50 rounded-full text-[#2a9d8f]">
              <Microscope className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Rencana Asuhan</h3>
            <p className="text-xs text-gray-500 leading-relaxed flex-1">
              Penyusunan tindakan keperawatan independen dan kolaborasi yang tepat sasaran
            </p>
            <a href="#details" className="text-xs font-semibold text-gray-800 hover:text-[#2a9d8f] transition flex items-center gap-1">
              Details &rarr;
            </a>
          </div>

          <div className="bg-teal-50/40 p-8 rounded-2xl flex flex-col items-center text-center space-y-4 hover:shadow-md transition">
            <div className="p-3 bg-teal-100/50 rounded-full text-[#2a9d8f]">
              <Syringe className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Pelaksanaan & Catatan</h3>
            <p className="text-xs text-gray-500 leading-relaxed flex-1">
              Dokumentasi tindakan keperawatan dan respons klien secara sistematis
            </p>
            <a href="#details" className="text-xs font-semibold text-gray-800 hover:text-[#2a9d8f] transition flex items-center gap-1">
              Details &rarr;
            </a>
          </div>
        </div>

        <a href="#format" className="inline-flex items-center gap-2 bg-[#2a9d8f] hover:bg-[#218276] text-white font-medium text-xs px-6 py-3 rounded-full transition shadow-sm">
          Lihat Format Pengkajian &rarr;
        </a>
      </div>
    </section>
  );
}