
interface HeaderPageProps {
    title: string

}

export default function HeaderPage({ title }: HeaderPageProps) {
    return (
        <>
            <div className="text-center bg-gradient-to-r from-primary to-green-800 pt-8 space-y-4 ">
                <div className="flex items-center justify-center gap-2">
                    <div className="rounded-full bg-green-100 w-2 h-2 " />
                    <h1 className="text-white font-semibold text-xl">Desa Digital</h1>
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl text-white font-bold">{title}</h1>
                    <p className="text-white text-lg">Mengenal Sejarah, Visi dan Misi, dan Struktur Pemerintahan Desa Karang Waru</p>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <defs>
                    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4CAF50" />{" "}
                        <stop offset="100%" stopColor="#166534" />{" "}
                    </linearGradient>
                </defs>
                <path fill="url(#waveGradient)" fill-opacity="1" d="M0,128L48,149.3C96,171,192,213,288,202.7C384,192,480,128,576,128C672,128,768,192,864,202.7C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
            </svg>
        </>
    )
}
