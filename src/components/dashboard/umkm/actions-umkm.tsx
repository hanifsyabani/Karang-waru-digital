'use client'

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import ModalDelete from "../modal-delete";
import ModalUmkm from "./modal-umkm";
import { DeleteUmkm } from "@/service/umkm";

export default function ActionsUmkm({ refetch, id }: { refetch: () => void, id: string }) {
    const [isLoading, setISLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const { mutate: deleteUmkm } = useMutation({
        mutationFn: () => DeleteUmkm(id),
        onSuccess: () => {
            setISLoading(false)
            toast.success('Umkm Berhasil Dihapus', {
                theme: "colored"
            })
            setIsOpen(false)
            refetch()
        },
        onError: () => {
            setISLoading(false)
            toast.error('Umkm Gagal Dihapus', {
                theme: "colored"
            })
        }
    })
    return (
        <>
            <div className="flex items-center gap-2">
                <div>
                    <ModalUmkm task="detail" id={id} refetch={refetch} />
                </div>
                <div>
                    <ModalUmkm task="edit" id={id} refetch={refetch} />
                </div>
                <div>
                    <Button className="bg-red-500 text-white hover:bg-red-800 cursor-pointer" onClick={() => setIsOpen(true)}>
                        <Trash />
                    </Button>
                </div>
            </div>

            <ModalDelete title="UMKM" isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading} setIsLoading={setISLoading} onDelete={() => deleteUmkm()} />
        </>
    )
}
