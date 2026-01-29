'use client'

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import ModalDelete from "../modal-delete";
import ModalLembagaPendidikan from "./modal-lembaga-pendidikan";
import { DeleteLembagaPendidikan, DeleteProgramPendidikan, DeleteStatistikPendidikan } from "@/service/education";
import ModalStatistikPendidikan from "./modal-statistik-pendidikan";
import ModalProgramPendidikan from "./modal-program-pendidikan";

interface ActionsPendidikanProps {
    refetch: () => void,
    id: string,
    tab: string
}

export default function ActionsPendidikan({ refetch, id, tab }: ActionsPendidikanProps) {
    const [isLoading, setISLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const { mutate: deleteLembagaPendidikan } = useMutation({
        mutationFn: () => DeleteLembagaPendidikan(id),
        onSuccess: () => {
            setISLoading(false)
            toast.success('Lembaga Pendidikan Berhasil Dihapus', {
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

     const { mutate: deleteStatistikPendidikan } = useMutation({
        mutationFn: () => DeleteStatistikPendidikan(id),
        onSuccess: () => {
            setISLoading(false)
            toast.success('Statistik Pendidikan Berhasil Dihapus', {
                theme: "colored"
            })
            setIsOpen(false)
            refetch()
        },
        onError: () => {
            setISLoading(false)
            toast.error('Data Gagal Dihapus', {
                theme: "colored"
            })
        }
    })
     const { mutate: deleteProgramPendidikan } = useMutation({
        mutationFn: () => DeleteProgramPendidikan(id),
        onSuccess: () => {
            setISLoading(false)
            toast.success('Program Pendidikan Berhasil Dihapus', {
                theme: "colored"
            })
            setIsOpen(false)
            refetch()
        },
        onError: () => {
            setISLoading(false)
            toast.error('Data Gagal Dihapus', {
                theme: "colored"
            })
        }
    })

    function onDelete() {
        if (tab === "lembaga") {
            deleteLembagaPendidikan()
        } else if (tab === "statistik") {
            deleteStatistikPendidikan()
        } else if (tab === "program") {
            deleteProgramPendidikan()
        }
    }
    return (
        <>
            <div className="flex items-center gap-2">
                {tab === "lembaga" ? (
                    <ModalLembagaPendidikan task="edit" id={id} refetch={refetch} />
                ) : tab === "statistik" ? (
                    <ModalStatistikPendidikan task="edit" id={id} refetch={refetch} />
                ) : tab === "program" ? (
                    <ModalProgramPendidikan task="edit" id={id} refetch={refetch} />
                ) : null}
                <div>
                    <Button className="bg-red-500 text-white hover:bg-red-800 cursor-pointer" onClick={() => setIsOpen(true)}>
                        <Trash />
                    </Button>
                </div>
            </div>

            <ModalDelete title={`${tab} Pendidikan`} isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading} setIsLoading={setISLoading} onDelete={() => onDelete()} />
        </>
    )
}
