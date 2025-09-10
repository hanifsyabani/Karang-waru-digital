import { Button } from '../ui/button'

interface TabPageProps {
    data: any
    setTab: React.Dispatch<React.SetStateAction<string>>
    tab: string
}

export default function TabPage({ data, setTab, tab }: TabPageProps) {
    return (
        <div className="flex items-center gap-8 px-6 my-4" >
            {data.map((item: any) => (
                <Button
                    key={item.title}
                    className={`text-lg font-semibold hover:text-white cursor-pointer hover:bg-primary ${item.title === tab ? "text-white bg-primary" : "text-gray-500 bg-gray-200"
                        }`}
                    onClick={() => setTab(item.title)}
                >
                    <item.icon size={24} />
                    <p className="text-sm">{item.title}</p>
                </Button>
            ))}
        </div>
    )
}
