"use client";

import { useEffect,  useState } from "react";
import { Badge } from "../ui/badge";
import CountUp from "react-countup";

export default function CardStatistik({
  item,
}: {
  item: {
    title: string;
    count: number;
    note: string;
    color: string;
  };
}) {
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    setStartCount(true);
  }, []);
  const bgColor =
    {
      green: " border-green-400 text-green-700",
      blue: " border-blue-400 text-blue-700",
      red: " border-red-400 text-red-700",
      yellow: " border-yellow-400 text-yellow-700",
    }[item.color] || "bg-gray-100 border-gray-400 text-gray-700";

  const barColor =
    {
      green: "bg-green-100 text-green-700",
      blue: "bg-blue-100 text-blue-700",
      red: "bg-red-100 text-red-700",
      yellow: "bg-yellow-100 text-yellow-700",
    }[item.color] || "bg-gray-100 text-gray-700";

  return (
    <div
      className={`w-1/4 bg-gray-100 p-2 rounded-lg space-y-6 border-t-4 ${bgColor} shadow-lg`}
    >
      <div>
        <Badge className={`text-lg ${barColor}`}>{item.title}</Badge>
      </div>

      <div className="flex items-end gap-2">
        <h1 className="text-5xl font-bold text-gray-800">
          {startCount ? (
            <CountUp start={0} end={item.count} duration={3} />
          ) : (
            "0"
          )}
        </h1>
        <p className={`text-sm px-2 rounded-full ${barColor}`}>{item.note}</p>
      </div>

      <p className="text-gray-600">Total {item.title} Desa</p>
      <div className={`${barColor} w-20 h-2`}></div>
    </div>
  );
}
