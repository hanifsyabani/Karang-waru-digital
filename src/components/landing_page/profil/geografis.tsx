import {
  MapPin,
  Mountain,
  Droplets,
  Thermometer,
  Wind,
  TreePine,
  Wheat,
  Home,
  Navigation,
  Globe,
  Ruler,
  Compass
} from "lucide-react";
import HeaderProfil from "./header-profil";

export default function Geografis() {
  const koordinat = {
    latitude: "-7.5678°",
    longitude: "110.8234°",
    ketinggian: "245 mdpl",
    zona: "WIB (UTC+7)"
  };

  const batasWilayah = [
    {
      arah: "Utara",
      berbatasan: "Desa Mawar Indah",
      jarak: "2.5 km",
      icon: "🧭",
      color: "bg-blue-500"
    },
    {
      arah: "Selatan",
      berbatasan: "Desa Sari Mulya",
      jarak: "3.2 km",
      icon: "🧭",
      color: "bg-green-500"
    },
    {
      arah: "Timur",
      berbatasan: "Desa Harapan Jaya",
      jarak: "4.1 km",
      icon: "🧭",
      color: "bg-yellow-500"
    },
    {
      arah: "Barat",
      berbatasan: "Desa Maju Bersama",
      jarak: "2.8 km",
      icon: "🧭",
      color: "bg-red-500"
    }
  ];

  const topografi = [
    {
      tipe: "Dataran Rendah",
      persentase: "45%",
      ketinggian: "200-250 mdpl",
      penggunaan: "Pemukiman dan Pertanian",
      icon: Home,
      color: "bg-green-400"
    },
    {
      tipe: "Perbukitan Rendah",
      persentase: "35%",
      ketinggian: "250-350 mdpl",
      penggunaan: "Perkebunan dan Hutan",
      icon: Mountain,
      color: "bg-orange-400"
    },
    {
      tipe: "Lembah",
      persentase: "20%",
      ketinggian: "180-220 mdpl",
      penggunaan: "Persawahan dan Perikanan",
      icon: Droplets,
      color: "bg-blue-400"
    }
  ];

  const iklim = {
    suhu: {
      rata: "26°C",
      min: "22°C",
      max: "32°C",
      icon: Thermometer
    },
    curahHujan: {
      tahunan: "2.450 mm",
      bulanBasah: "Nov - Apr",
      bulanKering: "Mei - Okt",
      icon: Droplets
    },
    angin: {
      arah: "Barat Daya",
      kecepatan: "8-15 km/jam",
      musim: "Monsun Tropis",
      icon: Wind
    }
  };

  const sumberDayaAlam = [
    {
      jenis: "Sumber Air",
      detail: [
        "3 mata air alami",
        "2 sungai kecil",
        "5 sumur artesis",
        "1 waduk kecil"
      ],
      icon: Droplets,
      color: "from-blue-400 to-blue-600"
    },
    {
      jenis: "Tanah dan Mineral",
      detail: [
        "Tanah alluvial subur",
        "Kandungan lempung tinggi",
        "Pasir dan kerikil",
        "Deposit organik"
      ],
      icon: Mountain,
      color: "from-yellow-400 to-orange-600"
    },
    {
      jenis: "Flora",
      detail: [
        "Hutan tropis sekunder",
        "Tanaman pangan (padi, jagung)",
        "Perkebunan (kelapa, kakao)",
        "Tanaman obat tradisional"
      ],
      icon: TreePine,
      color: "from-green-400 to-green-600"
    },
    {
      jenis: "Fauna",
      detail: [
        "Burung endemik lokal",
        "Ikan air tawar",
        "Ternak (sapi, kambing)",
        "Serangga penyerbuk"
      ],
      icon: Wheat,
      color: "from-purple-400 to-purple-600"
    }
  ];

  const penggunaanLahan = [
    { kategori: "Pemukiman", luas: "3.2 km²", persentase: "20.4%", warna: "bg-red-400" },
    { kategori: "Pertanian/Sawah", luas: "5.8 km²", persentase: "37.0%", warna: "bg-green-400" },
    { kategori: "Perkebunan", luas: "3.5 km²", persentase: "22.3%", warna: "bg-yellow-400" },
    { kategori: "Hutan/Semak", luas: "2.1 km²", persentase: "13.4%", warna: "bg-green-600" },
    { kategori: "Perairan", luas: "0.6 km²", persentase: "3.8%", warna: "bg-blue-400" },
    { kategori: "Fasilitas Umum", luas: "0.5 km²", persentase: "3.2%", warna: "bg-gray-400" }
  ];

  const aksesibilitas = [
    {
      jenis: "Jalan Provinsi",
      kondisi: "Baik (Aspal)",
      panjang: "4.5 km",
      fungsi: "Akses ke Ibu Kota Kabupaten"
    },
    {
      jenis: "Jalan Kabupaten",
      kondisi: "Baik (Aspal)",
      panjang: "6.2 km",
      fungsi: "Penghubung Antar Kecamatan"
    },
    {
      jenis: "Jalan Desa",
      kondisi: "Sedang (Paving/Makadam)",
      panjang: "12.8 km",
      fungsi: "Akses Internal Desa"
    },
    {
      jenis: "Jalan Tani",
      kondisi: "Kurang (Tanah)",
      panjang: "8.3 km",
      fungsi: "Akses ke Area Pertanian"
    }
  ];

  return (
    <div className="py-8 space-y-8">
      <HeaderProfil title="Geografis Desa" />

      {/* Koordinat dan Posisi */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Navigation className="mr-3 text-primary" size={28} />
          Koordinat dan Posisi
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
              <Globe className="mr-2" size={20} />
              Koordinat Geografis
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Lintang Selatan:</span>
                <span className="font-semibold text-gray-800">{koordinat.latitude}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bujur Timur:</span>
                <span className="font-semibold text-gray-800">{koordinat.longitude}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ketinggian:</span>
                <span className="font-semibold text-gray-800">{koordinat.ketinggian}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Zona Waktu:</span>
                <span className="font-semibold text-gray-800">{koordinat.zona}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-teal-100 rounded-lg p-6">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
              <Ruler className="mr-2" size={20} />
              Luas dan Dimensi
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Luas Total:</span>
                <span className="font-semibold text-gray-800">15.67 km²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Panjang Utara-Selatan:</span>
                <span className="font-semibold text-gray-800">6.2 km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lebar Timur-Barat:</span>
                <span className="font-semibold text-gray-800">4.8 km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Keliling Wilayah:</span>
                <span className="font-semibold text-gray-800">18.5 km</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Batas Wilayah */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Compass className="mr-3 text-primary" size={28} />
          Batas Wilayah
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {batasWilayah.map((batas, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border-2 border-gray-100 hover:border-gray-200 transition-colors">
              <div className={`inline-flex items-center justify-center w-16 h-16 ${batas.color} rounded-full mb-4`}>
                <span className="text-white text-2xl">{batas.icon}</span>
              </div>
              <h4 className="font-bold text-gray-800 text-lg mb-2">Sebelah {batas.arah}</h4>
              <p className="text-gray-600 mb-1">{batas.berbatasan}</p>
              <p className="text-sm text-gray-500">Jarak: {batas.jarak}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Topografi */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Mountain className="mr-3 text-primary" size={28} />
          Kondisi Topografi
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {topografi.map((topo, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`${topo.color} text-white p-4`}>
                <div className="flex items-center justify-between">
                  <topo.icon size={32} />
                  <span className="text-2xl font-bold">{topo.persentase}</span>
                </div>
                <h4 className="font-bold text-lg mt-2">{topo.tipe}</h4>
              </div>

              <div className="p-4">
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Ketinggian:</span>
                    <p className="text-gray-600">{topo.ketinggian}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Penggunaan:</span>
                    <p className="text-gray-600">{topo.penggunaan}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Iklim dan Cuaca */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Thermometer className="mr-3 text-primary" size={28} />
          Kondisi Iklim dan Cuaca
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-red-50 to-orange-100 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <iklim.suhu.icon className="text-red-500 mr-3" size={24} />
              <h4 className="font-semibold text-gray-800">Suhu Udara</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Rata-rata:</span>
                <span className="font-semibold">{iklim.suhu.rata}</span>
              </div>
              <div className="flex justify-between">
                <span>Minimum:</span>
                <span className="font-semibold">{iklim.suhu.min}</span>
              </div>
              <div className="flex justify-between">
                <span>Maksimum:</span>
                <span className="font-semibold">{iklim.suhu.max}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <iklim.curahHujan.icon className="text-blue-500 mr-3" size={24} />
              <h4 className="font-semibold text-gray-800">Curah Hujan</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Per Tahun:</span>
                <span className="font-semibold">{iklim.curahHujan.tahunan}</span>
              </div>
              <div className="flex justify-between">
                <span>Musim Hujan:</span>
                <span className="font-semibold">{iklim.curahHujan.bulanBasah}</span>
              </div>
              <div className="flex justify-between">
                <span>Musim Kemarau:</span>
                <span className="font-semibold">{iklim.curahHujan.bulanKering}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <iklim.angin.icon className="text-gray-500 mr-3" size={24} />
              <h4 className="font-semibold text-gray-800">Angin</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Arah Dominan:</span>
                <span className="font-semibold">{iklim.angin.arah}</span>
              </div>
              <div className="flex justify-between">
                <span>Kecepatan:</span>
                <span className="font-semibold">{iklim.angin.kecepatan}</span>
              </div>
              <div className="flex justify-between">
                <span>Pola:</span>
                <span className="font-semibold">{iklim.angin.musim}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sumber Daya Alam */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <TreePine className="mr-3 text-primary" size={28} />
          Sumber Daya Alam
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {sumberDayaAlam.map((sda, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className={`bg-gradient-to-r ${sda.color} text-white p-4`}>
                <div className="flex items-center space-x-3">
                  <sda.icon size={24} />
                  <h4 className="text-lg font-semibold">{sda.jenis}</h4>
                </div>
              </div>

              <div className="p-4 bg-white">
                <ul className="space-y-2">
                  {sda.detail.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Penggunaan Lahan */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <MapPin className="mr-3 text-primary" size={28} />
          Penggunaan Lahan
        </h3>

        <div className="space-y-4">
          {penggunaanLahan.map((lahan, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`w-6 h-6 ${lahan.warna} rounded`}></div>
                <span className="font-semibold text-gray-800">{lahan.kategori}</span>
              </div>

              <div className="flex items-center space-x-6">
                <span className="text-gray-600">{lahan.luas}</span>
                <span className="font-semibold text-primary">{lahan.persentase}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aksesibilitas */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Navigation className="mr-3 text-primary" size={28} />
          Kondisi Aksesibilitas
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {aksesibilitas.map((akses, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-800 mb-3">{akses.jenis}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Kondisi:</span>
                  <span className="font-semibold text-gray-800">{akses.kondisi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Panjang:</span>
                  <span className="font-semibold text-gray-800">{akses.panjang}</span>
                </div>
                <div className="mt-2">
                  <span className="text-gray-600">Fungsi:</span>
                  <p className="text-gray-800 text-xs mt-1">{akses.fungsi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kesimpulan */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold mb-4">Potensi dan Keunggulan Geografis</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Keunggulan Lokasi</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>• Akses strategis ke pusat kabupaten</li>
              <li>• Topografi yang mendukung diversifikasi ekonomi</li>
              <li>• Sumber daya air yang melimpah</li>
              <li>• Iklim tropis yang mendukung pertanian</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Potensi Pengembangan</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>• Pengembangan agrowisata</li>
              <li>• Optimalisasi lahan pertanian</li>
              <li>• Konservasi sumber daya alam</li>
              <li>• Peningkatan infrastruktur transportasi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}