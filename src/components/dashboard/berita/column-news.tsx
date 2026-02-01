"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import ActionsBerita from "./actions-news";

export type ColumnBerita = {
    id: string;
    title: string;
    content: string;
    image: string;
    writer: string;
    date: string;
    status: string;
};

export const getColumns = (
    refetch: () => void
): ColumnDef<ColumnBerita>[] => [
        {
            id: "image",
            cell: ({ row }) => {
                const image = row.original.image;
                return image ? (
                    <Image
                        src={image}
                        width={50}
                        height={50}
                        alt={row.original.title || "No title"}
                    />
                ) : (
                    <span className="text-gray-400 italic">No Image</span>
                );
            },
        },
        {
            accessorKey: "title",
            header: "Judul",
        },
        {
            accessorKey: "writer",
            header: "Penulis",
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
                        <Badge className="text-white bg-gray-500">
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
                    <ActionsBerita refetch={refetch} id={row.original.id} />
                </>
            ),
        },
    ];
