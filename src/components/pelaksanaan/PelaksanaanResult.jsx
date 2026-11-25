"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Edit3,
  Printer,
  MessageCircle,
  FileWarning,
} from "lucide-react";
import WhatsAppModal from "@/components/shared/WhatsAppModal";

const STORAGE_KEY = "askep_anak_pelaksanaan";

export default function PelaksanaanResult() {
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWaModalOpen, setIsWaModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (err) {
        console.error("Gagal membaca pelaksanaan:", err);
      }
    }
    setIsLoaded(true);
  }, []);

  const formatTanggalIndo = (tglStr) => {
    if (!tglStr) return "-";
    try {
      const date = new Date(tglStr);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return tglStr;
    }
  };

  const formatHariTanggal = (tglStr) => {
    if (!tglStr) return "-";
    try {
      const date = new Date(tglStr);
      return date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return tglStr;
    }
  };

  const buildWhatsAppText = () => {
    if (!data) return "";
    const { pasien, mahasiswa, rows } = data;

    let text = `*D. PELAKSANAAN (CATATAN KEPERAWATAN ANAK)*\n\n`;
    text += `*Identitas Klien:*\n`;
    text += `• Nama Klien / Umur : ${pasien.namaKlien || "-"} / ${pasien.umur || "-"}\n`;
    text += `• No. Kamar / Ruang : ${pasien.noKamarRuang || "-"}\n\n`;

    rows.forEach((row) => {
      text += `*${formatHariTanggal(row.tanggal)} • Pukul ${row.waktu || "-"} WIB (Dx: ${row.noDx || "-"})*\n`;
      text += `${row.tindakanHasil || "-"}\n`;
      text += `_Pelaksana: ${row.namaPerawat || mahasiswa?.namaMhs || "-"}_\n`;
      text += `-----------------------------------\n`;
    });

    if (mahasiswa?.isMahasiswa) {
      text += `\n*Mahasiswa Praktikan:*\n`;
      text += `• Nama : ${mahasiswa.namaMhs || "-"}\n`;
      text += `• NIM  : ${mahasiswa.nim || "-"}\n`;
      text += `• Ruang/Tgl : ${mahasiswa.ruang || "-"} (${formatTanggalIndo(mahasiswa.tgl)})\n`;
    }

    return text;
  };

  if (!isLoaded) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-500">
        Memuat dokumen Pelaksanaan (Catatan Keperawatan)...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center max-w-lg mx-auto">
        <FileWarning className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-900">
          Belum Ada Catatan Keperawatan Tersimpan
        </h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          Silakan isi formulir Pelaksanaan (Catatan Keperawatan) terlebih dahulu untuk melihat pratinjau cetak atau mengirim via WhatsApp.
        </p>
        <Link
          href="/pelaksanaan"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition"
        >
          <Edit3 className="w-4 h-4" />
          Isi Form Pelaksanaan
        </Link>
      </div>
    );
  }

  const { pasien, mahasiswa, rows } = data;

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="print:hidden bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/pelaksanaan"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            <Edit3 className="w-4 h-4" />
            Edit Form
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Alur Askep
          </Link>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsWaModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            Kirim ke WhatsApp
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print / Simpan PDF
          </button>
        </div>
      </div>

      {/* Area Lembar Dokumen Resmi */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10 print:border-none print:shadow-none print:p-0 text-slate-900">
        {/* Kop Dokumen */}
        <div className="border-b-2 border-slate-800 pb-3 mb-6">
          <h1 className="text-lg sm:text-xl font-bold uppercase tracking-wide">
            D. PELAKSANAAN (CATATAN KEPERAWATAN)
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Asuhan Keperawatan Anak
          </p>
        </div>

        {/* Grid Info Klien & Mahasiswa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 text-sm">
          <div className="space-y-1.5">
            <div className="grid grid-cols-[150px_10px_1fr]">
              <span className="font-semibold">Nama Klien / Umur</span>
              <span>:</span>
              <span>
                {pasien.namaKlien || "-"} / {pasien.umur || "-"}
              </span>
            </div>
            <div className="grid grid-cols-[150px_10px_1fr]">
              <span className="font-semibold">No. Kamar / Ruang</span>
              <span>:</span>
              <span>{pasien.noKamarRuang || "-"}</span>
            </div>
          </div>

          {mahasiswa?.isMahasiswa && (
            <div className="space-y-1.5 sm:border-l sm:border-slate-300 sm:pl-6">
              <div className="grid grid-cols-[130px_10px_1fr]">
                <span className="font-semibold">Nama Mahasiswa</span>
                <span>:</span>
                <span>{mahasiswa.namaMhs || "-"}</span>
              </div>
              <div className="grid grid-cols-[130px_10px_1fr]">
                <span className="font-semibold">NIM</span>
                <span>:</span>
                <span>{mahasiswa.nim || "-"}</span>
              </div>
              <div className="grid grid-cols-[130px_10px_1fr]">
                <span className="font-semibold">Ruang / Tanggal</span>
                <span>:</span>
                <span>
                  {mahasiswa.ruang || "-"} / {formatTanggalIndo(mahasiswa.tgl)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Tabel Resmi Bagian D: Hari, Tanggal, Waktu | No. Dx. | Tindakan Keperawatan dan Hasil | Paraf dan Nama jelas */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-800 text-sm">
            <thead>
              <tr className="bg-slate-100 print:bg-slate-100">
                <th className="border border-slate-800 px-3 py-2.5 text-center font-bold w-40">
                  Hari, Tanggal, Waktu
                </th>
                <th className="border border-slate-800 px-2.5 py-2.5 text-center font-bold w-20">
                  No. Dx.
                </th>
                <th className="border border-slate-800 px-4 py-2.5 text-center font-bold">
                  Tindakan Keperawatan dan Hasil
                </th>
                <th className="border border-slate-800 px-3 py-2.5 text-center font-bold w-36">
                  Paraf dan Nama jelas
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="align-top">
                  <td className="border border-slate-800 px-3 py-3 text-center">
                    <div className="font-medium">
                      {formatHariTanggal(row.tanggal)}
                    </div>
                    {row.waktu && (
                      <div className="text-xs text-slate-600 mt-1">
                        Pukul {row.waktu} WIB
                      </div>
                    )}
                  </td>
                  <td className="border border-slate-800 px-2.5 py-3 text-center font-semibold">
                    {row.noDx || "-"}
                  </td>
                  <td className="border border-slate-800 px-4 py-3 whitespace-pre-line leading-relaxed">
                    {row.tindakanHasil || "-"}
                  </td>
                  <td className="border border-slate-800 px-3 py-3 text-center">
                    <div className="h-10" />
                    <span className="text-xs font-medium">
                      {row.namaPerawat || mahasiswa?.namaMhs || "-"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Blok Tanda Tangan Mahasiswa */}
        {mahasiswa?.isMahasiswa && (
          <div className="mt-10 flex justify-end">
            <div className="w-64 text-center text-sm">
              <p>
                {mahasiswa.ruang || "Ruang Perawatan"},{" "}
                {formatTanggalIndo(mahasiswa.tgl)}
              </p>
              <p className="mt-1">Mahasiswa Praktikan,</p>
              <div className="h-16" />
              <p className="font-bold underline">
                {mahasiswa.namaMhs || "(....................................)"}
              </p>
              <p className="text-xs mt-0.5">NIM. {mahasiswa.nim || "-"}</p>
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Modal */}
      <WhatsAppModal
        isOpen={isWaModalOpen}
        onClose={() => setIsWaModalOpen(false)}
        messageText={buildWhatsAppText()}
        title="Kirim Catatan Keperawatan via WhatsApp"
      />
    </div>
  );
}