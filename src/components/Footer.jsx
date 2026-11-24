import { Phone, Mail, MapPin, Clock, Plus,Globe} from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="kontak"
      className="bg-[#0e3b36] text-white pt-16 pb-8 border-t border-teal-800/40"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/askep-anak.webp"
                alt="Askep Anak Logo"
                className="h-11 w-11 rounded-xl bg-white/95 p-1 object-contain shadow-sm"
              />
              <h3 className="text-base font-extrabold tracking-tight leading-snug">
                ASUHAN<br />
                KEPERAWATAN<br />
                ANAK
              </h3>
            </div>
            <p className="text-xs text-teal-100/70 leading-relaxed max-w-sm">
              Layanan informasi dan pengkajian keperawatan anak oleh tenaga perawat profesional. Kami hadir untuk membantu keluarga mengenal kesehatan si kecil lebih dini.
            </p>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-200">
              Layanan
            </h4>
            <ul className="space-y-2 text-xs text-teal-100/70">
              <li>
                <a href="#pengkajian" className="hover:text-white transition">
                  Pengkajian Keperawatan
                </a>
              </li>
              <li>
                <a href="#diagnosa" className="hover:text-white transition">
                  Diagnosa
                </a>
              </li>
              <li>
                <a href="#edukasi" className="hover:text-white transition">
                  Edukasi Keluarga
                </a>
              </li>
              <li>
                <a href="#konsultasi" className="hover:text-white transition">
                  Konsultasi Perawat
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-200">
              Navigasi
            </h4>
            <ul className="space-y-2 text-xs text-teal-100/70">
              <li>
                <a href="#about" className="hover:text-white transition">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-white transition">
                  Layanan
                </a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-white transition">
                  Kontak Kami
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#vision" className="hover:text-white transition">
                  Our Vision
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-200">
              Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-teal-100/70">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>021-845290</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span>www.akperberkala.ac.id</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Depok, Jawa Barat</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>9 AM – 5 PM</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="bg-[#0b2e2a] p-4 rounded-xl border border-teal-700/30 text-xs space-y-3 relative">
              <div className="absolute -top-3 right-4 p-1.5 bg-[#2a9d8f] rounded-full text-white">
                <Plus className="w-4 h-4" />
              </div>
              <div className="space-y-1.5 text-teal-100/80 border-b border-teal-800/50 pb-3">
                <div className="flex justify-between">
                  <span>Senin:</span> <span>08am – 12pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Selasa:</span> <span>01am – 5pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Rabu:</span> <span>Libur</span>
                </div>
                <div className="flex justify-between">
                  <span>Kamis:</span> <span>08am – 12pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Jumat:</span> <span>08am – 12pm</span>
                </div>
                <div className="flex justify-between text-teal-100/40">
                  <span>Sabtu – Minggu:</span> <span>Tutup</span>
                </div>
              </div>
              <a
                href="#pengkajian"
                className="block w-full text-center bg-[#2a9d8f] hover:bg-[#218276] text-white py-2 rounded-lg font-medium transition text-[11px]"
              >
                Isi Pengkajian &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Garis Pemisah & Copyright */}
        <div className="pt-6 border-t border-teal-800/40 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-teal-100/60">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <p>© 2026 Asuhan Keperawatan Anak. Hak Cipta Dilindungi.</p>
            <span className="hidden md:block text-teal-700">|</span>
            <p className="text-teal-200/80 font-medium">AKPER BWH 2026</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">
              Kebijakan Privasi
            </a>
            <a href="#" className="hover:text-white transition">
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}