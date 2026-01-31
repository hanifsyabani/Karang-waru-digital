import { Building, Clock, Mail, MapPin, Phone, Users } from "lucide-react";

export default function StatsProfileVillage({ dataInfoUmum }: { dataInfoUmum: any }) {
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Ringkasan Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                            <Users className="h-8 w-8 text-blue-600 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-blue-900">Total Penduduk</p>
                                <p className="text-2xl font-bold text-blue-600">
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 bg-green-50 rounded-lg">
                            <Building className="h-8 w-8 text-green-600 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-green-900">Jumlah KK</p>
                                <p className="text-2xl font-bold text-green-600">
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                            <MapPin className="h-8 w-8 text-purple-600 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-purple-900">Luas Wilayah</p>
                                <p className="text-2xl font-bold text-purple-600">
                                    Km²
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                            <Clock className="h-8 w-8 text-orange-600 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-orange-900">Tahun Berdiri</p>
                                <p className="text-2xl font-bold text-orange-600">
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Kontak Desa</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center">
                            <Phone className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Telepon</p>
                                <p className="text-sm text-gray-600">Belum diisi</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Mail className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Email</p>
                                <p className="text-sm text-gray-600">Belum diisi</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Alamat</p>
                                <p className="text-sm text-gray-600">
                                    Belum diisi
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
