"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionsPendidikan from "./actions-pendidikan";
import { Badge } from "@/components/ui/badge";

export type ColumnProgramPendidikan = {
    id: string;
    nama_program: string
    deskripsi: string
    tanggal_selesai: string
    tanggal_mulai: string
    status: string
};

export const getColumns = (
    refetch: () => void
): ColumnDef<ColumnProgramPendidikan>[] => [
        {
            accessorKey: "nama_program",
            header: "Nama Program"
        },
        {
            accessorKey: "tanggal_mulai",
            header: "Tanggal Mulai"
        },
        {
            accessorKey: "tanggal_selesai",
            header: "Tanggal Selesai"
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <>
                    {row.original.status === "berjalan" ? (
                        <Badge className="text-white bg-blue-600">
                            {row.original.status}
                        </Badge>
                    ) : row.original.status === "perencanaan" ? (
                        <Badge className="text-white bg-neutral-600">
                            {row.original.status}
                        </Badge>
                    ) : row.original.status === "selesai" ? (
                        <Badge className="text-white bg-green-600">
                            {row.original.status}
                        </Badge>
                    ): (
                        <Badge className="text-white bg-gray-600">
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
                    <ActionsPendidikan refetch={refetch} id={row.original.id} tab="program" />
                </>
            ),
        },
    ];
