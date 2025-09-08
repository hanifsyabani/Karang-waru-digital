
export default function HeaderProfil({title} :{title: string}) {
    return (
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {title}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
    )
}
