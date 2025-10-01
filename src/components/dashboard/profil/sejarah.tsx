import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GetInfoUmum, GetSejarah, PostSejarah } from "@/service/profil";
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

    const { data: dataInfoUmum, isLoading: isLoadingInfoUmum } = useQuery({
        queryFn: () => GetInfoUmum(),
        queryKey: ['info-umum'],
    })

    const { data: dataSejarah, isLoading: isLoadingSejarah } = useQuery({
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
        // if (dataDemografis?.data) {
        //     const demografis = dataDemografis.data;
        //     setMode('edit')
        //     setValue('profil_desa_Id',Number(demografis.profil_desa_id));
        //     setValue('balita', demografis.balita);
        //     setValue('anak', demografis.anak);
        //     setValue('dewasa', demografis.dewasa);
        //     setValue('lansia', demografis.lansia);
        //     setValue('pertanian', demografis.pertanian);
        //     setValue('perdagangan', demografis.perdagangan);
        //     setValue('jasa', demografis.jasa);
        //     setValue('industri', demografis.industri);
        //     setValue('sekolah', demografis.sekolah);
        //     setValue('puskesmas', demografis.puskesmas);
        //     setValue('masjid', demografis.masjid);
        //     setValue('pasar_tradisional', demografis.pasar_tradisional);
        //     setValue('pos_keamanan', demografis.pos_keamanan);
        //     setValue('balai_desa', demografis.balai_desa);
        // }
    }, [dataInfoUmum, setValue]);

    const { mutate: postSejarah } = useMutation({
        mutationFn: (data: FormFields) => PostSejarah(data),
        onSuccess: () => {
            setIsLoading(false);
            toast.success("Data sejarah desa berhasil disimpan");
        },
        onError: () => {
            setIsLoading(false);
            toast.error("Terjadi kesalahan saat menyimpan data sejarah desa");
        }
    })

    function onSubmit(data: FormFields) {
        setIsLoading(true);
        postSejarah(data);
    }

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
                <Button className="cursor-pointer">
                    {isLoading ? <span className="loader" /> : "Simpan Sejarah Desa"}
                </Button>
            </div>
        </form>
    )
}
