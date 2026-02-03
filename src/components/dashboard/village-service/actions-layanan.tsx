'use client'

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import ModalDelete from "../modal-delete";
import ModalLayanan from "./modal-service-village";
import { DeleteLayanan } from "@/service/service";

export default function ActionsLayanan({ refetch, id }: { refetch: () => void, id: string }) {
    const [isLoading, setISLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const { mutate: deleteLayanan } = useMutation({
        mutationFn: () => DeleteLayanan(id),
        onSuccess: () => {
            setISLoading(false)
            toast.success('Layanan Berhasil Dihapus', {
                theme: "colored"
            })
            setIsOpen(false)
            refetch()
        },
        onError: () => {
            setISLoading(false)
            toast.error('Layanan Gagal Dihapus', {
                theme: "colored"
            })
        }
    })
    return (
        <>
            <div className="flex items-center gap-2">
                <div>
                    <ModalLayanan task="edit" id={id} refetch={refetch} />
                </div>
                <div>
                    <Button className="bg-red-500 text-white hover:bg-red-800 cursor-pointer" onClick={() => setIsOpen(true)}>
                        <Trash />
                    </Button>
                </div>
            </div>

            <ModalDelete title="Layanan" isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading} setIsLoading={setISLoading} onDelete={() => deleteLayanan()} />
        </>
    )
}
