
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

interface ModalDeleteProps {
    isOpen: boolean;
    title : string;
    setIsOpen: (isOpen: boolean) => void;
    isLoading: boolean;
    onDelete: () => void;
    setIsLoading: (isLoading: boolean) => void;
}

export default function ModalDelete({ isOpen, title, setIsOpen, isLoading, onDelete, setIsLoading }: ModalDeleteProps) {

    function handleDelete() {
        setIsLoading(true);
        onDelete();
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>

            <DialogContent className="max-w-xl overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>
                        Hapus {title}
                    </DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button
                        className="bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        {isLoading ? <span className="loader"></span> : `Hapus ${title}`}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}
