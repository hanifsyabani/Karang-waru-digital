'use client'

import { GetAllBerita, GetCountNewsByCategory } from "@/service/news";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Loader from "@/components/ui/loader";
import { ColumnBerita, getColumns } from "./column-news";
import { DataTable } from "@/components/ui/data-tabe";
import ModalBerita from "./modal-news";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounced";
import PaginationComponent from "@/components/pagination";


const LIMIT = 10;
export default function TableNews() {
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);

    const debouncedSearch = useDebounce(searchQuery, 500);

    const { data: dataAllBerita, isLoading: isLoadingAllBerita, refetch } = useQuery({
        queryFn: () => GetAllBerita({
            page,
            query: debouncedSearch,
            limit: LIMIT,
        }),
        queryKey: ["dataBerita", debouncedSearch, page, LIMIT],
        placeholderData: keepPreviousData
    })

    const { data: dataCountNews, isLoading: isLoadingCountNews } = useQuery({
        queryFn: () => GetCountNewsByCategory(),
        queryKey: ['count-news']
    })

    const totalPage = dataCountNews ? Math.ceil(dataCountNews.data.total / LIMIT) : 1;

    const formattedBerita: ColumnBerita[] = Array.isArray(dataAllBerita?.data)
        ? dataAllBerita.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            content: item.content,
            image: item.image,
            writer: item.writer,
            date: item.date,
            status: item.status,
        }))
        : [];

    if (isLoadingAllBerita || isLoadingCountNews) return <Loader />

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div className="w-1/2">
                    <Input
                        placeholder={`Cari berdasarkan judul...`}
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className="max-w-xl"
                    />
                </div>
                <ModalBerita refetch={refetch} task="add" />
            </div>


            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-4">
                <div className="overflow-x-auto">
                    <DataTable data={formattedBerita} columns={getColumns(refetch)} />
                </div>
            </div>

            {dataCountNews && dataCountNews.data.total > 0 && (
                <PaginationComponent
                    page={page}
                    setPage={setPage}
                    totalPage={totalPage}
                />
            )}
        </div>
    )
}
