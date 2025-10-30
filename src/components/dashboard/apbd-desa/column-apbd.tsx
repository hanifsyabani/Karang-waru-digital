"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import ActionsApbd from "./actions-apbd";

export type ColumnApbd = {
    id: string;
    tahun : number,
    pendapatan_asli_desa: number;
    transfer: number;
    pendapatan_lain: number;
    belanja_pemerintahan: number;
    belanja_pembangunan: number;
    belanja_pembinaan: number;
    belanja_pemberdayaan: number;
    belanja_takterduga: number;
    penerimaan_pembiayaan: number;
    pengeluaran_pembiayaan: number;
    total_pendapatan: number;
    total_belanja: number;
    surplus_defisit: number;
    status: string;
    keterangan?: string;
    file_lampiran?: string;
    created_at: string;
    updated_at: string;

};

export const getColumns = (
    refetch: () => void
): ColumnDef<ColumnApbd>[] => [
        {
            accessorKey: "tahun",
            header: "Tahun",
        },
        {
            accessorKey: "description",
            header: "Deskripsi",
        },
        {
            accessorKey: "category",
            header: "Kategori",
        },
        {
            accessorKey: "estimated_time",
            header: "Estimasi Waktu",
        },
        {
            accessorKey: "cost",
            header: "Biaya",
        },
        {
            accessorKey: "created_at",
            header: "Tanggal",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <>
                    {row.original.status === "published" ? (
                        <Badge className="text-white bg-green-600">
                            Publish
                        </Badge>
                    ) : row.original.status === "draft" ? (
                        <Badge className="text-white bg-red-600">
                            Draft
                        </Badge>
                    ) : (
                        <Badge className="text-white bg-yellow-600">
                            {row.original.status}
                        </Badge>
                    )}
                </>
            ),
        },


        {
            id: "actions",
            header: "Aksi",
            cell: ({ row }) => (
                <>
                    <ActionsApbd refetch={refetch} id={row.original.id} />
                </>
            ),
        },
    ];
