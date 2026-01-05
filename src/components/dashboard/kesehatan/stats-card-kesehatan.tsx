import React from "react";

interface Props {
    title : string;
    value : any;
    icon : React.ElementType;
}

export default function StatsCardKesehatan({title, value, icon: Icon}: Props) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm font-medium">Total {title}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-xl">
                    <Icon className="w-8 h-8 text-green-600" />
                </div>
            </div>
        </div>
    )
}
