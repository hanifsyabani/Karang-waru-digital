import TableAkun from "@/components/dashboard/akun/table-akun";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Akun",
};

export default function page() {
    return (
        <div className="bg-white rounded-xl p-4">
            <TableAkun />
        </div>
    )
}
