"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2, Save, Eye, UserCheck, ListChecks } from "lucide-react";
import IdentitasMahasiswa from "@/components/shared/IdentitasMahasiswa";

const STORAGE_KEY = "askep_anak_rencana";

export default function RencanaForm() {
  const router = useRouter();

  const [mahasiswa, setMahasiswa] = useState({
    isMahasiswa: true,
    namaMhs: "",
    nim: "",
    ruang: "",
    tgl: "",
  });

  const [pasien, setPasien] = useState({
    namaKlien: "",
    umur: "",
    noKamarRuang: "",
  });

  const [rows, setRows] = useState([
    {
      id: 1,
      tanggal: "",
      diagnosaPes: "",
      tujuanKriteria: "",
      rencanaTindakan: "",
      namaPerawat: "",
    },
  ]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.mahasiswa) {
          setMahasiswa({
            ...parsed.mahasiswa,
            tgl: parsed.mahasiswa.tgl || today,
          });
        }
        if (parsed.pasien) setPasien(parsed.pasien);
        if (parsed.rows && parsed.rows.length > 0) setRows(parsed.rows);
      } catch (err) {
        console.error("Gagal memuat data tersimpan:", err);
      }
    } else {
      setMahasiswa((prev) => ({ ...prev, tgl: today }));
      setRows((prev) =>
        prev.map((r) => ({ ...r, tanggal: r.tanggal || today }))
      );
    }
  }, []);

  const handlePasienChange = (field, value) => {
    setPasien((prev) => ({ ...prev, [field]: value }));
  };

  const handleRowChange = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const addRow = () => {
    const today = new Date().toISOString().split("T")[0];
    const nextId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
    setRows((prev) => [
      ...prev,
      {
        id: nextId,
        tanggal: today,
        diagnosaPes: "",
        tujuanKriteria: "",
        rencanaTindakan: "",
        namaPerawat: mahasiswa.namaMhs || "",
      },
    ]);
  };

  const removeRow = (id) => {
    if (rows.length <= 1) return;
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      mahasiswa,
      pasien,
      rows,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    router.push("/rencana/hasil");
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            C. Rencana Keperawatan
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Meliputi tindakan keperawatan independen dan interdependen yang disusun berdasarkan prioritas diagnosa (PES).
          </p>
        </div>
        <Link
          href="/rencana/hasil"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition shrink-0"
        >
          <Eye className="w-4 h-4" />
          Lihat Hasil Tersimpan
        </Link>
      </div>

      {/* Identitas Mahasiswa */}
      <IdentitasMahasiswa data={mahasiswa} onChange={setMahasiswa} />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identitas Singkat Klien */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <UserCheck className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-800">
              Identitas Klien
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Klien (Inisial) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: An. R"
                value={pasien.namaKlien}
                onChange={(e) => handlePasienChange("namaKlien", e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Umur <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: 3 Tahun 4 Bulan"
                value={pasien.umur}
                onChange={(e) => handlePasienChange("umur", e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                No. Kamar / Ruang <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: R. Melati / Kamar 04"
                value={pasien.noKamarRuang}
                onChange={(e) =>
                  handlePasienChange("noKamarRuang", e.target.value)
                }
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Repeater Rencana Keperawatan */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-800">
                Rencana Asuhan Keperawatan (Berdasarkan Prioritas)
              </h2>
            </div>
            <span className="text-xs font-medium text-slate-500">
              Total {rows.length} Rencana
            </span>
          </div>

          <div className="space-y-4">
            {rows.map((row, index) => (
              <div
                key={row.id}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 hover:border-blue-200 transition space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    Rencana Prioritas #{index + 1}
                  </span>
                  {rows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRow(row.id)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-700 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Hapus
                    </button>
                  )}
                </div>

                {/* Baris 1: Tanggal & Paraf/Nama */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tanggal <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={row.tanggal}
                      onChange={(e) =>
                        handleRowChange(row.id, "tanggal", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Paraf dan Nama Jelas
                    </label>
                    <input
                      type="text"
                      placeholder={
                        mahasiswa.namaMhs || "Nama perawat / mahasiswa"
                      }
                      value={row.namaPerawat}
                      onChange={(e) =>
                        handleRowChange(row.id, "namaPerawat", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Baris 2: Diagnosa Keperawatan (PES) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Diagnosa Keperawatan (PES) — Berdasarkan Prioritas{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Contoh: Hipertermia (P) berhubungan dengan proses infeksi (E) dibuktikan dengan suhu tubuh 38,8°C, kulit kemerahan dan teraba hangat (S)."
                    value={row.diagnosaPes}
                    onChange={(e) =>
                      handleRowChange(row.id, "diagnosaPes", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Baris 3: Tujuan & Kriteria Hasil + Rencana Tindakan */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tujuan dan Kriteria Hasil (SLKI){" "}
                      <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={6}
                      required
                      placeholder={
                        "Contoh:\nSetelah dilakukan intervensi keperawatan selama 3x24 jam, diharapkan Termoregulasi membaik dengan kriteria hasil:\n1. Suhu tubuh membaik (36,5°C - 37,5°C)\n2. Suhu kulit membaik\n3. Kulit merah menurun"
                      }
                      value={row.tujuanKriteria}
                      onChange={(e) =>
                        handleRowChange(row.id, "tujuanKriteria", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Rencana Tindakan (Independen &amp; Interdependen / SIKI){" "}
                      <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={6}
                      required
                      placeholder={
                        "Contoh (Manajemen Hipertermia):\nObservasi:\n1. Identifikasi penyebab hipertermia\n2. Monitor suhu tubuh secara berkala\nTerapeutik:\n3. Longgarkan atau lepaskan pakaian\n4. Berikan kompres hangat pada lipatan tubuh\nEdukasi:\n5. Anjurkan tirah baring & perbanyak cairan oral\nKolaborasi:\n6. Kolaborasi pemberian antipiretik sesuai indikasi"
                      }
                      value={row.rencanaTindakan}
                      onChange={(e) =>
                        handleRowChange(
                          row.id,
                          "rencanaTindakan",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tombol Tambah & Simpan */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={addRow}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Tambah Rencana Keperawatan
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Simpan &amp; Lihat Lembar Rencana
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}