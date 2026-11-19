"use client";

import { useState } from "react";
import { BriefcaseMedical, Microscope, Stethoscope, Star, Play, Brain, Baby, Syringe, Check, Plus, Minus, Phone, Mail, MapPin, Clock, } from "lucide-react";
import { faqs } from "@/lib/data/faqs";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main>

      {/* 0. NAVBAR SECTION */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="text-[#2a9d8f] group-hover:scale-105 transition-transform duration-300">
              <Stethoscope className="w-7 h-7" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 font-bold text-lg leading-tight tracking-tight">Askep Anak</span>
              <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">Professional Care</span>
            </div>
          </a>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#layanan" className="text-sm font-semibold text-gray-600 hover:text-[#2a9d8f] transition-colors">
              Layanan
            </a>
            <a href="#alur" className="text-sm font-semibold text-gray-600 hover:text-[#2a9d8f] transition-colors">
              Alur Asuhan
            </a>
            <a href="#faq" className="text-sm font-semibold text-gray-600 hover:text-[#2a9d8f] transition-colors">
              FAQ
            </a>
            <a href="#kontak" className="text-sm font-semibold text-gray-600 hover:text-[#2a9d8f] transition-colors">
              Kontak
            </a>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <a
              href="/pengkajian"
              className="hidden md:flex bg-[#2a9d8f] hover:bg-[#218276] text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-all duration-300 shadow-sm shadow-teal-900/10 items-center gap-2 group"
            >
              Mulai Pengkajian
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </a>

            {/* Mobile Menu Button (Opsional jika pakai React State) */}
            <button className="md:hidden text-gray-600 hover:text-gray-900 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-900 pt-20">
        {/* Background Image */}
        <img
          src="/hero-bg.webp"
          alt="Asuhan Keperawatan Anak"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Overlay Gradient Gelap (Kiri ke Kanan) - Membuat teks tegas tanpa menutupi gambar */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/70 to-transparent pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full z-10">
          <div className="max-w-2xl space-y-6">



            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Asuhan Keperawatan Anak Terpadu.
            </h1>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg font-light">
              Layanan keperawatan profesional kini hadir di wilayah Anda. Kami siap membantu kesehatan keluarga Anda khususnya si kecil.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="/pengkajian"
                className="bg-[#2a9d8f] hover:bg-[#218276] text-white font-semibold text-sm px-8 py-4 rounded-lg transition-all duration-300 shadow-lg shadow-teal-900/20 flex items-center gap-2 group"
              >
                Mulai Pengkajian
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </a>
              <a
                href="#layanan"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 font-semibold text-sm px-8 py-4 rounded-lg transition-all duration-300 flex items-center gap-2 group"
              >
                Lihat Layanan
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRIPLE CARDS SECTION */}
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

      {/* 3. FEATURE BANNER SECTION */}
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

      {/* 4. SERVICES GRID SECTION */}
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

      {/* 5. CTA BANNER */}
      <section
        className="relative py-24 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/anak.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-wide">
            Butuh Asuhan Keperawatan Anak?
          </h2>
          <div>
            <a href="#hubungi" className="inline-flex items-center gap-2 bg-[#2a9d8f] hover:bg-[#218276] text-white font-medium text-xs px-6 py-2.5 rounded-full transition shadow-sm">
              Hubungi Perawat &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block border border-[#2a9d8f] text-[#2a9d8f] text-xs font-semibold px-4 py-1 rounded-full">
                Informasi Kesehatan
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
                Pertanyaan Yang Sering Diajukan
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                Temukan jawaban atas pertanyaan umum seputar layanan asuhan keperawatan anak dan panduan pengisian pengkajian kesehatan keluarga.
              </p>

              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2a9d8f]" />
                  <span>Pengkajian sesuai format keperawatan anak</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2a9d8f]" />
                  <span>Kerahasiaan data keluarga terjaga</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2a9d8f]" />
                  <span>Hasil dapat diunduh & dibagikan via WhatsApp</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2a9d8f]" />
                  <span>Dibimbing tenaga perawat profesional</span>
                </li>
              </ul>

              <div className="pt-2">
                <a href="#ask" className="inline-flex items-center gap-2 bg-[#2a9d8f] hover:bg-[#218276] text-white font-medium text-xs px-5 py-2.5 rounded-full transition">
                  Ajukan Pertanyaan
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 divide-y divide-gray-100">
              {faqs.map((faq, i) => (
                <div key={i} className="py-4">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between text-left font-bold text-xs md:text-sm text-gray-900 gap-4 py-1"
                  >
                    <span>{faq.q}</span>
                    <span className="p-1 rounded-full bg-[#2a9d8f] text-white shrink-0">
                      {openFaq === i ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    </span>
                  </button>
                  {openFaq === i && (
                    <p className="mt-2 text-xs text-gray-500 leading-relaxed pr-8">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALL US BANNER */}
      <section
        className="relative py-16 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/callcenter.webp')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
          <div className="text-white space-y-1">
            <p className="text-xs text-gray-300 font-medium">24/7 Customer Support Services</p>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-wide">
              Call Us : + 62 821-2917-5626
            </h3>
          </div>
          <a href="#hubungi" className="bg-[#2a9d8f] hover:bg-[#218276] text-white font-medium text-xs px-6 py-3 rounded-full transition shadow-sm">
            Hubungi Perawat &rarr;
          </a>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-[#0e3b36] text-white pt-16 pb-8 border-t border-teal-800/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
            <div className="md:col-span-4 space-y-4">
              <h3 className="text-lg font-extrabold tracking-tight leading-snug">
                ASUHAN<br />
                KEPERAWATAN<br />
                ANAK
              </h3>
              <p className="text-xs text-teal-100/70 leading-relaxed max-w-sm">
                Layanan informasi dan pengkajian keperawatan anak oleh tenaga perawat profesional. Kami hadir untuk membantu keluarga mengenal kesehatan si kecil lebih dini.
              </p>
            </div>

            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-200">Layanan</h4>
              <ul className="space-y-2 text-xs text-teal-100/70">
                <li><a href="#pengkajian" className="hover:text-white transition">Pengkajian Keperawatan</a></li>
                <li><a href="#diagnosa" className="hover:text-white transition">Diagnosa</a></li>
                <li><a href="#edukasi" className="hover:text-white transition">Edukasi Keluarga</a></li>
                <li><a href="#konsultasi" className="hover:text-white transition">Konsultasi Perawat</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-200">Navigasi</h4>
              <ul className="space-y-2 text-xs text-teal-100/70">
                <li><a href="#about" className="hover:text-white transition">Tentang Kami</a></li>
                <li><a href="#layanan" className="hover:text-white transition">Layanan</a></li>
                <li><a href="#kontak" className="hover:text-white transition">Kontak Kami</a></li>
                <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#vision" className="hover:text-white transition">Our Vision</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-200">Contact</h4>
              <ul className="space-y-2.5 text-xs text-teal-100/70">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>+62 821-2917-5626</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>support@example.com</span>
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
                  <div className="flex justify-between"><span>Senin:</span> <span>08am – 12pm</span></div>
                  <div className="flex justify-between"><span>Selasa:</span> <span>01am – 5pm</span></div>
                  <div className="flex justify-between"><span>Rabu:</span> <span>Libur</span></div>
                  <div className="flex justify-between"><span>Kamis:</span> <span>08am – 12pm</span></div>
                  <div className="flex justify-between"><span>Jumat:</span> <span>08am – 12pm</span></div>
                  <div className="flex justify-between text-teal-100/40"><span>Sabtu – Minggu:</span> <span>Tutup</span></div>
                </div>
                <a href="#pengkajian" className="block w-full text-center bg-[#2a9d8f] hover:bg-[#218276] text-white py-2 rounded-lg font-medium transition text-[11px]">
                  Isi Pengkajian &rarr;
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-teal-800/40 flex flex-wrap justify-between items-center text-[11px] text-teal-100/50">
            <p>Copyright Asuhan Keperawatan Anak</p>
          </div>
        </div>
      </footer>
    </main>
  );
}