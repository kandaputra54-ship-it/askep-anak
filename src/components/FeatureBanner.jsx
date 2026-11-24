import { Star, Play } from "lucide-react";

export default function FeatureBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="/mengasuh.jpg"
              alt="Kesehatan Anak"
              className="rounded-3xl w-full h-[400px] object-cover shadow-md"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <p className="text-xs text-gray-500 font-medium">Tenaga Keperawatan Profesional</p>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Kesehatan Anak, Prioritas Kami
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              Layanan keperawatan terdepan yang memberikan perawatan medis komprehensif, berfokus pada kebutuhan dan kesejahteraan setiap pasien anak. Tim ahli kami memberikan perawatan terbaik untuk hasil kesehatan yang optimal.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href="#hubungi" className="bg-[#2a9d8f] hover:bg-[#218276] text-white font-medium text-sm px-6 py-3 rounded-full transition flex items-center gap-2 shadow-sm">
                Hubungi Perawat &rarr;
              </a>

              <button className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition">
                  <Play className="w-4 h-4 fill-blue-600 ml-0.5" />
                </div>
                <span className="text-xs font-bold text-gray-800">Lihat Cara Kerja</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}