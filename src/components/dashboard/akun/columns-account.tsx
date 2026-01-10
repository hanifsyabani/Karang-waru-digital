"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionsAccount from "./actions-account";

export type ColumnAccount = {
  id: string;
  name: string;
  email: string;
  role: string;
  
  //   isVerified: boolean;
};

export const getColumns = ({ refetch }: { refetch: () => void }): ColumnDef<ColumnAccount>[] => [
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
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => (
      <>
        <ActionsAccount
          userId={row.original.id}
          refetch={refetch}
        />
      </>
    ),
  },
];
