"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionsPendidikan from "./actions-pendidikan";
import { Badge } from "@/components/ui/badge";

export type ColumnStatistikPendidikan = {
    id: string;
    tahun: string;
    tidak_sekolah: number;
    sd: number;
    smp: number;
    sma: number;
    perguruan_tinggi: number;
};

export const getColumns = (
    refetch: () => void
): ColumnDef<ColumnStatistikPendidikan>[] => [

       
        {
            accessorKey: "tahun",
            header: "Tahun",
            cell : ({row}) => (
                <Badge className="text-white bg-gray-600">{row.original.tahun}</Badge>
            )
        },
        {
            accessorKey: "tidak_sekolah",
            header: "Tidak Sekolah",
        },
        {
            accessorKey: "sd",
            header: "SD",
        },
        {
            accessorKey: "smp",
            header: "SMP",
        },
        {
            accessorKey: "sma",
            header: "SMA",
        },
        {
            accessorKey: "perguruan_tinggi",
            header: "Perguruan Tinggi",
        },
        {
            id: "actions",
            header: "Aksi",
            cell: ({ row }) => (
                <>
                    <ActionsPendidikan refetch={refetch} id={row.original.id} tab="statistik" />
                </>
            ),
        },
    ];
