import TableAccount from "@/components/dashboard/akun/table-account";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Akun",
};

export default function page() {
    return (
        <div className="bg-white rounded-xl p-4">
            <TableAccount />
        </div>
    )
}
