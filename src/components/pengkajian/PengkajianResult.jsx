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

const STORAGE_KEY = "askep_anak_pengkajian";

export default function PengkajianResult() {
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWaModalOpen, setIsWaModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (err) {
        console.error("Gagal membaca data pengkajian:", err);
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

  const buildWhatsAppText = () => {
    if (!data) return "";
    const { mahasiswa, form } = data;
    const f = form.fisik || {};

    let text = `*ASUHAN KEPERAWATAN ANAK — PENGKAJIAN*\n\n`;
    text += `*1. Identitas Klien:*\n`;
    text += `• Nama / Panggil : ${form.namaKlien || "-"} (${form.namaPanggil || "-"})\n`;
    text += `• TTL / Umur     : ${form.ttlUmur || "-"}\n`;
    text += `• Jenis Kelamin  : ${form.jenisKelamin || "-"}\n`;
    text += `• Ruang / No.Reg : ${form.ruang || "-"} / ${form.noRegister || "-"}\n`;
    text += `• Diagnosa Medis : ${form.diagnosaMedis || "-"}\n\n`;

    text += `*6. Riwayat Penyakit Sekarang:*\n`;
    text += `• Keluhan Utama  : ${form.keluhanUtama || "-"}\n`;
    text += `• Kronologi      : ${form.terjadinya || "-"}\n\n`;

    text += `*Data Klinik (TTV):*\n`;
    text += `• Suhu: ${f.suhu || "-"} | Nadi: ${f.nadi || "-"} | RR: ${f.pernafasan || "-"} | TD: ${f.tekananDarah || "-"}\n`;
    text += `• Kesadaran: ${f.kesadaran || "-"}\n\n`;

    text += `*7. Pemeriksaan Penunjang:*\n${form.pemeriksaanPenunjang || "-"}\n\n`;
    text += `*8. Penatalaksanaan:*\n${form.penatalaksanaan || "-"}\n`;

    if (mahasiswa?.isMahasiswa) {
      text += `\n*Mahasiswa Praktikan:*\n`;
      text += `• Nama : ${mahasiswa.namaMhs || "-"} (NIM. ${mahasiswa.nim || "-"})\n`;
      text += `• Ruang/Tgl : ${mahasiswa.ruang || "-"} / ${formatTanggalIndo(mahasiswa.tgl)}\n`;
    }

    return text;
  };

  if (!isLoaded) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-500">
        Memuat lembar Pengkajian Keperawatan Anak...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center max-w-lg mx-auto">
        <FileWarning className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-900">
          Belum Ada Data Pengkajian Tersimpan
        </h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          Silakan isi formulir Pengkajian Anak terlebih dahulu untuk melihat pratinjau dokumen cetak atau mengirim via WhatsApp.
        </p>
        <Link
          href="/pengkajian"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition"
        >
          <Edit3 className="w-4 h-4" />
          Isi Form Pengkajian
        </Link>
      </div>
    );
  }

  const { mahasiswa, form } = data;
  const f = form.fisik || {};
  const k = form.kebiasaan || {};
  const rk = form.riwayatKeluarga || {};

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="print:hidden bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/pengkajian"
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
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10 print:border-none print:shadow-none print:p-0 text-slate-900 text-xs sm:text-sm space-y-6">
        {/* Judul Dokumen */}
        <div className="text-center border-b-2 border-slate-800 pb-3">
          <h1 className="text-lg sm:text-xl font-bold uppercase tracking-wide">
            ASUHAN KEPERAWATAN ANAK
          </h1>
        </div>

        {/* Header Administrasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-slate-800 p-4">
          <div className="space-y-1">
            <p>
              <span className="font-semibold">Tanggal Pengkajian / Jam :</span>{" "}
              {formatTanggalIndo(form.tglPengkajian)} / {form.jamPengkajian || "-"}
            </p>
            <p>
              <span className="font-semibold">Tanggal Masuk RS :</span>{" "}
              {formatTanggalIndo(form.tglMasukRs)}
            </p>
            <p>
              <span className="font-semibold">Jam Masuk RS :</span>{" "}
              {form.jamMasukRs || "-"}
            </p>
          </div>
          <div className="space-y-1">
            <p>
              <span className="font-semibold">Ruang :</span> {form.ruang || "-"}
            </p>
            <p>
              <span className="font-semibold">Nomor Register :</span>{" "}
              {form.noRegister || "-"}
            </p>
            <p>
              <span className="font-semibold">Diagnosa Medis :</span>{" "}
              {form.diagnosaMedis || "-"}
            </p>
          </div>
        </div>

        {/* A. PENGKAJIAN */}
        <div className="space-y-5">
          <h2 className="text-base font-bold uppercase border-b border-slate-800 pb-1">
            A. PENGKAJIAN
          </h2>

          {/* 1. Data Biografi */}
          <div className="space-y-3">
            <h3 className="font-bold">1. Data Biografi</h3>
            <div className="pl-3 space-y-1">
              <p className="font-semibold">a. Identitas Klien</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 pl-4">
                <p>Nama Klien (inisial) : {form.namaKlien || "-"}</p>
                <p>Jenis Kelamin : {form.jenisKelamin || "-"}</p>
                <p>Nama Panggil : {form.namaPanggil || "-"}</p>
                <p>Agama : {form.agama || "-"}</p>
                <p>Tempat tgl lahir (umur) : {form.ttlUmur || "-"}</p>
                <p>Suku / Bangsa : {form.sukuBangsa || "-"}</p>
                <p>Bahasa yang digunakan : {form.bahasaDigunakan || "-"}</p>
              </div>
            </div>

            <div className="pl-3 space-y-2">
              <p className="font-semibold">b. Identitas Orang Tua / Wali (inisial)</p>
              <table className="w-full border-collapse border border-slate-800 text-xs">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-800 p-1.5 text-left">Keterangan</th>
                    <th className="border border-slate-800 p-1.5 text-left">Ibu</th>
                    <th className="border border-slate-800 p-1.5 text-left">Ayah</th>
                    <th className="border border-slate-800 p-1.5 text-left">Wali</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { key: "nama", label: "Nama" },
                    { key: "usia", label: "Usia" },
                    { key: "pendidikan", label: "Pendidikan" },
                    { key: "pekerjaan", label: "Pekerjaan" },
                    { key: "agama", label: "Agama" },
                    { key: "sukuBangsa", label: "Suku / Bangsa" },
                  ].map((row) => (
                    <tr key={row.key}>
                      <td className="border border-slate-800 p-1.5 font-semibold">
                        {row.label}
                      </td>
                      <td className="border border-slate-800 p-1.5">
                        {form.ibu?.[row.key] || "-"}
                      </td>
                      <td className="border border-slate-800 p-1.5">
                        {form.ayah?.[row.key] || "-"}
                      </td>
                      <td className="border border-slate-800 p-1.5">
                        {form.wali?.[row.key] || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="pt-1">
                <span className="font-semibold">Alamat Rumah:</span>{" "}
                {form.alamatRumah || "-"}
              </p>
            </div>
          </div>

          {/* 2. Resume */}
          <div className="space-y-1">
            <h3 className="font-bold">2. Resume</h3>
            <p className="pl-3 whitespace-pre-line">{form.resume || "-"}</p>
          </div>

          {/* 3. Riwayat Kesehatan Masa Lalu */}
          <div className="space-y-2">
            <h3 className="font-bold">3. Riwayat Kesehatan Masa Lalu</h3>
            <div className="pl-3 space-y-2">
              <p className="font-semibold">
                a. Riwayat Kehamilan dan Kelahiran
              </p>
              <div className="pl-3 space-y-1 text-xs">
                <p>
                  <span className="font-semibold">Antenatal:</span> Hiperemesis ({form.antenatal?.hiperemesis}), Perdarahan ({form.antenatal?.perdarahan}), Anemia ({form.antenatal?.anemia}), Infeksi ({form.antenatal?.penyakitInfeksi}), Pre-eklamsi ({form.antenatal?.preeklamsi}), Gangguan lain ({form.antenatal?.gangguanLain || "-"}). Periksa teratur: {form.antenatal?.periksaTeratur} oleh {form.antenatal?.diperiksaOleh || "-"}, Hasil: {form.antenatal?.hasilPeriksa || "-"}, Imunisasi: {form.antenatal?.imunisasiTt || "-"}, Obat hamil: {form.antenatal?.riwayatObatHamil || "-"}.
                </p>
                <p>
                  <span className="font-semibold">Masa Natal:</span> Usia kehamilan {form.natal?.usiaKehamilan || "-"}, Cara persalinan: {form.natal?.caraPersalinan || "-"}, Ditolong oleh: {form.natal?.ditolongOleh || "-"}, Keadaan lahir: {form.natal?.keadaanSaatLahir || "-"}, BB/PB/LK: {form.natal?.bbPbLkLahir || "-"}, Pengobatan: {form.natal?.pengobatanLahir || "-"}.
                </p>
                <p>
                  <span className="font-semibold">Neonatal:</span> Cacat kongenital ({form.neonatal?.cacatKongenital}), Ikterus ({form.neonatal?.ikterus}), Kejang ({form.neonatal?.kejang}), Paralisis ({form.neonatal?.paralisis}), Perdarahan ({form.neonatal?.perdarahan}), Trauma lahir ({form.neonatal?.traumaPersalinan}), Penurunan BB: {form.neonatal?.penurunanBb || "-"}, ASI/Minum: {form.neonatal?.pemberianMinumAsi || "-"}, Lain-lain: {form.neonatal?.lainLain || "-"}.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                <p>
                  <span className="font-semibold">b. Pertumbuhan &amp; Perkembangan:</span>{" "}
                  {form.riwayatTumbuhKembang || "-"}
                </p>
                <p>
                  <span className="font-semibold">c. Penyakit Pernah Diderita:</span>{" "}
                  {form.penyakitPernahDiderita || "-"}
                </p>
                <p>
                  <span className="font-semibold">d. Pernah Dirawat di RS:</span>{" "}
                  {form.pernahDirawatRs || "-"}
                </p>
                <p>
                  <span className="font-semibold">e. Obat-obat:</span>{" "}
                  {form.obatObat || "-"}
                </p>
                <p>
                  <span className="font-semibold">f. Tindakan / Operasi:</span>{" "}
                  {form.tindakanOperasi || "-"}
                </p>
                <p>
                  <span className="font-semibold">g. Alergi:</span>{" "}
                  {form.alergi || "-"}
                </p>
                <p>
                  <span className="font-semibold">h. Kecelakaan:</span>{" "}
                  {form.kecelakaan || "-"}
                </p>
                <p>
                  <span className="font-semibold">i. Imunisasi:</span>{" "}
                  {form.imunisasi || "-"}
                </p>
              </div>

              <div className="pt-1 space-y-1 text-xs">
                <p className="font-semibold text-sm">
                  j. Kebiasaan Sehari-hari (Keadaan Sebelum Dirawat)
                </p>
                <p>
                  <span className="font-semibold">1) Nutrisi:</span> ASI ({k.asiLama || "-"}, {k.asiWaktu || "-"}), Susu buatan ({k.susuBuatanJenis || "-"}, kesulitan: {k.susuKesulitan || "-"}), Makanan padat mulai {k.padatMulai || "-"} ({k.padatCara || "-"}), Vitamin ({k.vitaminJenis || "-"}), Frek makan: {k.frekuensiMakan || "-"}, Jenis/disenangi: {k.jenisMakanan || "-"}, Alergi: {k.alergiMakanan || "-"}, Kebiasaan makan: {k.kebiasaanMakan || "-"}, Minum: {k.jumlahMinum || "-"}.
                </p>
                <p>
                  <span className="font-semibold">2) Pola Tidur:</span>{" "}
                  {k.lamaTidurSiangMalam || "-"} | Kebiasaan tidur: {k.kebiasaanMenjelangTidur || "-"}
                </p>
                <p>
                  <span className="font-semibold">3) Aktivitas / Bermain:</span>{" "}
                  {k.polaAktivitasBermain || "-"}
                </p>
                <p>
                  <span className="font-semibold">4) Kebersihan Diri:</span> Mandi {k.mandiFrek || "-"} (bantuan: {k.mandiOleh || "-"}), Oral hygiene {k.oralFrek || "-"}, Cuci rambut &amp; pakaian: {k.cuciRambutFrek || "-"}.
                </p>
                <p>
                  <span className="font-semibold">5) Eliminasi:</span> BAB ({k.babFrek || "-"}, {k.babKonsistensi || "-"}, keluhan: {k.babKeluhan || "-"}), BAK ({k.bakFrek || "-"}).
                </p>
                <p>
                  <span className="font-semibold">6) Kebiasaan Lain:</span>{" "}
                  {k.kebiasaanLain || "-"} | <span className="font-semibold">7) Pola Asuh:</span> {k.polaAsuh || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* 4. Riwayat Kesehatan Keluarga */}
          <div className="space-y-2">
            <h3 className="font-bold">4. Riwayat Kesehatan Keluarga</h3>
            <div className="pl-3 space-y-2">
              <p>
                <span className="font-semibold">a. Susunan Keluarga (Genogram):</span>{" "}
                {form.susunanKeluargaGenogram || "-"}
              </p>
              <table className="w-full border-collapse border border-slate-800 text-xs">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-800 p-1.5 text-left">Riwayat Penyakit</th>
                    <th className="border border-slate-800 p-1.5 text-left">Ayah / Ibu</th>
                    <th className="border border-slate-800 p-1.5 text-left">Saudara Kandung</th>
                    <th className="border border-slate-800 p-1.5 text-left">Anggota Keluarga Lain</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-800 p-1.5">1. Penyakit yang pernah diderita</td>
                    <td className="border border-slate-800 p-1.5">{rk.pernahAyahIbu || "-"}</td>
                    <td className="border border-slate-800 p-1.5">{rk.pernahSaudara || "-"}</td>
                    <td className="border border-slate-800 p-1.5">{rk.pernahLain || "-"}</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-800 p-1.5">2. Penyakit yang sedang diderita</td>
                    <td className="border border-slate-800 p-1.5">{rk.sedangAyahIbu || "-"}</td>
                    <td className="border border-slate-800 p-1.5">{rk.sedangSaudara || "-"}</td>
                    <td className="border border-slate-800 p-1.5">{rk.sedangLain || "-"}</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-800 p-1.5">3. Analisa faktor penyakit keturunan/menular</td>
                    <td className="border border-slate-800 p-1.5">{rk.analisaAyahIbu || "-"}</td>
                    <td className="border border-slate-800 p-1.5">{rk.analisaSaudara || "-"}</td>
                    <td className="border border-slate-800 p-1.5">{rk.analisaLain || "-"}</td>
                  </tr>
                </tbody>
              </table>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <p><span className="font-semibold">c. Coping keluarga:</span> {form.copingKeluarga || "-"}</p>
                <p><span className="font-semibold">d. Sistem Nilai:</span> {form.sistemNilai || "-"}</p>
                <p><span className="font-semibold">e. Spiritual:</span> {form.spiritual || "-"}</p>
              </div>
            </div>
          </div>

          {/* 5. Riwayat Kesehatan Lingkungan */}
          <div className="space-y-1">
            <h3 className="font-bold">5. Riwayat Kesehatan Lingkungan</h3>
            <div className="pl-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              <p><span className="font-semibold">a. Bahaya Kecelakaan (Rumah):</span> {form.bahayaRumah || "-"}</p>
              <p><span className="font-semibold">Lingkungan Rumah:</span> {form.bahayaLingkungan || "-"}</p>
              <p><span className="font-semibold">b. Polusi:</span> {form.polusiBahaya || "-"}</p>
              <p><span className="font-semibold">c. Tempat Bermain:</span> {form.tempatBermain || "-"}</p>
            </div>
          </div>

          {/* 6. Riwayat Kesehatan Sekarang & Pengkajian Fisik Fungsional */}
          <div className="space-y-3">
            <h3 className="font-bold">6. Riwayat Kesehatan Sekarang</h3>
            <div className="pl-3 space-y-1.5">
              <p className="font-semibold">a. Riwayat Penyakit Sekarang</p>
              <div className="pl-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                <p><span className="font-semibold">Tgl. mulai sakit:</span> {formatTanggalIndo(form.tglMulaiSakit)}</p>
                <p><span className="font-semibold">Cara masuk / Pukul:</span> {form.caraMasukPukul || "-"} (Dikirim oleh: {form.dikirimOleh || "-"})</p>
                <p className="sm:col-span-2"><span className="font-semibold">Keluhan utama:</span> {form.keluhanUtama || "-"}</p>
                <p><span className="font-semibold">1) Terjadinya:</span> {form.terjadinya || "-"}</p>
                <p><span className="font-semibold">2) Lamanya:</span> {form.lamanya || "-"}</p>
                <p><span className="font-semibold">3) Faktor pencetus:</span> {form.faktorPencetus || "-"}</p>
                <p><span className="font-semibold">4) Upaya mengurangi:</span> {form.upayaMengurangi || "-"}</p>
              </div>
            </div>

            {/* Tabel 6.b Pengkajian Fisik Secara Fungsional (DS vs DO) */}
            <div className="pl-3 space-y-2">
              <p className="font-semibold">b. Pengkajian Fisik Secara Fungsional</p>
              <table className="w-full border-collapse border border-slate-800 text-xs">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-800 p-2 text-center font-bold w-1/2">
                      DATA SUBYEKTIF
                      <span className="block font-normal text-[10px]">
                        (Diisi keluhan klien atau keluarga saat ini / saat pengkajian)
                      </span>
                    </th>
                    <th className="border border-slate-800 p-2 text-center font-bold w-1/2">
                      DATA OBYEKTIF
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* 1) Data Klinik */}
                  <tr className="align-top">
                    <td className="border border-slate-800 p-2.5 text-slate-600 italic">
                      (Keluhan utama sesuai bagian 6.a di atas)
                    </td>
                    <td className="border border-slate-800 p-2.5 space-y-1">
                      <p className="font-bold">1) Data Klinik:</p>
                      <p>a) Suhu: {f.suhu || "-"} | b) Nadi: {f.nadi || "-"}</p>
                      <p>c) Pernafasan: {f.pernafasan || "-"} | d) Tek. Darah: {f.tekananDarah || "-"}</p>
                      <p>e) Kesadaran: {f.kesadaran || "-"}</p>
                      <p>g) Lingk. Kepala: {f.lingkarKepala || "-"} | h) Lingk. Dada: {f.lingkarDada || "-"} | i) LILA: {f.lingkarLenganAtas || "-"}</p>
                    </td>
                  </tr>

                  {/* 2 - 9 Sistem */}
                  {[
                    { label: "2) Nutrisi dan metabolisme", ds: f.dsNutrisi, do: f.doNutrisi },
                    { label: "3) Respirasi / Sirkulasi", ds: f.dsRespirasi, do: f.doRespirasi },
                    { label: "4) Eliminasi", ds: f.dsEliminasi, do: f.doEliminasi },
                    { label: "5) Aktivitas / Latihan", ds: f.dsAktivitas, do: f.doAktivitas },
                    { label: "6) Sensori persepsi", ds: f.dsSensori, do: f.doSensori },
                    { label: "7) Konsep Diri", ds: f.dsKonsepDiri, do: f.doKonsepDiri },
                    { label: "8) Tidur / Istirahat", ds: f.dsTidur, do: f.doTidur },
                    { label: "9) Seksualitas / Reproduksi", ds: f.dsSeksualitas, do: f.doSeksualitas },
                  ].map((item) => (
                    <tr key={item.label} className="align-top">
                      <td className="border border-slate-800 p-2.5 whitespace-pre-line">
                        <span className="font-bold block mb-1">{item.label}</span>
                        {item.ds || "-"}
                      </td>
                      <td className="border border-slate-800 p-2.5 whitespace-pre-line">
                        <span className="font-bold block mb-1">{item.label}</span>
                        {item.do || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 6.c Dampak Hospitalisasi & 6.d Tingkat Perkembangan */}
            <div className="pl-3 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <p className="font-semibold">c. Dampak Hospitalisasi</p>
                <p className="pl-3">1) Pada Anak : {form.dampakHospitalisasiAnak || "-"}</p>
                <p className="pl-3">2) Pada Keluarga : {form.dampakHospitalisasiKeluarga || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">d. Tingkat Perkembangan Saat Ini</p>
                <p className="pl-3">1) Motorik kasar : {form.perkembanganMotorikKasar || "-"}</p>
                <p className="pl-3">2) Motorik halus : {form.perkembanganMotorikHalus || "-"}</p>
                <p className="pl-3">3) Bahasa : {form.perkembanganBahasa || "-"}</p>
                <p className="pl-3">4) Sosialisasi : {form.perkembanganSosialisasi || "-"}</p>
              </div>
            </div>
          </div>

          {/* 7. Pemeriksaan Penunjang & 8. Penatalaksanaan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h3 className="font-bold">7. Pemeriksaan Penunjang</h3>
              <p className="pl-3 whitespace-pre-line mt-1">
                {form.pemeriksaanPenunjang || "-"}
              </p>
            </div>
            <div>
              <h3 className="font-bold">8. Penatalaksanaan</h3>
              <p className="pl-3 whitespace-pre-line mt-1">
                {form.penatalaksanaan || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Blok Tanda Tangan Mahasiswa */}
        {mahasiswa?.isMahasiswa && (
          <div className="mt-10 flex justify-end">
            <div className="w-64 text-center text-sm">
              <p>
                {mahasiswa.ruang || form.ruang || "Ruang Perawatan"},{" "}
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
        title="Kirim Ringkasan Pengkajian Anak via WhatsApp"
      />
    </div>
  );
}