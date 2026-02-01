import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/loader";
import { Textarea } from "@/components/ui/textarea";
import { GetInfoUmum, GetSejarah, PostSejarah, PutSejarah } from "@/service/profile-village";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

const schema = z.object({
    profil_desa_id: z.number().min(1, { message: "ID Profil Desa harus diisi" }),
    body: z.string().min(10, { message: "Sejarah harus diisi minimal 10 karakter" })
})
type FormFields = z.infer<typeof schema>;

export default function Sejarah() {
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState<'create' | 'edit'>('create');

    const { data: dataInfoUmum, isLoading: isLoadingInfoUmum } = useQuery({
        queryFn: () => GetInfoUmum(),
        queryKey: ['info-umum'],
    })

    const { data: dataSejarah, isLoading: isLoadingSejarah, refetch } = useQuery({
        queryFn: () => GetSejarah(),
        queryKey: ['sejarah'],
    })

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(schema),
    })

    useEffect(() => {
        if (dataInfoUmum?.data?.id) {
            setValue('profil_desa_id', Number(dataInfoUmum.data.id));
        }
        if (dataSejarah?.data) {
            const sejarah = dataSejarah.data;
            setMode('edit')
            setValue('profil_desa_id', Number(sejarah.profil_desa_id));
            setValue('body', sejarah.body);
        }
    }, [dataInfoUmum, setValue, dataSejarah]);

    const { mutate: postSejarah } = useMutation({
        mutationFn: (data: FormFields) => PostSejarah(data),
        onSuccess: () => {
            setIsLoading(false);
            toast.success("Data sejarah desa berhasil disimpan");
            refetch();
        },
        onError: () => {
            setIsLoading(false);
            toast.error("Terjadi kesalahan saat menyimpan data sejarah desa");
        }
    })
    const { mutate: changeSejarah } = useMutation({
        mutationFn: (data: FormFields) => PutSejarah(data),
        onSuccess: () => {
            setIsLoading(false);
            toast.success("Data sejarah desa berhasil disimpan");
            refetch();
        },
        onError: () => {
            setIsLoading(false);
            toast.error("Terjadi kesalahan saat menyimpan data sejarah desa");
        }
    })

    function onSubmit(data: FormFields) {
        setIsLoading(true);
        if (mode === "edit") {
            changeSejarah(data)
        }
        else {
            postSejarah(data)
        }
    }


    if (isLoadingInfoUmum || isLoadingSejarah) return <Loader />

    return (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Sejarah Desa</h3>
            <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Sejarah Desa</Label>
                <Textarea
                    {...register("body")}
                    rows={20}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tuliskan sejarah lengkap desa, mulai dari asal usul, tokoh penting, peristiwa bersejarah, hingga perkembangan desa..."
                />
                {errors.body && <p className="text-sm text-red-600 mt-2">{errors.body.message}</p>}
            </div>

            <div className="flex justify-end">
                <Button className='cursor-pointer' type='submit' disabled={isLoading}>
                    {isLoading ? <span className="loader" /> : (
                        <>
                            {mode === 'edit' ? 'Simpan Perubahan' : 'Simpan Data'}
                        </>
                    )}
                </Button>
            </div>
        </form>
    )
}
