export interface PengkajianAwal {
  isMahasiswaVokasi: boolean;
  // Data Mahasiswa (opsional jika bukan mahasiswa vokasi)
  namaMahasiswa: string;
  nim: string;
  ruangMahasiswa: string;
  tanggalMahasiswa: string;
  
  // Data Pengkajian Anak
  tanggalJamPengkajian: string;
  tanggalMasukRS: string;
  jamMasukRS: string;
  ruangAnak: string;
  nomorRegister: string;
  diagnosaMedis: string;
}

export interface AskepAnakData {
  pengkajianAwal: PengkajianAwal;

}