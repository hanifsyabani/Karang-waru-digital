import { ApbdDesaType } from "@/types/apbd-type"
import { ColumnApbd, getColumns } from "./column-apbd"
import { DataTable } from "@/components/ui/data-tabe"

interface DataApbdProps {
  data?: ApbdDesaType[]
  refetch : () => void 
}

export default function TableApbd({ data, refetch }: DataApbdProps) {

  const formattedApbd: ColumnApbd[] = Array.isArray(data) ? data.map((item) => ({
    id: item.id,
    tahun: Number(item.tahun),
    pendapatan_asli_desa: item.pendapatan_asli_desa,
    transfer: item.transfer,
    pendapatan_lain: item.pendapatan_lain,
    belanja_pemerintahan: item.belanja_pemerintahan,
    belanja_pembangunan: item.belanja_pembangunan,
    belanja_pembinaan: item.belanja_pembinaan,
    belanja_pemberdayaan: item.belanja_pemberdayaan,
    belanja_takterduga: item.belanja_takterduga,
    penerimaan_pembiayaan: item.penerimaan_pembiayaan,
    pengeluaran_pembiayaan: item.pengeluaran_pembiayaan,
    total_pendapatan: item.total_pendapatan,
    total_belanja: item.total_belanja,
    surplus_defisit: item.surplus_defisit,
    status: item.status,
    keterangan: item.keterangan,
    file_lampiran: item.file_lampiran,
    created_at: item.created_at,
    updated_at: item.updated_at,
  })) : []


  return (
    <div>

      <DataTable data={formattedApbd} columns={getColumns(refetch)} filterKey="tahun"/>
    </div>
  )
}
