'use client'

import { GetProfile } from "@/service/auth"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function ProtectedUserLayout({
    children
}: {
    children: React.ReactNode
}) {

    const router = useRouter()

    const { data: dataProfile, isLoading } = useQuery({
        queryFn: () => GetProfile(),
        queryKey: ['profile-user'],
    })

    useEffect(() => {
        if (!isLoading && dataProfile?.data?.role === 'admin') {
            router.replace('/admin') // replace lebih aman untuk guard
        }
    }, [isLoading, dataProfile, router])

    if (isLoading) return null 

    // kalau admin → jangan render children
    if (dataProfile?.data?.role === 'admin') return null

    return children
}
