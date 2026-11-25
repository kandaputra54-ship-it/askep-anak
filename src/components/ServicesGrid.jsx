import Link from "next/link";
import {
  ClipboardCheck,
  ClipboardList,
  GitMerge,
  Stethoscope,
  ListChecks,
  Activity,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const ASKEP_MODULES = [
  {
    code: "Bagian A",
    title: "Pengkajian keperawatan",
    description:
      "Data biografi klien dan orang tua, riwayat kelahiran dan tumbuh kembang, pola hidup, serta pemeriksaan fisik fungsional.",
    href: "/pengkajian",
    icon: ClipboardCheck,
  },
  {
    code: "Cp.1.A",
    title: "Data fokus",
    description:
      "Pengelompokan data subyektif (keluhan klien/keluarga) dan data obyektif (hasil pemeriksaan fisik dan diagnostik).",
    href: "/data-fokus",
    icon: ClipboardList,
  },
  {
    code: "Cp.1-B",
    title: "Analisa data",
    description:
      "Sintesis data subyektif dan obyektif untuk merumuskan masalah keperawatan beserta etiologinya.",
    href: "/analisa-data",
    icon: GitMerge,
  },
  {
    code: "Bagian B",
    title: "Diagnosa keperawatan",
    description:
      "Daftar diagnosa (PES/SDKI) berdasarkan prioritas masalah, lengkap dengan tanggal ditemukan dan teratasi.",
    href: "/diagnosa",
    icon: Stethoscope,
  },
  {
    code: "Bagian C",
    title: "Rencana asuhan",
    description:
      "Tujuan, kriteria hasil, serta rencana tindakan independen dan interdependen sesuai prioritas.",
    href: "/rencana",
    icon: ListChecks,
  },
  {
    code: "Bagian D",
    title: "Pelaksanaan dan catatan",
    description:
      "Implementasi tindakan berdasarkan hari, tanggal, waktu, nomor diagnosa, dan respon klien.",
    href: "/pelaksanaan",
    icon: Activity,
  },
  {
    code: "Bagian E",
    title: "Evaluasi (SOAP)",
    description:
      "Evaluasi hasil asuhan dalam format subyektif, obyektif, analisa, dan planning yang mengacu pada tujuan.",
    href: "/evaluasi",
    icon: CheckCircle2,
  },
];

export default function ServicesGrid() {
  return (
    <section id="layanan" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
              Asuhan keperawatan anak
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Isi formulir secara berurutan dari pengkajian sampai evaluasi.
              Setiap tahap dapat dicetak sebagai PDF.
            </p>
          </div>

          <Link
            href="/pengkajian"
            className="inline-flex shrink-0 items-center justify-center rounded-md bg-[#1f7a6f] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#176158] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f7a6f]"
          >
            Mulai pengkajian
          </Link>
        </div>

        <ol className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
          {ASKEP_MODULES.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-start gap-4 px-2 py-5 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1f7a6f] md:gap-5 md:px-4"
                >
                  <span
                    className="w-5 pt-0.5 text-sm tabular-nums text-gray-400"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>

                  <Icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#2a9d8f]"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                      <h3 className="text-base font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                        {item.title}
                      </h3>
                      <span className="text-xs text-gray-500">{item.code}</span>
                    </div>
                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                  </div>

                  <ChevronRight
                    className="mt-0.5 h-5 w-5 shrink-0 text-gray-300 transition-colors group-hover:text-gray-600"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}