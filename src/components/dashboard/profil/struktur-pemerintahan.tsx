'use client'

import { Plus, Trash2, Users } from 'lucide-react'
import React, { useState } from 'react'

export default function StrukturPemerintahan() {
  const [strukturPemerintahan, setStrukturPemerintahan] = useState([]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Struktur Pemerintahan</h3>
                <button
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Pejabat
                </button>
            </div>

            <div className="space-y-4">
                {strukturPemerintahan.map((pejabat, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="text-lg font-medium text-gray-800">Pejabat {index + 1}</h4>
                            <button
                                className="text-red-600 hover:text-red-800 focus:outline-none"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Foto</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {strukturPemerintahan.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p>Belum ada data struktur pemerintahan</p>
                        <p className="text-sm">Klik "Tambah Pejabat" untuk menambahkan data</p>
                    </div>
                )}
            </div>
        </div>
    )
}
