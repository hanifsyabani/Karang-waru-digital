// types/apbd.ts
export type ApbdDesaType = {
  id: string
  tahun: string

  // Pendapatan Desa
  pendapatan_asli_desa: number
  transfer: number
  pendapatan_lain: number

  // Belanja Desa
  belanja_pemerintahan: number
  belanja_pembangunan: number
  belanja_pembinaan: number
  belanja_pemberdayaan: number
  belanja_takterduga: number

  // Pembiayaan Desa
  penerimaan_pembiayaan: number
  pengeluaran_pembiayaan: number

  // Total & Status
  total_pendapatan: number
  total_belanja: number
  surplus_defisit: number
  status: string

  // Metadata
  keterangan?: string
  file_lampiran?: string
  created_at: string
  updated_at: string
}


export type CommonInfoType = {
  id: number;
  alamat: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kode_pos: string;
  jumlah_penduduk: number;
  jumlah_laki: number;
  jumlah_perempuan: number;
  jumlah_kk: number;
  tahun_pembentukan: number;
  telepon: string;
  email: string;
}