
import { Users, Home } from 'lucide-react';
import ButtonPenduduk from '@/components/dashboard/penduduk/button-residents';
import { Metadata } from 'next';
import TableResidents from '@/components/dashboard/penduduk/table-residents';
import StatResidents from '@/components/dashboard/penduduk/stats-residents';

export const metadata: Metadata = {
    title: "Penduduk",
};

export default function page() {
    return (
        <>
            <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Data Penduduk</h1>
                            <p className="text-emerald-100 mt-1">Desa Karang Waru</p>
                        </div>
                        <ButtonPenduduk />
                    </div>
                </div>
            </div>

            <StatResidents/>
            <TableResidents/>
        </>
    );
};
