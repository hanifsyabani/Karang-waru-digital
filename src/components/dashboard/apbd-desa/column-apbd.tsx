"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import ActionsApbd from "./actions-apbd";

export type ColumnApbd = {
    id: string;
    tahun: number,
    pendapatan_asli_desa: string;
    transfer: string;
    pendapatan_lain: string;
    belanja_pemerintahan: string;
    belanja_pembangunan: string;
    belanja_pembinaan: string;
    belanja_pemberdayaan: string;
    belanja_takterduga: string;
    penerimaan_pembiayaan: string;
    pengeluaran_pembiayaan: string;
    total_pendapatan: string;
    total_belanja: string;
    surplus_defisit: string;
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
            accessorKey: "pendapatan_asli_desa",
            header: "Pendapatan Asli Desa",
        },
        {
            accessorKey: "total_pendapatan",
            header: "Total Pendapatan",
        },
        {
            accessorKey: "total_belanja",
            header: "Total Belanja",
        },
        {
            accessorKey: "surplus_defisit",
            header: "Surplus/Defisit",
        },
        {
            accessorKey: "keterangan",
            header: "Keterangan",
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
                        <Badge className="text-white bg-neutral-400">
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
