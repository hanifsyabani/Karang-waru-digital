'use client'

import { GetProfile } from "@/service/auth"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function ProtectedAdminLayout({
    children
}: {
    children: React.ReactNode
}) {

    const router = useRouter()

    const { data: dataProfile, isLoading} = useQuery({
        queryFn: () => GetProfile(),
        queryKey: ['profile-user'],
    })

    useEffect(() => {
        if (!isLoading && dataProfile?.data?.role === 'user') {
            router.replace('/user') // replace lebih aman untuk guard
        }
    }, [isLoading, dataProfile, router])

    if (isLoading) return null

    if (dataProfile?.data?.role === 'user') return null

    return children

}
