"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo & Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <img
            src="/askep-anak.webp"
            alt="Askep Anak Logo"
            className="h-10 w-10 rounded-lg object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col">
            <span className="text-gray-900 font-bold text-lg leading-tight tracking-tight">
              Askep Anak
            </span>
            <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">
              Professional Care
            </span>
          </div>
        </a>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#layanan"
            className="text-sm font-semibold text-gray-600 hover:text-[#2a9d8f] transition-colors"
          >
            Layanan
          </a>
          <a
            href="#alur"
            className="text-sm font-semibold text-gray-600 hover:text-[#2a9d8f] transition-colors"
          >
            Alur Asuhan
          </a>
          <a
            href="#faq"
            className="text-sm font-semibold text-gray-600 hover:text-[#2a9d8f] transition-colors"
          >
            FAQ
          </a>
          <a
            href="#kontak"
            className="text-sm font-semibold text-gray-600 hover:text-[#2a9d8f] transition-colors"
          >
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900 transition"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 space-y-3 shadow-lg">
          <a
            href="#layanan"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-semibold text-gray-600 hover:text-[#2a9d8f]"
          >
            Layanan
          </a>
          <a
            href="#alur"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-semibold text-gray-600 hover:text-[#2a9d8f]"
          >
            Alur Asuhan
          </a>
          <a
            href="#faq"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-semibold text-gray-600 hover:text-[#2a9d8f]"
          >
            FAQ
          </a>
          <a
            href="#kontak"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-semibold text-gray-600 hover:text-[#2a9d8f]"
          >
            Kontak
          </a>
          <a
            href="/pengkajian"
            className="w-full flex justify-center bg-[#2a9d8f] hover:bg-[#218276] text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-all"
          >
            Mulai Pengkajian &rarr;
          </a>
        </div>
      )}
    </nav>
  );
}