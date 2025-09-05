import { Newspaper } from "lucide-react";
import { Badge } from "../ui/badge";

export default function HeaderSection({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <div className="flex items-center gap-4 bg-green-100 w-fit ">
        <div className="h-6 w-1 bg-primary" />
        <div className="flex items-center">
          <Newspaper size={20} className="text-primary" />
          <Badge className="bg-green-100 text-primary text-base">{title}</Badge>
        </div>
      </div>

      <p>{subtitle}</p>
    </>
  );
}
