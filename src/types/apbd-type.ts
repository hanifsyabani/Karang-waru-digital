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
