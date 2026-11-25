"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import IdentitasMahasiswa from "@/components/shared/IdentitasMahasiswa";

const STORAGE_KEY = "askep_anak_pengkajian";

const STEPS = [
  { id: 1, label: "1. Biografi & Resume" },
  { id: 2, label: "2. Riwayat Lahir & Tumbuh" },
  { id: 3, label: "3. Kebiasaan & Keluarga" },
  { id: 4, label: "4. Lingkungan & Penyakit" },
  { id: 5, label: "5. Fisik Fungsional (DS/DO)" },
  { id: 6, label: "6. Hospitalisasi & Terapi" },
];

const INITIAL_FORM = {
  // Header Administrasi
  tglPengkajian: "",
  jamPengkajian: "",
  tglMasukRs: "",
  jamMasukRs: "",
  ruang: "",
  noRegister: "",
  diagnosaMedis: "",

  // A.1.a Identitas Klien
  namaKlien: "",
  namaPanggil: "",
  ttlUmur: "",
  jenisKelamin: "",
  agama: "",
  sukuBangsa: "",
  pendidikanKlien: "",
  bahasaDigunakan: "",

  // A.1.b Identitas Orang Tua / Wali
  ibu: {
    nama: "",
    usia: "",
    pendidikan: "",
    pekerjaan: "",
    agama: "",
    sukuBangsa: "",
  },
  ayah: {
    nama: "",
    usia: "",
    pendidikan: "",
    pekerjaan: "",
    agama: "",
    sukuBangsa: "",
  },
  wali: {
    nama: "",
    usia: "",
    pendidikan: "",
    pekerjaan: "",
    agama: "",
    sukuBangsa: "",
  },
  alamatRumah: "",

  // A.2 Resume
  resume: "",

  // A.3.a Riwayat Kehamilan & Kelahiran
  antenatal: {
    hiperemesis: "Tidak",
    perdarahan: "Tidak",
    anemia: "Tidak",
    penyakitInfeksi: "Tidak",
    preeklamsi: "Tidak",
    gangguanLain: "",
    periksaTeratur: "Ya",
    diperiksaOleh: "",
    tempatPeriksa: "",
    hasilPeriksa: "",
    imunisasiTt: "",
    riwayatObatHamil: "",
  },
  natal: {
    usiaKehamilan: "",
    caraPersalinan: "Normal",
    ditolongOleh: "",
    keadaanSaatLahir: "",
    bbPbLkLahir: "",
    pengobatanLahir: "",
  },
  neonatal: {
    cacatKongenital: "Tidak",
    ikterus: "Tidak",
    kejang: "Tidak",
    paralisis: "Tidak",
    perdarahan: "Tidak",
    traumaPersalinan: "Tidak",
    penurunanBb: "",
    pemberianMinumAsi: "",
    lainLain: "",
  },

  // A.3.b - A.3.i Riwayat Masa Lalu
  riwayatTumbuhKembang: "",
  penyakitPernahDiderita: "",
  pernahDirawatRs: "",
  obatObat: "",
  tindakanOperasi: "",
  alergi: "",
  kecelakaan: "",
  imunisasi: "",

  // A.3.j Kebiasaan Sehari-hari
  kebiasaan: {
    // 1) Nutrisi
    asiLama: "",
    asiWaktu: "",
    susuBuatanJenis: "",
    susuKesulitan: "",
    padatMulai: "",
    padatCara: "",
    vitaminJenis: "",
    vitaminLama: "",
    frekuensiMakan: "",
    jenisMakanan: "",
    makananDisenangi: "",
    alergiMakanan: "",
    kebiasaanMakan: "",
    waktuMakan: "",
    jumlahMinum: "",
    frekuensiMinum: "",
    kebiasaanMinumKopi: "",
    // 2) Tidur
    lamaTidurSiangMalam: "",
    kelainanTidur: "",
    kebiasaanMenjelangTidur: "",
    kebiasaanNyamanTidur: "",
    // 3) Aktivitas
    polaAktivitasBermain: "",
    // 4) Kebersihan diri
    mandiFrek: "",
    mandiSabun: "Ya",
    mandiBantuan: "Tidak",
    mandiOleh: "",
    oralFrek: "",
    oralWaktu: "",
    oralCara: "Sendiri",
    oralPastaGigi: "Ya",
    cuciRambutFrek: "",
    cuciRambutCara: "Sendiri",
    berpakaianCara: "Sendiri",
    // 5) Eliminasi
    babFrek: "",
    babWaktu: "",
    babWarna: "",
    babBau: "",
    babKonsistensi: "",
    babCara: "",
    babKeluhan: "",
    babLaxatif: "",
    babKebiasaan: "",
    bakFrek: "",
    bakWarna: "",
    bakKeluhan: "",
    bakNgompol: "",
    // 6) Kebiasaan lain & 7) Pola asuh
    kebiasaanLain: "",
    polaAsuh: "",
  },

  // A.4 Riwayat Kesehatan Keluarga
  susunanKeluargaGenogram: "",
  riwayatKeluarga: {
    pernahAyahIbu: "",
    pernahSaudara: "",
    pernahLain: "",
    sedangAyahIbu: "",
    sedangSaudara: "",
    sedangLain: "",
    analisaAyahIbu: "",
    analisaSaudara: "",
    analisaLain: "",
  },
  copingKeluarga: "",
  sistemNilai: "",
  spiritual: "",

  // A.5 Riwayat Kesehatan Lingkungan
  bahayaRumah: "",
  bahayaLingkungan: "",
  polusiBahaya: "",
  tempatBermain: "",

  // A.6.a Riwayat Penyakit Sekarang
  tglMulaiSakit: "",
  keluhanUtama: "",
  terjadinya: "",
  lamanya: "",
  faktorPencetus: "",
  upayaMengurangi: "",
  caraMasukPukul: "",
  dikirimOleh: "Dokter",

  // A.6.b Pengkajian Fisik Fungsional (DS vs DO)
  fisik: {
    // 1) Data Klinik (DO)
    suhu: "",
    nadi: "",
    pernafasan: "",
    tekananDarah: "",
    kesadaran: "",
    lingkarKepala: "",
    lingkarDada: "",
    lingkarLenganAtas: "",

    // 2) Nutrisi & Metabolisme
    dsNutrisi: "",
    doNutrisi: "",

    // 3) Respirasi / Sirkulasi
    dsRespirasi: "",
    doRespirasi: "",

    // 4) Eliminasi
    dsEliminasi: "",
    doEliminasi: "",

    // 5) Aktivitas / Latihan
    dsAktivitas: "",
    doAktivitas: "",

    // 6) Sensori Persepsi
    dsSensori: "",
    doSensori: "",

    // 7) Konsep Diri
    dsKonsepDiri: "",
    doKonsepDiri: "",

    // 8) Tidur / Istirahat
    dsTidur: "",
    doTidur: "",

    // 9) Seksualitas / Reproduksi
    dsSeksualitas: "",
    doSeksualitas: "",
  },

  // A.6.c Dampak Hospitalisasi & A.6.d Tingkat Perkembangan
  dampakHospitalisasiAnak: "",
  dampakHospitalisasiKeluarga: "",
  perkembanganMotorikKasar: "",
  perkembanganMotorikHalus: "",
  perkembanganBahasa: "",
  perkembanganSosialisasi: "",

  // A.7 Pemeriksaan Penunjang & A.8 Penatalaksanaan
  pemeriksaanPenunjang: "",
  penatalaksanaan: "",
};

