"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import ActionsUmkm from "./actions-umkm";

export type ColumnUmkm = {
    id: string;
    nama_usaha: string;
    kategori: string;
    gambar: string;
    pemilik: string;
    deskripsi: string;
    status: string;
};

export const getColumns = (
    refetch: () => void
): ColumnDef<ColumnUmkm>[] => [
        {
            id: "image",
            cell: ({ row }) => {
                const image = row.original.gambar;
                return image ? (
                    <Image
                        src={image}
                        width={100}
                        height={100}
                        alt={row.original.gambar || "No title"}
                    />
                ) : (
                    <span className="text-gray-400 italic">No Image</span>
                );
            },
        },
        {
            accessorKey: "nama_usaha",
            header: "Nama Usaha",
        },
        {
            accessorKey: "pemilik",
            header: "Pemilik",
        },
        {
            accessorKey: "date",
            header: "Tanggal",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <>
                    {row.original.status === "verified" ? (
                        <Badge className="text-white bg-green-600">
                            Terverifikasi
                        </Badge>
                    ) : row.original.status === "unverified" ? (
                        <Badge className="text-white bg-red-600">
                            Tidak Terverifikasi
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
                    <ActionsUmkm refetch={refetch} id={row.original.id} />
                </>
            ),
        },
    ];
