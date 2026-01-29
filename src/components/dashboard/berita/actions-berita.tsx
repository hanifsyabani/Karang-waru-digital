'use client'

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import ModalBerita from "./modal-berita";
import { useMutation } from "@tanstack/react-query";
import { DeleteBerita } from "@/service/news";
import { useState } from "react";
import { toast } from "react-toastify";
import ModalDelete from "../modal-delete";

export default function ActionsBerita({ refetch, id }: { refetch: () => void, id: string }) {
    const [isLoading, setISLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const { mutate: deleteBerita } = useMutation({
        mutationFn: () => DeleteBerita(id),
        onSuccess: () => {
            setISLoading(false)
            toast.success('Berita Berhasil Dihapus', {
                theme: "colored"
            })
            setIsOpen(false)
            refetch()
        },
        onError: () => {
            setISLoading(false)
            toast.error('Berita Gagal Dihapus', {
                theme: "colored"
            })
        }
    })
    return (
        <>
            <div className="flex items-center gap-2">
                <div>
                    <ModalBerita task="edit" id={id} refetch={refetch} />
                </div>
                <div>
                    <Button className="bg-red-500 text-white hover:bg-red-800 cursor-pointer" onClick={() => setIsOpen(true)}>
                        <Trash />
                    </Button>
                </div>
            </div>

            <ModalDelete title="Berita" isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading} setIsLoading={setISLoading} onDelete={() => deleteBerita()} />
        </>
    )
}
