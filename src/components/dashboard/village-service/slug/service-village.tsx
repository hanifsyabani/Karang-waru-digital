'use client'

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, DollarSign, FileText, User, Phone, Mail, MapPin, Upload, CheckCircle, AlertCircle, Plus } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Tipe data layanan
interface LayananDesa {
    id: number
    service_name: string
    description: string
    category: string
    image: string
    slug: string
    status: string
    estimated_time: string
    cost: string
}

// Tipe data sub-layanan (misal: jenis-jenis surat)
interface SubLayanan {
    id: number
    nama: string
    persyaratan: string[]
    template?: string
}

// Data contoh sub-layanan untuk kategori surat menyurat
const subLayananSuratMenyurat: SubLayanan[] = [
    {
        id: 1,
        nama: "Surat Keterangan Domisili",
        persyaratan: ["KTP Asli", "KK Asli", "Surat Pengantar RT/RW"]
    },
    {
        id: 2,
        nama: "Surat Keterangan Usaha",
        persyaratan: ["KTP Asli", "KK Asli", "Foto Tempat Usaha", "Surat Pengantar RT/RW"]
    },
    {
        id: 3,
        nama: "Surat Keterangan Tidak Mampu (SKTM)",
        persyaratan: ["KTP Asli", "KK Asli", "Surat Pengantar RT/RW", "Surat Keterangan Penghasilan"]
    },
    {
        id: 4,
        nama: "Surat Pengantar SKCK",
        persyaratan: ["KTP Asli", "KK Asli", "Pas Foto 4x6 (2 lembar)", "Surat Pengantar RT/RW"]
    },
    {
        id: 5,
        nama: "Surat Keterangan Kelahiran",
        persyaratan: ["KTP Kedua Orang Tua", "KK Asli", "Surat Keterangan Lahir dari Bidan/RS", "Buku Nikah"]
    },
    {
        id: 6,
        nama: "Surat Keterangan Kematian",
        persyaratan: ["KTP Ahli Waris", "KK Asli", "Surat Keterangan Kematian dari RT/RW", "KTP Almarhum"]
    },
    {
        id: 7,
        nama: "Surat Keterangan Pindah",
        persyaratan: ["KTP Asli", "KK Asli", "Surat Pengantar RT/RW", "Surat Keterangan Pindah dari Desa Asal"]
    },
    {
        id: 8,
        nama: "Surat Keterangan Belum Menikah",
        persyaratan: ["KTP Asli", "KK Asli", "Surat Pengantar RT/RW", "Pas Foto 4x6"]
    }
]

