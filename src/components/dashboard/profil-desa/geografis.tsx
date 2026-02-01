"use client";

import { useState } from "react";

export default function Geografis() {

    const [batasWilayah, setBatasWilayah] = useState([
        { arah: 'Utara', desaBatas: '' },
        { arah: 'Selatan', desaBatas: '' },
        { arah: 'Timur', desaBatas: '' },
        { arah: 'Barat', desaBatas: '' }
    ]);

    const handleBatasWilayahChange = (index : number, field: string, value: string,) => {
        setBatasWilayah(prev => prev.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        ));
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Geografis</h3>

            {/* Luas Wilayah */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Luas Wilayah (Km²)</label>
                    <input
                        type="number"
                        step="0.01"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Luas dalam kilometer persegi"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Luas Wilayah (Ha)</label>
                    <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Luas dalam hektare"
                    />
                </div>
            </div>

            <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3">Batas Wilayah</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {batasWilayah.map((batas, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Sebelah {batas.arah}</label>
                            <input
                                type="text"
                                value={batas.desaBatas}
                                onChange={(e) => handleBatasWilayahChange(index, 'desaBatas', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder={`Desa/wilayah sebelah ${batas.arah.toLowerCase()}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
