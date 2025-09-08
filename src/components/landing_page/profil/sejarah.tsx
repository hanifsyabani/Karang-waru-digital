import { Calendar, MapPin, Users, Crown, Building, TreePine, Scroll } from "lucide-react";
import HeaderProfil from "./header-profil";

export default function Sejarah() {
  const timelineData = [
    {
      tahun: "1850-an",
      judul: "Awal Mula Pemukiman",
      deskripsi: "Kawasan Karang Waru mulai dihuni oleh para pendatang dari Jawa Tengah yang mencari lahan pertanian subur. Nama 'Karang Waru' berasal dari bahasa Jawa yang berarti 'batu baru', mengacu pada formasi batu karang yang baru ditemukan di wilayah ini.",
      icon: TreePine,
      color: "bg-green-500"
    },
    {
      tahun: "1920",
      judul: "Pembentukan Kampung",
      deskripsi: "Secara resmi kawasan ini dibentuk menjadi sebuah kampung kecil dengan jumlah penduduk sekitar 200 jiwa. Mata pencaharian utama adalah bertani padi dan jagung serta beternak.",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      tahun: "1945",
      judul: "Masa Kemerdekaan",
      deskripsi: "Setelah kemerdekaan Indonesia, Karang Waru mengalami perkembangan pesat. Banyak pejuang kemerdekaan yang menetap di desa ini, membawa semangat pembangunan dan persatuan.",
      icon: Crown,
      color: "bg-red-500"
    },
    {
      tahun: "1965",
      judul: "Pembangunan Infrastruktur",
      deskripsi: "Mulai dibangun jalan utama yang menghubungkan dengan kecamatan, sekolah dasar pertama, dan balai desa. Ini menjadi tonggak modernisasi desa.",
      icon: Building,
      color: "bg-purple-500"
    },
    {
      tahun: "1985",
      judul: "Status Desa Definitif",
      deskripsi: "Karang Waru resmi ditetapkan sebagai desa definitif berdasarkan SK Gubernur dengan jumlah penduduk yang telah mencapai 1.500 jiwa dan memiliki struktur pemerintahan yang lengkap.",
      icon: Scroll,
      color: "bg-yellow-500"
    },
    {
      tahun: "2000-an",
      judul: "Era Digital dan Modernisasi",
      deskripsi: "Masuknya teknologi modern, pembangunan jaringan listrik yang stabil, akses internet, dan berbagai program pemberdayaan masyarakat. Desa mulai mengembangkan potensi wisata dan ekonomi kreatif.",
      icon: MapPin,
      color: "bg-indigo-500"
    }
  ];

  const tokohBersejarah = [
    {
      nama: "Mbah Kartowijoyo",
      peran: "Pendiri Desa",
      periode: "1850 - 1890",
      kontribusi: "Perintis pertama yang membuka lahan dan mengajak keluarga serta tetangga untuk bermukim di kawasan Karang Waru."
    },
    {
      nama: "R. Sumarno",
      peran: "Kepala Kampung Pertama",
      periode: "1920 - 1945",
      kontribusi: "Memimpin pembentukan struktur pemerintahan tradisional dan mengorganisir sistem gotong royong masyarakat."
    },
    {
      nama: "Bapak Sutrisno",
      peran: "Kepala Desa Pertama",
      periode: "1985 - 1995",
      kontribusi: "Memimpin proses penetapan status desa definitif dan membangun fondasi pemerintahan desa modern."
    }
  ];

  const peristiwabersejarah = [
    {
      nama: "Penemuan Sumber Air Bersih",
      tahun: "1923",
      deskripsi: "Ditemukannya mata air jernih yang hingga kini menjadi sumber air utama desa, terletak di kawasan utara desa."
    },
    {
      nama: "Bencana Banjir Besar",
      tahun: "1967",
      deskripsi: "Banjir besar yang melanda desa selama 3 hari, menjadi momentum gotong royong terbesar dalam sejarah desa."
    },
    {
      nama: "Festival Panen Pertama",
      tahun: "1990",
      deskripsi: "Diselenggarakannya festival panen pertama yang kini menjadi tradisi tahunan dan identitas budaya desa."
    }
  ];

  return (
    <div className="py-8 space-y-8">
      <HeaderProfil title="Sejarah Desa" />

      {/* Pengantar Sejarah */}
      <div className="bg-gradient-to-r  from-primary to-green-800 text-white rounded-lg shadow-lg p-8">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Perjalanan Panjang Desa Karang Waru</h2>
          <p className="text-lg leading-relaxed">
            Desa Karang Waru memiliki sejarah panjang yang dimulai dari pertengahan abad ke-19. 
            Dari sebuah pemukiman kecil yang dirintis oleh para pendatang pencari lahan subur, 
            hingga berkembang menjadi desa modern yang memadukan tradisi dan kemajuan. 
            Setiap periode dalam sejarah desa ini mencerminkan semangat gotong royong, 
            kearifan lokal, dan adaptasi terhadap perubahan zaman.
          </p>
        </div>
      </div>

      {/* Timeline Sejarah */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8 flex items-center">
          <Calendar className="mr-3 text-primary" size={28} />
          Garis Waktu Sejarah Desa
        </h3>
        
        <div className="relative">
          {/* Garis Timeline */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
          
          <div className="space-y-8">
            {timelineData.map((item, index) => (
              <div key={index} className="relative flex items-start">
                {/* Icon Timeline */}
                <div className={`relative z-10 flex items-center justify-center w-16 h-16 ${item.color} rounded-full shadow-lg`}>
                  <item.icon className="text-white" size={24} />
                </div>
                
                {/* Konten */}
                <div className="ml-8 flex-1">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center mb-2">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">
                        {item.tahun}
                      </span>
                      <h4 className="text-xl font-bold text-gray-800">{item.judul}</h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{item.deskripsi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tokoh Bersejarah */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Crown className="mr-3 text-primary" size={28} />
          Tokoh-Tokoh Bersejarah
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokohBersejarah.map((tokoh, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-full mx-auto flex items-center justify-center mb-3">
                  <Users className="text-white" size={24} />
                </div>
                <h4 className="text-xl font-bold text-gray-800">{tokoh.nama}</h4>
                <p className="text-primary font-semibold">{tokoh.peran}</p>
                <p className="text-sm text-gray-600">{tokoh.periode}</p>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{tokoh.kontribusi}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Peristiwa Bersejarah */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Scroll className="mr-3 text-primary" size={28} />
          Peristiwa Bersejarah Penting
        </h3>
        
        <div className="space-y-4">
          {peristiwabersejarah.map((peristiwa, index) => (
            <div key={index} className="border-l-4 border-primary pl-6 py-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-r-lg">
              <div className="flex items-center mb-2">
                <span className="bg-yellow-500 text-white px-2 py-1 rounded text-sm font-semibold mr-3">
                  {peristiwa.tahun}
                </span>
                <h4 className="text-lg font-semibold text-gray-800">{peristiwa.nama}</h4>
              </div>
              <p className="text-gray-600">{peristiwa.deskripsi}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Warisan dan Tradisi */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold mb-4">Warisan dan Tradisi yang Terjaga</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Tradisi Gotong Royong</h4>
            <p className="text-sm">
              Tradisi bergotong royong dalam setiap kegiatan pembangunan dan kemasyarakatan 
              yang telah diwariskan sejak generasi pertama pendiri desa.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Festival Panen Tahunan</h4>
            <p className="text-sm">
              Perayaan syukuran hasil panen yang diselenggarakan setiap tahun sebagai 
              wujud rasa syukur dan melestarikan budaya agraris.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Seni Budaya Lokal</h4>
            <p className="text-sm">
              Kesenian tradisional seperti tari-tarian daerah, musik gamelan, 
              dan kerajinan tangan yang terus dilestarikan oleh generasi muda.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Sistem Musyawarah Mufakat</h4>
            <p className="text-sm">
              Pengambilan keputusan dengan sistem musyawarah yang melibatkan 
              seluruh elemen masyarakat desa sesuai dengan nilai-nilai demokratis.
            </p>
          </div>
        </div>
      </div>

      {/* Pesan Penutup */}
      <div className="text-center bg-gray-50 rounded-lg p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Menatap Masa Depan</h3>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Sejarah panjang Desa Karang Waru mengajarkan nilai-nilai luhur yang tetap relevan hingga kini. 
          Dengan berbekal pengalaman masa lalu dan semangat gotong royong yang mengakar kuat, 
          desa ini terus melangkah maju menuju masa depan yang lebih cerah sambil tetap menjaga 
          kelestarian tradisi dan kearifan lokal yang telah diwariskan oleh para pendahulu.
        </p>
      </div>
    </div>
  );
}