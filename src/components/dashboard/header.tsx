import { Plus } from 'lucide-react'
import React from 'react'

export default function HeaderDashboard() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
            <h1 className="text-xl font-semibold text-gray-800">
                Daftar Akun
            </h1>

            <div className="flex items-center gap-3 w-full sm:w-auto">
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 cursor-pointer transition text-sm font-medium">
                    <Plus className="h-4 w-4" />
                    Tambah Akun
                </button>
            </div>
        </div>
    )
}
