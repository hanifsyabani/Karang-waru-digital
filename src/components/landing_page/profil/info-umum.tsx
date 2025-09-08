import { Building, Calendar, Home, Mail, MapPin, Phone, Users } from "lucide-react";
import HeaderSection from "../header-section";
import HeaderProfil from "./header-profil";

export default function InfoUmum() {

  const infoData = [
    {
      icon: MapPin,
      title: "Alamat Lengkap",
      content: "Jl. Raya Karang Waru No. 123, Kecamatan [Nama Kecamatan], Kabupaten [Nama Kabupaten], Provinsi [Nama Provinsi], Kode Pos 12345"
    },
    {
      icon: Users,
      title: "Jumlah Penduduk",
      content: "2.456 Jiwa (1.234 Laki-laki, 1.222 Perempuan)"
    },
    {
      icon: Building,
      title: "Jumlah Kepala Keluarga",
      content: "687 KK"
    },
    {
      icon: MapPin,
      title: "Luas Wilayah",
      content: "15,67 km² (1.567 Ha)"
    },
    {
      icon: Calendar,
      title: "Tahun Pembentukan",
      content: "1985"
    },
    {
      icon: Phone,
      title: "Telepon Kantor Desa",
      content: "+62 271 123456"
    },
    {
      icon: Mail,
      title: "Email",
      content: "karangwaru.desa@gmail.com"
    }
  ];

  const batasWilayah = [
    { arah: "Utara", berbatasan: "Desa Mawar Indah" },
    { arah: "Selatan", berbatasan: "Desa Sari Mulya" },
    { arah: "Timur", berbatasan: "Desa Harapan Jaya" },
    { arah: "Barat", berbatasan: "Desa Maju Bersama" }
  ];

  const demografis = [
    { kategori: "Balita (0-5 tahun)", jumlah: "245 jiwa" },
    { kategori: "Anak-anak (6-17 tahun)", jumlah: "567 jiwa" },
    { kategori: "Dewasa (18-59 tahun)", jumlah: "1.345 jiwa" },
    { kategori: "Lansia (60+ tahun)", jumlah: "299 jiwa" }
  ];

  const perekonomian = [
    { sektor: "Pertanian", persentase: "45%" },
    { sektor: "Perdagangan", persentase: "25%" },
    { sektor: "Jasa", persentase: "20%" },
    { sektor: "Industri Kecil", persentase: "10%" }
  ];
  return (
    <>
      <div className="py-8 space-y-8">

        <HeaderProfil title="Informasi Umum Desa Karang Waru" />
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Building className="mr-3 text-primary" size={28} />
            Data Dasar Desa
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {infoData.map((item, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0">
                  <item.icon className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Batas Wilayah */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <MapPin className="mr-3 text-primary" size={28} />
            Batas Wilayah
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {batasWilayah.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="font-medium text-gray-800">Sebelah {item.arah}</span>
                <span className="text-gray-600">{item.berbatasan}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Demografis */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Users className="mr-3 text-primary" size={28} />
            Komposisi Penduduk
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {demografis.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="font-medium text-gray-800">{item.kategori}</span>
                <span className="text-gray-600 font-semibold">{item.jumlah}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Perekonomian */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Building className="mr-3 text-primary" size={28} />
            Mata Pencaharian Penduduk
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {perekonomian.map((item, index) => (
              <div key={index} className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-800">{item.sektor}</span>
                  <span className="text-gray-600 font-semibold">{item.persentase}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: item.persentase }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fasilitas Umum */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Fasilitas Umum
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">5</div>
              <div className="text-gray-600">Sekolah</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">2</div>
              <div className="text-gray-600">Puskesmas</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <div className="text-gray-600">Masjid</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">1</div>
              <div className="text-gray-600">Pasar Tradisional</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <div className="text-gray-600">Pos Keamanan</div>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">2</div>
              <div className="text-gray-600">Balai Desa</div>
            </div>
          </div>
        </div>

        {/* Kontak dan Pelayanan */}
        <div className="bg-gradient-to-r from-primary to-green-800 text-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-4">Jam Pelayanan</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Hari Kerja</h4>
              <p>Senin - Jumat: 08.00 - 16.00 WIB</p>
              <p>Sabtu: 08.00 - 12.00 WIB</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Pelayanan Khusus</h4>
              <p>Konsultasi: Setiap Selasa & Kamis</p>
              <p>Rapat Warga: Minggu pertama setiap bulan</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
