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
                        width={50}
                        height={50}
                        alt={row.original.nama_usaha || "No title"}
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
                    <ActionsUmkm refetch={refetch} id={row.original.id} />
                </>
            ),
        },
    ];
