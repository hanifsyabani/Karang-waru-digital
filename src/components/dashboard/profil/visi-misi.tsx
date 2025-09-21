'use client'

import { Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

export default function VisiMisi() {
    const [misiData, setMisiData] = useState(['']);

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Visi dan Misi</h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Visi</label>
                <textarea
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    placeholder="Tuliskan visi desa..."
                />
            </div>

            <div>
                <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">Misi</label>
                    <button
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Tambah Misi
                    </button>
                </div>

                <div className="space-y-3">
                    {misiData.map((misi, index) => (
                        <div key={index} className="flex gap-2">
                            <div className="flex-1">
                                <textarea
                                    value={misi}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    rows={2}
                                    placeholder={`Misi ${index + 1}...`}
                                />
                            </div>
                            {misiData.length > 1 && (
                                <button
                                    className="p-2 text-red-600 hover:text-red-800 focus:outline-none"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
