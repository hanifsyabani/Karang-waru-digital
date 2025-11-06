import ApbdView from '@/components/dashboard/apbd-desa/apbd-view';

export default function page() {


    return (
        <>
            <header className="bg-white shadow-sm">
                <div className=" px-4 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-green-800">APBD Desa Karang Waru</h1>
                        </div>
                       
                    </div>
                </div>
            </header>

            <main >
                <ApbdView  />
            </main>
        </>
    );
}