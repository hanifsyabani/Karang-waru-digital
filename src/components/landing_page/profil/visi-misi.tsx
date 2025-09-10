import { Eye, Target, Users, Lightbulb, Heart, Star, CheckCircle, ArrowRight } from "lucide-react";
import HeaderProfil from "./header-profil";

export default function VisiMisi() {
  const misiData = [
    {
      no: 1,
      teks: "Meningkatkan kualitas pelayanan publik yang profesional, transparan, dan akuntabel untuk seluruh masyarakat desa",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      no: 2,
      teks: "Mengembangkan potensi ekonomi desa melalui pemberdayaan masyarakat, koperasi, dan usaha mikro kecil menengah (UMKM)",
      icon: Target,
      color: "bg-green-500"
    },
    {
      no: 3,
      teks: "Membangun infrastruktur desa yang berkualitas untuk mendukung aktivitas ekonomi dan sosial masyarakat",
      icon: Lightbulb,
      color: "bg-yellow-500"
    },
    {
      no: 4,
      teks: "Melestarikan nilai-nilai budaya lokal, tradisi gotong royong, dan kearifan lokal sebagai identitas desa",
      icon: Heart,
      color: "bg-red-500"
    },
    {
      no: 5,
      teks: "Meningkatkan kualitas sumber daya manusia melalui pendidikan, pelatihan, dan program pengembangan kapasitas",
      icon: Star,
      color: "bg-purple-500"
    }
  ];

  const tujuanData = [
    {
      kategori: "Pemerintahan",
      items: [
        "Terwujudnya pelayanan prima yang mudah diakses masyarakat",
        "Transparansi pengelolaan keuangan dan program desa",
        "Partisipasi aktif masyarakat dalam pembangunan"
      ]
    },
    {
      kategori: "Ekonomi",
      items: [
        "Peningkatan pendapatan per kapita masyarakat desa",
        "Berkembangnya UMKM dan koperasi desa",
        "Terciptanya lapangan kerja baru di tingkat desa"
      ]
    },
    {
      kategori: "Sosial Budaya",
      items: [
        "Terpeliharanya nilai-nilai gotong royong dan kekeluargaan",
        "Meningkatnya kualitas pendidikan dan kesehatan masyarakat",
        "Terjaganya keharmonisan dan kerukunan antar warga"
      ]
    },
    {
      kategori: "Lingkungan",
      items: [
        "Terwujudnya lingkungan yang bersih, sehat, dan asri",
        "Pengelolaan sumber daya alam yang berkelanjutan",
        "Peningkatan kesadaran masyarakat terhadap lingkungan"
      ]
    }
  ];

  const strategiData = [
    {
      bidang: "Pembangunan Ekonomi",
      strategi: [
        "Pengembangan sentra produksi pertanian organik",
        "Pembentukan dan penguatan kelompok tani dan koperasi",
        "Pengembangan wisata desa berbasis potensi lokal",
        "Pelatihan keterampilan dan kewirausahaan untuk masyarakat"
      ],
      icon: Target,
      color: "from-green-400 to-green-600"
    },
    {
      bidang: "Pelayanan Publik",
      strategi: [
        "Digitalisasi sistem pelayanan administrasi desa",
        "Peningkatan kompetensi aparatur pemerintah desa",
        "Pembentukan sistem pengaduan dan saran masyarakat",
        "Implementasi e-government di tingkat desa"
      ],
      icon: Users,
      color: "from-blue-400 to-blue-600"
    },
    {
      bidang: "Infrastruktur",
      strategi: [
        "Pembangunan dan perbaikan jalan desa",
        "Peningkatan akses air bersih dan sanitasi",
        "Pengembangan jaringan internet dan telekomunikasi",
        "Pembangunan fasilitas umum dan sosial"
      ],
      icon: Lightbulb,
      color: "from-yellow-400 to-yellow-600"
    },
    {
      bidang: "Sosial Budaya",
      strategi: [
        "Revitalisasi kegiatan budaya dan tradisi lokal",
        "Pengembangan sanggar seni dan budaya desa",
        "Program pembinaan generasi muda",
        "Penguatan forum komunikasi antar warga"
      ],
      icon: Heart,
      color: "from-red-400 to-red-600"
    }
  ];

  return (
    <div className="py-8 space-y-8">
      <HeaderProfil title="Visi dan Misi" />

      <div className="text-center bg-gradient-to-r from-primary to-green-800 text-white rounded-lg shadow-lg p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">"Karang Waru Maju, Sejahtera, dan Berbudaya"</h2>
          <p className="text-lg opacity-90">
            Semangat membangun desa yang modern namun tetap menjunjung tinggi nilai-nilai luhur budaya bangsa
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-white border border-primary text-primary p-6">
          <h3 className="text-2xl font-semibold flex items-center">
            <Eye className="mr-3" size={28} />
            VISI DESA KARANG WARU
          </h3> 
        </div>
        <div className="p-8">
          <div className="text-center">
            <div className="text-6xl mb-6">🌟</div>
            <blockquote className="text-2xl font-semibold text-gray-800 leading-relaxed mb-6 italic">
              "Terwujudnya Desa Karang Waru sebagai desa mandiri, sejahtera, dan berbudaya 
              yang berlandaskan pada nilai-nilai gotong royong, transparansi, dan berkelanjutan 
              menuju masyarakat yang maju dan harmonis pada tahun 2030"
            </blockquote>
            <div className="flex justify-center space-x-4">
              <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold">Mandiri</span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">Sejahtera</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">Berbudaya</span>
            </div>
          </div>
        </div>
      </div>

      {/* Misi */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6">
          <h3 className="text-2xl font-semibold flex items-center">
            <Target className="mr-3" size={28} />
            MISI DESA KARANG WARU
          </h3>
        </div>
        <div className="p-8">
          <div className="space-y-6">
            {misiData.map((misi, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                <div className={`flex-shrink-0 w-12 h-12 ${misi.color} rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform`}>
                  {misi.no}
                </div>
                <div className="flex-1">
                  <div className="flex items-start space-x-3">
                    <misi.icon className="text-gray-600 mt-1 flex-shrink-0" size={20} />
                    <p className="text-gray-700 leading-relaxed">{misi.teks}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tujuan */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <CheckCircle className="mr-3 text-primary" size={28} />
          Tujuan Pembangunan Desa
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {tujuanData.map((kategori, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b">
                <h4 className="font-semibold text-gray-800 text-lg">{kategori.kategori}</h4>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  {kategori.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <ArrowRight className="text-primary mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategi */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Lightbulb className="mr-3 text-primary" size={28} />
          Strategi Pembangunan
        </h3>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {strategiData.map((strategi, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className={`bg-gradient-to-r ${strategi.color} text-white p-6`}>
                <div className="flex items-center space-x-3">
                  <strategi.icon size={24} />
                  <h4 className="text-xl font-semibold">{strategi.bidang}</h4>
                </div>
              </div>
              <div className="p-6 bg-white">
                <ul className="space-y-3">
                  {strategi.strategi.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nilai-Nilai Dasar */}
      <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold mb-6 text-center">Nilai-Nilai Dasar Pembangunan</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-white text-black bg-opacity-10 rounded-lg backdrop-blur-sm">
            <div className="text-3xl mb-3">🤝</div>
            <h4 className="font-semibold mb-2">Gotong Royong</h4>
            <p className="text-sm opacity-90">Semangat kebersamaan dan saling membantu dalam setiap kegiatan pembangunan desa</p>
          </div>
          <div className="text-center p-4 bg-white text-black bg-opacity-10 rounded-lg backdrop-blur-sm">
            <div className="text-3xl mb-3">🔍</div>
            <h4 className="font-semibold mb-2">Transparansi</h4>
            <p className="text-sm opacity-90">Keterbukaan informasi dan akuntabilitas dalam pengelolaan pemerintahan dan pembangunan</p>
          </div>
          <div className="text-center p-4 bg-white text-black bg-opacity-10 rounded-lg backdrop-blur-sm">
            <div className="text-3xl mb-3">🌱</div>
            <h4 className="font-semibold mb-2">Berkelanjutan</h4>
            <p className="text-sm opacity-90">Pembangunan yang memperhatikan keseimbangan ekonomi, sosial, dan lingkungan</p>
          </div>
        </div>
      </div>

      {/* Komitmen */}
      <div className="text-center bg-gray-50 rounded-lg p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Komitmen Kami</h3>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
          Visi dan misi ini bukan hanya sekedar dokumen, tetapi merupakan komitmen nyata 
          pemerintah desa bersama seluruh masyarakat Karang Waru untuk mewujudkan cita-cita bersama. 
          Dengan semangat gotong royong dan kerja sama yang solid, kami yakin dapat mencapai 
          tujuan pembangunan desa yang berkelanjutan dan bermartabat.
        </p>
        <div className="flex justify-center">
          <div className="bg-primary text-white px-8 py-3 rounded-full font-semibold shadow-lg">
            "Bersama Membangun, Bersama Maju"
          </div>
        </div>
      </div>
    </div>
  );
}