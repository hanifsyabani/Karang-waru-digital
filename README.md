# 🏘️ Karang Waru Digital

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)

**Platform Digital Desa Karang Waru** — Sistem informasi desa modern untuk pengelolaan data dan layanan masyarakat.

[Demo](#demo) • [Fitur](#-fitur) • [Instalasi](#-instalasi) • [Penggunaan](#-penggunaan) • [Teknologi](#-teknologi)

</div>

---

## 📖 Tentang

Karang Waru Digital adalah platform digital desa yang dirancang untuk memudahkan pengelolaan data kependudukan, layanan masyarakat, dan informasi desa. Platform ini menyediakan antarmuka modern untuk admin desa dan website publik untuk warga.

## ✨ Fitur

### 🌐 Landing Page (Publik)
- **Beranda** — Informasi umum desa dengan tampilan modern
- **Profil Desa** — Sejarah, visi misi, dan struktur pemerintahan desa
- **Berita** — Berita dan pengumuman terkini dari desa
- **Layanan** — Informasi layanan yang tersedia untuk warga
- **UMKM** — Direktori usaha mikro, kecil, dan menengah desa

### 🔐 Dashboard Admin
- **Manajemen Penduduk** — Kelola data kependudukan desa
- **Profil Desa** — Edit informasi dan profil desa
- **APBD Desa** — Pengelolaan anggaran pendapatan dan belanja desa
- **Pendidikan** — Data dan statistik pendidikan warga
- **Kesehatan** — Data dan statistik kesehatan masyarakat
- **Berita** — Buat dan kelola berita/pengumuman
- **Layanan Desa** — Kelola layanan untuk warga
- **UMKM** — Kelola direktori usaha desa
- **Akun** — Manajemen pengguna sistem

### 👤 Portal Pengguna
- **Dashboard User** — Akses layanan dan informasi pribadi

## 🚀 Instalasi

### Prasyarat
- [Node.js](https://nodejs.org/) versi 18 atau lebih baru
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/), atau [bun](https://bun.sh/)

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/hanifsyabani/Karang-waru-digital.git
   cd Karang-waru-digital
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   # atau
   pnpm dev
   ```

4. **Buka browser**
   
   Akses [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

## 📁 Struktur Proyek

```
src/
├── app/                    # Next.js App Router
│   ├── (app)/              # Dashboard routes
│   │   ├── admin/          # Admin dashboard
│   │   └── user/           # User portal
│   ├── (auth)/             # Authentication pages
│   └── (landingpage)/      # Public website
├── components/             # React components
│   ├── auth/               # Auth components
│   ├── dashboard/          # Dashboard components
│   ├── landing_page/       # Landing page components
│   ├── layout/             # Layout components
│   └── ui/                 # UI primitives (shadcn/ui)
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── provider/               # Context providers
├── service/                # API services
└── types/                  # TypeScript types
```

## 🛠️ Teknologi

| Kategori | Teknologi |
|----------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) dengan Turbopack |
| **UI Library** | [React 19](https://react.dev/) |
| **Bahasa** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **State Management** | [TanStack Query](https://tanstack.com/query) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Date Handling** | [Day.js](https://day.js.org/) |
| **Carousel** | [Swiper](https://swiperjs.com/) |

## 📜 Scripts

| Script | Deskripsi |
|--------|-----------|
| `npm run dev` | Jalankan development server dengan Turbopack |
| `npm run build` | Build aplikasi untuk production |
| `npm run start` | Jalankan production server |
| `npm run lint` | Jalankan ESLint untuk pengecekan kode |

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan buat issue atau pull request untuk:
- 🐛 Melaporkan bug
- 💡 Menyarankan fitur baru
- 📝 Memperbaiki dokumentasi
- 🔧 Mengirim perbaikan kode

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

<div align="center">

**Dibuat dengan ❤️ untuk Desa Karang Waru**

</div>
