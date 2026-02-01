import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import React from "react";

interface PaginationProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalPage: number;
}

export default function PaginationComponent({
    page,
    setPage,
    totalPage,
}: PaginationProps) {
    return (
        <Pagination className="my-4">
            <PaginationContent >
                {page > 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            className='text-primary cursor-pointer'
                            // Saat diklik, ubah page menjadi page sebelumnya, tapi jangan pernah kurang dari 1
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        />
                    </PaginationItem>
                )}
                {Array.from({ length: totalPage }, (_, i) => i + 1).map((p) => (
                    <PaginationItem key={p} onClick={() => setPage(p)} className='cursor-pointer'>
                        <PaginationLink isActive={p === page} className="hover:bg-primary">{p}</PaginationLink>
                    </PaginationItem>
                ))}
                {page !== totalPage && (
                    <PaginationItem>
                        <PaginationNext
                            className='text-primary cursor-pointer'
                            // Saat diklik, ubah page menjadi page berikutnya, tapi jangan pernah lebih dari totalPage
                            onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}
