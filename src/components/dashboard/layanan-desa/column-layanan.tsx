"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import ActionsLayanan from "./actions-layanan";

export type ColumnLayanan = {
    id: string;
    service_name: string;
    description: string;
    image: string;
    status: string;
    category: string;
    estimated_time: string;
    cost: string;
    created_at: string;
};

export const getColumns = (
    refetch: () => void
): ColumnDef<ColumnLayanan>[] => [
        {
            id: "image",
            cell: ({ row }) => {
                const image = row.original.image;
                return image ? (
                    <Image
                        src={image}
                        width={50}
                        height={50}
                        alt={row.original.service_name || "No title"}
                    />
                ) : (
                    <span className="text-gray-400 italic">No Image</span>
                );
            },
        },
        {
            accessorKey: "service_name",
            header: "Nama Layanan",
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
                    <ActionsLayanan refetch={refetch} id={row.original.id} />
                </>
            ),
        },
    ];
