import Profil from '@/components/dashboard/profil-desa/profil'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profil",
};

export default function page() {
    return (
        <>
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Kelola Profil Desa</h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Kelola informasi lengkap profil Desa Karang Waru
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Profil />
        </>
    )
}
