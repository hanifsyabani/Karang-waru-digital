"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ColumnAkun = {
    id: string;
    name: string;
    email: string;
    role: string;

    //   isVerified: boolean;
};

export const getColumns = (): ColumnDef<ColumnAkun>[] => [
    {
        accessorKey: "name",
        header: "Nama",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },

    //   {
    //     id: "id",
    //     header: "Status",
    //     cell: ({ row }) => (
    //       <div>
    //         {row.original.isVerified ? (
    //           <Badge className="text-white bg-green-600">Terverifikasi</Badge>
    //         ) : (
    //           <Badge variant="destructive" className="text-white bg-gray-600">
    //             Tidak Terverifikasi
    //           </Badge>
    //         )}
    //       </div>
    //     ),
    //   },
    //   {
    //     id: "actions",
    //     header: "Aksi",
    //     cell: ({ row }) => (
    //       <>
    //         <ActionsAccount
    //           isVerified={row.original.isVerified}
    //           userId={row.original.id}
    //           refetch={refetch}
    //         />
    //       </>
    //     ),
    //   },
];
