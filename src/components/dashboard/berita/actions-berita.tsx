import { Button } from "@/components/ui/button";
import {  Trash } from "lucide-react";
import ModalBerita from "./modal-berita";

export default function ActionsBerita({ refetch, id }: { refetch: () => void, id:string}) {
    return (
        <div className="flex items-center gap-2">
            <div>
              <ModalBerita task="edit" id={id} refetch={refetch}/>
            </div>
            <div>
                <Button className="bg-red-500 text-white hover:bg-red-800 cursor-pointer">
                    <Trash />
                </Button>
            </div>
        </div>
    )
}
