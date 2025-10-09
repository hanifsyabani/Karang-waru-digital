import React from 'react';
import {
  Crown,
  Users,
  FileText,
  Shield,
  Building,
  Heart,
  Briefcase,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import HeaderProfil from './header-profil';

export default function StrukturPemerintahan() {
  const strukturUtama = [
    {
      jabatan: "Kepala Desa",
      nama: "Bapak Suharto, S.Sos",
      foto: "👨‍💼",
      periode: "2019 - 2025",
      tugas: "Memimpin penyelenggaraan pemerintahan desa, pembangunan, dan pemberdayaan masyarakat",
      kontak: {
        phone: "081234567890",
        email: "kades.karangwaru@gmail.com"
      },
      pendidikan: "S1 Ilmu Sosial",
      pengalaman: "15 tahun di bidang pemerintahan",
      color: "from-blue-500 to-blue-700"
    },
    {
      jabatan: "Sekretaris Desa",
      nama: "Ibu Siti Nurhaliza, S.AP",
      foto: "👩‍💼",
      periode: "2020 - 2026",
      tugas: "Membantu Kepala Desa dalam pelaksanaan tugas administrasi pemerintahan",
      kontak: {
        phone: "081234567891",
        email: "sekdes.karangwaru@gmail.com"
      },
      pendidikan: "S1 Administrasi Publik",
      pengalaman: "12 tahun sebagai aparatur desa",
      color: "from-green-500 to-green-700"
    }
  ];

  const kasiKaur = [
    {
      jabatan: "Kasi Pemerintahan",
      nama: "Bapak Ahmad Fauzi, S.H",
      foto: "👨‍⚖️",
      bidang: "Administrasi Kependudukan, Pertanahan, dan Keamanan",
      icon: Shield,
      color: "bg-red-500"
    },
    {
      jabatan: "Kasi Kesejahteraan",
      nama: "Ibu Dewi Sartika, S.Sos",
      foto: "👩‍⚕️",
      bidang: "Kesehatan, Pendidikan, dan Sosial Budaya",
      icon: Heart,
      color: "bg-pink-500"
    },
    {
      jabatan: "Kasi Pelayanan",
      nama: "Bapak Budi Santoso, S.Kom",
      foto: "👨‍💻",
      bidang: "Pelayanan Umum dan Sistem Informasi",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      jabatan: "Kaur Tata Usaha",
      nama: "Ibu Rina Wati, S.E",
      foto: "👩‍📋",
      bidang: "Administrasi Umum dan Kepegawaian",
      icon: FileText,
      color: "bg-yellow-500"
    },
    {
      jabatan: "Kaur Keuangan",
      nama: "Bapak Joko Widodo, S.E",
      foto: "👨‍💰",
      bidang: "Pengelolaan Keuangan dan Aset Desa",
      icon: Briefcase,
      color: "bg-green-500"
    },
    {
      jabatan: "Kaur Perencanaan",
      nama: "Ibu Maya Sari, S.T",
      foto: "👩‍🏗️",
      bidang: "Perencanaan Pembangunan dan Evaluasi",
      icon: Building,
      color: "bg-purple-500"
    }
  ];

  const kadus = [
    {
      dusun: "Dusun Mawar",
      nama: "Bapak Sukirman",
      foto: "👨‍🌾",
      jumlahRt: "5 RT",
      jumlahPenduduk: "456 jiwa",
      wilayah: "Bagian Utara Desa"
    },
    {
      dusun: "Dusun Melati",
      nama: "Bapak Santoso",
      foto: "👨‍🔧",
      jumlahRt: "4 RT",
      jumlahPenduduk: "398 jiwa",
      wilayah: "Bagian Tengah Desa"
    },
    {
      dusun: "Dusun Kenanga",
      nama: "Bapak Wiranto",
      foto: "👨‍🚜",
      jumlahRt: "6 RT",
      jumlahPenduduk: "567 jiwa",
      wilayah: "Bagian Selatan Desa"
    },
    {
      dusun: "Dusun Anggrek",
      nama: "Ibu Sari Indah",
      foto: "👩‍🌾",
      jumlahRt: "4 RT",
      jumlahPenduduk: "389 jiwa",
      wilayah: "Bagian Timur Desa"
    }
  ];

  const bpd = [
    "Bapak H. Sutrisno (Ketua)",
    "Ibu Hj. Mariam (Wakil Ketua)",
    "Bapak Agus Salim (Sekretaris)",
    "Ibu Tri Wahyuni (Anggota)",
    "Bapak Hendra Gunawan (Anggota)",
    "Ibu Yuni Astuti (Anggota)",
    "Bapak Dedi Kurniawan (Anggota)"
  ];

  const lembagaDesa = [
    {
      nama: "PKK Desa",
      ketua: "Ibu Hj. Siti Fatimah",
      fokus: "Pemberdayaan Perempuan",
      anggota: "45 orang",
      icon: Heart,
      color: "bg-pink-400"
    },
    {
      nama: "Karang Taruna",
      ketua: "Sdr. Rizki Pratama",
      fokus: "Pemberdayaan Pemuda",
      anggota: "67 orang",
      icon: GraduationCap,
      color: "bg-orange-400"
    },
    {
      nama: "LPMD",
      ketua: "Bapak Wahyu Hidayat",
      fokus: "Pembangunan Masyarakat",
      anggota: "12 orang",
      icon: Building,
      color: "bg-blue-400"
    },
    {
      nama: "Linmas",
      ketua: "Bapak Eko Prasetyo",
      fokus: "Keamanan dan Ketertiban",
      anggota: "25 orang",
      icon: Shield,
      color: "bg-red-400"
    }
  ];

  return (
    <div className="py-8 space-y-8">
      <HeaderProfil title="Struktur Pemerintahan" />

      {/* Pimpinan Desa */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Crown className="mr-3 text-primary" size={28} />
          Pimpinan Desa
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {strukturUtama.map((pejabat, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className={`bg-gradient-to-r ${pejabat.color} text-white p-6`}>
                <div className="flex items-center space-x-4">
                  <div className="text-6xl">{pejabat.foto}</div>
                  <div>
                    <h4 className="text-xl font-bold">{pejabat.jabatan}</h4>
                    <p className="text-lg opacity-90">{pejabat.nama}</p>
                    <p className="text-sm opacity-80">{pejabat.periode}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">Tugas Pokok:</h5>
                    <p className="text-gray-600 text-sm">{pejabat.tugas}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Pendidikan:</span>
                      <p className="text-gray-600">{pejabat.pendidikan}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Pengalaman:</span>
                      <p className="text-gray-600">{pejabat.pengalaman}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex space-x-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Phone size={16} className="mr-1" />
                        {pejabat.kontak.phone}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Mail size={16} className="mr-1" />
                        {pejabat.kontak.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Users className="mr-3 text-primary" size={28} />
          Kepala Seksi & Kepala Urusan
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kasiKaur.map((pejabat, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">{pejabat.foto}</div>
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${pejabat.color} rounded-full mb-3`}>
                    <pejabat.icon className="text-white" size={24} />
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg">{pejabat.jabatan}</h4>
                  <p className="text-primary font-semibold">{pejabat.nama}</p>
                </div>

                <div className="text-center">
                  <span className="text-sm font-medium text-gray-700">Bidang Tugas:</span>
                  <p className="text-gray-600 text-sm mt-1">{pejabat.bidang}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kepala Dusun */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <MapPin className="mr-3 text-primary" size={28} />
          Kepala Dusun
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {kadus.map((dusun, index) => (
            <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{dusun.foto}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-lg">{dusun.dusun}</h4>
                  <p className="text-primary font-semibold mb-2">{dusun.nama}</p>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Jumlah RT:</span>
                      <span className="font-semibold">{dusun.jumlahRt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Penduduk:</span>
                      <span className="font-semibold">{dusun.jumlahPenduduk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wilayah:</span>
                      <span className="font-semibold">{dusun.wilayah}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BPD */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <FileText className="mr-3 text-primary" size={28} />
          Badan Permusyawaratan Desa (BPD)
        </h3>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
          <p className="text-gray-700 mb-4">
            BPD merupakan lembaga yang berfungsi menetapkan peraturan desa bersama kepala desa,
            menampung dan menyalurkan aspirasi masyarakat.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {bpd.map((anggota, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <span className="text-gray-800">{anggota}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lembaga Kemasyarakatan */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Building className="mr-3 text-primary" size={28} />
          Lembaga Kemasyarakatan Desa
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {lembagaDesa.map((lembaga, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`${lembaga.color} text-white p-4`}>
                <div className="flex items-center space-x-3">
                  <lembaga.icon size={24} />
                  <h4 className="font-bold text-lg">{lembaga.nama}</h4>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ketua:</span>
                    <span className="font-semibold text-gray-800">{lembaga.ketua}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fokus Kegiatan:</span>
                    <span className="font-semibold text-gray-800">{lembaga.fokus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jumlah Anggota:</span>
                    <span className="font-semibold text-gray-800">{lembaga.anggota}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center bg-gray-50 rounded-lg p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Siap Melayani Masyarakat</h3>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Seluruh perangkat desa dan lembaga kemasyarakatan Karang Waru berkomitmen penuh
          untuk memberikan pelayanan terbaik kepada masyarakat. Kami mengutamakan
          transparansi, akuntabilitas, dan partisipasi aktif masyarakat dalam setiap
          program pembangunan dan pelayanan publik.
        </p>
      </div>
    </div>
  );
}