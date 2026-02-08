import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pendidikan",
};


import { GraduationCap } from 'lucide-react';
import PendidikanView from "@/components/dashboard/pendidikan/pendidikan";
import OverviewStats from "@/components/dashboard/pendidikan/overview-stats";

export default function page() {

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-green-700 rounded-xl">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                Pendidikan
              </h1>
              <p className="text-gray-500 mt-2">Desa Karang Waru - Manajemen Data Pendidikan</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Tahun Ajaran</p>
              <p className="text-xl font-bold text-green-600">2024/2025</p>
            </div>
          </div>
        </div>
        <OverviewStats />
        <PendidikanView />
      </div>
    </div>
  );
}
