"use client";

import Link from "next/link";
import { ArrowDown, ClipboardCheck } from "lucide-react";

export default function Hero() {
  const handleScrollToLayanan = (e) => {
    e.preventDefault();
    const el = document.getElementById("layanan");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-900 pt-20">
      {/* Background Image */}
      <img
        src="/hero-bg.webp"
        alt="Asuhan Keperawatan Anak"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay Gradient Gelap */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/70 to-transparent pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 w-full z-10">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            Asuhan Keperawatan Anak Terpadu.
          </h1>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg font-light">
            Dokumentasi keperawatan anak sistematis mulai dari pengkajian, analisa data, diagnosa, intervensi, implementasi, hingga evaluasi SOAP siap cetak PDF.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#layanan"
              onClick={handleScrollToLayanan}
              className="bg-[#2a9d8f] hover:bg-[#218276] text-white font-semibold text-sm px-8 py-4 rounded-lg transition-all duration-300 shadow-lg shadow-teal-900/20 flex items-center gap-2 group cursor-pointer"
            >
              Mulai Pengkajian
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>

          
          </div>
        </div>
      </div>
    </section>
  );
}