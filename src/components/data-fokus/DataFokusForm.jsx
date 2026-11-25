"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2, Save, Eye, UserCheck, FileText } from "lucide-react";
import IdentitasMahasiswa from "@/components/shared/IdentitasMahasiswa";

const STORAGE_KEY = "askep_anak_data_fokus";

export default function DataFokusForm() {
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
      dataSubyektif: "",
      dataObyektif: "",
    },
  ]);

  // Load tersimpan & set tanggal aman di sisi client (menghindari error SSR Next.js)
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
    const nextId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
    setRows((prev) => [
      ...prev,
      { id: nextId, dataSubyektif: "", dataObyektif: "" },
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
    router.push("/data-fokus/hasil");
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            9. Data Fokus (Cp.1.A)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Pengelompokan data subyektif (keluhan klien/keluarga) dan data obyektif (hasil pemeriksaan) pasien anak.
          </p>
        </div>
        <Link
          href="/data-fokus/hasil"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition shrink-0"
        >
          <Eye className="w-4 h-4" />
          Lihat Hasil Tersimpan
        </Link>
      </div>

      {/* Identitas Mahasiswa (Shared Component) */}
      <IdentitasMahasiswa data={mahasiswa} onChange={setMahasiswa} />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identitas Singkat Klien (Sesuai Header Cp.1.A) */}
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

        {/* Tabel Input Data Subyektif & Obyektif */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-800">
                Pengelompokan Data Fokus
              </h2>
            </div>
            <span className="text-xs font-medium text-slate-500">
              Total {rows.length} Kelompok Data
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
                    Kelompok Data #{index + 1}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Data Subyektif (DS)
                    </label>
                    <textarea
                      rows={5}
                      placeholder={
                        "Contoh:\n- Ibu klien mengatakan anak demam sejak 3 hari yang lalu\n- Ibu klien mengatakan anak rewel dan nafsu makan menurun"
                      }
                      value={row.dataSubyektif}
                      onChange={(e) =>
                        handleRowChange(row.id, "dataSubyektif", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Data Obyektif (DO)
                    </label>
                    <textarea
                      rows={5}
                      placeholder={
                        "Contoh:\n- S: 38,6 °C, N: 118 x/mnt, RR: 28 x/mnt\n- Mukosa bibir tampak kering, akral teraba hangat\n- Porsi makan hanya habis 1/4 porsi"
                      }
                      value={row.dataObyektif}
                      onChange={(e) =>
                        handleRowChange(row.id, "dataObyektif", e.target.value)
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
              Tambah Baris Data Fokus
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Simpan & Lihat Lembar Cp.1.A
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}