import { GetAllBerita } from "@/service/berita";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/ui/loader";
import { ColumnBerita, getColumns } from "./column-berita";
import { DataTable } from "@/components/ui/data-tabe";
import ModalBerita from "./modal-berita";

export default function TableBerita() {
    const { data: dataAllBerita, isLoading: isLoadingAllBerita, refetch } = useQuery({
        queryFn: () => GetAllBerita(),
        queryKey: ["berita"],
    })


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



    if (isLoadingAllBerita) return <Loader />
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Kelola Berita</h2>
                </div>
                <ModalBerita refetch={refetch} task="add" />
            </div>



            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-4">
                <div className="overflow-x-auto">
                    <DataTable data={formattedBerita} columns={getColumns(refetch)} filterKey="title" />
                </div>
            </div>
        </div>
    )
}
