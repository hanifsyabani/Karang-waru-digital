'use client'

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import ModalDelete from "../modal-delete";
import { DeleteLayanan } from "@/service/layanan";
import { DeleteApbd } from "@/service/apbd";
import ModalApbd from "./modal-apbd";

export default function ActionsApbd({ refetch, id }: { refetch: () => void, id: string }) {
    const [isLoading, setISLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const { mutate: deleteApbd } = useMutation({
        mutationFn: () => DeleteApbd(id),
        onSuccess: () => {
            setISLoading(false)
            toast.success('Apbd Berhasil Dihapus', {
                theme: "colored"
            })
            setIsOpen(false)
            refetch()
        },
        onError: () => {
            setISLoading(false)
            toast.error('Apbd Gagal Dihapus', {
                theme: "colored"
            })
        }
    })
    return (
        <>
            <div className="flex items-center gap-2">
                <div>
                    <ModalApbd task="edit" id={id} refetch={refetch} />
                </div>
                <div>
                    <Button className="bg-red-500 text-white hover:bg-red-800 cursor-pointer" onClick={() => setIsOpen(true)}>
                        <Trash />
                    </Button>
                </div>
            </div>

            <ModalDelete title="Apbd" isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading} setIsLoading={setISLoading} onDelete={() => deleteApbd()} />
        </>
    )
}
