'use client'

import { DataTable } from "@/components/ui/data-tabe";
import { LayananDesa } from "@/types";
import { useState } from "react";
import { getColumns } from "./column-layanan";

interface ActiveServiceProps {
    dataAllLayanan: LayananDesa[];
}

export default function ActiveService({ dataAllLayanan }: ActiveServiceProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    // Get unique categories
    const categories = ["all", ...Array.from(new Set(dataAllLayanan.map(item => item.category).filter(Boolean)))];

    // Filter services
    const filteredServices = dataAllLayanan.filter(service => {
        const matchCategory = selectedCategory === "all" || service.category === selectedCategory;
        const matchSearch = service.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategory && matchSearch;
    });

    // Stats
 
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Kelola Layanan Desa
                            </h1>
                            <p className="text-gray-600">
                                Manage dan monitor semua layanan yang tersedia
                            </p>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Tambah Layanan
                        </button>
                    </div>

                    {/* Stats Cards */}
                  
                </div>

                {/* Filters and Search */}
             

               

                {/* Footer Info */}
                {filteredServices.length > 0 && (
                    <div className="mt-6 text-center text-sm text-gray-500">
                        Menampilkan {filteredServices.length} dari {dataAllLayanan.length} total layanan
                    </div>
                )}
            </div>
        </div>
    );
}