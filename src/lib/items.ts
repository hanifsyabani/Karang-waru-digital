import {
  Book,
  BookCheck,
  Boxes,
  LayoutDashboard,
  Store,
  FileText,
  BarChart3,
  Settings,
  Cookie,
  Globe,
  GraduationCap,
  Hammer,
  HandMetal,
  Heart,
  Info,
  LayoutPanelTop,
  Mail,
  Map,
  Newspaper,
  Phone,
  Shirt,
  Sprout,
  Stethoscope,
  Users,
  Wrench,
} from "lucide-react";

export const navLinks = [
  {
    title: "Beranda",
    href: "/",
  },
  {
    title: "Profil",
    href: "/profil",
  },
  {
    title: "Berita",
    href: "/berita",
  },
  {
    title: "UMKM",
    href: "/umkm",
  },
  {
    title: "Layanan",
    href: "/layanan",
  },
  {
    title: "Statistik",
    href: "/statistik",
  },
];

export const cardStatsItems = [
  {
    title: "Penduduk",
    count: 1245,
    note: "Jiwa",
    color: "green",
  },
  {
    title: "UMKM",
    count: 25,
    note: "Unit Usaha",
    color: "blue",
  },
  {
    title: "Berita",
    count: 12,
    note: "Artikel",
    color: "red",
  },
  {
    title: "Layanan",
    count: 56,
    note: "Tersedia",
    color: "yellow",
  },
];

export const layananDesa = [
  {
    title: "Posyandu",
    href: "/layanan/posyandu",
  },
  {
    title: "Program KB",
    href: "/layanan/program-kb",
  },
  {
    title: "Administrasi Kependudukan",
    href: "/layanan/administrasi-kependudukan",
  },
  {
    title: "Pelayanan Kesehatan",
    href: "/layanan/pelayanan-kesehatan",
  },
  {
    title: "Pembuatan Surat Keterangan",
    href: "/layanan/pembuatan-surat",
  },
  {
    title: "Bantuan Sosial",
    href: "/layanan/bantuan-sosial",
  },
];

export const umkmContent = [
  {
    title: "Koperasi SADAR",
    category: "Lainnya",
    image: "koperasi-sadar.png",
    href: "/umkm/koperasi-sadar",
  },
  {
    title: "Toko Batik Nusantara",
    category: "Toko",
    image: "batik-nusantara.png",
    href: "/umkm/toko-batik-nusantara",
  },
  {
    title: "Warung Makan Bu Tini",
    category: "Kuliner",
    image: "warung-bu-tini.png",
    href: "/umkm/warung-bu-tini",
  },
  {
    title: "Kedai Kopi Sejahtera",
    category: "Kuliner",
    image: "kedai-kopi-sejahtera.png",
    href: "/umkm/kedai-kopi-sejahtera",
  },
  {
    title: "Pengrajin Rotan Makmur",
    category: "Kerajinan",
    image: "rotan-makmur.png",
    href: "/umkm/pengrajin-rotan-makmur",
  },
  {
    title: "Bengkel Motor Jaya",
    category: "Jasa",
    image: "bengkel-motor-jaya.png",
    href: "/umkm/bengkel-motor-jaya",
  },
];

export const contactItems = [
  {
    title: "Website",
    description: "Kunjungi website resmi desa",
    body: "karangwaru.desa.id",
    href: "https://karangwaru.desa.id",
    icon: Globe,
    color: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      link: "text-blue-600 hover:text-blue-800",
    },
  },
  {
    title: "Email",
    description: "Hubungi kami melalui email",
    body: "info@karangwaru.desa.id",
    href: "mailto:info@karangwaru.desa.id",
    icon: Mail,
    color: {
      bg: "bg-green-100",
      text: "text-green-600",
      link: "text-green-600 hover:text-green-800",
    },
  },
  {
    title: "Telepon",
    description: "Hubungi kantor desa",
    body: "+62 271 234567",
    href: "tel:+6271234567",
    icon: Phone,
    color: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      link: "text-orange-600 hover:text-orange-800",
    },
  },
];

export const tabsProfil = [
  {
    title: "Informasi Umum",
    icon: Info,
  },
  {
    title: "Sejarah",
    icon: Book,
  },
  {
    title: "Visi dan Misi",
    icon: BookCheck,
  },
  {
    title: "Struktur Pemerintahan",
    icon: LayoutPanelTop,
  },
  {
    title: "Geografis",
    icon: Map,
  },
];

export const tabsBerita = [
  {
    title: "Semua Kategori",
    icon: Info,
  },
  {
    title: "Umum",
    icon: Newspaper,
  },
  {
    title: "Kegiatan",
    icon: Users,
  },
  {
    title: "Infrastruktur",
    icon: Hammer,
  },
  {
    title: "Kesehatan",
    icon: Stethoscope,
  },
  {
    title: "Pendidikan",
    icon: GraduationCap,
  },
];

