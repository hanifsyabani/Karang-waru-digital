import { GetAllBerita } from "@/service/berita";
import ModalAddBerita from "./modal-add-berita";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/ui/loader";

export default function TableBerita() {
    const { data: dataAllBerita, isLoading: isLoadingAllBerita ,refetch } = useQuery({
        queryFn: () => GetAllBerita(),
        queryKey: ["berita"],
    })

    console.log(dataAllBerita);

    if (isLoadingAllBerita) return <Loader/>
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Kelola Berita</h2>
                    <p className="text-gray-600 mt-2">Manage and organize your news articles</p>
                </div>
                <ModalAddBerita refetch = {refetch} />
            </div>



            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">

                </div>
            </div>
        </div>
    )
}
