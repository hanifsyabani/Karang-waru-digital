import { LucideIcon } from "lucide-react";

interface ContactItem {
  title: string;
  description: string;
  body: string;
  href: string;
  icon: LucideIcon;
  color: {
    bg: string;
    text: string;
    link: string;
  };
}

export default function CardContact({ item }: { item: ContactItem }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color.bg}`}
        >
          <item.icon className={`w-5 h-5 ${item.color.text}`} />
        </div>
        <h3 className="font-semibold text-gray-800">{item.title}</h3>
      </div>
      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
      <a
        href="https://karangwaru.desa.id"
        className={`${item.color.link} font-medium`}
      >
        {item.body}
      </a>
    </div>
  );
}
