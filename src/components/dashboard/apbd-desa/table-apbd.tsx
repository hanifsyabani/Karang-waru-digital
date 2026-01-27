import { ApbdDesaType } from "@/types/apbd-type"
import { ColumnApbd, getColumns } from "./column-apbd"
import { DataTable } from "@/components/ui/data-tabe"
import { formatCurrency } from "@/lib/utils"

interface DataApbdProps {
  data?: ApbdDesaType[]
  refetch: () => void
}

export default function TableApbd({ data, refetch }: DataApbdProps) {

  const formattedApbd: ColumnApbd[] = Array.isArray(data) ? data.map((item) => ({
    id: item.id,
    tahun: Number(item.tahun),
    pendapatan_asli_desa: formatCurrency(item.pendapatan_asli_desa),
    transfer: formatCurrency(item.transfer),
    pendapatan_lain: formatCurrency(item.pendapatan_lain),
    belanja_pemerintahan: formatCurrency(item.belanja_pemerintahan),
    belanja_pembangunan: formatCurrency(item.belanja_pembangunan),
    belanja_pembinaan: formatCurrency(item.belanja_pembinaan),
    belanja_pemberdayaan: formatCurrency(item.belanja_pemberdayaan),
    belanja_takterduga: formatCurrency(item.belanja_takterduga),
    penerimaan_pembiayaan: formatCurrency(item.penerimaan_pembiayaan),
    pengeluaran_pembiayaan: formatCurrency(item.pengeluaran_pembiayaan),
    total_pendapatan: formatCurrency(item.total_pendapatan),
    total_belanja: formatCurrency(item.total_belanja),
    surplus_defisit: formatCurrency(item.surplus_defisit),
    status: item.status,
    keterangan: item.keterangan,
    file_lampiran: item.file_lampiran,
    created_at: item.created_at,
    updated_at: item.updated_at,
  })) : []


  return (
    // <div className="overflow-x-auto">

      <DataTable data={formattedApbd} columns={getColumns(refetch)} />
    // </div>
  )
}
