import ApbdView from '@/components/dashboard/apbd-desa/apbd-view';
import { Download, } from 'lucide-react';

export default function page() {

    return (
        <>
            <header className="bg-white shadow-sm">
                <div className=" px-4 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-green-800">APBD Desa Karang Waru</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <select
                                className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                            >
                                <option value="2025">Tahun 2025</option>
                                <option value="2024">Tahun 2024</option>
                                <option value="2023">Tahun 2023</option>
                            </select>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                                <Download size={18} />
                                Export
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main >
                <ApbdView />
            </main>
        </>
    );
}