export const tabsUmkm = [
  {
    title: "Semua Kategori",
    icon: Info,
  },
  {
    title: "Kuliner",
    icon: Cookie,
  },
  {
    title: "Kerajinan",
    icon: HandMetal,
  },
  {
    title: "Fashion",
    icon: Shirt,
  },
  {
    title: "Jasa",
    icon: Wrench,
  },
  {
    title: "Pertanian",
    icon: Sprout,
  },
  {
    title: "Lainnya",
    icon: Boxes,
  },
];

export const tabsLayanan = [
  {
    title: "Semua Kategori",
    icon: Info,
  },
  {
    title: "Surat",
    icon: Mail,
  },
  {
    title: "Kesehatan",
    icon: Heart,
  },
  {
    title: "Pendidikan",
    icon: GraduationCap,
  },
  {
    title: "Sosial",
    icon: Users,
  },
  {
    title: "Lainnya",
    icon: Info,
  },
];


export const adminNavLinks = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Akun",
    href: "/admin/akun",
    icon: Users,
  },
  {
    title: "Profil Desa",
    href: "/admin/profil",
    icon: Info,
  },
  {
    title: "Berita",
    href: "/admin/berita",
    icon: Newspaper,
  },
  {
    title: "UMKM",
    href: "/admin/umkm",
    icon: Store,
  },
  {
    title: "Layanan Desa",
    href: "/admin/layanan-desa",
    icon: FileText,
  },
  {
    title: "Data Penduduk",
    href: "/admin/penduduk",
    icon: Users,
  },
  {
    title: "Pendidikan",
    href: "/admin/pendidikan",
    icon: GraduationCap,
  },
  {
    title: "Kesehatan",
    href: "/admin/kesehatan",
    icon: Stethoscope,
  },
  {
    title: "APBD Desa",
    href: "/admin/apbd-desa",
    icon: BarChart3,
  },
  {
    title: "Pengaturan Website",
    href: "/admin/settings",
    icon: Settings,
  },
];


export const tabBerita = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    active : 'dashboard'

  },
  {
    title: "Kelola Berita",
    icon: Newspaper,
    active : 'kelola-berita'
  },
]


export const selectKategori = [
  {
    value : "umum",
    label : "Umum"
  },
  {
    value : "kegiatan",
    label : "Kegiatan"
  },
  {
    value : "infrastruktur",
    label : "Infrastruktur"
  },
  {
    value : "kesehatan",
    label : "Kesehatan"
  },
  {
    value : "pendidikan",
    label : "Pendidikan"
  }
]

export const kategoriumkm = [
  {
    value : "kerajinan",
    label : "Kerajinan"
  },
  {
    value : "kuliner",
    label : "Kuliner"
  },
  {
    value : "fashion",
    label : "Fashion"
  },
  {
    value : "jasa",
    label : "Jasa"
  },
  {
    value : "pertanian",
    label : "Pertanian"
  },
  {
    value : "lainnya",
    label : "Lainnya"
  }
]


export const kategoriLayanan = [
  {
    value: "kependudukan",
    label: "Administrasi Kependudukan",
    deskripsi: "Layanan terkait dokumen kependudukan seperti KTP, KK, dan surat domisili.",
  },
  {
    value: "pernikahan",
    label: "Administrasi Pernikahan dan Perceraian",
    deskripsi: "Layanan surat pengantar nikah, cerai, dan status pernikahan.",
  },
  {
    value: "pemerintahan",
    label: "Administrasi Pemerintahan & Umum",
    deskripsi: "Layanan surat usaha, SKTM, SKCK, dan administrasi umum desa.",
  },
  {
    value: "pertanian",
    label: "Pertanian, Peternakan, dan Perikanan",
    deskripsi: "Layanan kelompok tani, pupuk subsidi, dan bantuan pertanian.",
  },
  {
    value: "pembangunan",
    label: "Pembangunan & Infrastruktur Desa",
    deskripsi: "Pengajuan pembangunan jalan, rumah layak huni, atau sarana publik.",
  },
  {
    value: "keuangan",
    label: "Keuangan & Bantuan Sosial",
    deskripsi: "Pengajuan bantuan sosial, BLT, dan verifikasi penerima bantuan.",
  },
  {
    value: "pendidikan",
    label: "Pendidikan & Kesehatan",
    deskripsi: "Layanan beasiswa, surat keterangan sehat, dan kegiatan posyandu.",
  },
  {
    value: "hukum",
    label: "Hukum & Keamanan",
    deskripsi: "Layanan laporan polisi, sengketa tanah, dan rekomendasi keamanan.",
  },
  {
    value: "digital",
    label: "Layanan Digital & Inovasi Desa",
    deskripsi: "Layanan data statistik, informasi publik, dan inovasi digital desa.",
  },
];
