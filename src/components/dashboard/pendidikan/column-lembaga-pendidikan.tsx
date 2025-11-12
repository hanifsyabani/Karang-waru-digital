"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionsPendidikan from "./actions-pendidikan";
import { Badge } from "@/components/ui/badge";

export type ColumnLembagaPendidikan = {
    id: string;
    nama_sekolah: string
    jenjang_pendidikan: string
    alamat: string
    jumlah_siswa: number
    jumlah_guru: number
    jumlah_staf: number
    kontak: string
};

export const getColumns = (
    refetch: () => void
): ColumnDef<ColumnLembagaPendidikan>[] => [

        {
            accessorKey: "nama_sekolah",
            header: "Nama Sekolah",
        },
        {
            accessorKey: "jenjang_pendidikan",
            header: "Jenjang Pendidikan",
            cell: ({ row }) => {
                const jenjang = row.original.jenjang_pendidikan;
                const color =
                    jenjang === "SD"
                        ? "bg-blue-100 text-blue-700"
                        : jenjang === "SMP"
                            ? "bg-green-100 text-green-700"
                            : jenjang === "SMA"
                                ? "bg-yellow-100 text-yellow-700"
                                : jenjang === "SMK"
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-purple-100 text-purple-700";

                return (
                    <Badge className={`${color} rounded-md px-2 py-1 text-xs font-medium`}>
                        {jenjang}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "alamat",
            header: "Alamat",
        },
        {
            accessorKey: "jumlah_siswa",
            header: "Jumlah Siswa",
        },
        {
            accessorKey: "jumlah_guru",
            header: "Jumlah Guru",
        },
        {
            accessorKey: "jumlah_staf",
            header: "Jumlah Staf",
        },
        {
            id: "actions",
            header: "Aksi",
            cell: ({ row }) => (
                <>
                    <ActionsPendidikan refetch={refetch} id={row.original.id} tab="lembaga" />
                </>
            ),
        },
    ];
