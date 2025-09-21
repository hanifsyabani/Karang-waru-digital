
export default function Sejarah() {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Sejarah Desa</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sejarah Desa</label>
                <textarea
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={12}
                    placeholder="Tuliskan sejarah lengkap desa, mulai dari asal usul, tokoh penting, peristiwa bersejarah, hingga perkembangan desa..."
                />
            </div>
        </div>
    )
}