export default function PengkajianForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [mahasiswa, setMahasiswa] = useState({
    isMahasiswa: true,
    namaMhs: "",
    nim: "",
    ruang: "",
    tgl: "",
  });

  const [form, setForm] = useState(INITIAL_FORM);

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
        if (parsed.form) {
          setForm((prev) => ({
            ...prev,
            ...parsed.form,
            ibu: { ...prev.ibu, ...(parsed.form.ibu || {}) },
            ayah: { ...prev.ayah, ...(parsed.form.ayah || {}) },
            wali: { ...prev.wali, ...(parsed.form.wali || {}) },
            antenatal: { ...prev.antenatal, ...(parsed.form.antenatal || {}) },
            natal: { ...prev.natal, ...(parsed.form.natal || {}) },
            neonatal: { ...prev.neonatal, ...(parsed.form.neonatal || {}) },
            kebiasaan: { ...prev.kebiasaan, ...(parsed.form.kebiasaan || {}) },
            riwayatKeluarga: {
              ...prev.riwayatKeluarga,
              ...(parsed.form.riwayatKeluarga || {}),
            },
            fisik: { ...prev.fisik, ...(parsed.form.fisik || {}) },
          }));
        }
      } catch (err) {
        console.error("Gagal memuat pengkajian tersimpan:", err);
      }
    } else {
      setMahasiswa((prev) => ({ ...prev, tgl: today }));
      setForm((prev) => ({ ...prev, tglPengkajian: today }));
    }
  }, []);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateNested = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    const payload = {
      mahasiswa,
      form,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    router.push("/pengkajian/hasil");
  };

  const inputCls =
    "w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500";
  const labelCls = "block text-xs font-semibold text-slate-700 mb-1";

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            A. Pengkajian Asuhan Keperawatan Anak
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Formulir pengkajian komprehensif meliputi biografi, riwayat tumbuh kembang, pengkajian fisik fungsional (DS/DO), hingga penatalaksanaan.
          </p>
        </div>
        <Link
          href="/pengkajian/hasil"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition shrink-0"
        >
          <Eye className="w-4 h-4" />
          Lihat Hasil Tersimpan
        </Link>
      </div>

      {/* Identitas Mahasiswa */}
      <IdentitasMahasiswa data={mahasiswa} onChange={setMahasiswa} />

      {/* Multi-Step Stepper */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {STEPS.map((s) => {
            const active = step === s.id;
            const passed = step > s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(s.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  active
                    ? "bg-blue-600 text-white shadow-sm"
                    : passed
                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {passed && <CheckCircle2 className="w-3.5 h-3.5" />}
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Body per Step */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* ================= STEP 1: BIOGRAFI & RESUME ================= */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">
              Tahap 1: Data Administrasi, Biografi Klien &amp; Orang Tua, serta Resume
            </h2>

            {/* Data Masuk & Pengkajian */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className={labelCls}>Tanggal Pengkajian</label>
                <input
                  type="date"
                  value={form.tglPengkajian}
                  onChange={(e) => updateField("tglPengkajian", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Jam Pengkajian</label>
                <input
                  type="time"
                  value={form.jamPengkajian}
                  onChange={(e) => updateField("jamPengkajian", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Tanggal Masuk RS</label>
                <input
                  type="date"
                  value={form.tglMasukRs}
                  onChange={(e) => updateField("tglMasukRs", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Jam Masuk RS</label>
                <input
                  type="time"
                  value={form.jamMasukRs}
                  onChange={(e) => updateField("jamMasukRs", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Ruang</label>
                <input
                  type="text"
                  placeholder="Contoh: R. Anak / Melati"
                  value={form.ruang}
                  onChange={(e) => updateField("ruang", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Nomor Register</label>
                <input
                  type="text"
                  placeholder="No. RM / Register"
                  value={form.noRegister}
                  onChange={(e) => updateField("noRegister", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Diagnosa Medis</label>
                <input
                  type="text"
                  placeholder="Contoh: Bronkopneumonia / Demam Typhoid"
                  value={form.diagnosaMedis}
                  onChange={(e) => updateField("diagnosaMedis", e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            {/* 1.a Identitas Klien */}
            <div className="pt-2">
              <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-3">
                1.a. Identitas Klien
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className={labelCls}>Nama Klien (Inisial) *</label>
                  <input
                    type="text"
                    required
                    placeholder="An. R"
                    value={form.namaKlien}
                    onChange={(e) => updateField("namaKlien", e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Nama Panggil</label>
                  <input
                    type="text"
                    placeholder="Rafi"
                    value={form.namaPanggil}
                    onChange={(e) => updateField("namaPanggil", e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Tempat, Tgl Lahir (Umur)</label>
                  <input
                    type="text"
                    placeholder="Jakarta, 12 Mei 2023 (3 Thn 6 Bln)"
                    value={form.ttlUmur}
                    onChange={(e) => updateField("ttlUmur", e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Jenis Kelamin</label>
                  <select
                    value={form.jenisKelamin}
                    onChange={(e) =>
                      updateField("jenisKelamin", e.target.value)
                    }
                    className={inputCls}
                  >
                    <option value="">-- Pilih --</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Agama</label>
                  <input
                    type="text"
                    placeholder="Islam / Kristen / dll"
                    value={form.agama}
                    onChange={(e) => updateField("agama", e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Suku / Bangsa</label>
                  <input
                    type="text"
                    placeholder="Jawa / Indonesia"
                    value={form.sukuBangsa}
                    onChange={(e) => updateField("sukuBangsa", e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Pendidikan / Bahasa</label>
                  <input
                    type="text"
                    placeholder="Belum Sekolah / Indonesia"
                    value={form.bahasaDigunakan}
                    onChange={(e) =>
                      updateField("bahasaDigunakan", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* 1.b Identitas Orang Tua / Wali */}
            <div className="pt-2 space-y-4">
              <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wide">
                1.b. Identitas Orang Tua / Wali (Inisial)
              </h3>

              {["ibu", "ayah", "wali"].map((role) => (
                <div
                  key={role}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                >
                  <p className="text-xs font-bold uppercase text-slate-700">
                    Data {role === "ibu" ? "Ibu" : role === "ayah" ? "Ayah" : "Wali (Opsional)"}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    <div>
                      <label className={labelCls}>Nama (Inisial)</label>
                      <input
                        type="text"
                        value={form[role].nama}
                        onChange={(e) =>
                          updateNested(role, "nama", e.target.value)
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Usia</label>
                      <input
                        type="text"
                        placeholder="30 thn"
                        value={form[role].usia}
                        onChange={(e) =>
                          updateNested(role, "usia", e.target.value)
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Pendidikan</label>
                      <input
                        type="text"
                        placeholder="SMA / S1"
                        value={form[role].pendidikan}
                        onChange={(e) =>
                          updateNested(role, "pendidikan", e.target.value)
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Pekerjaan</label>
                      <input
                        type="text"
                        placeholder="IRT / Karyawan"
                        value={form[role].pekerjaan}
                        onChange={(e) =>
                          updateNested(role, "pekerjaan", e.target.value)
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Agama</label>
                      <input
                        type="text"
                        value={form[role].agama}
                        onChange={(e) =>
                          updateNested(role, "agama", e.target.value)
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Suku / Bangsa</label>
                      <input
                        type="text"
                        value={form[role].sukuBangsa}
                        onChange={(e) =>
                          updateNested(role, "sukuBangsa", e.target.value)
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div>
                <label className={labelCls}>
                  Alamat Rumah (yang mudah dihubungi)
                </label>
                <textarea
                  rows={2}
                  placeholder="Alamat lengkap & nomor telepon orang tua/wali"
                  value={form.alamatRumah}
                  onChange={(e) => updateField("alamatRumah", e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            {/* 2. Resume */}
            <div className="pt-2">
              <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-2">
                2. Resume
              </h3>
              <p className="text-xs text-slate-500 mb-2">
                Ditulis mulai pasien masuk ruang perawatan meliputi pengkajian data fokus yang lalu, masalah keperawatan dan tindakan keperawatan mandiri dan kolaborasi yang telah dilakukan secara umum sebelum pengkajian oleh mahasiswa.
              </p>
              <textarea
                rows={4}
                value={form.resume}
                onChange={(e) => updateField("resume", e.target.value)}
                className={inputCls}
              />
            </div>
          </div>
        )}

        {/* ================= STEP 2: RIWAYAT KEHAMILAN, KELAHIRAN & MASA LALU ================= */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">
              Tahap 2: Riwayat Kehamilan, Kelahiran &amp; Riwayat Kesehatan Masa Lalu (A.3)
            </h2>

            {/* 3.a Antenatal */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-4">
              <h3 className="text-sm font-bold text-blue-700">
                3.a. Riwayat Kehamilan dan Kelahiran — Antenatal (Khusus Neonatus/Bayi/Kasus Tertentu)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { key: "hiperemesis", label: "Hiperemesis Gravidarum" },
                  { key: "perdarahan", label: "Perdarahan Pervagina" },
                  { key: "anemia", label: "Anemia" },
                  { key: "penyakitInfeksi", label: "Penyakit Infeksi" },
                  { key: "preeklamsi", label: "Pre Eklamsi / Eklamsi" },
                ].map((item) => (
                  <div key={item.key}>
                    <label className={labelCls}>{item.label}</label>
                    <select
                      value={form.antenatal[item.key]}
                      onChange={(e) =>
                        updateNested("antenatal", item.key, e.target.value)
                      }
                      className={inputCls}
                    >
                      <option value="Tidak">Tidak</option>
                      <option value="Ya">Ya</option>
                    </select>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Gangguan Kesehatan Lain</label>
                  <input
                    type="text"
                    value={form.antenatal.gangguanLain}
                    onChange={(e) =>
                      updateNested("antenatal", "gangguanLain", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Pemeriksaan Kehamilan Teratur</label>
                  <select
                    value={form.antenatal.periksaTeratur}
                    onChange={(e) =>
                      updateNested("antenatal", "periksaTeratur", e.target.value)
                    }
                    className={inputCls}
                  >
                    <option value="Ya">Ya (Teratur)</option>
                    <option value="Tidak">Tidak Teratur</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Diperiksa Oleh / Tempat</label>
                  <input
                    type="text"
                    placeholder="Bidan / Sp.OG di Puskesmas/RS"
                    value={form.antenatal.diperiksaOleh}
                    onChange={(e) =>
                      updateNested("antenatal", "diperiksaOleh", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Hasil Pemeriksaan</label>
                  <input
                    type="text"
                    value={form.antenatal.hasilPeriksa}
                    onChange={(e) =>
                      updateNested("antenatal", "hasilPeriksa", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Imunisasi Selama Hamil</label>
                  <input
                    type="text"
                    placeholder="TT1, TT2"
                    value={form.antenatal.imunisasiTt}
                    onChange={(e) =>
                      updateNested("antenatal", "imunisasiTt", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Riwayat Pengobatan Hamil</label>
                  <input
                    type="text"
                    placeholder="Tablet Fe, Asam Folat"
                    value={form.antenatal.riwayatObatHamil}
                    onChange={(e) =>
                      updateNested(
                        "antenatal",
                        "riwayatObatHamil",
                        e.target.value
                      )
                    }
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* Masa Natal */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-4">
              <h3 className="text-sm font-bold text-blue-700">Masa Natal</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Usia Kehamilan Saat Lahir</label>
                  <input
                    type="text"
                    placeholder="Contoh: 39 Minggu (Aterm)"
                    value={form.natal.usiaKehamilan}
                    onChange={(e) =>
                      updateNested("natal", "usiaKehamilan", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Cara Persalinan</label>
                  <input
                    type="text"
                    placeholder="Normal / SC / Vakum"
                    value={form.natal.caraPersalinan}
                    onChange={(e) =>
                      updateNested("natal", "caraPersalinan", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Ditolong Oleh</label>
                  <input
                    type="text"
                    placeholder="Bidan / Dokter"
                    value={form.natal.ditolongOleh}
                    onChange={(e) =>
                      updateNested("natal", "ditolongOleh", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Keadaan Bayi Saat Lahir</label>
                  <input
                    type="text"
                    placeholder="Langsung menangis kuat, APGAR 8/9"
                    value={form.natal.keadaanSaatLahir}
                    onChange={(e) =>
                      updateNested("natal", "keadaanSaatLahir", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>BB, PB, Lingkar Kepala Lahir</label>
                  <input
                    type="text"
                    placeholder="BB: 3100 gr, PB: 49 cm, LK: 33 cm"
                    value={form.natal.bbPbLkLahir}
                    onChange={(e) =>
                      updateNested("natal", "bbPbLkLahir", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Pengobatan yang Didapat</label>
                  <input
                    type="text"
                    placeholder="Vit K, Salep mata, Hb0"
                    value={form.natal.pengobatanLahir}
                    onChange={(e) =>
                      updateNested("natal", "pengobatanLahir", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* Neonatal */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-4">
              <h3 className="text-sm font-bold text-blue-700">Neonatal</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  { key: "cacatKongenital", label: "Cacat Kongenital" },
                  { key: "ikterus", label: "Ikterus" },
                  { key: "kejang", label: "Kejang" },
                  { key: "paralisis", label: "Paralisis" },
                  { key: "perdarahan", label: "Perdarahan" },
                  { key: "traumaPersalinan", label: "Trauma Lahir" },
                ].map((item) => (
                  <div key={item.key}>
                    <label className={labelCls}>{item.label}</label>
                    <select
                      value={form.neonatal[item.key]}
                      onChange={(e) =>
                        updateNested("neonatal", item.key, e.target.value)
                      }
                      className={inputCls}
                    >
                      <option value="Tidak">Tidak</option>
                      <option value="Ya">Ya</option>
                    </select>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Penurunan BB</label>
                  <input
                    type="text"
                    value={form.neonatal.penurunanBb}
                    onChange={(e) =>
                      updateNested("neonatal", "penurunanBb", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Pemberian Minum / ASI</label>
                  <input
                    type="text"
                    placeholder="ASI Eksklusif / PASI"
                    value={form.neonatal.pemberianMinumAsi}
                    onChange={(e) =>
                      updateNested(
                        "neonatal",
                        "pemberianMinumAsi",
                        e.target.value
                      )
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Lain-lain</label>
                  <input
                    type="text"
                    value={form.neonatal.lainLain}
                    onChange={(e) =>
                      updateNested("neonatal", "lainLain", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* 3.b s/d 3.i Riwayat Masa Lalu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>
                  3.b. Riwayat Pertumbuhan dan Perkembangan (Apakah ada gangguan? Jelaskan)
                </label>
                <textarea
                  rows={2}
                  value={form.riwayatTumbuhKembang}
                  onChange={(e) =>
                    updateField("riwayatTumbuhKembang", e.target.value)
                  }
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>
                  3.c. Penyakit-penyakit yang Pernah Diderita
                </label>
                <textarea
                  rows={2}
                  value={form.penyakitPernahDiderita}
                  onChange={(e) =>
                    updateField("penyakitPernahDiderita", e.target.value)
                  }
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>3.d. Pernah Dirawat di Rumah Sakit</label>
                <input
                  type="text"
                  value={form.pernahDirawatRs}
                  onChange={(e) =>
                    updateField("pernahDirawatRs", e.target.value)
                  }
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>3.e. Obat-obat</label>
                <input
                  type="text"
                  value={form.obatObat}
                  onChange={(e) => updateField("obatObat", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>
                  3.f. Tindakan (misalnya: operasi)
                </label>
                <input
                  type="text"
                  value={form.tindakanOperasi}
                  onChange={(e) =>
                    updateField("tindakanOperasi", e.target.value)
                  }
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>3.g. Alergi</label>
                <input
                  type="text"
                  value={form.alergi}
                  onChange={(e) => updateField("alergi", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>3.h. Kecelakaan</label>
                <input
                  type="text"
                  value={form.kecelakaan}
                  onChange={(e) => updateField("kecelakaan", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>3.i. Imunisasi</label>
                <input
                  type="text"
                  placeholder="HB0, BCG, Polio 1-4, DPT-HB-Hib, Campak/MR"
                  value={form.imunisasi}
                  onChange={(e) => updateField("imunisasi", e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: KEBIASAAN SEHARI-HARI & KELUARGA ================= */}
        {step === 3 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">
              Tahap 3: Kebiasaan Sehari-hari (A.3.j) &amp; Riwayat Kesehatan Keluarga (A.4)
            </h2>

            {/* 1) Pola Nutrisi */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
              <h3 className="text-sm font-bold text-blue-700">
                1) Pola Pemenuhan Nutrisi (Sebelum Dirawat)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className={labelCls}>Lama Pemberian ASI</label>
                  <input
                    type="text"
                    value={form.kebiasaan.asiLama}
                    onChange={(e) =>
                      updateNested("kebiasaan", "asiLama", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Waktu Pemberian ASI</label>
                  <input
                    type="text"
                    value={form.kebiasaan.asiWaktu}
                    onChange={(e) =>
                      updateNested("kebiasaan", "asiWaktu", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Jenis Susu Buatan</label>
                  <input
                    type="text"
                    value={form.kebiasaan.susuBuatanJenis}
                    onChange={(e) =>
                      updateNested(
                        "kebiasaan",
                        "susuBuatanJenis",
                        e.target.value
                      )
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Adakah Kesulitan</label>
                  <input
                    type="text"
                    value={form.kebiasaan.susuKesulitan}
                    onChange={(e) =>
                      updateNested("kebiasaan", "susuKesulitan", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Makanan Padat Mulai Diberikan</label>
                  <input
                    type="text"
                    placeholder="Usia 6 bulan"
                    value={form.kebiasaan.padatMulai}
                    onChange={(e) =>
                      updateNested("kebiasaan", "padatMulai", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Cara Pemberian Makanan Padat</label>
                  <input
                    type="text"
                    value={form.kebiasaan.padatCara}
                    onChange={(e) =>
                      updateNested("kebiasaan", "padatCara", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Jenis &amp; Lama Vitamin</label>
                  <input
                    type="text"
                    value={form.kebiasaan.vitaminJenis}
                    onChange={(e) =>
                      updateNested("kebiasaan", "vitaminJenis", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Frekuensi &amp; Waktu Makan</label>
                  <input
                    type="text"
                    placeholder="3x sehari (Pagi, Siang, Malam)"
                    value={form.kebiasaan.frekuensiMakan}
                    onChange={(e) =>
                      updateNested(
                        "kebiasaan",
                        "frekuensiMakan",
                        e.target.value
                      )
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Jenis &amp; Makanan Disenangi</label>
                  <input
                    type="text"
                    value={form.kebiasaan.jenisMakanan}
                    onChange={(e) =>
                      updateNested("kebiasaan", "jenisMakanan", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Alergi Makanan</label>
                  <input
                    type="text"
                    value={form.kebiasaan.alergiMakanan}
                    onChange={(e) =>
                      updateNested("kebiasaan", "alergiMakanan", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Kebiasaan Makan</label>
                  <input
                    type="text"
                    placeholder="Bersama keluarga / Sendiri / Disuapi"
                    value={form.kebiasaan.kebiasaanMakan}
                    onChange={(e) =>
                      updateNested(
                        "kebiasaan",
                        "kebiasaanMakan",
                        e.target.value
                      )
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Jumlah &amp; Kebiasaan Minum</label>
                  <input
                    type="text"
                    placeholder="± 1000 ml/hari, air putih & susu"
                    value={form.kebiasaan.jumlahMinum}
                    onChange={(e) =>
                      updateNested("kebiasaan", "jumlahMinum", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* 2) Pola Tidur, 3) Aktivitas, 4) Kebersihan Diri, 5) Eliminasi, 6) Kebiasaan Lain, 7) Pola Asuh */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
                <h3 className="text-sm font-bold text-blue-700">
                  2) Pola Tidur &amp; 3) Aktivitas / Bermain
                </h3>
                <div>
                  <label className={labelCls}>
                    Lamanya Tidur Siang / Malam &amp; Kelainan Tidur
                  </label>
                  <input
                    type="text"
                    placeholder="Siang 2 jam, Malam 9 jam; tidak ada kelainan"
                    value={form.kebiasaan.lamaTidurSiangMalam}
                    onChange={(e) =>
                      updateNested(
                        "kebiasaan",
                        "lamaTidurSiangMalam",
                        e.target.value
                      )
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    Kebiasaan Menjelang &amp; Nyaman Saat Tidur
                  </label>
                  <input
                    type="text"
                    placeholder="Membaca / mendengar cerita / memeluk guling"
                    value={form.kebiasaan.kebiasaanMenjelangTidur}
                    onChange={(e) =>
                      updateNested(
                        "kebiasaan",
                        "kebiasaanMenjelangTidur",
                        e.target.value
                      )
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    3) Pola Aktivitas / Latihan / OR / Bermain / Hobi
                  </label>
                  <input
                    type="text"
                    value={form.kebiasaan.polaAktivitasBermain}
                    onChange={(e) =>
                      updateNested(
                        "kebiasaan",
                        "polaAktivitasBermain",
                        e.target.value
                      )
                    }
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
                <h3 className="text-sm font-bold text-blue-700">
                  4) Pola Kebersihan Diri
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Mandi (x/hari &amp; Sabun)</label>
                    <input
                      type="text"
                      placeholder="2x/hari, pakai sabun"
                      value={form.kebiasaan.mandiFrek}
                      onChange={(e) =>
                        updateNested("kebiasaan", "mandiFrek", e.target.value)
                      }
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Bantuan Mandi</label>
                    <input
                      type="text"
                      placeholder="Tidak / Ya, oleh Ibu"
                      value={form.kebiasaan.mandiOleh}
                      onChange={(e) =>
                        updateNested("kebiasaan", "mandiOleh", e.target.value)
                      }
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>
                      Oral Hygiene (Frek, Waktu, Pasta Gigi)
                    </label>
                    <input
                      type="text"
                      placeholder="2x/hari, pagi & malam, pasta gigi"
                      value={form.kebiasaan.oralFrek}
                      onChange={(e) =>
                        updateNested("kebiasaan", "oralFrek", e.target.value)
                      }
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>
                      Cuci Rambut &amp; Berpakaian
                    </label>
                    <input
                      type="text"
                      placeholder="3x/mgg (sampo), berpakaian dibantu"
                      value={form.kebiasaan.cuciRambutFrek}
                      onChange={(e) =>
                        updateNested(
                          "kebiasaan",
                          "cuciRambutFrek",
                          e.target.value
                        )
                      }
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 5) Pola Eliminasi & 6) Kebiasaan Lain & 7) Pola Asuh */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
              <h3 className="text-sm font-bold text-blue-700">
                5) Pola Eliminasi (BAB &amp; BAK), 6) Kebiasaan Lain, 7) Pola Asuh
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className={labelCls}>BAB: Frekuensi &amp; Waktu</label>
                  <input
                    type="text"
                    placeholder="7x/minggu, pagi hari"
                    value={form.kebiasaan.babFrek}
                    onChange={(e) =>
                      updateNested("kebiasaan", "babFrek", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>BAB: Warna, Bau, Konsistensi</label>
                  <input
                    type="text"
                    placeholder="Kuning kecoklatan, khas, lembek"
                    value={form.kebiasaan.babKonsistensi}
                    onChange={(e) =>
                      updateNested(
                        "kebiasaan",
                        "babKonsistensi",
                        e.target.value
                      )
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>BAB: Cara, Keluhan, Laxatif</label>
                  <input
                    type="text"
                    placeholder="Di toilet, tidak ada keluhan"
                    value={form.kebiasaan.babKeluhan}
                    onChange={(e) =>
                      updateNested("kebiasaan", "babKeluhan", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    BAK: Frekuensi, Warna, Keluhan/Ngompol
                  </label>
                  <input
                    type="text"
                    placeholder="35x/minggu, kuning jernih, tidak ngompol"
                    value={form.kebiasaan.bakFrek}
                    onChange={(e) =>
                      updateNested("kebiasaan", "bakFrek", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>
                    6) Kebiasaan Lain (Gigit jari/kuku, hisap jari, main genital, mudah marah, dll)
                  </label>
                  <input
                    type="text"
                    placeholder="Tidak ada kebiasaan khusus"
                    value={form.kebiasaan.kebiasaanLain}
                    onChange={(e) =>
                      updateNested("kebiasaan", "kebiasaanLain", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>7) Pola Asuh</label>
                  <input
                    type="text"
                    placeholder="Demokratis / Diasuh langsung oleh kedua orang tua"
                    value={form.kebiasaan.polaAsuh}
                    onChange={(e) =>
                      updateNested("kebiasaan", "polaAsuh", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* A.4 Riwayat Kesehatan Keluarga */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wide">
                4. Riwayat Kesehatan Keluarga
              </h3>
              <div>
                <label className={labelCls}>
                  4.a. Susunan Keluarga (Keterangan Genogram 3 Generasi)
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Klien merupakan anak ke-2 dari 2 bersaudara, tinggal serumah dengan ayah, ibu, dan kakak."
                  value={form.susunanKeluargaGenogram}
                  onChange={(e) =>
                    updateField("susunanKeluargaGenogram", e.target.value)
                  }
                  className={inputCls}
                />
              </div>

              {/* Tabel 4.b Riwayat Penyakit Keluarga */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-slate-200 text-xs">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-200 p-2 text-left">
                        Riwayat Penyakit
                      </th>
                      <th className="border border-slate-200 p-2 text-left">
                        Ayah / Ibu
                      </th>
                      <th className="border border-slate-200 p-2 text-left">
                        Saudara Kandung
                      </th>
                      <th className="border border-slate-200 p-2 text-left">
                        Anggota Keluarga Lain
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 p-2 font-semibold">
                        1. Penyakit yang pernah diderita
                      </td>
                      <td className="border border-slate-200 p-1.5">
                        <input
                          type="text"
                          value={form.riwayatKeluarga.pernahAyahIbu}
                          onChange={(e) =>
                            updateNested(
                              "riwayatKeluarga",
                              "pernahAyahIbu",
                              e.target.value
                            )
                          }
                          className={inputCls}
                        />
                      </td>
                      <td className="border border-slate-200 p-1.5">
                        <input
                          type="text"
                          value={form.riwayatKeluarga.pernahSaudara}
                          onChange={(e) =>
                            updateNested(
                              "riwayatKeluarga",
                              "pernahSaudara",
                              e.target.value
                            )
                          }
                          className={inputCls}
                        />
                      </td>
                      <td className="border border-slate-200 p-1.5">
                        <input
                          type="text"
                          value={form.riwayatKeluarga.pernahLain}
                          onChange={(e) =>
                            updateNested(
                              "riwayatKeluarga",
                              "pernahLain",
                              e.target.value
                            )
                          }
                          className={inputCls}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 p-2 font-semibold">
                        2. Penyakit yang sedang diderita
                      </td>
                      <td className="border border-slate-200 p-1.5">
                        <input
                          type="text"
                          value={form.riwayatKeluarga.sedangAyahIbu}
                          onChange={(e) =>
                            updateNested(
                              "riwayatKeluarga",
                              "sedangAyahIbu",
                              e.target.value
                            )
                          }
                          className={inputCls}
                        />
                      </td>
                      <td className="border border-slate-200 p-1.5">
                        <input
                          type="text"
                          value={form.riwayatKeluarga.sedangSaudara}
                          onChange={(e) =>
                            updateNested(
                              "riwayatKeluarga",
                              "sedangSaudara",
                              e.target.value
                            )
                          }
                          className={inputCls}
                        />
                      </td>
                      <td className="border border-slate-200 p-1.5">
                        <input
                          type="text"
                          value={form.riwayatKeluarga.sedangLain}
                          onChange={(e) =>
                            updateNested(
                              "riwayatKeluarga",
                              "sedangLain",
                              e.target.value
                            )
                          }
                          className={inputCls}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 p-2 font-semibold">
                        3. Analisa faktor penyakit (ginjal, jantung, DM, hipertensi, kanker, ggn mental, alergi, dll)
                      </td>
                      <td className="border border-slate-200 p-1.5">
                        <input
                          type="text"
                          value={form.riwayatKeluarga.analisaAyahIbu}
                          onChange={(e) =>
                            updateNested(
                              "riwayatKeluarga",
                              "analisaAyahIbu",
                              e.target.value
                            )
                          }
                          className={inputCls}
                        />
                      </td>
                      <td className="border border-slate-200 p-1.5">
                        <input
                          type="text"
                          value={form.riwayatKeluarga.analisaSaudara}
                          onChange={(e) =>
                            updateNested(
                              "riwayatKeluarga",
                              "analisaSaudara",
                              e.target.value
                            )
                          }
                          className={inputCls}
                        />
                      </td>
                      <td className="border border-slate-200 p-1.5">
                        <input
                          type="text"
                          value={form.riwayatKeluarga.analisaLain}
                          onChange={(e) =>
                            updateNested(
                              "riwayatKeluarga",
                              "analisaLain",
                              e.target.value
                            )
                          }
                          className={inputCls}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>4.c. Coping Keluarga</label>
                  <input
                    type="text"
                    value={form.copingKeluarga}
                    onChange={(e) =>
                      updateField("copingKeluarga", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>4.d. Sistem Nilai</label>
                  <input
                    type="text"
                    value={form.sistemNilai}
                    onChange={(e) => updateField("sistemNilai", e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>4.e. Spiritual</label>
                  <input
                    type="text"
                    value={form.spiritual}
                    onChange={(e) => updateField("spiritual", e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 4: LINGKUNGAN & PENYAKIT SEKARANG ================= */}
        {step === 4 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">
              Tahap 4: Riwayat Kesehatan Lingkungan (A.5) &amp; Riwayat Penyakit Sekarang (A.6.a)
            </h2>

            {/* 5. Riwayat Lingkungan */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wide">
                5. Riwayat Kesehatan Lingkungan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>
                    5.a.1) Resiko Bahaya Kecelakaan — Rumah
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Lantai keramik tidak licin, tangga berpagar"
                    value={form.bahayaRumah}
                    onChange={(e) => updateField("bahayaRumah", e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    5.a.2) Resiko Bahaya Kecelakaan — Lingkungan Rumah
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Jauh dari jalan raya utama"
                    value={form.bahayaLingkungan}
                    onChange={(e) =>
                      updateField("bahayaLingkungan", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    5.b. Polusi (Kemungkinan bahaya akibat polusi)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Asap rokok / debu jalanan"
                    value={form.polusiBahaya}
                    onChange={(e) =>
                      updateField("polusiBahaya", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>5.c. Tempat Bermain</label>
                  <input
                    type="text"
                    placeholder="Contoh: Halaman rumah / taman bermain komplek"
                    value={form.tempatBermain}
                    onChange={(e) =>
                      updateField("tempatBermain", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* 6.a Riwayat Penyakit Sekarang */}
            <div className="space-y-4 pt-3 border-t border-slate-100">
              <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wide">
                6. Riwayat Kesehatan Sekarang — 6.a. Riwayat Penyakit Sekarang
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Tanggal Mulai Sakit</label>
                  <input
                    type="date"
                    value={form.tglMulaiSakit}
                    onChange={(e) =>
                      updateField("tglMulaiSakit", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Cara Waktu Masuk / Pukul</label>
                  <input
                    type="text"
                    placeholder="IGD / Poli Anak, Pukul 14.30 WIB"
                    value={form.caraMasukPukul}
                    onChange={(e) =>
                      updateField("caraMasukPukul", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Dikirim Oleh</label>
                  <select
                    value={form.dikirimOleh}
                    onChange={(e) => updateField("dikirimOleh", e.target.value)}
                    className={inputCls}
                  >
                    <option value="Dokter">Dokter</option>
                    <option value="Puskesmas">Puskesmas</option>
                    <option value="RS">RS</option>
                    <option value="Lain-lain">Lain-lain (Datang Sendiri)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelCls}>Keluhan Utama *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Keluhan utama yang membawa anak masuk RS"
                  value={form.keluhanUtama}
                  onChange={(e) => updateField("keluhanUtama", e.target.value)}
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>1) Terjadinya</label>
                  <textarea
                    rows={2}
                    placeholder="Kronologi awal mula gejala muncul"
                    value={form.terjadinya}
                    onChange={(e) => updateField("terjadinya", e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>2) Lamanya</label>
                  <textarea
                    rows={2}
                    placeholder="Durasi keluhan berlangsung"
                    value={form.lamanya}
                    onChange={(e) => updateField("lamanya", e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>3) Faktor Pencetus</label>
                  <textarea
                    rows={2}
                    placeholder="Hal yang memperberat/memicu keluhan"
                    value={form.faktorPencetus}
                    onChange={(e) =>
                      updateField("faktorPencetus", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>4) Upaya untuk Mengurangi</label>
                  <textarea
                    rows={2}
                    placeholder="Tindakan/obat yang sudah diberikan sebelum ke RS"
                    value={form.upayaMengurangi}
                    onChange={(e) =>
                      updateField("upayaMengurangi", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 5: PENGKAJIAN FISIK FUNGSIONAL (DS vs DO) ================= */}
        {step === 5 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">
              Tahap 5: Pengkajian Fisik Secara Fungsional — Data Subyektif vs Data Obyektif (A.6.b)
            </h2>

            {/* 1) Data Klinik (DO) */}
            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 space-y-3">
              <h3 className="text-sm font-bold text-blue-800">
                1) Data Klinik &amp; Antropometri (Data Obyektif)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className={labelCls}>a) Suhu (°C)</label>
                  <input
                    type="text"
                    placeholder="38,5 °C"
                    value={form.fisik.suhu}
                    onChange={(e) =>
                      updateNested("fisik", "suhu", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>b) Nadi (x/mnt)</label>
                  <input
                    type="text"
                    placeholder="116 x/mnt"
                    value={form.fisik.nadi}
                    onChange={(e) =>
                      updateNested("fisik", "nadi", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>c) Pernafasan (x/mnt)</label>
                  <input
                    type="text"
                    placeholder="28 x/mnt"
                    value={form.fisik.pernafasan}
                    onChange={(e) =>
                      updateNested("fisik", "pernafasan", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>d) Tekanan Darah (mmHg)</label>
                  <input
                    type="text"
                    placeholder="100/60 mmHg"
                    value={form.fisik.tekananDarah}
                    onChange={(e) =>
                      updateNested("fisik", "tekananDarah", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>e) Kesadaran</label>
                  <input
                    type="text"
                    placeholder="Compos Mentis (GCS 15)"
                    value={form.fisik.kesadaran}
                    onChange={(e) =>
                      updateNested("fisik", "kesadaran", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>g) Lingk. Kepala (0-1 thn)</label>
                  <input
                    type="text"
                    placeholder="cm"
                    value={form.fisik.lingkarKepala}
                    onChange={(e) =>
                      updateNested("fisik", "lingkarKepala", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>h) Lingk. Dada</label>
                  <input
                    type="text"
                    placeholder="cm"
                    value={form.fisik.lingkarDada}
                    onChange={(e) =>
                      updateNested("fisik", "lingkarDada", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>i) Lingk. Lengan Atas</label>
                  <input
                    type="text"
                    placeholder="cm"
                    value={form.fisik.lingkarLenganAtas}
                    onChange={(e) =>
                      updateNested("fisik", "lingkarLenganAtas", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* Sistem 2 s/d 9: Pasangan Kolom DS vs DO */}
            {[
              {
                num: "2)",
                title: "Nutrisi dan Metabolisme",
                dsKey: "dsNutrisi",
                doKey: "doNutrisi",
                dsPlaceholder:
                  "Nafsu makan/menyusui, penurunan/peningkatan BB, diit, kulit (perubahan warna, ggn penyembuhan), intake sehari (makan, minum, lain-lain), mual, dysphagia, muntah (jumlah)",
                doPlaceholder:
                  "Mukosa mulut (warna, lesi, kelembaban, kelainan palatum, bibir, gusi, lidah), gigi (kelengkapan, karang gigi, karies), BB & TB, obesitas, kulit (integritas, turgor, tekstur), sonde/NGT",
              },
              {
                num: "3)",
                title: "Respirasi / Sirkulasi",
                dsKey: "dsRespirasi",
                doKey: "doRespirasi",
                dsPlaceholder:
                  "Pernapasan: sesak napas, sputum, batuk. Sirkulasi: sakit dada, udema",
                doPlaceholder:
                  "Suara pernafasan, batuk, batuk darah, sputum, ikterus, sianosis, penggunaan otot bantu nafas, pernafasan cuping hidung, edema, palpitasi, pengisian kapiler (CRT), temperatur suhu",
              },
              {
                num: "4)",
                title: "Eliminasi",
                dsKey: "dsEliminasi",
                doKey: "doEliminasi",
                dsPlaceholder:
                  "Abdomen (kembung, mules, sakit/nyeri), BAB (bau, warna, lendir, diare, konsistensi, frekuensi), BAK (jumlah, frekuensi, sakit, nocturia, dysuria, hematuria, inkontinensia)",
                doPlaceholder:
                  "Abdomen (lemas, tegang/kaku, kembung, bising usus, lingk. perut), BAB (bau, warna, lendir, konsistensi, melena, frekuensi), BAK (kepekatan, warna, bau, kateter, frekuensi), Rectum/Anus (iritasi, atresia ani, prolaps)",
              },
              {
                num: "5)",
                title: "Aktivitas / Latihan",
                dsKey: "dsAktivitas",
                doKey: "doAktivitas",
                dsPlaceholder:
                  "Tingkat kekuatan/ketahanan, kemampuan memenuhi kebutuhan sehari-hari, kekakuan pergerakan sendi, rasa nyeri pada sendi",
                doPlaceholder:
                  "Keseimbangan berjalan, kekuatan menggenggam (tangan kiri & kanan), bentuk kaki, otot kaki, kelemahan, kejang, lain-lain",
              },
              {
                num: "6)",
                title: "Sensori Persepsi",
                dsKey: "dsSensori",
                doKey: "doSensori",
                dsPlaceholder:
                  "Pendengaran, penglihatan, penciuman, perabaan, pengecap",
                doPlaceholder:
                  "Reaksi terhadap rangsangan, orientasi, pupil, konjungtiva/warna, pendengaran, penglihatan, lain-lain",
              },
              {
                num: "7)",
                title: "Konsep Diri",
                dsKey: "dsKonsepDiri",
                doKey: "doKonsepDiri",
                dsPlaceholder: "Apakah penyakit tersebut mempengaruhi pasien?",
                doPlaceholder: "Kontak mata, postur tubuh, perilaku",
              },
              {
                num: "8)",
                title: "Tidur / Istirahat",
                dsKey: "dsTidur",
                doKey: "doTidur",
                dsPlaceholder:
                  "Jika tidur apakah merasa nyenyak, masalah atau gangguan waktu tidur",
                doPlaceholder: "Tanda-tanda kurang tidur, lain-lain",
              },
              {
                num: "9)",
                title: "Seksualitas / Reproduksi",
                dsKey: "dsSeksualitas",
                doKey: "doSeksualitas",
                dsPlaceholder:
                  "Wanita: menstruasi, pemeriksaan buah dada. Pria: tidak dapat ereksi, sakit pada waktu BAK",
                doPlaceholder:
                  "Wanita: benjolan pada buah dada. Pria: kelainan skrotum, hyposphadia, fimosis, lain-lain",
              },
            ].map((sys) => (
              <div
                key={sys.num}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3"
              >
                <h3 className="text-sm font-bold text-slate-800">
                  {sys.num} {sys.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Data Subyektif (DS)</label>
                    <textarea
                      rows={4}
                      placeholder={sys.dsPlaceholder}
                      value={form.fisik[sys.dsKey]}
                      onChange={(e) =>
                        updateNested("fisik", sys.dsKey, e.target.value)
                      }
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Data Obyektif (DO)</label>
                    <textarea
                      rows={4}
                      placeholder={sys.doPlaceholder}
                      value={form.fisik[sys.doKey]}
                      onChange={(e) =>
                        updateNested("fisik", sys.doKey, e.target.value)
                      }
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= STEP 6: DAMPAK HOSPITALISASI, PERKEMBANGAN & TERAPI ================= */}
        {step === 6 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">
              Tahap 6: Dampak Hospitalisasi, Tingkat Perkembangan, Penunjang &amp; Penatalaksanaan
            </h2>

            {/* 6.c Dampak Hospitalisasi */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wide">
                6.c. Dampak Hospitalisasi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>1) Pada Anak</label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Anak tampak cemas saat perawat mendekat, menangis saat dilakukan tindakan invasif"
                    value={form.dampakHospitalisasiAnak}
                    onChange={(e) =>
                      updateField("dampakHospitalisasiAnak", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>2) Pada Keluarga</label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Ibu tampak khawatir dengan kondisi demam anak dan sering bertanya tentang perkembangan penyakit"
                    value={form.dampakHospitalisasiKeluarga}
                    onChange={(e) =>
                      updateField("dampakHospitalisasiKeluarga", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* 6.d Tingkat Perkembangan Saat Ini */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wide">
                6.d. Tingkat Perkembangan Saat Ini
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>1) Motorik Kasar</label>
                  <input
                    type="text"
                    value={form.perkembanganMotorikKasar}
                    onChange={(e) =>
                      updateField("perkembanganMotorikKasar", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>2) Motorik Halus</label>
                  <input
                    type="text"
                    value={form.perkembanganMotorikHalus}
                    onChange={(e) =>
                      updateField("perkembanganMotorikHalus", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>3) Bahasa</label>
                  <input
                    type="text"
                    value={form.perkembanganBahasa}
                    onChange={(e) =>
                      updateField("perkembanganBahasa", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>4) Sosialisasi</label>
                  <input
                    type="text"
                    value={form.perkembanganSosialisasi}
                    onChange={(e) =>
                      updateField("perkembanganSosialisasi", e.target.value)
                    }
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* 7. Pemeriksaan Penunjang & 8. Penatalaksanaan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-1">
                  7. Pemeriksaan Penunjang
                </h3>
                <p className="text-xs text-slate-500 mb-2">
                  Pemeriksaan diagnostik yang menunjang masalah (Lab darah rutin, rontgen toraks, dll).
                </p>
                <textarea
                  rows={5}
                  placeholder={
                    "Contoh:\n- Hemoglobin: 11,8 g/dL\n- Leukosit: 16.400 /µL (Meningkat)\n- Trombosit: 245.000 /µL"
                  }
                  value={form.pemeriksaanPenunjang}
                  onChange={(e) =>
                    updateField("pemeriksaanPenunjang", e.target.value)
                  }
                  className={inputCls}
                />
              </div>

              <div>
                <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-1">
                  8. Penatalaksanaan
                </h3>
                <p className="text-xs text-slate-500 mb-2">
                  Terapi / pengobatan termasuk diet yang menunjang masalah.
                </p>
                <textarea
                  rows={5}
                  placeholder={
                    "Contoh:\n- IVFD RL 15 tpm makro\n- Paracetamol syr 3 x 120 mg (k/p demam)\n- Ceftriaxone 2 x 500 mg IV\n- Diet: TKTP lunak"
                  }
                  value={form.penatalaksanaan}
                  onChange={(e) =>
                    updateField("penatalaksanaan", e.target.value)
                  }
                  className={inputCls}
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation & Submit Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-xl transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Sebelumnya
          </button>

          <div className="flex items-center gap-3">
            {step < STEPS.length ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(STEPS.length, s + 1))}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition cursor-pointer"
              >
                Selanjutnya
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Simpan &amp; Lihat Hasil Pengkajian
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}