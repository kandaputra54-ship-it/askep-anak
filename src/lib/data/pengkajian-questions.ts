// =============================================================================
// TYPES
// =============================================================================

export type BabKey =
  | 'A. PENGKAJIAN'
  | 'B. DIAGNOSA KEPERAWATAN'
  | 'C. RENCANA KEPERAWATAN'
  | 'D. PELAKSANAAN'
  | 'E. EVALUASI';

export type FieldType =
  | 'text'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'textarea'
  | 'select';

export interface FieldConfig {
  id: string;
  bab: BabKey;
  cat: string;
  sub?: string;
  navCode?: string;
  navGroup?: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export type ToneKey = 'neutral' | 'violet' | 'blue' | 'teal' | 'emerald' | 'amber';

// =============================================================================
// TONE MAPPING — 5 warna per bab, section dalam bab ikut tone bab
// =============================================================================

export const BAB_TONE: Record<BabKey, ToneKey> = {
  'A. PENGKAJIAN': 'violet',
  'B. DIAGNOSA KEPERAWATAN': 'blue',
  'C. RENCANA KEPERAWATAN': 'teal',
  'D. PELAKSANAAN': 'amber',
  'E. EVALUASI': 'emerald',
};

export const CAT_TONE: Record<string, ToneKey> = {
  '0. IDENTITAS MAHASISWA': 'violet',
  'DATA ADMINISTRASI RS': 'violet',
  'A.1.a IDENTITAS KLIEN': 'violet',
  'A.1.b IDENTITAS ORANG TUA / WALI': 'violet',
  'A.2 RESUME': 'violet',
  'A.3.a RIWAYAT KEHAMILAN & KELAHIRAN': 'violet',
  'A.3.b-i RIWAYAT MEDIS & TUMBUH KEMBANG': 'violet',
  'A.3.j KEBIASAAN SEHARI-HARI (SEBELUM DIRAWAT)': 'violet',
  'A.4 & A.5 KELUARGA & LINGKUNGAN': 'violet',
  'A.6.a RIWAYAT PENYAKIT SEKARANG': 'violet',
  'A.6.b PENGKAJIAN FISIK FUNGSIONAL': 'violet',
  'A.6.c-d HOSPITALISASI & PERKEMBANGAN': 'violet',
  'A.7 PEMERIKSAAN PENUNJANG': 'violet',
  'A.8 PENATALAKSANAAN': 'violet',
  'A.9 DATA FOKUS': 'violet',
  'A.10 ANALISA DATA': 'violet',
  'B. DIAGNOSA KEPERAWATAN': 'blue',
  'C. RENCANA KEPERAWATAN': 'teal',
  'D. PELAKSANAAN (CATATAN KEPERAWATAN)': 'amber',
  'E. EVALUASI': 'emerald',
};

// Backward-compat: kalau ada file lain yang masih import CAT_COLORS
export const CAT_COLORS: Record<string, { badge: string; border: string; accent: string }> = {
  '0. IDENTITAS MAHASISWA': {
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    border: 'border-violet-200',
    accent: 'from-violet-600 to-indigo-600',
  },
  'DATA ADMINISTRASI RS': {
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    border: 'border-violet-200',
    accent: 'from-violet-600 to-indigo-600',
  },
  'A.1.a IDENTITAS KLIEN': {
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    border: 'border-violet-200',
    accent: 'from-violet-600 to-indigo-600',
  },
  'A.1.b IDENTITAS ORANG TUA / WALI': {
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    border: 'border-violet-200',
    accent: 'from-violet-600 to-indigo-600',
  },
  'A.2 RESUME': {
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    border: 'border-violet-200',
    accent: 'from-violet-600 to-indigo-600',
  },
  'A.3.a RIWAYAT KEHAMILAN & KELAHIRAN': {
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    border: 'border-violet-200',
    accent: 'from-violet-600 to-indigo-600',
  },
  'A.3.b-i RIWAYAT MEDIS & TUMBUH KEMBANG': {
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    border: 'border-violet-200',
    accent: 'from-violet-600 to-indigo-600',
  },
  'A.3.j KEBIASAAN SEHARI-HARI (SEBELUM DIRAWAT)': {
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    border: 'border-violet-200',
    accent: 'from-violet-600 to-indigo-600',
  },
  'A.4 & A.5 KELUARGA & LINGKUNGAN': {
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    border: 'border-violet-200',
    accent: 'from-violet-600 to-indigo-600',
  },
  'A.6.a RIWAYAT PENYAKIT SEKARANG': {
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    border: 'border-violet-200',
    accent: 'from-violet-600 to-indigo-600',
  },
  'A.6.b PENGKAJIAN FISIK FUNGSIONAL': {
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    border: 'border-violet-200',
    accent: 'from-violet-600 to-indigo-600',
  },
  'A.6.c-d HOSPITALISASI & PERKEMBANGAN': {
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    border: 'border-violet-200',
    accent: 'from-violet-600 to-indigo-600',
  },
  'A.7 PEMERIKSAAN PENUNJANG': {
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    border: 'border-violet-200',
    accent: 'from-violet-600 to-indigo-600',
  },
  'A.8 PENATALAKSANAAN': {
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    border: 'border-violet-200',
    accent: 'from-violet-600 to-indigo-600',
  },
  'A.9 DATA FOKUS': {
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    border: 'border-violet-200',
    accent: 'from-violet-600 to-indigo-600',
  },
  'A.10 ANALISA DATA': {
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    border: 'border-violet-200',
    accent: 'from-violet-600 to-indigo-600',
  },
  'B. DIAGNOSA KEPERAWATAN': {
    badge: 'bg-blue-100 text-blue-700 border-blue-200',
    border: 'border-blue-200',
    accent: 'from-blue-600 to-indigo-600',
  },
  'C. RENCANA KEPERAWATAN': {
    badge: 'bg-teal-100 text-teal-700 border-teal-200',
    border: 'border-teal-200',
    accent: 'from-teal-600 to-emerald-600',
  },
  'D. PELAKSANAAN (CATATAN KEPERAWATAN)': {
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    border: 'border-amber-200',
    accent: 'from-amber-500 to-orange-600',
  },
  'E. EVALUASI': {
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    border: 'border-emerald-200',
    accent: 'from-emerald-600 to-green-600',
  },
};

export const PENGKAJIAN_FIELDS: FieldConfig[] = [
  // =========================================================================
  // 0. IDENTITAS MAHASISWA (Khusus Mahasiswa Vokasi)
  // =========================================================================
  { id: 'namaMahasiswa', bab: 'A. PENGKAJIAN', cat: '0. IDENTITAS MAHASISWA', navCode: '1', navGroup: 'Data Awal', label: 'Nama Mahasiswa', type: 'text', required: true },
  { id: 'nim', bab: 'A. PENGKAJIAN', cat: '0. IDENTITAS MAHASISWA', navCode: '1', navGroup: 'Data Awal', label: 'NIM', type: 'text', required: true },
  { id: 'ruangMahasiswa', bab: 'A. PENGKAJIAN', cat: '0. IDENTITAS MAHASISWA', navCode: '1', navGroup: 'Data Awal', label: 'Ruang', type: 'text', required: true },
  { id: 'tanggalMahasiswa', bab: 'A. PENGKAJIAN', cat: '0. IDENTITAS MAHASISWA', navCode: '1', navGroup: 'Data Awal', label: 'Tanggal', type: 'date', required: true },

  // =========================================================================
  // HEADER ASUHAN KEPERAWATAN ANAK
  // =========================================================================
  { id: 'tanggalJamPengkajian', bab: 'A. PENGKAJIAN', cat: 'DATA ADMINISTRASI RS', navCode: '2', navGroup: 'Data Awal', label: 'Tanggal Pengkajian / Jam', type: 'datetime-local', required: true },
  { id: 'tanggalMasukRS', bab: 'A. PENGKAJIAN', cat: 'DATA ADMINISTRASI RS', navCode: '2', navGroup: 'Data Awal', label: 'Tanggal Masuk RS', type: 'date', required: true },
  { id: 'jamMasukRS', bab: 'A. PENGKAJIAN', cat: 'DATA ADMINISTRASI RS', navCode: '2', navGroup: 'Data Awal', label: 'Jam Masuk RS', type: 'time', required: true },
  { id: 'ruangAnak', bab: 'A. PENGKAJIAN', cat: 'DATA ADMINISTRASI RS', navCode: '2', navGroup: 'Data Awal', label: 'Ruang', type: 'text', required: true },
  { id: 'nomorRegister', bab: 'A. PENGKAJIAN', cat: 'DATA ADMINISTRASI RS', navCode: '2', navGroup: 'Data Awal', label: 'Nomor Register', type: 'text', required: true },
  { id: 'diagnosaMedis', bab: 'A. PENGKAJIAN', cat: 'DATA ADMINISTRASI RS', navCode: '2', navGroup: 'Data Awal', label: 'Diagnosa Medis', type: 'text', required: true },

  // =========================================================================
  // A.1 DATA BIOGRAFI (Klien & Orang Tua / Wali)
  // =========================================================================
  { id: 'namaKlien', bab: 'A. PENGKAJIAN', cat: 'A.1.a IDENTITAS KLIEN', navCode: '1a', navGroup: '1', label: 'Nama Klien (Inisial)', type: 'text', required: true },
  { id: 'namaPanggilan', bab: 'A. PENGKAJIAN', cat: 'A.1.a IDENTITAS KLIEN', navCode: '1a', navGroup: '1', label: 'Nama Panggilan', type: 'text' },
  { id: 'ttlUmur', bab: 'A. PENGKAJIAN', cat: 'A.1.a IDENTITAS KLIEN', navCode: '1a', navGroup: '1', label: 'Tempat, Tgl Lahir (Umur)', type: 'text', required: true },
  { id: 'jenisKelamin', bab: 'A. PENGKAJIAN', cat: 'A.1.a IDENTITAS KLIEN', navCode: '1a', navGroup: '1', label: 'Jenis Kelamin', type: 'select', options: ['Laki-laki', 'Perempuan'], required: true },
  { id: 'agamaKlien', bab: 'A. PENGKAJIAN', cat: 'A.1.a IDENTITAS KLIEN', navCode: '1a', navGroup: '1', label: 'Agama', type: 'text' },
  { id: 'sukuBangsaKlien', bab: 'A. PENGKAJIAN', cat: 'A.1.a IDENTITAS KLIEN', navCode: '1a', navGroup: '1', label: 'Suku / Bangsa', type: 'text' },
  { id: 'bahasaKlien', bab: 'A. PENGKAJIAN', cat: 'A.1.a IDENTITAS KLIEN', navCode: '1a', navGroup: '1', label: 'Bahasa yang digunakan', type: 'text' },
  { id: 'alamatKlien', bab: 'A. PENGKAJIAN', cat: 'A.1.a IDENTITAS KLIEN', navCode: '1a', navGroup: '1', label: 'Alamat Rumah (yang mudah dihubungi)', type: 'textarea' },

  // Ayah
  { id: 'namaAyah', bab: 'A. PENGKAJIAN', cat: 'A.1.b IDENTITAS ORANG TUA / WALI', sub: 'Ayah', navCode: '1b', navGroup: '1', label: 'Nama Ayah (Inisial)', type: 'text' },
  { id: 'usiaAyah', bab: 'A. PENGKAJIAN', cat: 'A.1.b IDENTITAS ORANG TUA / WALI', sub: 'Ayah', navCode: '1b', navGroup: '1', label: 'Usia Ayah', type: 'text' },
  { id: 'pendidikanAyah', bab: 'A. PENGKAJIAN', cat: 'A.1.b IDENTITAS ORANG TUA / WALI', sub: 'Ayah', navCode: '1b', navGroup: '1', label: 'Pendidikan Ayah', type: 'text' },
  { id: 'pekerjaanAyah', bab: 'A. PENGKAJIAN', cat: 'A.1.b IDENTITAS ORANG TUA / WALI', sub: 'Ayah', navCode: '1b', navGroup: '1', label: 'Pekerjaan Ayah', type: 'text' },
  { id: 'agamaAyah', bab: 'A. PENGKAJIAN', cat: 'A.1.b IDENTITAS ORANG TUA / WALI', sub: 'Ayah', navCode: '1b', navGroup: '1', label: 'Agama Ayah', type: 'text' },
  { id: 'sukuAyah', bab: 'A. PENGKAJIAN', cat: 'A.1.b IDENTITAS ORANG TUA / WALI', sub: 'Ayah', navCode: '1b', navGroup: '1', label: 'Suku/Bangsa Ayah', type: 'text' },
  // Ibu
  { id: 'namaIbu', bab: 'A. PENGKAJIAN', cat: 'A.1.b IDENTITAS ORANG TUA / WALI', sub: 'Ibu', navCode: '1b', navGroup: '1', label: 'Nama Ibu (Inisial)', type: 'text' },
  { id: 'usiaIbu', bab: 'A. PENGKAJIAN', cat: 'A.1.b IDENTITAS ORANG TUA / WALI', sub: 'Ibu', navCode: '1b', navGroup: '1', label: 'Usia Ibu', type: 'text' },
  { id: 'pendidikanIbu', bab: 'A. PENGKAJIAN', cat: 'A.1.b IDENTITAS ORANG TUA / WALI', sub: 'Ibu', navCode: '1b', navGroup: '1', label: 'Pendidikan Ibu', type: 'text' },
  { id: 'pekerjaanIbu', bab: 'A. PENGKAJIAN', cat: 'A.1.b IDENTITAS ORANG TUA / WALI', sub: 'Ibu', navCode: '1b', navGroup: '1', label: 'Pekerjaan Ibu', type: 'text' },
  { id: 'agamaIbu', bab: 'A. PENGKAJIAN', cat: 'A.1.b IDENTITAS ORANG TUA / WALI', sub: 'Ibu', navCode: '1b', navGroup: '1', label: 'Agama Ibu', type: 'text' },
  { id: 'sukuIbu', bab: 'A. PENGKAJIAN', cat: 'A.1.b IDENTITAS ORANG TUA / WALI', sub: 'Ibu', navCode: '1b', navGroup: '1', label: 'Suku/Bangsa Ibu', type: 'text' },
  // Wali
  { id: 'namaWali', bab: 'A. PENGKAJIAN', cat: 'A.1.b IDENTITAS ORANG TUA / WALI', sub: 'Wali', navCode: '1b', navGroup: '1', label: 'Nama Wali (Inisial)', type: 'text' },
  { id: 'usiaWali', bab: 'A. PENGKAJIAN', cat: 'A.1.b IDENTITAS ORANG TUA / WALI', sub: 'Wali', navCode: '1b', navGroup: '1', label: 'Usia Wali', type: 'text' },
  { id: 'pendidikanWali', bab: 'A. PENGKAJIAN', cat: 'A.1.b IDENTITAS ORANG TUA / WALI', sub: 'Wali', navCode: '1b', navGroup: '1', label: 'Pendidikan Wali', type: 'text' },
  { id: 'pekerjaanWali', bab: 'A. PENGKAJIAN', cat: 'A.1.b IDENTITAS ORANG TUA / WALI', sub: 'Wali', navCode: '1b', navGroup: '1', label: 'Pekerjaan Wali', type: 'text' },
  { id: 'agamaWali', bab: 'A. PENGKAJIAN', cat: 'A.1.b IDENTITAS ORANG TUA / WALI', sub: 'Wali', navCode: '1b', navGroup: '1', label: 'Agama Wali', type: 'text' },
  { id: 'sukuWali', bab: 'A. PENGKAJIAN', cat: 'A.1.b IDENTITAS ORANG TUA / WALI', sub: 'Wali', navCode: '1b', navGroup: '1', label: 'Suku/Bangsa Wali', type: 'text' },

  // =========================================================================
  // A.2 RESUME
  // =========================================================================
  {
    id: 'resumeKeperawatan',
    bab: 'A. PENGKAJIAN',
    cat: 'A.2 RESUME',
    navCode: '2',
    navGroup: '2',
    label: 'Resume (Data fokus lalu, masalah & tindakan keperawatan sebelum pengkajian)',
    type: 'textarea',
  },

  // =========================================================================
  // A.3 RIWAYAT KESEHATAN MASA LALU
  // =========================================================================
  { id: 'antenatalKesehatan', bab: 'A. PENGKAJIAN', cat: 'A.3.a RIWAYAT KEHAMILAN & KELAHIRAN', sub: 'Antenatal', navCode: '3a', navGroup: '3', label: 'Kesehatan ibu waktu hamil (Hiperemesis, Perdarahan, Anemia, Infeksi, Pre-eklamsi, dll)', type: 'textarea' },
  { id: 'antenatalPemeriksaan', bab: 'A. PENGKAJIAN', cat: 'A.3.a RIWAYAT KEHAMILAN & KELAHIRAN', sub: 'Antenatal', navCode: '3a', navGroup: '3', label: 'Pemeriksaan kehamilan (Teratur/tidak, diperiksa oleh, tempat, hasil, imunisasi)', type: 'textarea' },
  { id: 'antenatalPengobatan', bab: 'A. PENGKAJIAN', cat: 'A.3.a RIWAYAT KEHAMILAN & KELAHIRAN', sub: 'Antenatal', navCode: '3a', navGroup: '3', label: 'Riwayat pengobatan selama kehamilan', type: 'text' },
  { id: 'natalUsiaKehamilan', bab: 'A. PENGKAJIAN', cat: 'A.3.a RIWAYAT KEHAMILAN & KELAHIRAN', sub: 'Masa Natal', navCode: '3a', navGroup: '3', label: 'Usia kehamilan saat kelahiran', type: 'text' },
  { id: 'natalCaraPersalinan', bab: 'A. PENGKAJIAN', cat: 'A.3.a RIWAYAT KEHAMILAN & KELAHIRAN', sub: 'Masa Natal', navCode: '3a', navGroup: '3', label: 'Cara persalinan (Normal / Tindakan) & Ditolong oleh', type: 'text' },
  { id: 'natalKeadaanBayi', bab: 'A. PENGKAJIAN', cat: 'A.3.a RIWAYAT KEHAMILAN & KELAHIRAN', sub: 'Masa Natal', navCode: '3a', navGroup: '3', label: 'Keadaan bayi saat lahir, BB, PB, Lingkar kepala & Pengobatan yang didapat', type: 'textarea' },
  { id: 'neonatalKondisi', bab: 'A. PENGKAJIAN', cat: 'A.3.a RIWAYAT KEHAMILAN & KELAHIRAN', sub: 'Neonatal', navCode: '3a', navGroup: '3', label: 'Kondisi neonatal (Cacat kongenital, ikterus, kejang, paralisis, perdarahan, trauma, penurunan BB, pemberian ASI, dll)', type: 'textarea' },

  { id: 'tumbuhKembang', bab: 'A. PENGKAJIAN', cat: 'A.3.b-i RIWAYAT MEDIS & TUMBUH KEMBANG', navCode: '3b', navGroup: '3', label: 'b. Riwayat Pertumbuhan dan Perkembangan (Apakah ada gangguan, jelaskan)', type: 'textarea' },
  { id: 'penyakitPernahDiderita', bab: 'A. PENGKAJIAN', cat: 'A.3.b-i RIWAYAT MEDIS & TUMBUH KEMBANG', navCode: '3b', navGroup: '3', label: 'c. Penyakit-penyakit yang pernah diderita', type: 'text' },
  { id: 'pernahDirawatRS', bab: 'A. PENGKAJIAN', cat: 'A.3.b-i RIWAYAT MEDIS & TUMBUH KEMBANG', navCode: '3b', navGroup: '3', label: 'd. Pernah dirawat di Rumah Sakit', type: 'text' },
  { id: 'riwayatObat', bab: 'A. PENGKAJIAN', cat: 'A.3.b-i RIWAYAT MEDIS & TUMBUH KEMBANG', navCode: '3b', navGroup: '3', label: 'e. Obat-obat yang pernah dikonsumsi', type: 'text' },
  { id: 'riwayatTindakan', bab: 'A. PENGKAJIAN', cat: 'A.3.b-i RIWAYAT MEDIS & TUMBUH KEMBANG', navCode: '3b', navGroup: '3', label: 'f. Tindakan (misalnya: operasi)', type: 'text' },
  { id: 'riwayatAlergi', bab: 'A. PENGKAJIAN', cat: 'A.3.b-i RIWAYAT MEDIS & TUMBUH KEMBANG', navCode: '3b', navGroup: '3', label: 'g. Alergi', type: 'text' },
  { id: 'riwayatKecelakaan', bab: 'A. PENGKAJIAN', cat: 'A.3.b-i RIWAYAT MEDIS & TUMBUH KEMBANG', navCode: '3b', navGroup: '3', label: 'h. Kecelakaan', type: 'text' },
  { id: 'riwayatImunisasi', bab: 'A. PENGKAJIAN', cat: 'A.3.b-i RIWAYAT MEDIS & TUMBUH KEMBANG', navCode: '3b', navGroup: '3', label: 'i. Imunisasi', type: 'textarea' },

  { id: 'kebiasaanNutrisi', bab: 'A. PENGKAJIAN', cat: 'A.3.j KEBIASAAN SEHARI-HARI (SEBELUM DIRAWAT)', navCode: '3c', navGroup: '3', label: '1) Pola pemenuhan nutrisi (ASI/Susu buatan, Makanan padat, Vitamin, Pola makan & minum)', type: 'textarea' },
  { id: 'kebiasaanTidur', bab: 'A. PENGKAJIAN', cat: 'A.3.j KEBIASAAN SEHARI-HARI (SEBELUM DIRAWAT)', navCode: '3c', navGroup: '3', label: '2) Pola tidur (Lama siang/malam, kelainan, kebiasaan menjelang & saat tidur)', type: 'textarea' },
  { id: 'kebiasaanAktivitas', bab: 'A. PENGKAJIAN', cat: 'A.3.j KEBIASAAN SEHARI-HARI (SEBELUM DIRAWAT)', navCode: '3c', navGroup: '3', label: '3) Pola aktivitas / Latihan / Olahraga / Bermain / Hobi', type: 'text' },
  { id: 'kebiasaanKebersihan', bab: 'A. PENGKAJIAN', cat: 'A.3.j KEBIASAAN SEHARI-HARI (SEBELUM DIRAWAT)', navCode: '3c', navGroup: '3', label: '4) Pola kebersihan diri (Mandi, Oral hygiene, Cuci rambut, Berpakaian)', type: 'textarea' },
  { id: 'kebiasaanEliminasi', bab: 'A. PENGKAJIAN', cat: 'A.3.j KEBIASAAN SEHARI-HARI (SEBELUM DIRAWAT)', navCode: '3c', navGroup: '3', label: '5) Pola eliminasi (BAB: frekuensi, warna, konsistensi, keluhan; BAK: frekuensi, warna, ngompol)', type: 'textarea' },
  { id: 'kebiasaanLain', bab: 'A. PENGKAJIAN', cat: 'A.3.j KEBIASAAN SEHARI-HARI (SEBELUM DIRAWAT)', navCode: '3c', navGroup: '3', label: '6) Kebiasaan lain (Menggigit jari/kuku, menghisap jari, mempermainkan genital, mudah marah, dll)', type: 'text' },
  { id: 'polaAsuh', bab: 'A. PENGKAJIAN', cat: 'A.3.j KEBIASAAN SEHARI-HARI (SEBELUM DIRAWAT)', navCode: '3c', navGroup: '3', label: '7) Pola asuh', type: 'text' },

  // =========================================================================
  // A.4 RIWAYAT KESEHATAN KELUARGA & A.5 LINGKUNGAN
  // =========================================================================
  { id: 'susunanKeluarga', bab: 'A. PENGKAJIAN', cat: 'A.4 & A.5 KELUARGA & LINGKUNGAN', sub: 'Riwayat Keluarga', navCode: '4', navGroup: '4', label: '4.a Susunan Keluarga (Genogram 3 generasi pada kasus tertentu)', type: 'textarea' },
  { id: 'riwayatPenyakitKeluarga', bab: 'A. PENGKAJIAN', cat: 'A.4 & A.5 KELUARGA & LINGKUNGAN', sub: 'Riwayat Keluarga', navCode: '4', navGroup: '4', label: '4.b Riwayat penyakit keluarga (Pernah/sedang diderita, faktor keturunan: ginjal, jantung, DM, hipertensi, kanker, alergi, dll)', type: 'textarea' },
  { id: 'copingNilaiSpiritual', bab: 'A. PENGKAJIAN', cat: 'A.4 & A.5 KELUARGA & LINGKUNGAN', sub: 'Riwayat Keluarga', navCode: '4', navGroup: '4', label: '4.c-e Coping keluarga, Sistem nilai, dan Spiritual', type: 'textarea' },
  { id: 'risikoLingkungan', bab: 'A. PENGKAJIAN', cat: 'A.4 & A.5 KELUARGA & LINGKUNGAN', sub: 'Riwayat Lingkungan', navCode: '4', navGroup: '4', label: '5.a-c Risiko bahaya kecelakaan (rumah & sekitar), Polusi, dan Tempat bermain', type: 'textarea' },

  // =========================================================================
  // A.6 RIWAYAT KESEHATAN SEKARANG & PENGKAJIAN FISIK
  // =========================================================================
  { id: 'tglMulaiSakit', bab: 'A. PENGKAJIAN', cat: 'A.6.a RIWAYAT PENYAKIT SEKARANG', navCode: '5', navGroup: '5', label: 'Tanggal mulai sakit', type: 'date' },
  { id: 'keluhanUtama', bab: 'A. PENGKAJIAN', cat: 'A.6.a RIWAYAT PENYAKIT SEKARANG', navCode: '5', navGroup: '5', label: 'Keluhan utama', type: 'textarea', required: true },
  { id: 'detailPenyakitSekarang', bab: 'A. PENGKAJIAN', cat: 'A.6.a RIWAYAT PENYAKIT SEKARANG', navCode: '5', navGroup: '5', label: 'Terjadinya, lamanya, faktor pencetus, dan upaya untuk mengurangi', type: 'textarea' },
  { id: 'caraWaktuMasuk', bab: 'A. PENGKAJIAN', cat: 'A.6.a RIWAYAT PENYAKIT SEKARANG', navCode: '5', navGroup: '5', label: 'Cara & waktu masuk (Dikirim oleh Dokter/Puskesmas/RS/Lainnya & Pukul)', type: 'text' },

  { id: 'dataKlinikDO', bab: 'A. PENGKAJIAN', cat: 'A.6.b PENGKAJIAN FISIK FUNGSIONAL', sub: '1) Data Klinik (DO)', navCode: '6a', navGroup: '6', label: 'Suhu, Nadi, Pernafasan, Tek. Darah, Kesadaran, Lingk. Kepala, Lingk. Dada, LILA', type: 'textarea' },
  { id: 'nutrisiDSDO', bab: 'A. PENGKAJIAN', cat: 'A.6.b PENGKAJIAN FISIK FUNGSIONAL', sub: '2) Nutrisi & Metabolisme', navCode: '6a', navGroup: '6', label: 'DS (Nafsu makan, BB, diet, intake, mual/muntah) & DO (Mukosa mulut, gigi, BB/TB, kulit, NGT)', type: 'textarea' },
  { id: 'respirasiDSDO', bab: 'A. PENGKAJIAN', cat: 'A.6.b PENGKAJIAN FISIK FUNGSIONAL', sub: '3) Respirasi & Sirkulasi', navCode: '6a', navGroup: '6', label: 'DS (Sesak, sputum, batuk, sakit dada, edema) & DO (Suara nafas, sianosis, otot bantu, CRT, suhu)', type: 'textarea' },
  { id: 'eliminasiDSDO', bab: 'A. PENGKAJIAN', cat: 'A.6.b PENGKAJIAN FISIK FUNGSIONAL', sub: '4) Eliminasi', navCode: '6a', navGroup: '6', label: 'DS & DO (Abdomen: bising usus, lingkar perut; BAB; BAK: kateter, warna; Rektum/anus)', type: 'textarea' },
  { id: 'aktivitasDSDO', bab: 'A. PENGKAJIAN', cat: 'A.6.b PENGKAJIAN FISIK FUNGSIONAL', sub: '5) Aktivitas / Latihan', navCode: '6a', navGroup: '6', label: 'DS (Kekuatan, pemenuhan ADL, nyeri sendi) & DO (Keseimbangan, kekuatan genggam, bentuk/otot kaki, kejang)', type: 'textarea' },
  { id: 'sensoriKonsepTidurSeks', bab: 'A. PENGKAJIAN', cat: 'A.6.b PENGKAJIAN FISIK FUNGSIONAL', sub: '6-9) Sensori, Konsep Diri, Tidur & Reproduksi', navCode: '6a', navGroup: '6', label: 'DS & DO (Pendengaran, penglihatan, pupil, konjungtiva, kontak mata, gangguan tidur, seksualitas/reproduksi)', type: 'textarea' },

  { id: 'dampakHospitalisasi', bab: 'A. PENGKAJIAN', cat: 'A.6.c-d HOSPITALISASI & PERKEMBANGAN', navCode: '6b', navGroup: '6', label: '6.c Dampak Hospitalisasi (Pada Anak & Pada Keluarga)', type: 'textarea' },
  { id: 'tingkatPerkembangan', bab: 'A. PENGKAJIAN', cat: 'A.6.c-d HOSPITALISASI & PERKEMBANGAN', navCode: '6b', navGroup: '6', label: '6.d Tingkat Perkembangan Saat Ini (Motorik kasar, Motorik halus, Bahasa, Sosialisasi)', type: 'textarea' },

  // =========================================================================
  // A.7 - A.10 PENUNJANG, PENATALAKSANAAN, DATA FOKUS & ANALISA DATA
  // =========================================================================
  { id: 'pemeriksaanPenunjang', bab: 'A. PENGKAJIAN', cat: 'A.7 PEMERIKSAAN PENUNJANG', navCode: '7', navGroup: '7', label: '7. Pemeriksaan Penunjang (Diagnostik yang menunjang masalah)', type: 'textarea' },
  { id: 'penatalaksanaan', bab: 'A. PENGKAJIAN', cat: 'A.8 PENATALAKSANAAN', navCode: '8', navGroup: '8', label: '8. Penatalaksanaan (Terapi / pengobatan termasuk diet)', type: 'textarea' },
  { id: 'dataFokus', bab: 'A. PENGKAJIAN', cat: 'A.9 DATA FOKUS', navCode: '9', navGroup: '9', label: '9. Data Fokus (Cp.1.A - Data Subyektif & Data Obyektif)', type: 'textarea' },
  { id: 'analisaData', bab: 'A. PENGKAJIAN', cat: 'A.10 ANALISA DATA', navCode: '10', navGroup: '10', label: '10. Analisa Data (Cp.1-B - Data DS/DO, Masalah, Etiologi)', type: 'textarea' },

  // =========================================================================
  // B. DIAGNOSA KEPERAWATAN
  // =========================================================================
  { id: 'dxNo', bab: 'B. DIAGNOSA KEPERAWATAN', cat: 'B. DIAGNOSA KEPERAWATAN', navCode: '1', navGroup: '1', label: 'No. Diagnosa', type: 'text', placeholder: 'Contoh: Dx 1, Dx 2' },
  { id: 'dxDiagnosa', bab: 'B. DIAGNOSA KEPERAWATAN', cat: 'B. DIAGNOSA KEPERAWATAN', navCode: '1', navGroup: '1', label: 'Diagnosa Keperawatan (diisi berdasarkan prioritas masalah)', type: 'textarea' },
  { id: 'dxTglDitemukan', bab: 'B. DIAGNOSA KEPERAWATAN', cat: 'B. DIAGNOSA KEPERAWATAN', navCode: '1', navGroup: '1', label: 'Tanggal Ditemukan', type: 'date' },
  { id: 'dxTglTeratasi', bab: 'B. DIAGNOSA KEPERAWATAN', cat: 'B. DIAGNOSA KEPERAWATAN', navCode: '1', navGroup: '1', label: 'Tanggal Teratasi', type: 'date' },
  { id: 'dxParafNama', bab: 'B. DIAGNOSA KEPERAWATAN', cat: 'B. DIAGNOSA KEPERAWATAN', navCode: '1', navGroup: '1', label: 'Paraf dan Nama Jelas', type: 'text' },

  // =========================================================================
  // C. RENCANA KEPERAWATAN
  // =========================================================================
  { id: 'renTanggal', bab: 'C. RENCANA KEPERAWATAN', cat: 'C. RENCANA KEPERAWATAN', navCode: '1', navGroup: '1', label: 'Tanggal', type: 'date' },
  { id: 'renNoDx', bab: 'C. RENCANA KEPERAWATAN', cat: 'C. RENCANA KEPERAWATAN', navCode: '1', navGroup: '1', label: 'No. Diagnosa', type: 'text' },
  { id: 'renDiagnosaPES', bab: 'C. RENCANA KEPERAWATAN', cat: 'C. RENCANA KEPERAWATAN', navCode: '1', navGroup: '1', label: 'Diagnosa Keperawatan (PES - diisi berdasarkan prioritas)', type: 'textarea' },
  { id: 'renTujuanKriteria', bab: 'C. RENCANA KEPERAWATAN', cat: 'C. RENCANA KEPERAWATAN', navCode: '1', navGroup: '1', label: 'Tujuan dan Kriteria Hasil', type: 'textarea' },
  { id: 'renTindakan', bab: 'C. RENCANA KEPERAWATAN', cat: 'C. RENCANA KEPERAWATAN', navCode: '1', navGroup: '1', label: 'Rencana Tindakan (Independen & Interdependen)', type: 'textarea' },
  { id: 'renParafNama', bab: 'C. RENCANA KEPERAWATAN', cat: 'C. RENCANA KEPERAWATAN', navCode: '1', navGroup: '1', label: 'Paraf dan Nama Jelas', type: 'text' },

  // =========================================================================
  // D. PELAKSANAAN (CATATAN KEPERAWATAN)
  // =========================================================================
  { id: 'pelHariTanggal', bab: 'D. PELAKSANAAN', cat: 'D. PELAKSANAAN (CATATAN KEPERAWATAN)', navCode: '1', navGroup: '1', label: 'Hari, Tanggal', type: 'text', placeholder: 'Contoh: Kamis, 19 November 2026' },
  { id: 'pelWaktu', bab: 'D. PELAKSANAAN', cat: 'D. PELAKSANAAN (CATATAN KEPERAWATAN)', navCode: '1', navGroup: '1', label: 'Waktu', type: 'time' },
  { id: 'pelNoDx', bab: 'D. PELAKSANAAN', cat: 'D. PELAKSANAAN (CATATAN KEPERAWATAN)', navCode: '1', navGroup: '1', label: 'No. Dx.', type: 'text' },
  { id: 'pelTindakanHasil', bab: 'D. PELAKSANAAN', cat: 'D. PELAKSANAAN (CATATAN KEPERAWATAN)', navCode: '1', navGroup: '1', label: 'Tindakan Keperawatan dan Hasil', type: 'textarea' },
  { id: 'pelParafNama', bab: 'D. PELAKSANAAN', cat: 'D. PELAKSANAAN (CATATAN KEPERAWATAN)', navCode: '1', navGroup: '1', label: 'Paraf dan Nama Jelas', type: 'text' },

  // =========================================================================
  // E. EVALUASI
  // =========================================================================
  { id: 'evalNoDx', bab: 'E. EVALUASI', cat: 'E. EVALUASI', navCode: '1', navGroup: '1', label: 'No. Dx.', type: 'text' },
  { id: 'evalHariTglJam', bab: 'E. EVALUASI', cat: 'E. EVALUASI', navCode: '1', navGroup: '1', label: 'Hari / Tanggal / Jam', type: 'datetime-local' },
  { id: 'evalSOAP', bab: 'E. EVALUASI', cat: 'E. EVALUASI', navCode: '1', navGroup: '1', label: 'Evaluasi Hasil (SOAP - Mengacu pada tujuan)', type: 'textarea', placeholder: 'S:\nO:\nA:\nP:' },
  { id: 'evalParafNama', bab: 'E. EVALUASI', cat: 'E. EVALUASI', navCode: '1', navGroup: '1', label: 'Paraf dan Nama Jelas', type: 'text' },
];