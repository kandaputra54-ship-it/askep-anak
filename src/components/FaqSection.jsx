"use client";

import { useState } from "react";
import { Check, Plus, Minus } from "lucide-react";
import { faqs } from "@/lib/data/faqs";

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
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
  );
}