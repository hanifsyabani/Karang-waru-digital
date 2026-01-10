'use client'

import { Button } from "@/components/ui/button";
import ModalAccount from "./modal-account";
import { Trash } from "lucide-react";
import ModalDelete from "../modal-delete";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { DeleteAccount } from "@/service/akun";
import { toast } from "react-toastify";


interface ActionsAccountProps {
    userId: string;
    refetch: () => void;
}

export default function ActionsAccount({
    userId,
    refetch
}: ActionsAccountProps) {
    const [isLoading, setIsLoading] =useState(false);
    const [isOpen, setIsOpen] = useState(false);

   const {mutate: deleteAccount} = useMutation({
    mutationFn: async () => {
        setIsLoading(true);
        await DeleteAccount(userId);
    },
    onSuccess: () => {
        setIsLoading(false);
        setIsOpen(false);
        refetch();
        toast.success("Akun berhasil dihapus", {
            theme: "colored"
        });
    },
    onError: (error: any) => {
        setIsLoading(false);
        toast.error(error.message, {
            theme: "colored"
        });
    }
   })
    return (
        <>
            <div className="flex items-center gap-2">
                <div>
                    <ModalAccount task="detail" id={userId} refetch={refetch} />
                </div>
                <div>
                    <ModalAccount task="edit" id={userId} refetch={refetch} />
                </div>
                <div>
                    <Button className="bg-red-500 text-white hover:bg-red-800 cursor-pointer" onClick={() => setIsOpen(true)}>
                        <Trash />
                    </Button>
                </div>
            </div>

            <ModalDelete title="Account" isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading} setIsLoading={setIsLoading} onDelete={() => deleteAccount()} />
        </>
    )
}
