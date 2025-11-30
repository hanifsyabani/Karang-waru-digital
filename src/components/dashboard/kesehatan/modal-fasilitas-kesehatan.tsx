
export default function ModalFasilitasKesehatan() {
    return (
        <>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Fasilitas</label>
                <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="Masukkan nama fasilitas"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Fasilitas</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
                    <option>Pilih Jenis</option>
                    <option>Puskesmas</option>
                    <option>Posyandu</option>
                    <option>Klinik</option>
                    <option>Apotek</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat</label>
                <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="Masukkan alamat lengkap"
                ></textarea>
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Penanggung Jawab</label>
                <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="Nama penanggung jawab"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">No. Telepon</label>
                <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="Contoh: 081234567890"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Jam Operasional</label>
                <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="Contoh: Senin-Jumat, 08:00-16:00"
                />
            </div>

            <div className="flex space-x-3 pt-4">
                <button
                    type="button"
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                    Batal
                </button>
                <button
                    type="button"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-semibold shadow-lg"
                >
                    Simpan
                </button>
            </div>
        </>
    )
}
