
import { Users, Home} from 'lucide-react';
import TablePenduduk from '@/components/dashboard/penduduk/table-penduduk';
import ButtonPenduduk from '@/components/dashboard/penduduk/button-penduduk';

export default function page() {

    const stats = [
        { label: 'Total Penduduk', value: '1,234', icon: Users, color: 'bg-emerald-500', change: '+12' },
        { label: 'Laki-laki', value: '620', icon: Users, color: 'bg-blue-500', change: '+5' },
        { label: 'Perempuan', value: '614', icon: Users, color: 'bg-pink-500', change: '+7' },
        { label: 'Kartu Keluarga', value: '345', icon: Home, color: 'bg-amber-500', change: '+3' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
            <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Data Penduduk</h1>
                            <p className="text-emerald-100 mt-1">Desa Karang Waru</p>
                        </div>
                        <ButtonPenduduk/>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                    <p className="text-emerald-600 text-sm mt-2 font-medium">{stat.change} bulan ini</p>
                                </div>
                                <div className={`${stat.color} p-4 rounded-2xl shadow-lg`}>
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <TablePenduduk />
                
            </div>


        </div>
    );
};
