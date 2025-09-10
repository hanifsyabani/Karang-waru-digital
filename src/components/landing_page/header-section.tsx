import { LucideIcon, Newspaper } from "lucide-react";
import { Badge } from "../ui/badge";

export default function HeaderSection({
  title,
  icon : Icon,
  subtitle,
}: {
  title: string;
  subtitle: string;
  icon?: any;
}) {
  return (
    <>
      <div className="flex items-center gap-4 bg-green-100 w-fit ">
        <div className="h-6 w-1 bg-primary" />
        <div className="flex items-center">
          {Icon && <Icon className=" text-primary" size={20} />}
          <Badge className="bg-green-100 text-primary text-base">{title}</Badge>
        </div>
      </div>

      <p className="my-2">{subtitle}</p>
    </>
  );
}