export default function ServiceVillage() {
    const params = useParams()
    const { slug } = params

    // State management
    const [layanan, setLayanan] = useState<LayananDesa | null>(null)
    const [subLayanan, setSubLayanan] = useState<SubLayanan[]>([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    // Form state
    const [formData, setFormData] = useState({
        jenis_layanan: '',
        nama_lengkap: '',
        nik: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        alamat: '',
        rt: '',
        rw: '',
        no_telp: '',
        email: '',
        keperluan: '',
        catatan: '',
        files: [] as File[]
    })

    // Fetch data layanan
    useEffect(() => {
        const fetchLayanan = async () => {
            try {
                // Simulasi API call
                // const response = await fetch(`/api/layanan/${slug}`)
                // const data = await response.json()

                // Data dummy untuk demonstrasi
                const dummyData: LayananDesa = {
                    id: 1,
                    service_name: "Layanan Surat Menyurat",
                    description: "Layanan pembuatan berbagai macam surat keterangan dan administrasi desa. Proses cepat dan mudah dengan persyaratan yang jelas.",
                    category: "Administrasi",
                    image: "/images/surat.png",
                    slug: slug as string,
                    status: "Published",
                    estimated_time: "1-3 Hari Kerja",
                    cost: "Gratis"
                }

                setLayanan(dummyData)

                // Set sub-layanan berdasarkan kategori
                if (slug === 'surat-menyurat') {
                    setSubLayanan(subLayananSuratMenyurat)
                }

                setLoading(false)
            } catch (error) {
                console.error('Error fetching layanan:', error)
                setLoading(false)
            }
        }

        fetchLayanan()
    }, [slug])

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // Handle select change
    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // Handle file upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData(prev => ({
                ...prev,
                files: Array.from(e.target.files || [])
            }))
        }
    }

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setSubmitStatus('idle')

        try {
            await new Promise(resolve => setTimeout(resolve, 2000))

            setSubmitStatus('success')

            // Reset form setelah berhasil
            setTimeout(() => {
                setFormData({
                    jenis_layanan: '',
                    nama_lengkap: '',
                    nik: '',
                    tempat_lahir: '',
                    tanggal_lahir: '',
                    jenis_kelamin: '',
                    alamat: '',
                    rt: '',
                    rw: '',
                    no_telp: '',
                    email: '',
                    keperluan: '',
                    catatan: '',
                    files: []
                })
                setSubmitStatus('idle')
            }, 3000)

        } catch (error) {
            console.error('Error submitting form:', error)
            setSubmitStatus('error')
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (!layanan) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Layanan tidak ditemukan</h1>
                    <p className="text-gray-600 mt-2">Silakan kembali ke halaman utama</p>
                </div>
            </div>
        )
    }

    const selectedSubLayanan = subLayanan.find(sub => sub.id.toString() === formData.jenis_layanan)

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex justify-between items-center gap-2 mb-4">
                        <div className="flex gap-2">
                            <Badge variant="secondary" className="text-white">{layanan.category}</Badge>
                            <Badge variant={layanan.status === 'Published' ? 'default' : 'outline'}>
                                {layanan.status}
                            </Badge>
                        </div>
                        <Button className="cursor-pointer">
                            <Plus/>
                            Tambah 
                        </Button>

                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {layanan.service_name}
                    </h1>

                    <p className="text-gray-600 text-lg mb-6">
                        {layanan.description}
                    </p>

                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="text-sm text-gray-500">Estimasi Waktu</p>
                                <p className="font-semibold text-gray-900">{layanan.estimated_time}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            <div>
                                <p className="text-sm text-gray-500">Biaya</p>
                                <p className="font-semibold text-gray-900">{layanan.cost}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Jenis Layanan
                                </CardTitle>
                                <CardDescription>
                                    Pilih jenis surat yang ingin dibuat
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {subLayanan.map((sub) => (
                                        <button
                                            key={sub.id}
                                            onClick={() => handleSelectChange('jenis_layanan', sub.id.toString())}
                                            className={`w-full cursor-pointer text-left px-4 py-3 rounded-lg border transition-all ${formData.jenis_layanan === sub.id.toString()
                                                ? 'border-green-600 bg-green-50 text-green-900'
                                                : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <p className="font-medium">{sub.nama}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {sub.persyaratan.length} persyaratan
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Persyaratan */}
                        {selectedSubLayanan && (
                            <Card className="mt-4">
                                <CardHeader>
                                    <CardTitle className="text-base">Persyaratan Dokumen</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {selectedSubLayanan.persyaratan.map((req, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-gray-700">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Form Pengajuan */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Form Pengajuan Layanan</CardTitle>
                                <CardDescription>
                                    Lengkapi data di bawah ini untuk mengajukan layanan
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {submitStatus === 'success' && (
                                    <Alert className="mb-6 border-green-200 bg-green-50">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <AlertDescription className="text-green-800">
                                            Pengajuan berhasil dikirim! Kami akan memproses permohonan Anda.
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {submitStatus === 'error' && (
                                    <Alert className="mb-6 border-red-200 bg-red-50">
                                        <AlertCircle className="h-4 w-4 text-red-600" />
                                        <AlertDescription className="text-red-800">
                                            Terjadi kesalahan. Silakan coba lagi.
                                        </AlertDescription>
                                    </Alert>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Jenis Layanan */}
                                    <div>
                                        <Label htmlFor="jenis_layanan">Jenis Layanan *</Label>
                                        <Select
                                            value={formData.jenis_layanan}
                                            onValueChange={(value) => handleSelectChange('jenis_layanan', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih jenis layanan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {subLayanan.map((sub) => (
                                                    <SelectItem key={sub.id} value={sub.id.toString()}>
                                                        {sub.nama}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Data Pemohon */}
                                    <div className="border-t pt-6">
                                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <User className="w-5 h-5" />
                                            Data Pemohon
                                        </h3>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="nama_lengkap">Nama Lengkap *</Label>
                                                <Input
                                                    id="nama_lengkap"
                                                    name="nama_lengkap"
                                                    value={formData.nama_lengkap}
                                                    onChange={handleInputChange}
                                                    placeholder="Masukkan nama lengkap"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="nik">NIK *</Label>
                                                <Input
                                                    id="nik"
                                                    name="nik"
                                                    value={formData.nik}
                                                    onChange={handleInputChange}
                                                    placeholder="16 digit NIK"
                                                    maxLength={16}
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="tempat_lahir">Tempat Lahir *</Label>
                                                <Input
                                                    id="tempat_lahir"
                                                    name="tempat_lahir"
                                                    value={formData.tempat_lahir}
                                                    onChange={handleInputChange}
                                                    placeholder="Kota kelahiran"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="tanggal_lahir">Tanggal Lahir *</Label>
                                                <Input
                                                    id="tanggal_lahir"
                                                    name="tanggal_lahir"
                                                    type="date"
                                                    value={formData.tanggal_lahir}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="jenis_kelamin">Jenis Kelamin *</Label>
                                                <Select
                                                    value={formData.jenis_kelamin}
                                                    onValueChange={(value) => handleSelectChange('jenis_kelamin', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih jenis kelamin" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="L">Laki-laki</SelectItem>
                                                        <SelectItem value="P">Perempuan</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Alamat */}
                                    <div className="border-t pt-6">
                                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <MapPin className="w-5 h-5" />
                                            Alamat
                                        </h3>

                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="alamat">Alamat Lengkap *</Label>
                                                <Textarea
                                                    id="alamat"
                                                    name="alamat"
                                                    value={formData.alamat}
                                                    onChange={handleInputChange}
                                                    placeholder="Masukkan alamat lengkap"
                                                    rows={3}
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="rt">RT *</Label>
                                                    <Input
                                                        id="rt"
                                                        name="rt"
                                                        value={formData.rt}
                                                        onChange={handleInputChange}
                                                        placeholder="001"
                                                        maxLength={3}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="rw">RW *</Label>
                                                    <Input
                                                        id="rw"
                                                        name="rw"
                                                        value={formData.rw}
                                                        onChange={handleInputChange}
                                                        placeholder="001"
                                                        maxLength={3}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Kontak */}
                                    <div className="border-t pt-6">
                                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <Phone className="w-5 h-5" />
                                            Kontak
                                        </h3>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="no_telp">No. Telepon/HP *</Label>
                                                <Input
                                                    id="no_telp"
                                                    name="no_telp"
                                                    value={formData.no_telp}
                                                    onChange={handleInputChange}
                                                    placeholder="08xxxxxxxxxx"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="email@example.com"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Keperluan */}
                                    <div className="border-t pt-6">
                                        <div>
                                            <Label htmlFor="keperluan">Keperluan *</Label>
                                            <Textarea
                                                id="keperluan"
                                                name="keperluan"
                                                value={formData.keperluan}
                                                onChange={handleInputChange}
                                                placeholder="Jelaskan keperluan pengajuan surat ini"
                                                rows={3}
                                                required
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <Label htmlFor="catatan">Catatan Tambahan</Label>
                                            <Textarea
                                                id="catatan"
                                                name="catatan"
                                                value={formData.catatan}
                                                onChange={handleInputChange}
                                                placeholder="Catatan atau informasi tambahan (opsional)"
                                                rows={2}
                                            />
                                        </div>
                                    </div>

                                    {/* Upload Dokumen */}
                                    <div className="border-t pt-6">
                                        <div>
                                            <Label htmlFor="files" className="flex items-center gap-2">
                                                <Upload className="w-4 h-4" />
                                                Upload Dokumen Persyaratan
                                            </Label>
                                            <Input
                                                id="files"
                                                name="files"
                                                type="file"
                                                onChange={handleFileUpload}
                                                multiple
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                className="mt-2"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Format: PDF, JPG, PNG (Maks. 5MB per file)
                                            </p>

                                            {formData.files.length > 0 && (
                                                <div className="mt-2">
                                                    <p className="text-sm font-medium">File terpilih:</p>
                                                    <ul className="text-sm text-gray-600 mt-1">
                                                        {formData.files.map((file, index) => (
                                                            <li key={index}>• {file.name}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex gap-4 pt-6">
                                        <Button
                                            type="submit"
                                            className="flex-1"
                                            disabled={submitting || !formData.jenis_layanan}
                                        >
                                            {submitting ? 'Mengirim...' : 'Kirim Pengajuan'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => window.history.back()}
                                        >
                                            Batal
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}