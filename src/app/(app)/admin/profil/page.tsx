import Profil from '@/components/dashboard/profil/profil'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil",
};

export default function page() {
    return (
        <>
            <Profil />
        </>
    )
}
